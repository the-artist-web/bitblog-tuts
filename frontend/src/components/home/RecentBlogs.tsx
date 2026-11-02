"use client";

/**
 * Node modules
 */
import { useLoaderData } from "react-router";
import { motion } from "motion/react";

/**
 * Custom modules
 */
import { cn } from "cn";

/**
 * Components
 */

/**
 * Types
 */
import type { Variants } from "motion/react";

/**
 * Motion variants
 */
const listVariant: Variants = {
    to: {
        transition: {
            staggerChildren: 0.05
        }
    }
};

const itemVariant: Variants = {
    from: { opacity: 0 },
    to: {
        opacity: 1,
        transition: {
            duration: 1,
            ease: "backInOut"
        }
    }
};

const RecentBlogs = ({
    className,
    ...props
}: React.ComponentProps<"section">) => {
    return (
        <section
            className={cn("", className)}
            {...props}
        >RecentBlogs</section>
    )
}

export default RecentBlogs