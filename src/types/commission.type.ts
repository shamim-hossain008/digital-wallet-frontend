export interface ICommission {
  agentId: string;
  name: string;
  email: string;
  totalCommission: number;
  transactionCount: number;
  isPaid?: boolean;
}

export interface ICommissionResponse {
  payouts: ICommission[];
  total: number;
  page: number;
  limit: number;
}
