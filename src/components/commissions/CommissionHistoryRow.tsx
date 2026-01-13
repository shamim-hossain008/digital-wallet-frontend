import type { ICommissionHistory } from "@/types";
import CommissionHistoryStatus from "./CommissionHistoryStatus";

interface Props {
  commission: ICommissionHistory;
}

function CommissionHistoryRow({ commission }: Props) {
  return (
    <tr className="border-b">
      <td className="p-3 font-medium">{commission.agent.name}</td>
      <td>{commission.agent.email}</td>
      <td>${commission.amount}</td>
      <td>{new Date(commission.paidAt).toLocaleString()}</td>
      <td>{commission.paidBy.name}</td>
      <td className="text-center">
        <CommissionHistoryStatus />
      </td>
    </tr>
  );
}

export default CommissionHistoryRow;
