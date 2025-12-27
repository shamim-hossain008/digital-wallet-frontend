

import CountUp from "react-countup";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";

export function WalletBalanceCard({ balance }: { balance: number }) {
  const isLow = balance < 10;

  return (
    <Card className={isLow ? "border-red-500" : ""}>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm text-muted-foreground">Wallet Balance</p>
          <p className="text-2xl font-bold text-primary">
            $ <CountUp end={balance} duration={1.5} separator="," />
          </p>

          {isLow && (
            <p className="text-xs text-red-500 mt-1">Low balance warning</p>
          )}
        </div>

        <Wallet className="text-primary" />
      </CardContent>
    </Card>
  );
}
