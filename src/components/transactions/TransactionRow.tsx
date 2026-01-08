import type { ITransaction } from "@/types";
import { statusColor, typeIcon } from "@/utils/transactionUI";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

interface IProps {
  tx: ITransaction;
  onClick?: () => void;
}

function TransactionRow({ tx,onClick }: IProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="flex justify-between items-center border rounded-lg p-4 dark:border-muted"
    >
      {/* Left side: type + date */}
      <div className="flex items-center gap-3">
        {typeIcon(tx.type)}
        <div>
          <p className="font-medium">{tx.type}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(tx.timestamp).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Right side: amount + status + view button */}
      <div className="flex items-center gap-2">
        <div className="text-right">
          <p className="font-semibold">${tx.amount}</p>
          <span
            className={`text-xs px-2 py-1 rounded ${statusColor[tx.status]}`}
          >
            {tx.status}
          </span>
        </div>

        {/* 👇 View Details button */}
        <button
          onClick={onClick}
          className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
        >
          <Info size={16} />
          View Details
        </button>
      </div>
    </motion.div>
  );
}

export default TransactionRow;
