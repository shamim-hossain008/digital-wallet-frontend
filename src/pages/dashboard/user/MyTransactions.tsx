/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { safeAmount } from "@/utils/formatters";
import {
  getDirectionLabel,
  getTransactionDirection,
} from "@/utils/transactionHelpers";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";

function MyTransactions() {
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [search, setSearch] = useState("");

  // sorting
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>();

  const { data, isLoading } = useGetMyTransactionsQuery({
    page,
    type: typeFilter || undefined,
    range: dateRange || undefined,
    search: search || undefined,
    sortBy,
    sortOrder,
  });

  const { data: userData } = useUserInfoQuery();
  const userId = userData?.data?._id;

  const transactions = data?.data?.transactions ?? [];
  // const totalPages = data?.data?.totalPages ?? 1;

  // CSV Export
  const exportCSV = () => {
    if (!transactions.length) return;

    const csv = [
      ["Type", "Amount", "Status", "Date"],
      ...transactions.map((tx: any) => [
        tx.type,
        getDirectionLabel(getTransactionDirection(tx, userId as string)),
        safeAmount(tx.amount),
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
            {/* Type */}
            <Select
              defaultValue="all"
              onValueChange={(v) => {
                setPage(1);
                setTypeFilter(v === "all" ? "" : v);
              }}
            >
              <SelectTrigger>Filter by Type</SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="DEPOSIT">Deposit</SelectItem>
                <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                <SelectItem value="TRANSFER">Transfer</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Range */}
            <Select
              defaultValue="all"
              onValueChange={(v) => {
                setPage(1);
                setDateRange(v === "all" ? "" : v);
              }}
            >
              <SelectTrigger>Date Range</SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="7">Last 7 Days</SelectItem>
                <SelectItem value="30">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>

            {/* Sorting */}
            <Select
              defaultValue="all"
              onValueChange={(v) => {
                setPage(1);

                if (v === "all") {
                  setSortBy(undefined);
                  setSortOrder(undefined);
                  return;
                }

                const [field, order] = v.split("-");
                setSortBy(field === "date" ? "timestamp" : field);
                setSortOrder(order as "asc" | "desc");
              }}
            >
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
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
          </div>

          {/* Table */}
          {isLoading ? (
            <Skeleton className="h-40 w-full" />
          ) : transactions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No transactions found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-muted text-muted-foreground">
                  <tr>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Direction</th>
                    <th className="p-3 text-right">Amount</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-right">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((tx: any) => {
                    const direction = getTransactionDirection(
                      tx,
                      userId as string,
                    );
                    const isCredit = direction === "credit";

                    return (
                      <tr
                        key={tx._id}
                        className="border-t hover:bg-muted/50 transition"
                      >
                        {/* Type */}
                        <td className="p-3 capitalize">{tx.type}</td>

                        {/* Direction */}
                        <td className="p-3 flex items-center gap-2">
                          {isCredit ? (
                            <ArrowDownLeft className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                          )}
                          <span
                            className={`text-sm ${
                              isCredit
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-rose-600 dark:text-rose-400"
                            }`}
                          >
                            {getDirectionLabel(direction)}
                          </span>
                        </td>

                        {/* Amount */}
                        <td
                          className={`p-3 text-center font-semibold ${
                            isCredit
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {isCredit ? "+" : "-"}$
                          {safeAmount(tx.amount).toFixed(2)}
                        </td>

                        {/* Status */}
                        <td
                          className={`p-4 text-center font-medium ${
                            tx.status === "COMPLETED"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {tx.status}
                        </td>

                        {/* Date */}
                        <td className="text-center text-xs opacity-70">
                          {new Date(tx.timestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {/* {transactions.length > 0 && (
            <Pagination
              page={page}
              limit={limit}
              onPageChange={setPage}
            />
          )} */}
        </CardContent>
      </Card>
    </div>
  );
}

export default MyTransactions;
