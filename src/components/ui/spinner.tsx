import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

type SpinnerProps = React.ComponentProps<"svg"> & {
  size?: number;
};

export function Spinner({ className, size = 16, ...props }: SpinnerProps) {
  return (
    <Loader2Icon
      role="img"
      aria-hidden="true"
      className={cn("animate-spin", className)}
      width={size}
      height={size}
      {...props}
    />
  );
}
