import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AdminDashboard = lazy(
  () => import("@/pages/dashboard/admin/AdminDashboard")
);
const Summary = lazy(() => import("@/pages/dashboard/admin/Summary"));

const AllUsers = lazy(() => import("@/pages/dashboard/admin/AllUsers"));
const AgentManagement = lazy(
  () => import("@/pages/dashboard/admin/AgentManagement")
);

const CommissionPayouts = lazy(
  () => import("@/pages/dashboard/admin/CommissionPayouts")
);
const CommissionHistory = lazy(
  () => import("@/pages/dashboard/admin/CommissionHistory")
);

const AllTransactions = lazy(
  () => import("@/pages/dashboard/admin/AllTransactions")
);

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      { title: "Overview", url: "/admin/dashboard", component: AdminDashboard },
      { title: "Summary", url: "/admin/summary", component: Summary },
    ],
  },
  {
    title: "Commissions",
    items: [
      {
        title: "Commission Payouts",
        url: "/admin/commission-payouts",
        component: CommissionPayouts,
      },
      {
        title: "Commission History",
        url: "/admin/commission-history",
        component: CommissionHistory,
      },
    ],
  },
  {
    title: "User Management",
    items: [
      { title: "All Users", url: "/admin/all-users", component: AllUsers },
    ],
  },
  {
    title: "Agent Management",
    items: [
      {
        title: "All Agents",
        url: "/admin/all-agents",
        component: AgentManagement,
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "All Transactions",
        url: "/admin/all-transactions",
        component: AllTransactions,
      },
    ],
  },
];
