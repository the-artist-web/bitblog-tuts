"use client";

/**
 * Node modules
 */
import { useLoaderData, Link } from "react-router";
import { Fragment } from "react";

/**
 * Hooks
 */
import { useUser } from "@/hooks/useUser";

/**
 * Components
 */
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardAction
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/**
 * Assets
 */
import {
    TextIcon,
    MessageSquareIcon,
    UserRoundIcon
} from "lucide-react";

/**
 * Types
 */


export const Dashboard = () => {
    // const LoaderData = useLoaderData();

    return (
        <div className="container p-4 space-y-4">
            <h2 className="text-2xl font-semibold">Dashboard</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            </div>
        </div>
    )
}