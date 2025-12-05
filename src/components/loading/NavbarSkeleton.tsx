
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const NavbarSkeleton = () => {
  return (
    <div className="flex justify-between p-4 shadow bg-white">
      <Skeleton width={120} height={30} />
      <div className="flex gap-4">
        <Skeleton width={80} height={24} />
        <Skeleton width={80} height={24} />
        <Skeleton width={36} height={36} circle />
      </div>
    </div>
  );
};
