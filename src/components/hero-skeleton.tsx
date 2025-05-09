// src/components/HeroContentSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function HeroContentSkeleton() {
  return (
    <div className="grid gap-4 w-full p-4">
      {/* Main Text Section */}
      <div className="flex flex-col relative">
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-4 w-64 mb-2" />
        <Skeleton className="h-32 w-full rounded-md" />
      </div>

      {/* Sub Text Section */}
      <div className="flex flex-col gap-2 relative">
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-4 w-64 mb-2" />
        <Skeleton className="h-24 w-full rounded-md" />
      </div>

      {/* Images Section */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-4 w-64 mb-2" />
        <div className="grid grid-cols-1 gap-4 mt-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-start gap-2">
              <Skeleton className="w-[120px] h-[120px] rounded-md" />
              <Skeleton className="w-24 h-10 rounded-md" />
            </div>
          ))}
        </div>
        <Skeleton className="h-10 w-32 mt-2" />
      </div>
    </div>
  );
}
