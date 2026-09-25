"use client";

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-[#0E1223] rounded-2xl border border-[#E7E5DE] dark:border-[#334155] overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[4/3] w-full bg-gradient-to-r from-[#F4F3EF] via-[#FFFFFF] to-[#F4F3EF] dark:from-[#1E293B] dark:via-[#334155] dark:to-[#1E293B] animate-shimmer" />
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="h-3 bg-[#E7E5DE] dark:bg-[#334155] rounded-md w-20 mb-3 animate-shimmer" />
          <div className="h-6 bg-[#E7E5DE] dark:bg-[#334155] rounded-lg w-3/4 mb-3 animate-shimmer" />
          <div className="h-4 bg-[#E7E5DE] dark:bg-[#334155] rounded-md w-1/2 mb-2 animate-shimmer" />
          <div className="h-4 bg-[#E7E5DE] dark:bg-[#334155] rounded-md w-2/3 animate-shimmer" />
        </div>
        <div className="mt-5 pt-4 border-t border-[#F4F3EF] dark:border-[#334155] flex items-center justify-between">
          <div className="h-5 bg-[#E7E5DE] dark:bg-[#334155] rounded-md w-24 animate-shimmer" />
          <div className="h-8 bg-[#E7E5DE] dark:bg-[#334155] rounded-lg w-16 animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonDetail() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="aspect-video bg-gradient-to-r from-[#F4F3EF] via-[#FFFFFF] to-[#F4F3EF] dark:from-[#1E293B] dark:via-[#334155] dark:to-[#1E293B] rounded-2xl animate-shimmer" />
      <div className="space-y-4">
        <div className="h-8 bg-[#E7E5DE] dark:bg-[#334155] rounded-lg w-3/4 animate-shimmer" />
        <div className="h-4 bg-[#E7E5DE] dark:bg-[#334155] rounded-md w-full animate-shimmer" />
        <div className="h-4 bg-[#E7E5DE] dark:bg-[#334155] rounded-md w-5/6 animate-shimmer" />
      </div>
    </div>
  );
}
