"server-only";

import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios.instance";

export async function httpGet<TResponse>(
  url: string,
  options: AxiosRequestConfig = {},
) {
  return await axiosInstance.get<TResponse>(url, options);
}

export async function httpPost<TRequest, TResponse = unknown>(
  url: string,
  data: TRequest,
  options: AxiosRequestConfig = {},
) {
  return await axiosInstance.post<TRequest, TResponse>(url, data, options);
}

// TODO: Implementovat další HTTP metody (PUT, DELETE, PATCH)
