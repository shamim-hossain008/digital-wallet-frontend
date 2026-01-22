/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useCountUp } from "@/hooks/useCountUp";
import { safeAmount, timeAgo } from "@/utils/formatters";
import {
  getDirectionLabel,
  getTransactionDirection,
} from "@/utils/transactionHelpers";
import { ArrowDownLeft, ArrowUpRight, Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const { data, isLoading, isError } = useUserInfoQuery();
  const navigate = useNavigate();

  const wallet = data?.data;
  const walletBalance = wallet?.walletBalance ?? 0;
  const recentTransactions = wallet?.recentTransactions ?? [];
  const userId = wallet?._id;

  // animated balance
  const animatedBalance = useCountUp(walletBalance);

  // Detect new transaction
  const prevTxCount = useRef<number>(0);
  useEffect(() => {
    prevTxCount.current = recentTransactions.length;
  }, [recentTransactions.length]);

  // chart Data
  const chartData =
    recentTransactions.slice(0, 7).map((tx: any) => {
      const ts = tx.timestamp ?? tx.date ?? tx.createdAt;

      return {
        date: ts ? new Date(ts).toLocaleDateString() : "",
        amount: safeAmount(tx.amount),
      };
    }) ?? [];

  if (isError) {
    return <div className="text-center">Failed to load Dashboard</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>

      {/* Wallet Card */}
      <Card className="bg-primary text-primary-foreground shadow-xl border border-blue-500 rounded-2xl">
        <CardHeader className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Current Wallet Balance</p>
            {isLoading ? (
              <Skeleton className="h-10 w-32 mt-2 bg-white/30 rounded-lg" />
            ) : (
              <p className="text-4xl font-bold">
                $
                {animatedBalance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                navigate("/user/my-wallet", { state: { tab: "deposit" } })
              }
            >
              <ArrowDownLeft className="mr-1 h-4 w-4" /> Deposit
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                navigate("/user/my-wallet", { state: { tab: "withdraw" } })
              }
            >
              <ArrowUpRight className="mr-1 h-4 w-4" /> Withdraw
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                navigate("/user/my-wallet", { state: { tab: "transfer" } })
              }
            >
              <Send className="mr-1 h-4 w-4" /> Transfer
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Chart */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Transaction Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-40 w-full" />
          ) : recentTransactions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No transactions to show
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="var(--primary)"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          ) : recentTransactions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No recent transactions
            </p>
          ) : (
            <ul className="space-y-3">
              {recentTransactions.slice(0, 5).map((tx: any, i: number) => {
                const direction = getTransactionDirection(tx, userId as string);
                const isCredit = direction === "credit";
                const isNew =
                  i === 0 && recentTransactions.length > prevTxCount.current;

                return (
                  <li
                    key={tx._id || i}
                    className={`grid grid-cols-3 items-center pb-2 border-b text-sm transition
                      ${isNew ? "animate-pulse bg-muted/40 rounded-md p-2" : ""}
                    `}
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-2">
                      {isCredit ? (
                        <ArrowDownLeft className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                      )}

                      <div className="flex flex-col">
                        <span className="capitalize font-medium">
                          {tx.type}
                        </span>
                        <span
                          className={`text-xs ${
                            isCredit
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {getDirectionLabel(direction)}
                        </span>
                      </div>
                    </div>

                    {/* CENTER: Amount */}
                    <span
                      className={`w-28 text-right font-semibold justify-self-center ${
                        isCredit
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {isCredit ? "+" : "-"}${safeAmount(tx.amount).toFixed(2)}
                    </span>

                    {/* RIGHT: Time */}
                    <span className="text-right text-xs opacity-70">
                      {timeAgo(tx.timestamp)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default UserDashboard;
