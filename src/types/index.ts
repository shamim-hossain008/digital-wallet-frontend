import type { ComponentType } from "react";

export type { ILogin, ISendOtp, IVerifyOtp } from "./auth.type";

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "ADMIN" | "AGENT" | "USER";

