import CommissionHistoryFilters from "@/components/commissions/CommissionHistoryFilters";
import CommissionHistoryRow from "@/components/commissions/CommissionHistoryRow";
import Pagination from "@/components/common/Pagination";
import { GlobalSkeleton } from "@/components/loading/GlobalSkeleton";
import { useGetCommissionHistoryQuery } from "@/redux/features/Admin-api/admin.api";
import { useState } from "react";

function CommissionHistory() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetCommissionHistoryQuery({
    page,
    limit: 10,
  });

  if (isLoading) return <GlobalSkeleton />;

  const records = data?.data?.data ?? [];
  const meta = data?.data;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Commission History</h1>

      <CommissionHistoryFilters
        onExport={() => console.log("Export paid commissions")}
      />

      <div className="bg-card rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Agent</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Paid At</th>
              <th className="p-3 text-left">Paid By</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {records.map((c) => (
              <CommissionHistoryRow key={c._id} commission={c} />
            ))}
          </tbody>
        </table>
      </div>

      {meta && (
        <Pagination
          page={meta.page}
          limit={meta.limit}
          total={meta.total}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => p + 1)}
        />
      )}
    </div>
  );
}

export default CommissionHistory;
