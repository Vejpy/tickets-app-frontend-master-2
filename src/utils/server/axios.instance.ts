"server-only";

import { ApiError } from "@/types/error.types";
import axios, { AxiosError } from "axios";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

if (!API_KEY || !API_URL) {
  throw Error("Env variables don't exist");
}

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    "content-type": "application/json",
    "x-api-key": API_KEY,
  },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    const response = err.response;

    // Pokud by nebyla žádná odpověď, vrátíme chybu
    if (!response) throw new ApiError({ message: "Network error" });

    const retryAfter = response.headers?.["retry-after"] as string | undefined;

    let retry: number | undefined = undefined;

    if (typeof retryAfter === "string") retry = Number(retryAfter);

    const data = response.data as any;

    throw new ApiError({
      statusCode: response.status,
      message: data.message ?? data.error ?? response.statusText,
      retry,
    });
  },
);
