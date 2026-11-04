"use client";

/**
 * Node modules
 */
import { Outlet } from "react-router";

/**
 * Components
 */
import {
  SidebarProvider,
  SidebarInset
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import TopAppBar from "@/components/TopAppBar";

export const AdminLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset className="relative min-h-[calc100dvh-16px)] overflow-auto">
                <TopAppBar />

                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}