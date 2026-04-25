"use client";

import { JobPosition, Person } from "@/types/person.types";
import { createPerson } from "@/utils/server/server-actions/updateCreate/persons-action.update";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

export default function PersonForm() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [jobPosition, setJobPosition] = useState<JobPosition>(
    JobPosition.STUDENT,
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        startTransition(async () => {
          const person: Person = {
            name,
            email,
            jobPosition,
          };

          const response = await createPerson(person);

          if (response.ok) {
            alert("Osoba byla úspěšně vytvořena!");

            router.push("/");
          } else {
            alert(
              `Chyba při vytváření osoby: ${response.message} (status: ${response.statusCode})`,
            );
          }
        });
      }}
    >
      <label>
        Jméno:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Pozice:
        <select
          value={jobPosition}
          onChange={(e) => setJobPosition(e.target.value as JobPosition)}
        >
          <option value={JobPosition.STUDENT}>Student</option>
          <option value={JobPosition.TEACHER}>Učitel</option>
          <option value={JobPosition.TECHNICIAN}>Technik</option>
        </select>
      </label>

      <button type="submit">Vytvořit osobu</button>
    </form>
  );
}
