// src/components/skeletons/AgentDashboardSection.tsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const AgentDashboardSectionSkeleton = () => {
  return (
    <div className="w-full space-y-8 p-6">
      {/* Overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg border bg-white p-4 shadow-sm space-y-3"
          >
            <Skeleton width={120} height={20} />
            <Skeleton width={80} height={28} />
          </div>
        ))}
      </div>

      {/* Chart placeholder */}
      <div className="rounded-lg border bg-white p-6 shadow-sm space-y-4">
        <Skeleton width={160} height={20} />
        <Skeleton height={200} />
      </div>

      {/* Table placeholder */}
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="p-4 border-b">
          <Skeleton width={180} height={20} />
        </div>
        <div className="divide-y">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 p-4">
              <Skeleton height={16} />
              <Skeleton height={16} />
              <Skeleton height={16} />
              <Skeleton height={16} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
