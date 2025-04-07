import axios from "axios";
import cookies from "js-cookie";


const baseURL = "http://127.0.0.1:8000/";

const api = new axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const accessToken = cookies.get("access");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default api;