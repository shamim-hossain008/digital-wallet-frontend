import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  agentName: string;
  amount: number;
}

function ConfirmCommissionModal({
  open,
  onClose,
  onConfirm,
  loading,
  agentName,
  amount,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-background rounded-xl p-6 w-full max-w-md shadow-lg"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <h2 className="text-lg font-semibold mb-2">
              Confirm Commission Payment
            </h2>

            <p className="text-sm text-muted-foreground mb-4">
              You are about to pay <strong>${amount}</strong> to{" "}
              <strong>{agentName}</strong>. This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onConfirm} disabled={loading}>
                {loading ? "Processing..." : "Confirm Payment"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmCommissionModal;
