import axios from "axios";

const BASE_URL = process.env.VUE_APP_API_SERVER;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Access-Control-Allow-Credentials": false,
        'Access-Control-Allow-Origin': 'http://localhost:8080',
    },
    withCredentials: false,
})