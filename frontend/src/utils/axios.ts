import axios from "axios";

export const server = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true
})
