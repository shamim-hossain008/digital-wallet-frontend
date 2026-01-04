import { useEffect, useState } from "react";

interface Props {
  onSearch: (value: string) => void;
  onStatusChange: (status: "active" | "blocked" | undefined) => void;
}

function UsersFilters({ onSearch, onStatusChange }: Props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="flex flex-wrap gap-3">
      <input
        className="border px-3 py-2 rounded w-64"
        placeholder="Search user..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <select
        className="border px-3 py-2 rounded"
        onChange={(e) =>
          onStatusChange(
            e.target.value
              ? (e.target.value as "active" | "blocked")
              : undefined
          )
        }
      >
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="blocked">Blocked</option>
      </select>
    </div>
  );
}

export default UsersFilters;
