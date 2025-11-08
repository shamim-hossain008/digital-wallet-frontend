import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router-dom";

// / Simulated auth (replace with real auth logic).  todo
const getUserRole = (): TRole | null => {
  return localStorage.getItem("role") as TRole | null;
};

export const withAuth = (Component: ComponentType, requireRole?: TRole) => {
  return function AuthWrapper() {
    const role = getUserRole();

    if (!role) return <Navigate to="/login" />;

    if (requireRole && role !== requireRole)
      return <Navigate to="/unauthorized" />;

    return <Component />;
  };
};
