
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const GlobalSkeleton = () => {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <Skeleton height={30} width={200} /> {/* Page title */}
      <div className="space-y-3">
        <Skeleton height={18} count={4} />
      </div>
      <Skeleton height={200} />
    </div>
  );
};
