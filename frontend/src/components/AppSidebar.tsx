"use client";

/**
 * Node modules
 */
import {
    Link,
    useLocation
} from "react-router";

/**
 * Components
 */
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader
} from "@/components/ui/sidebar";
import SidebarUserMenu from "@/components/SidebarUserMenu";
import Logo from "@/components/Logo";

/**
 * Assets
 */
import {
    LayoutDashboardIcon,
    TextIcon,
    MessageSquareIcon,
    UserIcon
} from "lucide-react";

/**
 * Constants
 */
const MAIN_MENU = [
    {
        label: "Dashboard",
        url: "/admin/dashboard",
        icon: LayoutDashboardIcon
    },
    {
        label: "Blogs",
        url: "/admin/blogs",
        icon: TextIcon
    },
    {
        label: "Comments",
        url: "/admin/comments",
        icon: MessageSquareIcon
    },
    {
        label: "Users",
        url: "/admin/users",
        icon: UserIcon
    }
];

export function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const location = useLocation();

    console.log(location)

    return (
        <Sidebar 
            variant="inset"
            {...props}
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <Logo />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main Menu</SidebarGroupLabel>

                    <SidebarMenu>
                        {MAIN_MENU.map(({ label, url, icon: Icon }) => (
                            <SidebarMenuItem key={url}>
                                <SidebarMenuButton
                                    isActive={location.pathname === url}
                                    tooltip={label}
                                    asChild
                                >
                                    <Link 
                                        to={url}
                                        viewTransition
                                    >
                                        <Icon />

                                        <span>{label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarUserMenu />
            </SidebarFooter>
        </Sidebar>
    )
}