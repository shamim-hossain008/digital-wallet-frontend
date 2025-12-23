import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ProfileManagement from "@/pages/dashboard/user/ProfileManagement";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import FAQ from "../pages/public/FAQ";
import Features from "../pages/public/Features";
import Home from "../pages/public/Home";
import { adminSidebarItems } from "./adminSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      { Component: Home, index: true },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: FAQ,
        path: "faq",
      },
    ],
  },
  // DashboardLayout

  // Admin dashboard
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.admin as TRole),

    children: [
      { index: true, element: <Navigate to="/admin/dashboard" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  //  Agent dashboard
  {
    path: "/agent",
    Component: withAuth(DashboardLayout, role.agent as TRole),

    children: [
      { index: true, element: <Navigate to="/agent/dashboard" /> },
      ...generateRoutes(agentSidebarItems),
    ],
  },
  // user Dashboard
  {
    path: "/user",
    Component: withAuth(DashboardLayout, role.user as TRole),

    children: [
      { index: true, element: <Navigate to="/user/dashboard" /> },
      ...generateRoutes(userSidebarItems),

      {
        path: "profile/edit",
        element: <ProfileManagement />,
      },
    ],
  },

  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
]);
