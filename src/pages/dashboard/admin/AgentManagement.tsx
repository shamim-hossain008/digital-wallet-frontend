import AgentFilters from "@/components/agents/AgentFilters";
import AgentRow from "@/components/agents/AgentRow";
import Pagination from "@/components/common/Pagination";
import { GlobalSkeleton } from "@/components/loading/GlobalSkeleton";
import {
  useApproveAgentMutation,
  useGetAllAgentsQuery,
  useSuspendAgentMutation,
} from "@/redux/features/Admin-api/admin.api";
import type { AdminAgentStatus } from "@/types";
import { useState } from "react";

function AgentManagement() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<AdminAgentStatus | "">("");

  const { data, isLoading } = useGetAllAgentsQuery({
    page,
    limit: 10,
    search: search || undefined,
    status: status === "" ? undefined : status,
  });

  console.log("All agent data", data);

  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();

  if (isLoading) return <GlobalSkeleton />;

  const agents = data?.data ?? [];
  const meta = data?.meta;

  console.log("agent data:", agents);
  console.log("meta data:", meta);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Agent Management</h1>

      <AgentFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <div className="bg-card rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {agents.map((agent) => (
              <AgentRow
                key={agent._id}
                agent={agent}
                onApprove={() => approveAgent({ agentId: agent._id })}
                onSuspend={() =>
                  suspendAgent({
                    agentId: agent._id,
                    isBlocked: true,
                  })
                }
              />
            ))}
          </tbody>
        </table>
      </div>

      {meta && (
        <Pagination
          page={meta.page}
          limit={meta.limit}
          total={meta.total}
          onPrev={() => setPage((p) => p - 1)}
          onNext={() => setPage((p) => p + 1)}
        />
      )}
    </div>
  );
}

export default AgentManagement;
