import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function SummaryCard({
  title,
  amount,
  loading,
  icon,
}: {
  title: string;
  amount?: number;
  loading: boolean;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <p className="text-2xl font-bold tabular-mono">
                ${amount?.toFixed(2) ?? "0.00"}
              </p>
            )}
          </div>

          <div className="rounded-full bg-muted p-3">{icon}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
