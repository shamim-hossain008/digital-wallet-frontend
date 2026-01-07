import { Button } from "../ui/button";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  minAmount?: number;
  setMinAmount: (v?: number) => void;
  maxAmount?: number;
  setMaxAmount: (v?: number) => void;
  onExport: () => void;
}

const TransactionFilters = ({
  search,
  setSearch,
  type,
  setType,
  status,
  setStatus,
  minAmount,
  setMinAmount,
  maxAmount,
  setMaxAmount,
  onExport,
}: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-7 gap-3 items-center">
      {/* Search */}
      <input
        className="border rounded px-3 py-2 dark:bg-background focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Type filter */}
      <select
        className="border rounded px-3 py-2 dark:bg-background focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="DEPOSIT">Deposit</option>
        <option value="WITHDRAW">Withdraw</option>
        <option value="TRANSFER">Transfer</option>
        <option value="CASH_IN">Cash In</option>
        <option value="CASH_OUT">Cash Out</option>
      </select>

      {/* Status filter */}
      <select
        className="border rounded px-3 py-2 dark:bg-background focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="COMPLETED">Completed</option>
        <option value="PENDING">Pending</option>
        <option value="FAILED">Failed</option>
      </select>

      {/* Min amount */}
      <input
        type="number"
        className="border rounded px-3 py-2 dark:bg-background focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Min Amount"
        value={minAmount ?? ""}
        onChange={(e) =>
          setMinAmount(e.target.value ? Number(e.target.value) : undefined)
        }
      />

      {/* Max amount */}
      <input
        type="number"
        className="border rounded px-3 py-2 dark:bg-background focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Max Amount"
        value={maxAmount ?? ""}
        onChange={(e) =>
          setMaxAmount(e.target.value ? Number(e.target.value) : undefined)
        }
      />

      {/* Export button */}
      <Button
        variant="outline"
        className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
        onClick={onExport}
      >
        Export CSV
      </Button>
    </div>
  );
};

export default TransactionFilters;
