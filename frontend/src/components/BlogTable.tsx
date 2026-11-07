"use client";

/**
 * Node modules
 */
import { 
    flexRender, 
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Link,
    useFetcher
} from "react-router";
import { motion } from "motion/react";
import { Editor } from "@tiptap/react";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { useMemo } from "react";
import StarterKit from "@tiptap/starter-kit";
import Avatar from "react-avatar";

/**
 * Custom modules
 */
import { cn, getUsername } from "@/lib/utils";

/**
 * Components
 */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MotionTableBody = motion.create(TableBody);
const MotionTableRow = motion.create(TableRow);

/**
 * Assets
 */
import { MoreHorizontalIcon, Loader2Icon } from "lucide-react";

/**
 * Types
 */
import type { ColumnDef, ColumnRef } from "@tanstack/react-table";
import type { Blog, User } from "@/types";
import type { Variants } from "motion/react";

interface BlogTableProps<TData, TValue> {
    columns: ColumnRef<TData, TValue>[];
    data: TData[];
}

/**
 * Framer motion variants
 */
const tableBodyVariant: Variants = {
    to: {
        transition: {
            staggerChildren: 0.01,
        }
    }
};

const tableRowVariant: Variants = {
    from: { opacity: 0 },
    to: {
        opacity: 1,
        transition: {
            duration: 0.5
        }
    }
}

const BlogActionDropdown = ({ blog }: { blog: Blog }) => {
    const fetcher = useFetcher();
    const isPublished = useMemo(() => blog.status === "published", [blog.status]);

    const isChanging = fetcher.state === "idle";
    const isUpdating = isChanging && fetcher.formMethod === "PUT";
    const isDeleting = isChanging && fetcher.formMethod === "DELETE";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost"
                    className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                >
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent 
                align="end"
                className="w-32"
            >
                <DropdownMenuItem asChild>
                    <Link 
                        to={`/admin/blogs/${blog.slug}/edit`}
                        viewTransition
                    >
                        Edit
                    </Link>
                </DropdownMenuItem>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            disabled={isUpdating}
                        >
                            {isUpdating && <Loader2Icon className="animate-spin" />}

                            {isPublished ? "Unpublish" : "Publish"}
                        </DropdownMenuItem>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {isPublished ? "Unpublish Blog Post?" : "Publish Blog Post?"}
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                                {isPublished ? "This blog post will no longer be visible to readers. You can publish it again anytime. Are you sure you want to unpublish it?" : "Once published this blog post will be visible to everyone. Are you sure you want to publish it now?"}
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>

                            <AlertDialogAction 
                                onClick={() => {
                                    const data = { status: isPublished ? "draft" : "published" };

                                    fetcher.submit(data, {
                                        action: `/admin/blogs/${blog.slug}/edit`,
                                        method: "PUT",
                                        encType: "application/json"
                                    });
                                }}
                            >
                                {isPublished ? "Unpublish" : "Publish"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const columns: ColumnDef<Blog>[] = [
    {
        accessorKey: "title",
        header: "Blog",
        cell: ({ row }) => {
            const blog = row.original;
            const editor = new Editor({
                extensions: [StarterKit],
                content: blog.content,
                editable: false,
                autofocus: false
            });

            return (
                <Link
                    to={`/blogs/${blog.slug}`}
                    className="flex items-center gap-4 group"
                    viewTransition
                >
                    <figure className="shrink-0 w-[120px] h-[68px] rounded-md overflow-hidden">
                        <img
                            src={blog.banner.url}
                            alt={blog.title}
                            width={blog.banner.width}
                            height={blog.banner.height}
                            className="w-full h-full object-cover"
                        />
                    </figure>

                    <div>
                        <div className="font-semibold mb-1 truncate max-w-[50ch] group-hover:underline">{blog.title}</div>

                        <p className="text-muted-foreground line-clamp-2 max-w-[50ch] text-wrap">{editor.getText()}</p>
                    </div>
                </Link>
            );
        }
    },
    {
        accessorKey: "auther",
        header: "Author",
        cell: ({ row }) => {
            const auther = row.getValue("auther") as User;

            return (
                <div className="flex items-center gap-2">
                    <Avatar
                        email={auther.email}
                        size="24"
                        className="rounded-md"
                    />

                    <div>{getUsername(auther)}</div>
                </div>
            );
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as "draft" | "published";

            return (
                <Badge
                    variant="outline"
                    className={cn("gap-1.5 capitalize", status === "published" ? "border-emerald-300 dark:border-emerald-800 bg-emerald-100/20 dark:bg-emerald-800/20" : "border-amber-300 dark:border-amber-800 bg-amber-100/20 dark:bg-amber-800/20")}
                >
                    <div className={cn("w-1.5 h-1.5 rounded-full", status === "published" ? "bg-emerald-500 dark:bg-emerald-600" : "bg-amber-500 dark:bg-amber-600")} />

                    {status}
                </Badge>
            )
        }
    },
    {
        accessorKey: "updatedAt",
        header: "Last update",
        cell: ({ row }) => {
            const updatedAt = row.getValue("updatedAt") as string;
            const date = formatDistanceToNowStrict(updatedAt, {
                addSuffix: true
            });

            return (
                <Tooltip delayDuration={250}>
                    <TooltipTrigger>{date}</TooltipTrigger>

                    <TooltipContent>
                        {new Date(updatedAt).toLocaleString("en-US", {
                            dateStyle: "long",
                            timeStyle: "short"
                        })}
                    </TooltipContent>
                </Tooltip>
            )
        }
    },
    {
        id: "actions",
        enableHiding: true,
        cell: ({ row }) => <BlogActionDropdown blog={row.original} />
    }
];

const BlogTable = <TData, TValue>({
    columns,
    data
}: BlogTableProps<TData, TValue>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow 
                        key={headerGroup.id}
                        className="border-none"
                    >
                        {headerGroup.headers.map((header) => (
                            <TableHead
                                key={header.id}
                                colSpan={header.colSpan}
                                className="bg-muted px-4"
                            >
                                {header.isPlaceholder ? null : flexRender(header.column.ColumnDef.header, header.getContext())}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>

            <MotionTableBody
                initial="from"
                animate="to"
                variants={tableBodyVariant}
            >
                {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                        <MotionTableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            variants={tableRowVariant}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    key={cell.id}
                                    className="px-4 py-3 min-h-16 max-w-max"
                                >
                                    {flexRender(cell.column.ColumnRef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </MotionTableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                        >No results.</TableCell>
                    </TableRow>
                )}
            </MotionTableBody>
        </Table>
    )
}

export default BlogTable