import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SummaryCard } from "@/pages/public/SummaryCard";
import { useGetAgentDashboardQuery } from "@/redux/features/agent  api/agent.api";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";

function AgentDashboard() {
  const { data, isLoading } = useGetAgentDashboardQuery();

  const dashboard = data?.data;
  return (
    <div className="space-y-6">
      {/*  Summary Cards  */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Total Cash In"
          amount={dashboard?.totalCashIn}
          loading={isLoading}
          icon={<ArrowDownLeft className="text-green-500" />}
        />

        <SummaryCard
          title="Total Cash Out"
          amount={dashboard?.totalCashOut}
          loading={isLoading}
          icon={<ArrowUpRight className="text-red-500" />}
        />

        <SummaryCard
          title="Commission Earned"
          amount={dashboard?.commissionEarned}
          loading={isLoading}
          icon={<Wallet className="text-primary" />}
        />
      </div>

      {/*  Recent Transactions  */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}

            {!isLoading && dashboard?.recentTransactions?.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No recent transactions found.
              </p>
            )}

            {!isLoading &&
              dashboard?.recentTransactions?.map((tx) => {
                const isIn = tx.type === "CASH_IN";

                return (
                  <div
                    key={tx._id}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-full p-2 ${
                          isIn
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                            : "bg-red-100 text-red-600 dark:bg-red-900/30"
                        }`}
                      >
                        {isIn ? (
                          <ArrowDownLeft className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-medium">
                          {isIn ? "Cash In" : "Cash Out"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {dayjs(tx.timestamp).format("MMM D, YYYY")}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`w-24 text-right font-semibold tabular-mono ${
                        isIn ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isIn ? "+" : "-"}${tx.amount.toFixed(2)}
                    </span>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default AgentDashboard;
