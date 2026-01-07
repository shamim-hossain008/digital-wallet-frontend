import type { ITransaction } from "@/types";
import { statusColor, typeIcon } from "@/utils/transactionUI";
import { motion } from 'framer-motion';

interface IProps{
    tx:ITransaction
}


function TransactionRow({tx}:IProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="flex justify-between items-center border rounded-lg p-4 dark:border-muted"
    >
      <div className="flex items-center gap-3">
        {typeIcon(tx.type)}
        <div>
          <p className="font-medium">{tx.type}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(tx.timestamp).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold">${tx.amount}</p>
        <span className={`text-xs px-2 py-1 rounded ${statusColor[tx.status]}`}>
          {tx.status}
        </span>
      </div>
    </motion.div>
  );
}

export default TransactionRow;
