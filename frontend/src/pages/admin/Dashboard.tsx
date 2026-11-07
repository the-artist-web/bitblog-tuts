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
// import BlogTable, { columns } from "@/components/BlogTable";

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
import type { DashboardData } from "@/routes/loaders/admin/dashboardLoader";

export const Dashboard = () => {
    const LoaderData = useLoaderData() as DashboardData;
    const loggerInUser = useUser();

    return (
        <div className="container p-4 space-y-4">
            <h2 className="text-2xl font-semibold">Dashboard</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="gap-4 py-4">
                    <CardHeader className="flex items-center gap-2.5 px-4">
                        <div className="bg-muted text-muted-foreground max-w-max p-2 rounded-lg">
                            <TextIcon size={18} />
                        </div>

                        <CardTitle className="font-normal text-lg">Total Articles</CardTitle>
                    </CardHeader>

                    <CardContent className="text-4xl tracking-wider px-4">
                        {LoaderData.blogsCount}
                    </CardContent>
                </Card>
                
                <Card className="gap-4 py-4">
                    <CardHeader className="flex items-center gap-2.5 px-4">
                        <div className="bg-muted text-muted-foreground max-w-max p-2 rounded-lg">
                            <MessageSquareIcon size={18} />
                        </div>

                        <CardTitle className="font-normal text-lg">Total Comments</CardTitle>
                    </CardHeader>

                    <CardContent className="text-4xl tracking-wider px-4">
                        {LoaderData.commentsCount}
                    </CardContent>
                </Card>
                
                <Card className="gap-4 py-4">
                    <CardHeader className="flex items-center gap-2.5 px-4">
                        <div className="bg-muted text-muted-foreground max-w-max p-2 rounded-lg">
                            <UserRoundIcon size={18} />
                        </div>

                        <CardTitle className="font-normal text-lg">Total Users</CardTitle>
                    </CardHeader>

                    <CardContent className="text-4xl tracking-wider px-4">
                        {LoaderData.usersCount}
                    </CardContent>
                </Card>
            </div>
                
            <Card className="gap-4 py-4">
                <CardHeader className="flex items-center gap-2.5 px-4">
                    <div className="bg-muted text-muted-foreground max-w-max p-2 rounded-lg">
                        <TextIcon size={18} />
                    </div>

                    <CardTitle className="font-normal text-lg">Recent Articles</CardTitle>

                    <CardAction className="ms-auto">
                        <Button
                            variant="link"
                            size="sm"
                            asChild
                        >
                            <Link
                                to="/admin/blogs"
                                viewTransition
                            >See all</Link>
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent className="px-4">
                    {/* <BlogTable
                        columns={columns}
                        data={LoaderData.blogs}
                    /> */}
                </CardContent>
            </Card>
        </div>
    )
}