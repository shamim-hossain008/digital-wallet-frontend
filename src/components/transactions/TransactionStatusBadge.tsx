
import type { ITransaction } from "@/types";
import { statusColor } from "@/utils/transactionUI";

interface Props {
  status: ITransaction["status"];
}

const TransactionStatusBadge = ({ status }: Props) => {
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${statusColor[status]}`}
    >
      {status}
    </span>
  );
};

export default TransactionStatusBadge;
