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

export interface ICommissionHistory {
  _id: string;
  agent: {
    _id: string;
    name: string;
    email: string;
  };
  amount: number;
  fromDate?: string;
  toDate?: string;
  paidAt: string;
  status: "PAID";
  paidBy: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface ICommissionHistoryResponse {
  data: ICommissionHistory[];
  total: number;
  page: number;
  limit: number;
}
