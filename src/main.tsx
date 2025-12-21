import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import "./index.css";
import { ThemeProvider } from "./providers/theme.providers.tsx";
import { store } from "./redux/store.ts";
import { router } from "./routes/index.tsx";
import "react-phone-number-input/style.css";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster richColors />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
