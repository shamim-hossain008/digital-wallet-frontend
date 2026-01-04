import { baseApi } from "@/redux/baseApi";
import type {
  AgentDashboardData,
  AgentTransaction,
  FilterType,
  PaginatedResponse,
} from "@/types";
import type { ApiWrapper, IUserInfoData } from "@/types/auth.type";

// type UpdateAgentProfilePayload = {
//   name?: string;
//   phone?: string;
//   picture?: string;
// };

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // agent dashboard
    getAgentDashboard: builder.query<
      ApiWrapper<AgentDashboardData>,
      { filter?: FilterType; page?: number; limit?: number }
    >({
      query: (params) => ({
        url: "/agent/dashboard",
        method: "GET",
        params,
      }),
      providesTags: ["Agent"],
    }),

    // Agent Transactions
    getAgentTransactions: builder.query<
      ApiWrapper<PaginatedResponse<AgentTransaction>>,
      {
        page: number;
        limit: number;
        filter: string;
        search: string;
      }
    >({
      query: (params) => ({
        url: "/agent/transactions",
        method: "GET",
        params,
      }),
      providesTags: ["Transaction"],
    }),
    // Cash in
    cashIn: builder.mutation<
      ApiWrapper<null>,
      { identifier: string; amount: number }
    >({
      query: (data) => ({
        url: "/agent/cash-in",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Agent", "Transaction"],
    }),

    // cash out
    cashOut: builder.mutation<
      ApiWrapper<null>,
      { identifier: string; amount: number }
    >({
      query: (data) => ({
        url: "/agent/cash-out",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Agent", "Transaction"],
    }),

    // ______Agent Profile _________
    getAgentProfile: builder.query<ApiWrapper<IUserInfoData>, void>({
      query: () => ({
        url: "/agent/profile",
        method: "GET",
      }),
      providesTags: ["Agent"],
    }),

    // updater Profile
    updateAgentProfile: builder.mutation<
      ApiWrapper<IUserInfoData>,
      FormData | Partial<{ name: string; phone: string; picture: string }>
    >({
      query: (data) => ({
        url: "/agent/profile",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Agent"],
    }),

    // change password
    changeAgentPassword: builder.mutation<
      ApiWrapper<null>,
      { oldPassword: string; newPassword: string }
    >({
      query: (data) => ({
        url: "/agent/change-password",
        method: "PATCH",
        data,
      }),
    }),
  }),
});

export const {
  useGetAgentDashboardQuery,
  useGetAgentTransactionsQuery,
  useCashInMutation,
  useCashOutMutation,
  useGetAgentProfileQuery,
  useUpdateAgentProfileMutation,
  useChangeAgentPasswordMutation,
} = agentApi;
