export interface AgentDashboardData {
  totalCashIn: number;
  totalCashOut: number;
  commissionEarned: number;
  recentTransactions: {
    _id: string;
    type: "CASH_IN" | "CASH_OUT";
    amount: number;
    commission?: number;
    timestamp: string;
  }[];
}
