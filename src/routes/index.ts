/**
 * Node modules
 */
import { createBrowserRouter } from "react-router";

/**
 * Loaders
 */

/**
 * Pages
 */
import { Login } from "@/pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";

/**
 * Actions
 */

/**
 * Error boundaries
 */

const router = createBrowserRouter([
    {
        path: "/login",
        Component: Login,
    },
    {
        path: "/signup",
        Component: Signup
    },
    {
        path: "/refresh-token",
    },
    {
        path: "/",
        children: [
            {
                index: true
            },
            {
                path: "blogs"
            },
            {
                path: "blogs/:slug"
            }
        ]
    },
    {
        path: "/admin",
        children: [
            {
                path: "dashboard"
            },
            {
                path: "blogs"
            },
            {
                path: "blogs/create"
            },
            {
                path: "blogs/:slug/edit"
            },
            {
                path: "comments"
            },
            {
                path: "users"
            }
        ]
    },
    {
        path: "/settings",
    }
]);

export default router;