import type { ITransaction } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { typeIcon } from "@/utils/transactionUI";
import { DialogDescription } from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import TransactionStatusBadge from "./TransactionStatusBadge";

interface Props {
  transaction: ITransaction | null;
  open: boolean;
  onClose: () => void;
}

function TransactionDetailsModal({ transaction, open, onClose }: Props) {
  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md dark:bg-background">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription className="sr-only">
            Detailed information about the selected transaction.{" "}
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-4 text-sm"
        >
          <Row label="Transaction ID" value={transaction._id} />

          <Row
            label="Type"
            value={
              <div className="flex items-center gap-2">
                {typeIcon(transaction.type)}
                <span className="font-medium">{transaction.type}</span>
              </div>
            }
          />

          <Row
            label="Amount"
            value={
              <span className="font-semibold text-lg">
                ${transaction.amount}
              </span>
            }
          />

          <Row
            label="Status"
            value={<TransactionStatusBadge status={transaction.status} />}
          />

          <Row
            label="Date"
            value={new Date(transaction.timestamp).toLocaleString()}
          />

          {transaction.sender && (
            <Row label="Sender" value={transaction.sender?.email ?? "—"} />
          )}

          {transaction.receiver && (
            <Row label="Receiver" value={transaction.receiver?.email ?? "—"} />
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between items-center gap-4">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-right">{value}</span>
  </div>
);

export default TransactionDetailsModal;
