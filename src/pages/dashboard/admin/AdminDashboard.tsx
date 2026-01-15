/* eslint-disable @typescript-eslint/no-explicit-any */
import { AgentDashboardSectionSkeleton } from "@/components/loading/AgentDashboardSectionSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAdminDashboardQuery } from "@/redux/features/Admin-api/admin.api";
import { motion } from "framer-motion";
import { ArrowLeftRight, DollarSign, UserCog, Users } from "lucide-react";
import CountUp from "react-countup";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import StatCard from "./admin-card/StatCard";

function AdminDashboard() {
  const { data, isLoading } = useGetAdminDashboardQuery();

  if (isLoading) return <AgentDashboardSectionSkeleton />;

  const dashboard = data?.data;

  if (!dashboard) {
    return (
      <p className="text-center text-muted-foreground">
        Dashboard data not available
      </p>
    );
  }

  const transactionTrend = dashboard.transactionTrend ?? [];
  const volumeData = dashboard.volumeData ?? [];
  const statusData = dashboard.statusData ?? [];

  // Colors for status chart
  const statusColors: Record<string, string> = {
    Completed: "#22c55e",
    Pending: "#eab308",
    Failed: "#ef4444",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold"
      >
        Admin Dashboard
      </motion.h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={dashboard.totalUsers}
          icon={<Users className="text-blue-600 dark:text-blue-400" />}
        />
        <StatCard
          title="Total Agents"
          value={dashboard.totalAgents}
          icon={<UserCog className="text-purple-600 dark:text-purple-400" />}
        />
        <StatCard
          title="Transactions"
          value={dashboard.totalTransactions}
          icon={
            <ArrowLeftRight className="text-green-600 dark:text-green-400" />
          }
        />
        <StatCard
          title="Total Volume"
          value={
            <CountUp
              start={0}
              end={dashboard.totalVolume}
              duration={2}
              separator=","
              decimals={2}
              prefix="$"
            />
          }
          icon={<DollarSign className="text-orange-600 dark:text-orange-400" />}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Trend</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <ResponsiveContainer width="100%" aspect={2}>
              <LineChart data={transactionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Volume Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <ResponsiveContainer width="100%" aspect={2}>
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* PIE CHART */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <ResponsiveContainer width="100%" aspect={2}>
            <PieChart>
              <Tooltip />
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {statusData.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={statusColors[entry.name] || "#6366f1"}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
