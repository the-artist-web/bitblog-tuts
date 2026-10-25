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

        if (!res.ok) throw new Error(`Request field: ${res.status}`);

        return await res.json();
    }

    get = async (endpoint: string) => await this.#request(endpoint);

    post = async (endpoint: string, data?: unknown) => await this.#request(endpoint, {
            method: "POST",
            body: data ? JSON.stringify(data) : undefined
        }); 

    put = async (endpoint: string, data?: unknown) => await this.#request(endpoint, {
            method: "PUT",
            body: data ? JSON.stringify(data) : undefined
        });

    patch = async (endpoint: string, data?: unknown) => await this.#request(endpoint, {
            method: "PATCH",
            body: data ? JSON.stringify(data) : undefined
        });

    delete = async (endpoint: string) => await this.#request(endpoint, { method: "DELETE" });
}

export const api = new Api();