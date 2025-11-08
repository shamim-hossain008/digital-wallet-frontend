import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AgentDashboard = lazy(
  () => import("@/pages/dashboard/agent/AgentDashboard")
);
const CashIn = lazy(() => import("@/pages/dashboard/agent/CashIn"));
const CashOut = lazy(() => import("@/pages/dashboard/agent/CashOut"));
const AgentTransactions = lazy(
  () => import("@/pages/dashboard/agent/AgentTransactions")
);

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent Dashboard",

    items: [
      { title: "Overview", url: "/agent/dashboard", component: AgentDashboard },
      { title: "Cash In", url: "/agent/cash-in", component: CashIn },
      { title: "Cash Out", url: "/agent/cash-out", component: CashOut },
      {
        title: "MY Transactions",
        url: "/agent/transaction",
        component: AgentTransactions,
      },
    ],
  },
];
