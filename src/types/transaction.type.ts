/* eslint-disable @typescript-eslint/no-explicit-any */

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
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ITransaction {
  _id: string;
  amount: number;
  type: "DEPOSIT" | "WITHDRAW" | "TRANSFER";
  status: "COMPLETED" | "PENDING" | "FAILED";
  timestamp: string;
  sender?: any;
  receiver?: any;
}

export interface ITransactionListData {
  transactions: ITransaction[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
