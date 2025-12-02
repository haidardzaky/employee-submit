import type { AxiosRequestConfig } from "axios";
import axios from "axios";

type fetchHandleRequestType = {
  url?: string;
  options?: AxiosRequestConfig;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
};

const timeout = 180000;

export const createAxiosInstance = axios.create({
  timeout,
});

export const fetchHandler = async (params: fetchHandleRequestType) => {
  const { method, url, options = {} } = params;

  const response = await createAxiosInstance({
    baseURL: process.env.NEXT_PUBLIC_API_SERVICE,
    url,
    method,
    ...options,
  });

  return response.data;
};
