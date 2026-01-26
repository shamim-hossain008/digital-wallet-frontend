import Pagination from "@/components/common/Pagination";
import { GlobalSkeleton } from "@/components/loading/GlobalSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetAgentTransactionsQuery } from "@/redux/features/agent-api/agent.api";
import type { AgentTransaction, FilterType } from "@/types";
import { exportTransactionsCSV } from "@/utils/exportTransactionsCSV";
import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Download } from "lucide-react";
import { useState } from "react";

function AgentTransactions() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetAgentTransactionsQuery({
    page,
    limit: 10,
    filter,
    search,
  });

  const transactions: AgentTransaction[] = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  if (isLoading) return <GlobalSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>My Transactions</CardTitle>

          <div className="flex flex-wrap gap-2 items-center">
            {/* Filters */}
            <Button
              size="sm"
              variant={filter === "daily" ? "default" : "outline"}
              onClick={() => {
                setFilter("daily");
                setPage(1);
              }}
            >
              Daily
            </Button>

            <Button
              size="sm"
              variant={filter === "monthly" ? "default" : "outline"}
              onClick={() => {
                setFilter("monthly");
                setPage(1);
              }}
            >
              Monthly
            </Button>

            <Button
              size="sm"
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => {
                setFilter("all");
                setPage(1);
              }}
            >
              All
            </Button>

            <Input
              placeholder="Search by email or phone"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-52"
            />

            <Button
              onClick={() => exportTransactionsCSV(transactions)}
              variant="outline"
              disabled={!transactions.length}
            >
              <Download size={16} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {transactions.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              No transactions found
            </p>
          )}

          {transactions.map((tx) => {
            const isIn = tx.type === "CASH_IN";
            const Icon = isIn ? ArrowDownLeft : ArrowUpRight;

            return (
              <motion.div
                key={tx._id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center border rounded-md p-3"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-5 w-5 ${
                      isIn ? "text-green-600" : "text-red-600"
                    }`}
                  />
                  <div>
                    <p className="font-medium">{tx.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(tx.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                <p
                  className={`font-semibold ${
                    isIn ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isIn ? "+" : "-"}${tx.amount}
                </p>
              </motion.div>
            );
          })}

          {/* Pagination */}
          {meta && (
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
    </motion.div>
  );
}

export default AgentTransactions;
