

export type AdminDashboardStats = {
  totalUsers: number;
  totalAgents: number;
  totalTransactions: number;
  totalVolume: number;
};

export type AdminUserStatus = "active" | "blocked";
export type AdminAgentStatus = "active" | "blocked" | "pending";
