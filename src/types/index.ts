import type { role } from "@/constants/role";
import type { ComponentType } from "react";
import type { ILoginData, IUserInfoData } from "./auth.type";

export type {
  ILoginData,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  ISendOtp,
  IUser,
  IUserInfoData,
  IVerifyOtp,
} from "./auth.type";

// Generic API Response Wrapper

export interface IResponse<T> {
  statusCode?: number;
  success: boolean;
  message?: string;
  data: T;
}

// Union type for Login + UserInfo API

export type AuthResponse =
  | IResponse<ILoginData> // login returns user + tokens
  | IResponse<IUserInfoData>; // get user info returns base user

// Sidebar Types

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = (typeof role)[keyof typeof role];
