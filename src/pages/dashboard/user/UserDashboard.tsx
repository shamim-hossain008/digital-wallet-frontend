/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useNavigate } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight, Send } from "lucide-react";

function UserDashboard() {
  const { data, isLoading, isError } = useUserInfoQuery();
  const navigate = useNavigate();

  console.log("use Dashboard data:", data);

  const walletBalance = data?.data?.walletBalance ?? 0;
  const recentTransactions = data?.data?.recentTransactions ?? [];

  const chartData = recentTransactions?.slice(0,7).map((tx:any)=>({
    date: new Date(tx.date).toLocaleDateString(),
    amount:tx.amount
  })) ?? []

  if (isError) {
    return <div className="text-center">Failed to load Dashboard</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>

      {/* Wallet + Quick Actions */}
      <Card className="bg-primary text-white shadow-xl border-0 rounded-2xl">
        <CardHeader className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Current Wallet Balance</p>
            {isLoading ? (
              <Skeleton className="h-10 w-32 mt-2 bg-white/30 rounded-lg" />
            ) : (
              <p className="text-4xl font-bold">${walletBalance.toFixed(2)}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/user/deposit")}
            >
              <ArrowUpRight className="mr-1 h-4 w-4" /> Deposit
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/user/withdraw")}
            >
              <ArrowDownRight className="mr-1 h-4 w-4" /> Withdraw
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/user/transfer")}
            >
              <Send className="mr-1 h-4 w-4" /> Transfer
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Chart Section */}
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
              {recentTransactions.slice(0, 5).map((tx: any, i: number) => (
                <li
                  key={i}
                  className="flex justify-between pb-2 border-b text-sm"
                >
                  <span className="capitalize">{tx.type}</span>
                  <span>${tx.amount?.toFixed(2)}</span>
                  <span className="opacity-70">
                    {new Date(tx.date).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default UserDashboard;
