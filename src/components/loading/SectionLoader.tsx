import { Loader2 } from "lucide-react";

export function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-10">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
    </div>
  );
}
