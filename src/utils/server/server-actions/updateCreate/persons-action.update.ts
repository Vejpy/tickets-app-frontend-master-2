"use server";

import { Person } from "@/types/person.types";
import { ActionResult } from "../../../../types/person-actions.types";
import { httpPost, httpPatch } from "../../server.http";
import { ApiError } from "@/types/error.types";
import { revalidateTag } from "next/cache";

export async function createPerson(
  data: Person,
): Promise<ActionResult<Person>> {
  try {
    const responseData = await httpPost<Person, Person>("/person", data);

    revalidateTag("persons", "hours");

    return {
      ok: true,
      message: "Person created successfully",
      data: responseData,
    };
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
    const responseData = await httpPatch<Person, Person>(
      `/person/${data.id}`,
      data,
    );

    revalidateTag("persons", "hours");

    return {
      ok: true,
      message: "Person updated successfully",
      data: responseData,
    };
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
