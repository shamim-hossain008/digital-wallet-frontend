/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  useLazyLookupUserQuery,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useTransferMoneyMutation } from "@/redux/features/transaction/transaction.api";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { toast } from "sonner";

function formatCurrency(n: number) {
  return `$${n.toFixed(2)}`;
}

function Transfer() {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [transfer, { isLoading }] = useTransferMoneyMutation();

  // lazy lookup hook (call when user clicks send)
  const [triggerLookup, { isFetching: isLookingUp }] = useLazyLookupUserQuery();

  const { data: userInfoRes, isLoading: isUserLoading } = useUserInfoQuery();

  const balance = useMemo(() => {
    const userData = userInfoRes?.data as any;
    if (!userData) return 0;

    if (userData.wallet && typeof userData.wallet.walletBalance !== "undefined")
      return Number(userData.wallet.walletBalance);

    if (typeof userData.walletBalance !== "undefined")
      return Number(userData.walletBalance);

    return 0;
  }, [userInfoRes]);

  // fee
  const fee = 0.05;
  const transferableBalance = Math.max(0, balance - fee);

  const amountValue = Number(amount);
  const amountIsValid = !Number.isNaN(amountValue) && amountValue >= 10;
  const willExceedBalance = amountIsValid ? amountValue + fee > balance : false;

  const isDisabled =
    !receiver ||
    !amount ||
    !amountIsValid ||
    willExceedBalance ||
    isLoading ||
    isLookingUp ||
    isUserLoading;

  const handleTransfer = async () => {
    const identifier = receiver.trim();

    if (!identifier) {
      toast.error("Please enter recipient email, phone, or user id");
    }

    if (!amountIsValid) {
      toast.error("Amount must be a number and at least 10");
      return;
    }
    if (willExceedBalance) {
      toast.error("Insufficient balance (including transfer fee).");
      return;
    }

    try {
      // Resolve identifier
      const lookupResp = await triggerLookup(identifier).unwrap();
      const receiverId = lookupResp?.data?.id;
      if (!receiverId) {
        toast.error("Recipient not found");
        return;
      }

      // call transfer endpoint with receiverId

      await transfer({
        receiverId,
        amount: amountValue,
      }).unwrap();

      toast.success("Transfer successful", {
        description: `$${amountValue} sent successfully`,
      });

      setAmount("");
      setReceiver("");
    } catch (error: any) {
      console.log(error);

      const serverMessage =
        error?.data.message ||
        error?.error ||
        error?.message ||
        "Unable to transfer";

      if (/insufficient/i.test(String(serverMessage))) {
        toast.error("Insufficient balance", {
          description: String(serverMessage),
        });
      } else {
        toast.error("Transfer failed", { description: String(serverMessage) });
      }
    }
  };
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Send Money</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Receiver email or phone or user id"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount (min 10)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="text-sm text-muted-foreground">
            <div>
              <strong>Available balance:</strong>
              {isUserLoading ? "Loading..." : formatCurrency(balance)}
            </div>
            <div>
              <strong>Transfer fee:</strong> {formatCurrency(fee)}
            </div>
            <div>
              <strong>Transferable (balance - fee):</strong>
              {isUserLoading
                ? "Loading..."
                : formatCurrency(transferableBalance)}
            </div>
            {amount && !amountIsValid && (
              <div className="text-rose-600 mt-1">
                Amount must be at least 10.
              </div>
            )}
            {amount && amountIsValid && willExceedBalance && (
              <div className="text-rose-600 mt-1">
                Insufficient balance for this transfer (including fee).
              </div>
            )}
          </div>
          <Button
            disabled={isDisabled}
            onClick={handleTransfer}
            className="w-full"
          >
            {isLoading || isLookingUp || isUserLoading ? (
              <Spinner className="w-4 h-4" />
            ) : (
              "Send Money"
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Transfer fee may apply
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default Transfer;
