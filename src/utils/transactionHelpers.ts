/* eslint-disable @typescript-eslint/no-explicit-any */

// src/utils/transactionHelpers.ts

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
