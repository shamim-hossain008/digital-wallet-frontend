import { AgentDashboardSectionSkeleton } from "@/components/loading/AgentDashboardSectionSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAdminDashboardQuery } from "@/redux/features/Admin-api/admin.api";
import { motion } from "framer-motion";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import StartCard from "./admin-card/StartCard";

function AdminDashboard() {
  const { data, isLoading } = useGetAdminDashboardQuery();

  if (isLoading) return <AgentDashboardSectionSkeleton />;

  const stats = data?.data;

  const chartData = [
    { name: "User", value: stats?.totalUsers ?? 0 },
    { name: "Agents", value: stats?.totalAgents ?? 0 },
    { name: "Transactions", value: stats?.totalTransactions ?? 0 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Admin Overview</h1>

      <div className="grid gap-4 md:grid-cols-4">
        <StartCard title="Total Users" value={stats?.totalUsers} />
        <StartCard title="Total Agents" value={stats?.totalAgents} />
        <StartCard title="Transactions" value={stats?.totalTransactions} />
        <StartCard title="Total Volume" value={`$${stats?.totalVolume}`} />
      </div>

      <Card className="h-80">
        <CardContent className="h-full p-4">
          <h2 className="mb-4 font-semibold">System Growth</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default AdminDashboard;
