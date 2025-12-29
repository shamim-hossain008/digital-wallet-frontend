/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

import { useCashInMutation } from "@/redux/features/agent  api/agent.api";

function AddMoney() {
  const [identifier, setIdentifier] = useState("");
  const [amount, setAmount] = useState("");

  const [cashIn, { isLoading }] = useCashInMutation();
  const navigate = useNavigate();

  const amountNumber = Number(amount);
  const isInvalidAmount =
    !identifier || !amount || Number.isNaN(amountNumber) || amountNumber < 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier || isInvalidAmount) {
      toast.error("Minimum cash-in amount is 10 and identifier is required");
      return;
    }

    try {
      // call mutation and wait for result
      await cashIn({
        identifier,
        amount: amountNumber,
      }).unwrap();

      toast.success("Money added successfully");

      setIdentifier("");
      setAmount("");

      navigate("/agent/dashboard");
    } catch (error: any) {
      toast.error(error?.data?.message || "Transaction failed");
    }
  };

  return (
    <div className="mx-auto max-w-lg p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Add Money (Cash In)</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Identifier */}
              <div className="space-y-2">
                <Label>User Phone or Email</Label>
                <Input
                  placeholder="017xxxxxxxx or user@email.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  min={10}
                  placeholder="Minimum 10"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isLoading}
                />

                {/* helper text */}
                {amount && amountNumber < 10 && (
                  <p className="text-xs text-red-500">Minimum amount is 10</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2"
                disabled={isInvalidAmount || isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner size={18} className="text-white" />
                    <span>Adding...</span>
                  </>
                ) : (
                  "Add Money"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default AddMoney;
