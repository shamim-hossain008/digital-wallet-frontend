import { Button } from "../ui/button";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  paid: string;
  setPaid: (v: string) => void;
  onExport: () => void;
}

function CommissionFilters({
  search,
  setSearch,
  paid,
  setPaid,
  onExport,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <input
        className="border rounded px-3 py-2 dark:bg-background"
        placeholder="Search agent..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border rounded px-3 py-2 dark:bg-background"
        value={paid}
        onChange={(e) => setPaid(e.target.value)}
      >
        <option value="">All</option>
        <option value="true">Paid</option>
        <option value="false">Unpaid</option>
      </select>

      <Button
        onClick={onExport}
        className="border px-4 py-2 rounded text-white"
      >
        Export CSV
      </Button>
    </div>
  );
}

export default CommissionFilters;
