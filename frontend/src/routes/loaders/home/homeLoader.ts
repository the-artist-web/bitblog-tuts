"use client";

/**
 * Node modules
 */
import { data } from "react-router";

/**
 * Custom modules
 */
import { bitblogApi } from "@/api";

/**
 * Types
 */
import type { LoaderFunction } from "react-router";
import type { Blog, PaginatedResponse } from "@/types";
import { AxiosError } from "axios";

export interface HomeLoaderResponse {
    recentBlog: PaginatedResponse<Blog, "blogs">;
    allBlog: PaginatedResponse<Blog, "blogs">;
};

const homeLoader: LoaderFunction = () => {
    try {
        const 
    } catch (err) {
        if (err instanceof AxiosError) {
            throw data(err.response?.data.message || err.message, {
                status: err.response?.status || err.status,
                statusText: err.response?.data.code || err.code
            });
        }

        throw err;
    }
}

export default homeLoader