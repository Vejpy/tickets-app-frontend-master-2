"use server";

import { Person } from "@/types/person.types";
import { ActionResult } from "../../../../types/person-actions.types";
import { AxiosResponse } from "axios";
import { httpPost } from "../../server.http";
import { ApiError } from "@/types/error.types";
import { updateTag } from "next/cache";

export async function createPerson(
  data: Person,
): Promise<ActionResult<Person>> {
  try {
    const response = await httpPost<Person, AxiosResponse<Person>>(
      "/person",
      data,
    );

    // POST vrací vždy 201 ideálně (viz Swagger)
    if (response.status === 201) {
      updateTag("persons");

      return {
        ok: true,
        message: "Person created successfully",
        data: response.data,
      };
    } else {
      return {
        ok: false,
        message: `Unexpected status code: ${response.status}`,
        statusCode: response.status,
      };
    }
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        ok: false,
        message: err.message,
        statusCode: err.statusCode,
        retry: err.retry,
      };
    }

    console.error("Unexpected error:", err);

    return {
      ok: false,
      statusCode: 500,
      message: "An unexpected error occurred",
    };
  }
}

export async function editPerson(data: Person): Promise<ActionResult<Person>> {
  try {
    const response = await httpPatch<Person, AxiosResponse<Person>>( // TODO: Implement httpPatch
      `/person/${data.id}`,
      data,
    );

    if (response.status === 200) {
      updateTag("persons");
      updateTag(`persons/${data.id}`);

      return {
        ok: true,
        message: "Person updated successfully",
        data: response.data,
      };
    } else {
      return {
        ok: false,
        message: `Unexpected status code: ${response.status}`,
        statusCode: response.status,
      };
    }
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        ok: false,
        message: err.message,
        statusCode: err.statusCode,
        retry: err.retry,
      };
    }

    console.error("Unexpected error:", err);

    return {
      ok: false,
      statusCode: 500,
      message: "An unexpected error occurred",
    };
  }
}
