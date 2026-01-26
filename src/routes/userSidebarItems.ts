import type { ISidebarItem } from "@/types";
import { lazy } from "react";

import UserProfile from "@/pages/dashboard/user/UserProfile";

// Lazy-loaded pages
const UserDashboard = lazy(
  () => import("@/pages/dashboard/user/UserDashboard"),
);
const MyWallet = lazy(() => import("@/pages/dashboard/user/MyWallet"));
const MyTransactions = lazy(
  () => import("@/pages/dashboard/user/MyTransactions"),
);

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Menu",
    items: [
      {
        title: "Dashboard",
        url: "/user/dashboard",
        component: UserDashboard,
      },
      {
        title: "Wallet Info",
        url: "/user/my-wallet",
        component: MyWallet,
      },
      {
        title: "My Transactions",
        url: "/user/transactions",
        component: MyTransactions,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Profile",
        url: "/user/profile",
        component: UserProfile,
      },
    ],
  },
];
