/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useRef, useState } from 'react';
import { useWithdrawMoneyMutation } from '@/redux/features/transaction/transaction.api';
import { toast } from 'sonner';
import { playSuccessSound } from '@/utils/playSuccessSound';


function Withdraw() { 
  const [amount,setAmount] = useState("")
  const [withdraw, {isLoading}] = useWithdrawMoneyMutation() 
  const inputRef = useRef<HTMLInputElement>(null) 

  const isDisabled = !amount || Number(amount) <10 || isLoading 

  const handleWithdraw = async ()=>{
  try {
    await withdraw({ amount: Number(amount) }).unwrap();
    toast.success("Withdraw successfully", {
      description: `$${amount} withdraw from your wallet`,
    });
    playSuccessSound();
    setAmount("");
    inputRef.current?.focus();


  } catch (error:any) {
    toast.error("Withdraw failed", {
      description:error?.data?.message || "Something went wrong"
    })
  }
  }
  return (
    <motion.div
     initial={{ opacity: 0, y: 10 }}
     animate={{ opacity: 1, y: 0 }}>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Withdraw Money</CardTitle>
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
            onClick={handleWithdraw}
            className="w-full"
          >
            {isLoading ? <Spinner className="w-4 h-4" /> : "Withdraw"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Minimum withdraw amount is $10
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
  
}

export default Withdraw;
