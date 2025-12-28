import { baseApi } from "@/redux/baseApi";
import type {
  AgentDashboardData,
  AgentTransaction,
  PaginatedResponse,
} from "@/types";
import type { ApiWrapper } from "@/types/auth.type";

export type DashboardFilter = {
  filter?: "daily" | "monthly";
};

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // agent dashboard
    getAgentDashboard: builder.query<
      ApiWrapper<AgentDashboardData>,
      DashboardFilter | void
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
        filter: "daily" | "monthly";
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
      { useId: string; amount: number }
    >({
      query: (data) => ({
        url: "agent/cash-out",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Agent", "Transaction"],
    }),
  }),
});

export const {
  useGetAgentDashboardQuery,
  useGetAgentTransactionsQuery,
  useCashInMutation,
  useCashOutMutation,
} = agentApi;
