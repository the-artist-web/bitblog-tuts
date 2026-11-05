/**
 * Node modules
 */
import { createBrowserRouter } from "react-router";

/**
 * Loaders
 */
import homeLoader from "@/routes/loaders/user/homeLoader";
import refreshTokenLoader from "@/routes/loaders/refreshToken";
import blogDetailLoader from "@/routes/loaders/user/blogDetailLoader";
import userBlogLoader from "@/routes/loaders/user/userBlogLoader";
import adminLoader from "@/routes/loaders/admin/adminLoader";
import dashboardLoader from "@/routes/loaders/admin/dashboardLoader";

/**
 * Pages
 */
import { Login } from "@/pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";
import { RootLayout } from "@/components/layouts/Root";
import { Home } from "@/pages/user/Home";
import { Blogs } from "@/pages/user/Blogs";
import { BlogDetail } from "@/pages/user/BlogDetail";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Dashboard } from "@/pages/admin/Dashboard";

/**
 * Actions
 */
import signupAction from "@/routes/actions/auth/signup";
import loginAction from "@/routes/actions/auth/login";
import settingsAction from "@/routes/actions/user/settings";

/**
 * Error boundaries
 */
import RootErrorBoundary from "@/pages/error/RootErrorBoundary";

const router = createBrowserRouter([
    {
        path: "/login",
        Component: Login,
        action: loginAction
    },
    {
        path: "/signup",
        Component: Signup,
        action: signupAction
    },
    {
        path: "/refresh-token",
        loader: refreshTokenLoader
    },
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
                loader: homeLoader
            },
            {
                path: "blogs",
                Component: Blogs,
                loader: userBlogLoader
            },
            {
                path: "blogs/:slug",
                Component: BlogDetail,
                loader: blogDetailLoader
            }
        ]
    },
    {
        path: "/admin",
        Component: AdminLayout,
        loader: adminLoader,
        ErrorBoundary: RootErrorBoundary,
        children: [
            {
                path: "dashboard",
                Component: Dashboard,
                loader: dashboardLoader,
                handle: { breadcrumb: "Dashboard" }
            },
            {
                path: "blogs",
                handle: { breadcrumb: "Blogs" }
            },
            {
                path: "blogs/create",
                handle: { breadcrumb: "Create a new blog" }
            },
            {
                path: "blogs/:slug/edit",
                handle: { breadcrumb: "Edit blog" }
            },
            {
                path: "comments",
                handle: { breadcrumb: "Comments" }
            },
            {
                path: "users",
                handle: { breadcrumb: "Users" }
            }
        ]
    },
    {
        path: "/settings",
        action: settingsAction
    }
]);

export default router;