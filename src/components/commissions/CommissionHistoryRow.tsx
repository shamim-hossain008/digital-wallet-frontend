import type { ICommissionHistory } from "@/types";
import CommissionHistoryStatus from "./CommissionHistoryStatus";

interface Props {
  commission: ICommissionHistory;
}

function CommissionHistoryRow({ commission }: Props) {
  return (
    <tr className="border-b">
      {" "}
      <td className="p-3 text-left font-medium">
        {commission.agent.name}
      </td>{" "}
      <td className="p-3 text-left">{commission.agent.email}</td>{" "}
      <td className="p-3 text-left">${commission.amount}</td>{" "}
      <td className="p-3 text-left">
        {new Date(commission.paidAt).toLocaleString()}
      </td>{" "}
      <td className="p-3 text-left">{commission.paidBy.name}</td>{" "}
      <td className="p-3 text-center">
        {" "}
        <CommissionHistoryStatus />{" "}
      </td>{" "}
    </tr>
  );
}

export default CommissionHistoryRow;
