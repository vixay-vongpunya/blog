import axios from "axios";
import { parseSetCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const server = axios.create({
    baseURL: process.env.SERVER_URL
})
