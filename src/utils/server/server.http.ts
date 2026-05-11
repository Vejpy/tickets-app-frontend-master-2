"server-only";

import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios.instance";

export async function httpGet<TResponse>(
  url: string,
  options: AxiosRequestConfig = {},
) {
  const res = await axiosInstance.get<TResponse>(url, options);
  return res.data;
}

export async function httpPost<TRequest, TResponse = unknown>(
  url: string,
  data: TRequest,
  options: AxiosRequestConfig = {},
) {
  const res = await axiosInstance.post<TResponse>(url, data, options);
  return res.data;
}

export async function httpPatch<TRequest, TResponse = unknown>(
  url: string,
  data: TRequest,
  options: AxiosRequestConfig = {},
) {
  const res = await axiosInstance.patch<TResponse>(url, data, options);
  return res.data;
}

export async function httpPut<TRequest, TResponse = unknown>(
  url: string,
  data: TRequest,
  options: AxiosRequestConfig = {},
) {
  const res = await axiosInstance.put<TResponse>(url, data, options);
  return res.data;
}

export async function httpDelete<TResponse = unknown>(
  url: string,
  options: AxiosRequestConfig = {},
) {
  const res = await axiosInstance.delete<TResponse>(url, options);
  return res.data;
}
