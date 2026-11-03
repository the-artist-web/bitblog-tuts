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
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";
import Page from "@/components/Page";

/**
 * Types
 */
import type { Variants } from "motion/react";
import type { Blog as BlogType, PaginatedResponse } from "@/types";

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

export const Blogs = ({
    className,
    ...props
}: React.ComponentProps<"section">) => {
    const loaderData = useLoaderData() as PaginatedResponse<BlogType, "blogs">;
    const { blogs } = loaderData;

    return (
        <Page>
            <section
                className={cn("section", className)}
                {...props}
            >
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0 }}
                        whileInView={{
                            opacity: 1,
                            transition: {
                                duration: 0.5,
                                ease: "easeOut"
                            }
                        }}
                    >All blog posts</motion.h2>

                    <motion.ul
                        className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3"
                        initial="from"
                        whileInView="to"
                        viewport={{ once: true }}
                        variants={listVariant}
                    >
                        {blogs.map(({ slug, banner, title, content, author, publishedAt }) => (
                            <motion.li
                                key={slug}
                                variants={itemVariant}
                            >
                                <BlogCard
                                    bannerUrl={banner.url}
                                    bannerWidth={banner.width}
                                    bannerHeight={banner.height}
                                    title={title}
                                    content={content}
                                    slug={slug}
                                    authorName={author.firstName && author.lastName ? `${author.firstName} ${author.lastName}` : `@${author.username}`}
                                    publishedAt={publishedAt}
                                />
                            </motion.li>
                        ))}
                    </motion.ul>

                    <motion.div
                        className="mt-8 flex justify-center md:mt-10"
                        initial={{ opacity: 0 }}
                        whileInView={{
                            opacity: 1,
                            transition: {
                                duration: 0.5,
                                ease: "backInOut"
                            }
                        }}
                    >
                        <Button
                            type="button"
                            size="lg"
                        >See all blogs</Button>
                    </motion.div>
                </div>
            </section>
        </Page>
    )
}