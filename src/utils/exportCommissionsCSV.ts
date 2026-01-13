import type { ICommission } from "@/types";

export function exportCommissionsCSV(data: ICommission[]) {
  const header = [
    "Agent Name",
    "Agent Email",
    "Total Commission",
    "Transactions",
    "Status",
  ];

  const rows = data.map((c) => [
    c.name,
    c.email,
    c.totalCommission,
    c.transactionCount,
    c.isPaid ? "PAID" : "UNPAID",
  ]);

  const csv = [header, ...rows].map((row) => row.join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "commission_payouts.csv";
  link.click();

  URL.revokeObjectURL(url);
}
