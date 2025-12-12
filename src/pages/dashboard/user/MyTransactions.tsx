/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { useState } from "react";

function MyTransactions() {
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const { data, isLoading } = useGetMyTransactionsQuery({
    page,
    type: typeFilter,
    range: dateRange,
    search,
    sort,
  });

  console.log("MyTransactions:", data);

  const transactions = data?.data?.data ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  // CSV Export
  const exportCSV = () => {
    if (!transactions.length) return;

    const csv = [
      ["Type", "Amount", "Status", "Date"],
      ...transactions.map((tx: any) => [
        tx.type,
        tx.amount,
        tx.status,
        new Date(tx.timestamp).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Transactions</CardTitle>
          <Button variant="outline" onClick={exportCSV}>
            Export CSV
          </Button>
        </CardHeader>

        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            {/* Type Filter */}
            <Select
              defaultValue="all"
              onValueChange={(v) => setTypeFilter(v === "all" ? "" : v)}
            >
              <SelectTrigger>Filter by Type</SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdraw">Withdraw</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Range */}
            <Select
              defaultValue="all"
              onValueChange={(v) => setDateRange(v === "all" ? "" : v)}
            >
              <SelectTrigger>Date Range</SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="7">Last 7 Days</SelectItem>
                <SelectItem value="30">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>

            {/* Sorting */}
            <Select onValueChange={(v) => setSort(v)}>
              <SelectTrigger>Sort</SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Default</SelectItem>
                <SelectItem value="amount-asc">Amount ↑</SelectItem>
                <SelectItem value="amount-desc">Amount ↓</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="date-desc">Newest First</SelectItem>
              </SelectContent>
            </Select>

            {/* Search */}
            <Input
              placeholder="Search by Email or Amount…"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          {isLoading ? (
            <Skeleton className="h-40 w-full" />
          ) : transactions.length === 0 ? (
            <div className="text-center py-10">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" 
                alt="No data"
                className="w-40 mx-auto mb-3"
              />
              <p className="text-gray-500">No transactions found.</p>
            </div>
          ) : (
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Type</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx: any) => (
                  <tr key={tx._id} className="text-center border-t">
                    <td className="py-2 capitalize">{tx.type}</td>
                    <td>${tx.amount.toFixed(2)}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          tx.status === "success"
                            ? "bg-green-500 text-white"
                            : tx.status === "pending"
                            ? "bg-yellow-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td>{new Date(tx.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          {transactions.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(num) => setPage(num)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default MyTransactions;
