/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useTransferMoneyMutation } from "@/redux/features/transaction/transaction.api";
import { playSuccessSound } from "@/utils/playSuccessSound";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

function Transfer() {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [transfer, { isLoading }] = useTransferMoneyMutation();


  const isDisabled = !receiver || !amount || Number(amount) < 10 || isLoading 

  const handleTransfer = async ()=>{
     try {
        await transfer({
          receiver:receiver.trim(),
          amount:Number(amount) 
        }).unwrap() 

        toast.success("Transfer successful", {
          description: `$${amount} sent successfully`
        }) 

        playSuccessSound() 
        setAmount("")
        setReceiver("")

     } catch (error:any) {
      toast.error("Transfer failed",{
        description: error?.data?.message || "Unable to transfer"
      })
     }
  }
  return (
    <motion.div 
    initial={{ opacity: 0, y: 10 }} 
    animate={{ opacity: 1, y: 0 }}>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Send Money</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Receiver email or phone"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Button
            disabled={isDisabled}
            onClick={handleTransfer}
            className="w-full"
          >
            {isLoading ? <Spinner className="w-4 h-4" /> : "Send Money"}
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
