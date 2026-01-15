import { GlobalSkeleton } from "@/components/loading/GlobalSkeleton";
import { useGetAdminSummaryQuery } from "@/redux/features/Admin-api/admin.api";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Summary() {
  const { data, isLoading, isError } = useGetAdminSummaryQuery();

  if (isLoading) return <GlobalSkeleton />;
  if (isError) return <p>Failed to load summary.</p>;

  const summary = data?.data;

  const formatCurrency = (amount: number) =>
    `$${amount?.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const cards = [
    { label: "Total Users", value: summary?.totalUsers },
    { label: "Total Agents", value: summary?.totalAgents },
    { label: "Total Transactions", value: summary?.totalTransactions },
    {
      label: "Transaction Volume",
      value: formatCurrency(summary?.totalVolume || 0),
    },
    { label: "Pending Commissions", value: summary?.pendingCommissions },
  ];

  // Prepare chart data from transaction types
  const chartData = [
    { name: "Cash In", value: summary?.total_cash_in || 0 },
    { name: "Cash Out", value: summary?.total_cash_out || 0 },
    { name: "Deposit", value: summary?.total_deposit || 0 },
    { name: "Transfer", value: summary?.total_transfer || 0 },
    { name: "Withdraw", value: summary?.total_withdraw || 0 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">System Summary</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
            }}
            className="p-4 rounded-lg bg-card text-card-foreground border border-blue-600 shadow cursor-pointer transition-colors"
          >
            <h3 className="font-semibold">{item.label}</h3>
            <p className="text-xl font-bold">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Transaction Type Breakdown Chart */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Transactions by Type</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" stroke="var(--foreground)" />
            <YAxis stroke="var(--foreground)" />
            <Tooltip
              formatter={(value: number) =>
                value.toLocaleString(undefined, { minimumFractionDigits: 0 })
              }
              contentStyle={{
                backgroundColor: "var(--card)",
                color: "var(--card-foreground)",
                borderRadius: "var(--radius-md)",
              }}
            />
            <Bar dataKey="value" fill="var(--primary)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Summary;
