/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";

export interface ITransactionPayLoad {
  amount: number;
  pin?: string;
  receiver?: string;
}

export interface ITransactionFilter {
  page?: number;
  limit?: number;
  type?: string;
  range?: string;
  search?: string;
  sort?: string;
}

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all user transaction
    getMyTransactions: builder.query<
      IResponse<{ data: any[]; totalPages: number }>,
      ITransactionFilter
    >({
      query: (params) => ({
        url: "/transactions/my",
        method: "GET",
        params,
      }),
      providesTags: ["Transaction"],
    }),

    // Deposit

    depositMoney: builder.mutation<IResponse<any>, ITransactionPayLoad>({
      query: (body) => ({
        url: "/transactions/deposit",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Transaction", "User"],
    }),
    // Withdraw
    withdrawMoney: builder.mutation<IResponse<any>, ITransactionPayLoad>({
      query: (body) => ({
        url: "/transactions/withdraw",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Transaction", "User"],
    }),

    // Transfer to user
    transferMoney: builder.mutation<IResponse<any>, ITransactionPayLoad>({
      query: (body) => ({
        url: "/transactions/transfer",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Transaction", "User"],
    }),
  }),
});

export const {
  useGetMyTransactionsQuery,
  useDepositMoneyMutation,
  useWithdrawMoneyMutation,
  useTransferMoneyMutation,
} = transactionApi;
