import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountUp } from "@/hooks/useCountUp";
import { formatAmount } from "@/utils/transactionHelpers";
import { motion } from "framer-motion";

export function SummaryCard({
  title,
  amount= 0,
  loading,
  icon,
  highlight = false
}: {
  title: string;
  amount?: number;
  loading: boolean;
  icon: React.ReactNode;
  highlight?:boolean,
}) { 
  const animatedValue =useCountUp(amount)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card className={highlight ? "border border-blue-500" : ""} >
        <CardContent className="flex items-center justify-between p-6  ">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <p className="text-2xl font-bold tabular-mono">
                ${formatAmount(animatedValue) ?? "0.00"}
              </p>
            )}
          </div>

          <div className="rounded-full bg-muted p-3">{icon}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
