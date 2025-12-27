import { baseApi } from "@/redux/baseApi";
import type { AgentDashboardData } from "@/types";
import type { ApiWrapper } from "@/types/auth.type";

export type DashboardFilter = {
  filter?: "daily" | "monthly";
};

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgentDashboard: builder.query<
      ApiWrapper<AgentDashboardData>,
      DashboardFilter | void
    >({
      query: () => ({
        url: "/agent/dashboard",
        method: "GET",
      }),
      providesTags: ["Agent"],
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
  useCashInMutation,
  useCashOutMutation,
} = agentApi;
