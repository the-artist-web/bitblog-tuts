"use client";

/**
 * Node modules
 */
import { Link } from "react-router";

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
import { Button } from "@/components/ui/button";
import SettingsDialog from "@/components/SettingsDialog";
import Avatar from "react-avatar";

/**
 * Assets
 */
import {
    LayoutDashboardIcon,
    LogOutIcon,
    SettingsIcon
} from "lucide-react";

const UserMenu = () => {
    const user = useUser();
    const logout = useLogout();
    
    if (user)
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                    >
                        <Avatar
                            email={user?.email}
                            size="30"
                            className="rounded-sm"
                        />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    className="min-w-56"
                    align="end"
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
                        {user.role === "admin" && (
                            <DropdownMenuItem asChild>
                                <Link to="/admin/dashboard">
                                    <LayoutDashboardIcon />

                                    Dashboard
                                </Link>
                            </DropdownMenuItem>
                        )}

                        <SettingsDialog>
                            <DropdownMenuItem>
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
        );
}

export default UserMenu