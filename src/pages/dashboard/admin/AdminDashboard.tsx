import { AgentDashboardSectionSkeleton } from "@/components/loading/AgentDashboardSectionSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAdminDashboardQuery } from "@/redux/features/Admin-api/admin.api";
import { motion } from "framer-motion";
import { ArrowLeftRight, DollarSign, UserCog, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
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

/* ------------------ MOCK CHART DATA (can be replaced later) ------------------ */

const transactionTrend = [
  { name: "Mon", count: 120 },
  { name: "Tue", count: 180 },
  { name: "Wed", count: 90 },
  { name: "Thu", count: 220 },
  { name: "Fri", count: 160 },
  { name: "Sat", count: 80 },
  { name: "Sun", count: 140 },
];

const volumeData = [
  { name: "Deposit", value: 5000 },
  { name: "Withdraw", value: 3000 },
  { name: "Transfer", value: 2000 },
];

const statusData = [
  { name: "Completed", value: 70 },
  { name: "Pending", value: 20 },
  { name: "Failed", value: 10 },
];

/* --------------------------------------------------------------------------- */

function AdminDashboard() {
  const { data, isLoading } = useGetAdminDashboardQuery();

  if (isLoading) return <AgentDashboardSectionSkeleton />;

  const dashboard = data?.data;

  console.log("Admin dashboard data:", dashboard)

  if (!dashboard) {
    return (
      <p className="text-center text-muted-foreground">
        Dashboard data not available
      </p>
    );
  }

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
          icon={<Users className="text-blue-600" />}
        />
        <StatCard
          title="Total Agents"
          value={dashboard.totalAgents}
          icon={<UserCog className="text-purple-600" />}
        />
        <StatCard
          title="Transactions"
          value={dashboard.totalTransactions}
          icon={<ArrowLeftRight className="text-green-600" />}
        />
        <StatCard
          title="Total Volume"
          value={`$${dashboard.totalVolume}`}
          icon={<DollarSign className="text-orange-600" />}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
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
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
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
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#6366f1"
                label
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
