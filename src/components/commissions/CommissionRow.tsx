import type { ICommission } from "@/types";
import { Button } from "../ui/button";
import CommissionStatusBadge from "./CommissionStatusBadge";

interface Props {
  commission: ICommission;
  onPay: () => void;
}

function CommissionRow({ commission, onPay }: Props) {
  const isPaid = commission.isPaid ?? false;

  return (
    <tr className="border-b dark:border-muted">
      {/* Agent Name */}
      <td className="p-3 text-left font-medium">{commission.name}</td>

      {/* Agent Email */}
      <td className="p-3 text-left text-muted-foreground">
        {commission.email}
      </td>

      {/* Total Commission */}
      <td className="p-4 text-left font-semibold text-indigo-600">
        ${commission.totalCommission.toFixed(2)}
      </td>
      {/* Transaction Count */}
      <td className="p-3 text-center">{commission.transactionCount}</td>

      <td className="p-3 text-center">
        <CommissionStatusBadge isPaid={isPaid} />
      </td>

      {/* Action */}
      <td className="p-3 text-right">
        {onPay && (
          <Button size="sm" disabled={isPaid} variant="outline" onClick={onPay}>
            {isPaid ? "Paid" : "Pay"}
          </Button>
        )}
      </td>
    </tr>
  );
}

export default CommissionRow;
