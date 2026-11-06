"use client";

/**
 * Node modules
 */
import { 
    flexRender, 
    getCoreRowModel, 
    userReactTable,
} from "@tanstack/react-table";
import {
    Link,
    useFetcher
} from "react-router";
import { motion } from "motion/react";
import { Editor } from "@tiptap/react";
import { formatDistanceToNow } from "date-fns";
import { useMemo } from "react";
import StarterKit from "@tiptap/starter-kit";
import Avatar from "react-avatar";

/**
 * Custom modules
 */
import { cn } from "@/lib/utils";

/**
 * Components
 */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import type { ColumnRef } from "@tanstack/react-table";
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

const BlogTable = () => {
    return (
        <div>BlogTable</div>
    )
}

export default BlogTable