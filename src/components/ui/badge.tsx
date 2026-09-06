import { cn } from "@/lib/utils";
export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full bg-[#ff2d2d] px-2.5 py-0.5 text-xs font-semibold text-white", className)} {...props} />;
}
