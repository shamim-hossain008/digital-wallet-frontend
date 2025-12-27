/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export function getTransactionDirection(
  tx: any,
  userId: string
): "credit" | "debit" {
  if (tx.type === "DEPOSIT" || tx.type === "CASH_IN") return "credit";
  if (tx.type === "WITHDRAW" || tx.type === "CASH_OUT") return "debit";

  if (tx.type === "TRANSFER") {
    return tx.receiver === userId ? "credit" : "debit";
  }

  return "debit";
}

export function getDirectionLabel(direction: "credit" | "debit") {
  return direction === "credit" ? "Received" : "Sent";
}

export function getTransactionMeta(type: "CASH_IN" | "CASH_OUT") {
  if (type === "CASH_IN") {
    return {
      label: "Received",
      color: "text-green-600 dark:text-green-400",
      icon: ArrowDownLeft,
    };
  }

  return {
    label: "Sent",
    color: "text-red-600 dark:text-red-400",
    icon: ArrowUpRight,
  };
}

export const formatAmount = (amount: number) =>
  amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
