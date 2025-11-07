import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import FAQ from "../pages/public/FAQ";
import Features from "../pages/public/Features";
import Home from "../pages/public/Home";

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
]);
