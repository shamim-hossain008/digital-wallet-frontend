/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { motion } from "framer-motion";
import { useLocation } from "react-router-dom"; 
import { useEffect, useState } from "react";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Transfer from "./Transfer";


type WalletTab = "deposit" | "withdraw" | "transfer";

export default function WalletTabs() {
    const location = useLocation() 
    const routeTab = (location.state as any)?.tab as WalletTab | undefined;  

    const [activeTab, setActiveTab] = useState<WalletTab>("deposit") 

    useEffect(()=>{
        if(routeTab){
            setActiveTab(routeTab)
        }
    },[routeTab])

  return (
    <Tabs value={activeTab}  className="w-full" onValueChange={(v)=>setActiveTab(v as WalletTab)}>
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="deposit">Deposit</TabsTrigger>
        <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        <TabsTrigger value="transfer">Transfer</TabsTrigger>
      </TabsList>

      <TabsContent value="deposit">
        <AnimatedSection>
          <Deposit />
        </AnimatedSection>
      </TabsContent>

      <TabsContent value="withdraw">
        <AnimatedSection>
          <Withdraw />
        </AnimatedSection>
      </TabsContent>

      <TabsContent value="transfer">
        <AnimatedSection>
          <Transfer />
        </AnimatedSection>
      </TabsContent>
    </Tabs>
  );
}

function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
