"use client";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("animate-pulse rounded bg-gradient-to-r from-[#1a1a1a] via-[#222] to-[#1a1a1a] bg-[length:200%_100%]", className)} {...props} />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-[#272727] bg-[#141414] overflow-hidden">
      <Skeleton className="h-36 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-3"><Skeleton className="h-4 w-20" /></th>
            <th className="text-left p-3"><Skeleton className="h-4 w-24" /></th>
            <th className="text-left p-3"><Skeleton className="h-4 w-32" /></th>
            <th className="text-right p-3"><Skeleton className="h-4 w-16" /></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
              <td className="p-3"><Skeleton className="h-4 w-20" /></td>
              <td className="p-3"><Skeleton className="h-4 w-24" /></td>
              <td className="p-3"><Skeleton className="h-4 w-32" /></td>
              <td className="text-right p-3"><Skeleton className="h-4 w-16" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BetSlipSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-20 w-full rounded-lg" />
      ))}
      <Skeleton className="h-12 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="p-4 lg:p-6 max-w-[1400px] mx-auto space-y-6">
      <Skeleton className="h-48 w-full rounded-2xl" />
      <Skeleton className="h-10 w-48 rounded" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}