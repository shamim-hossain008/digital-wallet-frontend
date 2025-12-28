import { GlobalSkeleton } from "@/components/loading/GlobalSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetAgentTransactionsQuery } from "@/redux/features/agent  api/agent.api";
import { exportTransactionsCSV } from "@/utils/exportTransactionsCSV";
import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Download } from "lucide-react";
import { useState } from "react";

function AgentTransactions() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<"daily" | "monthly">("daily");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetAgentTransactionsQuery({
    page,
    limit: 10,
    filter,
    search,
  });

  
  const transactions = data?.data?.data ?? [];
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

          <div className="flex gap-2 items-center">
            {/*  */}
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
            >
              <Download size={16} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {transactions.length === 0 && (
            <p className="text-sm text-muted-foreground">
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
                <div className="flex items-center gap-2">
                  <Icon className={isIn ? "text-green-600" : "text-red-600"} />
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
          <div className="flex justify-between pt-4">
            <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              Page {meta?.page} of {meta?.totalPages}
            </span>

            <Button
              disabled={page === meta?.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default AgentTransactions;
