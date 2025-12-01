/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/axios.ts
import config from "@/config";
import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

// safe helper to set Authorization header on config.headers
function setAuthHeader(config: AxiosRequestConfig, token: string) {
  // Axios v1: headers may be AxiosHeaders instance or plain object
  if (!config.headers) {
    config.headers = {};
  }
  // Use indexer to avoid AxiosHeaders API differences
  (config.headers as Record<string, string>)[
    "Authorization"
  ] = `Bearer ${token}`;
}

axiosInstance.interceptors.request.use((cfg) => {
  try {
    const raw = localStorage.getItem("dw_auth");
    if (raw) {
      const parsed = JSON.parse(raw);
      const token = parsed?.accessToken;
      if (token) {
        setAuthHeader(cfg, token);
      }
    }
  } catch {
    // ignore parsing errors
  }
  return cfg;
});

// Token refresh queue
let isRefreshing = false;
let pendingQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = (error.config || {}) as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Determine if this error means token expired. Adjust to your backend.
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    const isTokenExpired =
      // common cases: 401 Unauthorized, 419 Authentication Timeout, or custom message
      status === 401 ||
      status === 419 ||
      (status === 500 && message === "jwt expired") ||
      (message &&
        typeof message === "string" &&
        message.toLowerCase().includes("expired"));

    if (isTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // queue the request until refresh is done
        return new Promise((resolve, reject) => {
          pendingQueue.push({
            resolve: (token) => {
              if (token) {
                setAuthHeader(originalRequest, String(token));
              }
              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        // call refresh-token endpoint (ensure this endpoint does not require Authorization header)
        const refreshRes = await axiosInstance.post("/auth/refresh-token");
        const newToken =
          refreshRes?.data?.data?.accessToken ??
          refreshRes?.data?.accessToken ??
          null;
        const newRefreshToken =
          refreshRes?.data?.data?.refreshToken ??
          refreshRes?.data?.refreshToken ??
          null;

        if (newToken) {
          // update localStorage dw_auth token object (preserving user if present)
          try {
            const raw = localStorage.getItem("dw_auth");
            const parsed = raw ? JSON.parse(raw) : {};
            parsed.accessToken = newToken;
            if (newRefreshToken) parsed.refreshToken = newRefreshToken;
            localStorage.setItem("dw_auth", JSON.stringify(parsed));
          } catch {
            // ignore
          }

          // resume queued requests
          processQueue(null, newToken);

          // set header and retry original
          setAuthHeader(originalRequest, newToken);
          return axiosInstance(originalRequest);
        } else {
          // couldn't get new token
          processQueue(new Error("No new token"));
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Non-refresh related errors
    return Promise.reject(error);
  }
);
