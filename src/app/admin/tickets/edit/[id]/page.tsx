import { getTicketById, getPersons, getRooms, getDevices } from "@/utils/services";
import { notFound } from "next/navigation";
import TicketEditor from "@/components/admin/TicketEditor";

export default async function EditTicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const [ticket, persons, rooms, devices] = await Promise.all([
    getTicketById(id).catch(() => null),
    getPersons().catch(() => []),
    getRooms().catch(() => []),
    getDevices().catch(() => []),
  ]);

  if (!ticket) {
    notFound();
  }

  return (
    <TicketEditor
      ticket={ticket}
      persons={persons}
      rooms={rooms}
      devices={devices}
    />
  );
}
