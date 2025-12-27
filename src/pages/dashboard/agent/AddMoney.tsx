/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCashInMutation } from "@/redux/features/agent  api/agent.api";
import { motion } from "framer-motion";
import { Loader2, Wallet } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "recharts";
import { toast } from "sonner";

function AddMoney() {
  const [identifier, setIdentifier] = useState("");
  const [amount, setAmount] = useState("");

  const [cashIn, { isLoading }] = useCashInMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await cashIn({
        identifier,
        amount: Number(amount),
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
    <div className="max-w-lg mx-auto p-4 sm:p-6">
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
              {/* User Identifier */}
              <div className="space-y-2">
                <Label>User Phone or Email</Label>
                <Input
                  placeholder="e.g. 017xxxxxxxx or user@email.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  min={10}
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Money
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default AddMoney;
