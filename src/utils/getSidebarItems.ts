import { role } from "../constants/role";
import type { ISidebarItem, TRole } from "../types";

export const getSidebarItems = (userRole: TRole): ISidebarItem[] => {
  switch (userRole) {
    case role.agent:
      return [];

    case role.admin:
      return [];

    case role.user:
      return [];

    default:
      return [];
  }
};
