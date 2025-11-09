import DashboardLayout from "@/components/layout/DashboardLayout";
import { generateRoutes } from "@/utils/generateRoutes";
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
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

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
    // Component: withAuth(DashboardLayout, role.admin as TRole),
    Component: DashboardLayout,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  //  Agent dashboard
  {
    path: "/agent",
    Component: DashboardLayout,
    children: [
      { index: true, element: <Navigate to="/agent/dashboard" /> },
      ...generateRoutes(agentSidebarItems),
    ],
  },
  // user Dashboard
  {
    path: "/user",
    // Component: withAuth(DashboardLayout, role.user as TRole),
    Component: DashboardLayout,
    children: [
      { index: true, element: <Navigate to="/user/dashboard" /> },
      ...generateRoutes(userSidebarItems),
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
