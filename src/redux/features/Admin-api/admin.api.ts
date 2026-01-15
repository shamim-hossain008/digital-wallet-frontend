/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

import type {
  AdminAgentStatus,
  AdminDashboardStats,
  ICommissionHistoryResponse,
  ICommissionResponse,
  IResponse,
  ITransactionFilter,
  ITransactionListData,
  IUserInfoData,
  PaginationMeta,
} from "../../../types";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ================= DASHBOARD ================= */

    getAdminDashboard: builder.query<IResponse<AdminDashboardStats>, void>({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),

    getAdminSummary: builder.query<any, void>({
      query: () => ({
        url: "/admin/summary",
        method: "GET",
      }),
    }),

    /* ================= USERS ================= */

    getAllUsers: builder.query<
      { data: IUserInfoData[]; meta: PaginationMeta },
      {
        page?: number;
        limit?: number;
        search?: string;
        status?: "active" | "blocked";
      }
    >({
      query: (params) => ({
        url: "/user/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["User"],
    }),

    toggleUserBlock: builder.mutation<
      IResponse<null>,
      { userId: string; isBlocked: boolean }
    >({
      query: ({ userId, isBlocked }) => ({
        url: `/admin/users/${userId}/block`,
        method: "PATCH",
        data: { isBlocked },
      }),
      invalidatesTags: ["User"],
    }),

    /* ================= AGENTS ================= */

    getAllAgents: builder.query<
      { data: IUserInfoData[]; meta: PaginationMeta },
      {
        page?: number;
        limit?: number;
        search?: string;
        status?: AdminAgentStatus;
      }
    >({
      query: (params) => ({
        url: "/admin/all-agents",
        method: "GET",
        params,
      }),
      providesTags: ["Agent"],
    }),

    approveAgent: builder.mutation<IResponse<null>, { agentId: string }>({
      query: ({ agentId }) => ({
        url: `/admin/agents/${agentId}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Agent"],
    }),

    suspendAgent: builder.mutation<
      IResponse<null>,
      { agentId: string; isBlocked: boolean }
    >({
      query: ({ agentId, isBlocked }) => ({
        url: `/admin/agents/${agentId}/suspend`,
        method: "PATCH",
        data: { isBlocked },
      }),
      invalidatesTags: ["Agent"],
    }),

    /* ================= TRANSACTIONS ================= */

    getAllTransactions: builder.query<
      IResponse<ITransactionListData>,
      ITransactionFilter
    >({
      query: (params) => ({
        url: "/transactions/all",
        method: "GET",
        params,
      }),
      providesTags: ["Transaction"],
    }),

    /* ================= SYSTEM CONFIG ================= */

    updateSystemConfig: builder.mutation<
      IResponse<null>,
      {
        transactionFee?: number;
        minTransactionLimit?: number;
        maxTransactionLimit?: number;
      }
    >({
      query: (data) => ({
        url: "/admin/config",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),

    /* ================= ADMIN PROFILE ================= */

    getAdminProfile: builder.query<IResponse<IUserInfoData>, void>({
      query: () => ({
        url: "/admin/profile",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),

    updateAdminProfile: builder.mutation<
      IResponse<IUserInfoData>,
      Partial<{ name: string; phone: string; picture: string }>
    >({
      query: (data) => ({
        url: "/admin/profile",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),

    /* ================= COMMISSION SUMMARY ================= */
    // Calculated from transactions

    getAllCommissions: builder.query<
      IResponse<ICommissionResponse>,
      {
        page?: number;
        limit?: number;
        fromDate?: string;
        toDate?: string;
        status?: string;
      }
    >({
      query: (params) => ({
        url: "/admin/commission-payouts",
        method: "GET",
        params,
      }),
      providesTags: ["Commission"],
    }),

    /* ================= PAY COMMISSION (STEP 6.1) ================= */

    payCommission: builder.mutation<
      IResponse<any>,
      {
        agentId: string;
        amount: number;
        fromDate?: string;
        toDate?: string;
      }
    >({
      query: (data) => ({
        url: "/admin/commission-payouts/pay",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Commission", "CommissionHistory"],
    }),

    /* ================= COMMISSION HISTORY ================= */

    getCommissionHistory: builder.query<
      IResponse<ICommissionHistoryResponse>,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: "/admin/commission-history",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["CommissionHistory"],
    }),
  }),
});

/* ================= EXPORT HOOKS ================= */

export const {
  useGetAdminDashboardQuery,
  useGetAdminSummaryQuery,
  useGetAllUsersQuery,
  useToggleUserBlockMutation,

  useGetAllAgentsQuery,
  useApproveAgentMutation,
  useSuspendAgentMutation,

  useGetAllTransactionsQuery,

  useUpdateSystemConfigMutation,

  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,

  useGetAllCommissionsQuery,
  usePayCommissionMutation,

  useGetCommissionHistoryQuery,
} = adminApi;
