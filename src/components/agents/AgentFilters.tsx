import type { AdminAgentStatus } from "@/types";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  status: AdminAgentStatus | "";
  setStatus: (v: AdminAgentStatus | "") => void;
}

function AgentFilters({ search, setSearch, status, setStatus }: Props) {
  return (
    <div className="flex gap-3">
      <input
        className="border rounded px-3 py-2 dark:bg-background"
        placeholder="Search agent..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border rounded px-3 py-2 dark:bg-background"
        value={status}
        onChange={(e) => setStatus(e.target.value as AdminAgentStatus)}
      >
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="block">Blocked</option>
      </select>
    </div>
  );
}

export default AgentFilters;
