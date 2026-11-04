"use client";

/**
 * Custom hooks
 */
import { useUser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useLogout";

/**
 * Components
 */
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar
} from "@/components/ui/sidebar";
import SettingsDialog from "@/components/SettingsDialog";
import Avatar from "react-avatar";

/**
 * Assets
 */
import {
    ChevronsUpDownIcon,
    LogOutIcon,
    SettingsIcon
} from "lucide-react";

const SidebarUserMenu = () => {
    const { isMobile } = useSidebar();
    const user = useUser();
    const logout = useLogout();
    
    if (user)
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Avatar
                                    email={user?.email}
                                    size="32"
                                    className="rounded-lg"
                                />

                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <div className="truncate font-medium">{user?.username}</div>
                                    <div className="truncate text-xs">{user?.email}</div>
                                </div>

                                <ChevronsUpDownIcon className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            className="w-(--radix-dropdown-medium-trigger-width) min-w-56 rounded-lg"
                            side={isMobile ? "bottom" : "right"}
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar
                                        email={user?.email}
                                        size="32"
                                        className="rounded-sm"
                                    />
                                    
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <div className="truncate font-medium text-foreground">{user.username}</div>
                                        <div className="truncate !text-xs">{user.email}</div>
                                    </div>
                                </div>
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                <SettingsDialog>
                                    <DropdownMenuItem
                                        className="w-full"
                                        onSelect={e => e.preventDefault()}
                                    >
                                        <SettingsIcon />

                                        Settings
                                    </DropdownMenuItem>
                                </SettingsDialog>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem onClick={logout}>
                                <LogOutIcon />

                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        );
}

export default SidebarUserMenu