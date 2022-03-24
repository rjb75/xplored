import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { API_BASE } from "./APIConstants";
import { getCookie } from "./CookieUtils";

// default axios header values
const axiosDefaultHeaders: AxiosRequestHeaders = {
    "Content-type": "application/json",
    "Sec-Fetch-Mode": "no-cors",
    "Access-Control-Allow-Origin":"*"
}

// default axios config values
const axiosDefaultConfig: AxiosRequestConfig = {
    baseURL: API_BASE,
    timeout: 2000,
    headers: axiosDefaultHeaders
}

const axiosInstance = axios.create(axiosDefaultConfig)

// append authorization header if cookie exists
axiosInstance.interceptors.request.use((config : AxiosRequestConfig) => {
    if(!config.headers) {
        config.headers = axiosDefaultHeaders;
    }

    const token = getCookie('access_token');

    if(token !== "") {
        config.headers.Authorization = token;
    }

    return config
})

export default axiosInstance;