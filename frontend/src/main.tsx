/**
 * Node modules
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

/**
 * Css
 */
import "@/index.css";

/**
 * Router
 */
import router from "@/routes";

/**
 * Components
 */
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="bitblog-tuts-ui-theme">
      <TooltipProvider>
        <RouterProvider router={router} />
        <Toaster richColors />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
)