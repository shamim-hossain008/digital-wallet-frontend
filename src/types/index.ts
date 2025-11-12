import type { ComponentType } from "react";

export type {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  ISendOtp,
  IVerifyOtp,
  IUser
} from "./auth.type";

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "ADMIN" | "AGENT" | "USER";
