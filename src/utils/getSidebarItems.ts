import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { agentSidebarItems } from "@/routes/agentSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import { role } from "../constants/role";
import type { ISidebarItem, TRole } from "../types";

export const getSidebarItems = (userRole: TRole): ISidebarItem[] => {
  switch (userRole) {
    case role.admin:
      return [...adminSidebarItems];

    case role.agent:
      return [...agentSidebarItems];

    case role.user:
      return [...userSidebarItems];

    default:
      return [];
  }
};
