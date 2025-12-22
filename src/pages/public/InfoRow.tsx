import type { ReactNode } from "react";

interface InfoRowProps {
  label: string;
  value: ReactNode;
}

export default function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
