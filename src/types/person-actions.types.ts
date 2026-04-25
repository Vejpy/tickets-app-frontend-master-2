"use server";

export type ActionResult<TData = unknown> = {
  ok: boolean;
  data?: TData;
  message?: string;
  statusCode?: number;
  retry?: number;
};
