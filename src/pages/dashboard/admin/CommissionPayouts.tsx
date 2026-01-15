/* eslint-disable @typescript-eslint/no-explicit-any */
import CommissionRow from "@/components/commissions/CommissionRow";
import ConfirmCommissionModal from "@/components/commissions/ConfirmCommissionModal";
import Pagination from "@/components/common/Pagination";
import { GlobalSkeleton } from "@/components/loading/GlobalSkeleton";
import {
  useGetAllCommissionsQuery,
  usePayCommissionMutation,
} from "@/redux/features/Admin-api/admin.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function CommissionPayouts() {
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  // Modal state
  const [selectedCommission, setSelectedCommission] = useState<any>(null);

  const { data, isLoading } = useGetAllCommissionsQuery({
    page,
    limit: 10,
  });

  const [payCommission, { isLoading: paying }] = usePayCommissionMutation();

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

    try {
      await payCommission({
        agentId: selectedCommission.agentId,
        amount: selectedCommission.totalCommission,
        fromDate: selectedCommission.fromDate,
        toDate: selectedCommission.toDate,
      }).unwrap();

      toast.success("Commission Paid", {
        description: "The commission payout was completed successfully.",
      });

      setSelectedCommission(null);

      navigate("/admin/commission-history");
    } catch {
      toast.error("Payment Failed", {
        description: "Unable to process commission payout",
      });
    }
  };
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Commission Payouts</h1>

      <div className="bg-card rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="p-3 text-left">Agent</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Total Commission</th>
              <th className="p-3 text-center">Transactions</th>
              <th className="p-3 text-center">Status</th>
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
