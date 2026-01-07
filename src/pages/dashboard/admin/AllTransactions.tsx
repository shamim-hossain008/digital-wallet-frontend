import { GlobalSkeleton } from "@/components/loading/GlobalSkeleton";
import TransactionFilters from "@/components/transactions/TransactionFilters";
import TransactionPagination from "@/components/transactions/TransactionPagination";
import TransactionRow from "@/components/transactions/TransactionRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { useGetAllTransactionsQuery } from "@/redux/features/Admin-api/admin.api";
import { exportTransactionsCSV } from "@/utils/exportTransactionsCSV";
import { useState } from "react";

function AllTransactions() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);

  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const [minAmount, setMinAmount] = useState<number | undefined>(undefined);
  const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);

  const { data, isLoading } = useGetAllTransactionsQuery({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    type: type || undefined,
    status: status || undefined,
    minAmount,
    maxAmount,
  });

  if (isLoading) return <GlobalSkeleton />;

  const transactions = data?.data?.transactions ?? [];
  const meta = data?.data;

  console.log("data Transaction:", transactions);
  console.log("meta data:", meta);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">All Transactions</h1>

      {/* Filters */}
      <TransactionFilters
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        status={status}
        setStatus={setStatus}
        minAmount={minAmount}
        setMinAmount={setMinAmount}
        maxAmount={maxAmount}
        setMaxAmount={setMaxAmount}
        onExport={() => exportTransactionsCSV(transactions)}
      />
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {transactions.map((tx) => (
            <TransactionRow key={tx._id} tx={tx} />
          ))}
          {/* Pagination */}
          {meta && (
            <TransactionPagination
              page={meta.page}
              limit={meta.limit}
              total={meta.total}
              onPrev={() => setPage((p) => p - 1)}
              onNext={() => setPage((p) => p + 1)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AllTransactions;
