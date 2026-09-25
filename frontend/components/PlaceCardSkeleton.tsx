export default function PlaceCardSkeleton() {
  return (
    <div className="group bg-white rounded-2xl border border-[#E7E5DE] overflow-hidden flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] w-full bg-[#F4F3EF]" />

      {/* Card Body Skeleton */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category line skeleton */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="h-3 bg-[#E7E5DE] rounded w-32" />
            <div className="h-3 bg-[#E7E5DE] rounded w-16" />
          </div>

          {/* Title skeleton */}
          <div className="h-5 bg-[#E7E5DE] rounded w-3/4 mb-2" />

          {/* Location skeleton */}
          <div className="h-4 bg-[#E7E5DE] rounded w-1/2 mt-1" />
        </div>

        {/* Footer skeleton */}
        <div className="mt-4 pt-3 border-t border-[#F4F3EF] flex items-center justify-between">
          <div className="h-5 bg-[#E7E5DE] rounded w-24" />
          <div className="h-8 bg-[#E7E5DE] rounded w-20" />
        </div>
      </div>
    </div>
  );
}
