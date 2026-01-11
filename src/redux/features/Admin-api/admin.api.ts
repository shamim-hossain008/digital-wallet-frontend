import { baseApi } from "@/redux/baseApi";

import type {
  AdminAgentStatus,
  ICommissionResponse,
  IResponse,
  ITransactionFilter,
  ITransactionListData,
  IUserInfoData,
  PaginationMeta,
} from "../../../types/index";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Dashboard overview
    getAdminDashboard: builder.query<
      IResponse<{
        totalUsers: number;
        totalAgents: number;
        totalTransactions: number;
        totalVolume: number;
      }>,
      void
    >({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),

    // users management
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

    // Agent
    getAllAgents: builder.query<
      {
        data: IUserInfoData[];
        meta: PaginationMeta;
      },
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

    // Transactions
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

    // system config
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
    // Admin Profile
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

    // get all commissions
    getAllCommissions: builder.query<
      IResponse<ICommissionResponse>,
      {
        page?: number;
        limit?: number;
        fromDate?: string;
        toDate?: string;
        status?: string;
        search?: string;
        paid?: boolean;
      }
    >({
      query: (params) => ({
        url: "/admin/commission-payouts",
        method: "GET",
        params,
      }),
      providesTags: ["Commission"],
    }),

    markCommissionPaid: builder.mutation({
      query: ({ commissionId }) => ({
        url: `admin/commissions/${commissionId}/pay`,
        method: "PATCH",
      }),
      invalidatesTags: ["Commission"],
    }),
  }),
});

export const {
  useGetAdminDashboardQuery,
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
  useMarkCommissionPaidMutation,
} = adminApi;
