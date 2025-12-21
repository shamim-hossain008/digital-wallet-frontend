/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "@/redux/baseApi";
import type {
  IResponse,
  ITransactionFilter,
  ITransactionListData,
  ITransactionPayLoad,
} from "@/types";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all user transaction
    getMyTransactions: builder.query<
      IResponse<ITransactionListData>,
      ITransactionFilter
    >({
      query: (params) => ({
        url: "/transactions/me",
        method: "GET",
        params,
      }),
      providesTags: ["Transaction"],
    }),

    // Deposit

    depositMoney: builder.mutation<IResponse<any>, ITransactionPayLoad>({
      query: (data) => ({
        url: "/transactions/deposit",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Transaction", "User"],
    }),
    // Withdraw
    withdrawMoney: builder.mutation<IResponse<any>, ITransactionPayLoad>({
      query: (data) => ({
        url: "/transactions/withdraw",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Transaction", "User"],
    }),

    // Transfer to user
    transferMoney: builder.mutation<IResponse<any>, ITransactionPayLoad>({
      query: (data) => ({
        url: "/transactions/transfer",
        method: "POST",
        data,
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
