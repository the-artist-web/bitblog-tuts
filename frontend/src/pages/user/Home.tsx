"use client";

/**
 * Components
 */
import Page from "@/components/Page";
import Hero from "@/components/home/Hero";
import RecentBlogs from "@/components/home/RecentBlogs";

export const Home = () => {
    return (
        <Page>
            <Hero />
            <RecentBlogs />
        </Page>
    )
}