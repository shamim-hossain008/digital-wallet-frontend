// User Model

/* Auth shapes */
export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  role: "ADMIN" | "AGENT" | "USER";
  isDeleted?: boolean;
  isActive?: string;
  isVerified?: boolean;
  isSuspended?: boolean;
  isApproved?: boolean;
  createdAt?: string;
  updatedAt?: string;
  // NOTE: backend returns password in the user object but we will never store it on client
  password?: string;
}

// Auth Login Response

export interface ILoginData {
  accessToken: string;
  refreshToken?: string;
  user: IUser;
}

// Transaction mini type for dashboard
export interface IRecentTransaction {
  _id: string;
  type: "deposit" | "withdraw" | "transfer";
  amount: number;
  date: string;
  status?: "success" | "pending" | "failed";
}
// User Info Response (GET /user/me)

export interface IUserInfoData {
  _id: string;
  name: string;
  email: string;
  role: "ADMIN" | "AGENT" | "USER";
  phone?:string

  walletBalance: number;
  recentTransactions: IRecentTransaction[];
}

// Request Types

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ISendOtp {
  email: string;
}

export interface IVerifyOtp {
  email: string;
  otp: string;
}

// Response Types

export interface ILoginResponse {
  success: boolean;
  message?: string;
  data: ILoginData;
}

export interface IRegisterResponse {
  success: boolean;
  message?: string;
  data: IUser;
}

export interface TMeta {
  total?: number;
  page?: number;
  limit?: number;
}

export interface ApiWrapper<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: TMeta;
}
