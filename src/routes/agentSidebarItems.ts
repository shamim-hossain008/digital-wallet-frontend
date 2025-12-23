import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AgentDashboard = lazy(
  () => import("@/pages/dashboard/agent/AgentDashboard")
);
const AddMoney = lazy(() => import("@/pages/dashboard/agent/AddMoney"));
const WithdrawMoney = lazy(
  () => import("@/pages/dashboard/agent/WithdrawMoney")
);
const AgentTransactions = lazy(
  () => import("@/pages/dashboard/agent/AgentTransactions")
);

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent Dashboard",

    items: [
      { title: "Overview", url: "/agent/dashboard", component: AgentDashboard },
      { title: "Add Money", url: "/agent/cash-in", component: AddMoney },
      {
        title: "Withdraw Money",
        url: "/agent/cash-out",
        component: WithdrawMoney,
      },
      {
        title: "MY Transactions",
        url: "/agent/transaction",
        component: AgentTransactions,
      },
    ],
  },
];
