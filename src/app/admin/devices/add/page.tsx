import DeviceEditor from "@/components/admin/DeviceEditor";
import { getRooms } from "@/utils/services";

export default async function AddDevicePage() {
  const rooms = await getRooms().catch(() => []);
  return <DeviceEditor rooms={rooms} />;
}
