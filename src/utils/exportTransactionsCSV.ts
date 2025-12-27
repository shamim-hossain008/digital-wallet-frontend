import Papa from "papaparse";

type Transaction = {
  type: string;
  amount: number;
  commission?: number;
  timestamp: string;
};

export const exportTransactionsCSV = (transactions: Transaction[]) => {
  const csv = Papa.unparse(
    transactions.map((tx) => ({
      Type: tx.type,
      Amount: tx.amount,
      Commission: tx.commission ?? 0,
      Date: new Date(tx.timestamp).toLocaleString(),
    }))
  );
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "transactions.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
