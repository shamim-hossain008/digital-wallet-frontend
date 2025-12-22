

import { cn } from "@/lib/utils";

interface Props {
  status?: "ACTIVE" | "INACTIVE";
}

export default function AccountStatusBadge({ status }: Props) {
  return (
    <span
      className={cn(
        "px-2 py-1 rounded text-xs font-semibold tracking-wide",
        status === "ACTIVE"
          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
          : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
      )}
    >
      {status ?? "UNKNOWN"}
    </span>
  );
}
