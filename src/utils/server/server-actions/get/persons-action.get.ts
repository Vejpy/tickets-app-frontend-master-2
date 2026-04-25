"server-only";

import { Person } from "@/types/person.types";
import { ActionResult } from "../../../../types/person-actions.types";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { AxiosResponse } from "axios";
import { httpGet } from "../../server.http";
import { ApiError } from "@/types/error.types";

export async function getPersons(): Promise<ActionResult<Array<Person>>> {
  "use cache";
  cacheTag("persons");
  cacheLife({ revalidate: 300, expire: 3600 });

  try {
    const response: AxiosResponse<Array<Person>> =
      await httpGet<Array<Person>>("/person");

    if (response.status === 200) {
      return {
        ok: true,
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

export async function getPerson(id: string): Promise<ActionResult<Person>> {
  "use cache";
  cacheTag(`persons/${id}`);
  cacheLife({ revalidate: 300, expire: 3600 });

  try {
    const response: AxiosResponse<Person> =
      await httpGet<Person>(`/person/{id}`);

    if (response.status === 200) {
      return {
        ok: true,
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
