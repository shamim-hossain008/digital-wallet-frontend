export type AdminDashboardStats = {
  totalUsers: number;
  totalAgents: number;
  totalTransactions: number;
  totalVolume: number;
  transactionTrend: { name: string; count: number }[];
  volumeData: { name: string; value: number }[];
  statusData: { name: string; value: number }[];
};

export type AdminUserStatus = "active" | "blocked";
export type AdminAgentStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";
