"server-only";

import { Person } from "@/types/person.types";
import { ActionResult } from "../../../../types/person-actions.types";
import { cacheTag } from "next/cache";
import { cacheLife } from "next/cache";
import { httpGet } from "../../server.http";
import { ApiError } from "@/types/error.types";

export async function getPersons(): Promise<ActionResult<Array<Person>>> {
  "use cache";
  cacheTag("persons", "hours");
  cacheLife("hours");

  try {
    const data = await httpGet<Array<Person>>("/person");

    return {
      ok: true,
      data: data,
    };
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        ok: false,
        message: err.message,
        statusCode: err.statusCode,
      };
    }
    return {
      ok: false,
      message: "An unknown error occurred",
    };
  }
}
