import type { ICommission } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  open: boolean;
  commission: ICommission | null;
  loading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

function PayCommissionModal({
  open,
  commission,
  loading,
  onConfirm,
  onClose,
}: Props) {
  return (
    <AnimatePresence>
      {open && commission && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-card rounded-lg p-6 w-full max-w-md"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9 }}
          >
            <h2 className="text-lg font-semibold mb-2">
              Confirm Commission Payment
            </h2>

            <p className="text-sm text-muted-foreground mb-4">
              You are about to pay{" "}
              <span className="font-medium">${commission.totalCommission}</span>{" "}
              to <b>{commission.name}</b>.
            </p>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onConfirm} disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Confirm & Pay
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PayCommissionModal;
