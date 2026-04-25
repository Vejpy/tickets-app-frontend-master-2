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

export async function httpPatch<TRequest, TResponse = unknown>(
  url: string,
  data: TRequest,
  options: AxiosRequestConfig = {},
) {
  return await axiosInstance.patch<TRequest, TResponse>(url, data, options);
}

export async function httpPut<TRequest, TResponse = unknown>(
  url: string,
  data: TRequest,
  options: AxiosRequestConfig = {},
) {
  return await axiosInstance.put<TRequest, TResponse>(url, data, options);
}

export async function httpDelete<TResponse = unknown>(
  url: string,
  options: AxiosRequestConfig = {},
) {
  return await axiosInstance.delete<TResponse>(url, options);
}
