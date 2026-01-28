export interface ITransactionPayLoad {
  amount: number;
  pin?: string;
  receiverId?: string;
}

export interface ITransactionFilter {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  range?: string;
  minAmount?: number;
  maxAmount?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ITransaction {
  _id: string;
  amount: number;
  type: "DEPOSIT" | "WITHDRAW" | "TRANSFER" | "CASH_IN" | "CASH_OUT";
  status: "COMPLETED" | "PENDING" | "FAILED";
  timestamp: string;
  sender?: {
    _id: string;
    email: string;
    role: string;
  };
  receiver?: {
    _id: string;
    email: string;
    role: string;
  };
}

export interface ITransactionListData {
  transactions: ITransaction[];
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
}
