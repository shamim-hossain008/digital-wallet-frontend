
import type { AuthResponse } from "../types";

export const extractUserRole = (data: AuthResponse | undefined) => {
  if (!data) return undefined;

  // login response → data.user.role
  if ("user" in data.data) {
    return data.data.user.role;
  }

  // userInfo response → data.role
  return data.data.role;
};

export const extractUserEmail = (data: AuthResponse | undefined) => {
  if (!data) return undefined;

  // login response → data.user.email
  if ("user" in data.data) {
    return data.data.user.email;
  }

  // userInfo response → data.email
  return data.data.email;
};
