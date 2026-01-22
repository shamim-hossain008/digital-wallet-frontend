import { GlobalSkeleton } from "@/components/loading/GlobalSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCashOutMutation } from "@/redux/features/agent-api/agent.api";

import { motion } from "framer-motion";
import { useState } from "react";

import { toast } from "sonner";

function WithdrawMoney() {
  const [identifier, setIdentifier] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const [cashOut, { isLoading }] = useCashOutMutation();

  const commission = amount * 0.005;
  const totalDeduction = amount + commission;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier || !amount) {
      toast.error("All fields are required");
      return;
    }

    if (amount < 10) {
      toast.error("Amount must be greater than 10");
      return;
    }

    try {
      await cashOut({
        identifier,
        amount,
      }).unwrap();

      toast.success("Money withdrawn successfully");

      setOpen(false);
      setAmount(0);
      setIdentifier("");
    } catch (error) {
      const err = error as {
        data?: {
          message?: string;
        };
      };

      toast.error(err?.data?.message || "Failed to withdraw money");
    }
  };

  if (isLoading) return <GlobalSkeleton />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Withdraw Money</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="User email or phone"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Amount"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          {/* Preview */}
          <div className="text-sm space-y-1 text-muted-foreground">
            <p>Commission (0.5%): {commission.toFixed(2)}</p>
            <p>Total deduction: {totalDeduction.toFixed(2)}</p>
          </div>

          <Button
            className="w-full"
            disabled={amount < 10 || isLoading}
            onClick={() => setOpen(true)}
          >
            Withdraw
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Cash-Out</DialogTitle>
          </DialogHeader>

          <p className="text-sm">
            Withdraw <strong>{amount}</strong> from user?
          </p>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading && <Spinner />}
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default WithdrawMoney;
