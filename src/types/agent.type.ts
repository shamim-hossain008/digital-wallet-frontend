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
  recentTransactions: AgentTransaction[];
};
