import { Person } from "@/types/person.types";

export default function PersonComponent({ person }: { person: Person }) {
  return (
    <div>
      <h2>
        {person.name} ({person.id})
      </h2>
      <p>Email: {person.email}</p>
      <p>Job Position: {person.jobPosition}</p>
    </div>
  );
}
