import { Spinner } from "@/components/ui/spinner";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router-dom";

// / Simulated auth (replace with real auth logic).  todo
// const getUserRole = (): TRole | null => {
//   return localStorage.getItem("role") as TRole | null;
// };

export const withAuth = (Component: ComponentType, requireRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);


    if (isLoading) return <Spinner className="m-auto" />;

    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/login" />;
    }

    if (requireRole && !isLoading && requireRole !== data?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
