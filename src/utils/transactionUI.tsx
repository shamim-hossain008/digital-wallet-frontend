import type { ITransaction } from "@/types";
import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeftRight,
  ArrowUpLeft,
  ArrowUpRight,
} from "lucide-react";

export const statusColor: Record<ITransaction["status"], string> = {
  COMPLETED: "bg-green-500/10 text-green-500",
  PENDING: "bg-yellow-500/10 text-yellow-500",
  FAILED: "bg-red-500/10 text-red-500",
};

export const typeIcon = (type: ITransaction["type"]) => {
  if (type === "DEPOSIT") {
    return <ArrowDownLeft className="w-5 h-5 text-green-500" />;
  } else if (type === "WITHDRAW") {
    return <ArrowUpRight className="w-5 h-5 text-red-500" />;
  } else if (type === "TRANSFER") {
    return <ArrowLeftRight className="w-5 h-5 text-indigo-500" />;
  } else if (type === "CASH_IN") {
    return <ArrowDownRight className="w-5 h-5 text-blue-500" />;
  } else if (type === "CASH_OUT") {
    return <ArrowUpLeft className="w-5 h-5 text-orange-500" />;
  } else {
    return null;
  }
};
