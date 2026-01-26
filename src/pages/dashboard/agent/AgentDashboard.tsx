import Pagination from "@/components/common/Pagination";
import { GlobalSkeleton } from "@/components/loading/GlobalSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { SummaryCard } from "@/pages/public/card/SummaryCard";
import { useGetAgentDashboardQuery } from "@/redux/features/agent-api/agent.api";
import type { FilterType } from "@/types";
import { exportTransactionsCSV } from "@/utils/exportTransactionsCSV";
import { formatAmount, getTransactionMeta } from "@/utils/transactionHelpers";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  BadgeDollarSign,
  Download,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function AgentDashboard() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useGetAgentDashboardQuery({
    filter,
    page,
    limit: 10,
  });

  // ALWAYS called
  useEffect(() => {
    const onFocus = () => refetch();
    window.addEventListener("focus", onFocus);

    return () => window.removeEventListener("focus", onFocus);
  }, [refetch]);

  const dashboard = data?.data;
  const transactions = dashboard?.recentTransactions?.data ?? [];
  const meta = dashboard?.recentTransactions?.meta;

  const isLowBalance = dashboard?.walletBalance === 0;

  useEffect(() => {
    if (isLowBalance) {
      toast.error("Insufficient balance.", { id: "low-balance" });
    }
  }, [isLowBalance]);

  if (isLoading) return <GlobalSkeleton />;

  if (!dashboard) {
    return <p className="text-center text-muted-foreground">No data Found</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.h1 className="text-xl font-semibold">Agent Dashboard</motion.h1>

      {/* Balance Warning */}
      {isLowBalance && (
        <div className="flex items-center gap-2 rounded-md border border-red-500 bg-red-50 p-3 text-red-600">
          <AlertTriangle size={18} />
          <p className="text-sm">
            Your wallet balance is zero. Please add money to continue
            transactions.
          </p>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
        <SummaryCard
          title="Wallet Balance"
          amount={dashboard.walletBalance}
          loading={isLoading}
          highlight
          icon={<BadgeDollarSign className="text-primary" />}
        />

        <SummaryCard
          title="Total Cash In"
          amount={dashboard.totalCashIns}
          loading={isLoading}
          highlight
          icon={<ArrowDownLeft className="text-green-500" />}
        />

        <SummaryCard
          title="Total Cash Out"
          amount={dashboard.totalCashOuts}
          loading={isLoading}
          highlight
          icon={<ArrowUpRight className="text-red-500" />}
        />

        <SummaryCard
          title="Commission Earned"
          amount={dashboard.commissionEarned}
          loading={isLoading}
          highlight
          icon={<Wallet className="text-indigo-500" />}
        />
      </div>

      {/* Filters + Export */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(["daily", "monthly", "all"] as FilterType[]).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => {
                setFilter(f);
              }}
            >
              {f.toUpperCase()}
            </Button>
          ))}
        </div>

        <Button
          size="sm"
          variant="outline"
          disabled={transactions.length === 0}
          onClick={() => exportTransactionsCSV(transactions)}
        >
          <Download size={16} className="mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {transactions.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No recent transactions
            </p>
          )}

          {transactions.map((tx) => {
            const metaTx = getTransactionMeta(tx.type);
            const Icon = metaTx.icon;

            return (
              <div
                key={tx._id}
                className="flex items-center justify-between rounded-md border px-4 py-4 transition-transform duration-200 hover:-translate-1.5 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <Icon className={metaTx.color} size={18} />
                  <div>
                    <p className="text-xl font-medium">{metaTx.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(tx.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`font-semibold ${metaTx.color}`}>
                    $ {formatAmount(tx.amount)}
                  </p>

                  {tx.commission && (
                    <p className="text-xs text-muted-foreground">
                      Commission: $ {formatAmount(tx.commission)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {/* Pagination */}
          {meta &&  (
            <Pagination
              page={page}
              limit={meta.limit}
              total={meta.total}
              onPrev={() => setPage((p) => p - 1)}
              onNext={() => setPage((p) => p + 1)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AgentDashboard;
