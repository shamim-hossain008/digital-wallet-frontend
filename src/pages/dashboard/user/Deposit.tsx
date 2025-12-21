/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Spinner } from "@/components/ui/spinner";
import { useDepositMoneyMutation } from "@/redux/features/transaction/transaction.api";
import { playSuccessSound } from "@/utils/playSuccessSound";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Deposit() {
  const [amount, setAmount] = useState("");
  const [deposit, { isLoading }] = useDepositMoneyMutation();
  const navigate = useNavigate();

  

  // Auto-focus
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const numericAmount = Number(amount);
  const isDisabled = !numericAmount || numericAmount < 10 || isLoading;

  const handleDeposit = async () => {
    if (!numericAmount || numericAmount < 10) {
      toast.error("Invalid amount", {
        description: "Minimum deposit amount is $10.00",
      });
      return;
    }

    try {
      await deposit({ amount: numericAmount }).unwrap();

      toast.success("Deposit Successful", {
        description: `$${numericAmount.toFixed(2)} added to your wallet`,
      });

      playSuccessSound();
      setAmount("");
      inputRef.current?.focus();

      setTimeout(() => {
        navigate("/user/dashboard");
      }, 600);
    } catch (error: any) {
      toast.error("Deposit Failed", {
        description: error.data?.message || "Something went wrong",
      });
    }
  };
  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Deposit Money</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          ref={inputRef}
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          disabled={isDisabled}
          onClick={handleDeposit}
          className="w-full"
        >
          {" "}
          {isLoading ? <Spinner className="w-4 h-4" /> : "Deposit"}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Minimum deposit amount is $10.00
        </p>
      </CardContent>
    </Card>
  );
}

export default Deposit;
