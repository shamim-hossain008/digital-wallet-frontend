export interface PaginatedResponse<T> {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: T[];
}

export type AgentTransaction = {
  _id?: string;
  type: "CASH_IN" | "CASH_OUT";
  amount: number;
  commission?: number;
  timestamp: string;
};

export type AgentDashboardData = {
  walletBalance: number;
  totalCashIns: number;
  totalCashOuts: number;
  commissionEarned: number;
  recentTransactions: PaginatedResponse<AgentTransaction>;
};

export type AgentStatus = "PENDING" | "ACTIVE" | "SUSPENDED";

export interface IAgent {
  _id: string;
  name: string;
  email: string;
  role: "AGENT";
  isActive: AgentStatus;
  createdAt: string;
}
