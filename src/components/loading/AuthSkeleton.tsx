import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const AuthSkeleton = () => {
  return (
    <div className="w-full max-w-md mx-auto space-y-6 p-8">
      <div className="space-y-2">
        <Skeleton width={220} height={28} />
        <Skeleton width={260} height={18} />
      </div>

      <div className="space-y-5">
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
      </div>

      <Skeleton width={140} height={20} className="mx-auto" />
    </div>
  );
};
