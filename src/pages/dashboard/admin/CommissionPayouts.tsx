/* eslint-disable @typescript-eslint/no-explicit-any */
import CommissionFilters from "@/components/commissions/CommissionFilters";
import CommissionRow from "@/components/commissions/CommissionRow";
import ConfirmCommissionModal from "@/components/commissions/ConfirmCommissionModal";
import Pagination from "@/components/common/Pagination";
import { GlobalSkeleton } from "@/components/loading/GlobalSkeleton";
import {
  useGetAllCommissionsQuery,
  useMarkCommissionPaidMutation,
} from "@/redux/features/Admin-api/admin.api";
import { exportCommissionsCSV } from "@/utils/exportCommissionsCSV";
import { useState } from "react";

function CommissionPayouts() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [paid, setPaid] = useState("");

  // Modal state
  const [selectedCommission, setSelectedCommission] = useState<any>(null);

  const { data, isLoading } = useGetAllCommissionsQuery({
    page,
    limit: 10,
    search: search || undefined,
    paid: paid ? paid === "true" : undefined,
  });

  const [markPaid, { isLoading: paying }] = useMarkCommissionPaidMutation();

  console.log("mark Paid:", markPaid);
  console.log("Commission data:", data);

  if (isLoading) return <GlobalSkeleton />;

  const commissions = data?.data?.payouts ?? [];
  const meta = {
    page: data?.data?.page ?? 1,
    limit: data?.data?.limit ?? 10,
    total: data?.data?.total ?? 0,
  };

  // Confirm handler
  const handleConfirmPayment = async () => {
    if (!selectedCommission) return;

    await markPaid({
      agentId: selectedCommission.agentId,
      amount: selectedCommission.totalCommission,
      fromDate: selectedCommission.fromDate,
      toDate: selectedCommission.toDate,
    }).unwrap();
    setSelectedCommission(null);
  };
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Commission Payouts</h1>

      <CommissionFilters
        search={search}
        setSearch={setSearch}
        paid={paid}
        setPaid={setPaid}
        onExport={() => exportCommissionsCSV(commissions)}
      />

      <div className="bg-card rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="p-3 text-left">Agent</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Total Commission</th>
              <th className="p-3 text-center">Transactions</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {commissions.map((commission) => (
              <CommissionRow
                key={commission.agentId}
                commission={commission}
                onPay={() => setSelectedCommission(commission)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {meta.total > meta.limit && (
        <Pagination
          page={meta.page}
          limit={meta.limit}
          total={meta.total}
          onPrev={() => setPage((p) => Math.max(p - 1, 1))}
          onNext={() => setPage((p) => p + 1)}
        />
      )}

      {/* ✅ Confirmation Modal */}
      <ConfirmCommissionModal
        open={!!selectedCommission}
        agentName={selectedCommission?.name}
        amount={selectedCommission?.totalCommission}
        loading={paying}
        onClose={() => setSelectedCommission(null)}
        onConfirm={handleConfirmPayment}
      />
    </div>
  );
}

export default CommissionPayouts;
