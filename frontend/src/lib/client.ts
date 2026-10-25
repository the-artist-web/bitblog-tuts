/**
 * Node moduels
 */
import Cookies from "js-cookie";

/**
 * Types
 */
import { FieldError } from "@/types";

class Api {
    async #request(endpoint: string, options: RequestInit = {}) {
        const url = process.env.NEXT_PUBLIC_BACKEND_API || "http://localhost:8000/api/v1";

        const res = await fetch(`${url}${endpoint}`, {
            ...options,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...options.headers
            }
        });

        if (!res.ok) {
            const data = await res.json() as FieldError;
            
            throw Object.assign(new Error(data.message ?? "Something went wrong"), {
                code: data.code,
                errors: data.errors,
                status: res.status
            });
        };

        return await res.json();
    }

    // Methods
    get = async (endpoint: string) => await this.#request(endpoint);

    post = async (endpoint: string, data?: unknown) => await this.#request(endpoint, {
            method: "POST",
            body: data === undefined ? undefined : JSON.stringify(data)
        });

    put = async (endpoint: string, data?: unknown) => await this.#request(endpoint, {
            method: "PUT",
            body: data === undefined ? undefined : JSON.stringify(data)
        });

    patch = async (endpoint: string, data?: unknown) => await this.#request(endpoint, {
            method: "PATCH",
            body: data === undefined ? undefined : JSON.stringify(data)
        });

    delete = async (endpoint: string) => await this.#request(endpoint, { method: "DELETE" });

    // Tokens
    getToken = () => Cookies.get("access_token");

    setToken = (token: string) =>
        Cookies.set("access_token", token, {
            expires: 7,
            secure: true
        });

    removeToken = () => Cookies.remove("access_token");
}

export const api = new Api();