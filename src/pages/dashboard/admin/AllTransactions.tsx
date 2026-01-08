import Pagination from "@/components/common/Pagination";
import { GlobalSkeleton } from "@/components/loading/GlobalSkeleton";
import AmountRangeSlider from "@/components/transactions/AmountRangeSlider";
import TransactionDetailsModal from "@/components/transactions/TransactionDetailsModal";
import TransactionFilters from "@/components/transactions/TransactionFilters";
import TransactionRow from "@/components/transactions/TransactionRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { useGetAllTransactionsQuery } from "@/redux/features/Admin-api/admin.api";
import type { ITransaction } from "@/types";
import { exportTransactionsCSV } from "@/utils/exportTransactionsCSV";
import { useState } from "react";

function AllTransactions() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);

  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const [amountRange, setAmountRange] = useState<[number, number]>([0, 5000]);

  const [selectedTx, setSelectedTx] = useState<ITransaction | null>(null);

  const [minAmount, setMinAmount] = useState<number | undefined>(undefined);
  const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);

  const { data, isLoading } = useGetAllTransactionsQuery({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    type: type || undefined,
    status: status || undefined,
    minAmount: amountRange[0],
    maxAmount: amountRange[1],
  });

  if (isLoading) return <GlobalSkeleton />;

  const transactions = data?.data?.transactions ?? [];
  const meta = data?.data;

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

      {/* Amount Slider */}
      <Card>
        <CardContent className="pt-6">
          <AmountRangeSlider
            min={0}
            max={10000}
            value={amountRange}
            onChange={(v) => {
              setAmountRange(v);
              setPage(1);
            }}
          />
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {transactions.map((tx) => (
            <TransactionRow
              key={tx._id}
              tx={tx}
              onClick={() => setSelectedTx(tx)}
            />
          ))}

          {meta && (
            <Pagination
              page={meta.page}
              limit={meta.limit}
              total={meta.total}
              onPrev={() => setPage((p) => p - 1)}
              onNext={() => setPage((p) => p + 1)}
            />
          )}
        </CardContent>
      </Card>

      {/* Details Modal */}
      <TransactionDetailsModal
        transaction={selectedTx}
        open={!!selectedTx}
        onClose={() => setSelectedTx(null)}
      />
    </div>
  );
}

export default AllTransactions;
