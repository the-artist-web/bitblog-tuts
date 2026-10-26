/**
 * Node modules
 */
import axios from "axios";

export const bitblogApi = axios.create({
    baseURL: "http://localhost:8000/api/v1"
});