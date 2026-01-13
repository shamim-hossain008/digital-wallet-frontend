import type { role } from "@/constants/role";
import type { ComponentType } from "react";
import type { ILoginData, IUserInfoData } from "./auth.type";
import type { PaginationMeta } from "./pagination.type";

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

export type {
  ITransaction,
  ITransactionFilter,
  ITransactionListData,
  ITransactionPayLoad,
} from "./transaction.type";

export type { AgentDashboardData, AgentTransaction } from "./agent.type";

export type { PaginationMeta } from "./pagination.type";

export type {
  ICommission,
  ICommissionHistory,
  ICommissionHistoryResponse,
  ICommissionResponse,
} from "./commission.type";

export type {
  AdminAgentStatus,
  AdminDashboardStats,
  AdminUserStatus,
} from "./admin.type";

// Generic API Response Wrapper

export interface IResponse<T> {
  statusCode?: number;
  success: boolean;
  message?: string;
  data: T;
  meta?: PaginationMeta;
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

export type FilterType = "daily" | "monthly" | "all";

export type TRole = (typeof role)[keyof typeof role];
