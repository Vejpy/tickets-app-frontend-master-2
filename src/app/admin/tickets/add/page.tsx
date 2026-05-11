import TicketEditor from "@/components/admin/TicketEditor";
import { getPersons, getDevices, getRooms } from "@/utils/services";

export default async function AddTicketPage() {
  const [persons, devices, rooms] = await Promise.all([
    getPersons().catch(() => []),
    getDevices().catch(() => []),
    getRooms().catch(() => []),
  ]);

  return (
    <TicketEditor 
      persons={persons} 
      devices={devices} 
      rooms={rooms} 
    />
  );
}
