import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

export function Logo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Zap className="h-6 w-6 text-accent" />
      <span className="font-headline text-xl font-bold tracking-tight">
        Zenith Notes
      </span>
    </div>
  );
}
