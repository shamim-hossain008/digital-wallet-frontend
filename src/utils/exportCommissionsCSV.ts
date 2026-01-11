import type { ICommission } from "@/types";




export function exportCommissionsCSV(data: ICommission[]) {
  const header = ["Agent Name", "Agent Email", "Amount", "Status", "Date"];

  const rows = data.map((c) => [
    c.agentName,
    c.agentEmail,
    c.amount,
    c.isPaid ? "PAID" : "UNPAID",
    new Date(c.createdAt).toLocaleDateString(),
  ]);

  const csv = [header, ...rows].map((r) => r.join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "commissions.csv";
  a.click();
}
