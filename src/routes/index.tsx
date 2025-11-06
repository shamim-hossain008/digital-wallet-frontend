import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/public/About";
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
    ],
  },
]);
