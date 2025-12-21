import ProfileManagement from "@/pages/dashboard/user/ProfileManagement";
import type { ISidebarItem } from "@/types";

import { lazy } from "react";

const UserDashboard = lazy(
  () => import("@/pages/dashboard/user/UserDashboard")
);
const MyWallet = lazy(() => import("@/pages/dashboard/user/MyWallet"));
// const Deposit = lazy(() => import("@/pages/dashboard/user/Deposit"));
// const Withdraw = lazy(() => import("@/pages/dashboard/user/Withdraw"));
// const Transfer = lazy(() => import("@/pages/dashboard/user/Transfer"));
const MyTransactions = lazy(
  () => import("@/pages/dashboard/user/MyTransactions")
);

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "My Wallet",
    items: [
      { title: "Dashboard", url: "/user/dashboard", component: UserDashboard },
      { title: "Wallet Info", url: "/user/my-wallet", component: MyWallet },
      // { title: "Deposit", url: "/user/deposit", component: Deposit },
      // { title: "Withdraw", url: "/user/withdraw", component: Withdraw },
      // { title: "Transfer", url: "/user/transfer", component: Transfer },
      {
        title: "MyTransactions",
        url: "/user/transactions",
        component: MyTransactions,
      },
      {
        title: "Profile",
        url: "/user/profile",
        component: ProfileManagement,
      },
    ],
  },
];
