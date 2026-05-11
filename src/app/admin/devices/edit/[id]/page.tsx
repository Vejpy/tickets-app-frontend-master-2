import { getDeviceById, getRooms } from "@/utils/services";
import { notFound } from "next/navigation";
import DeviceEditor from "@/components/admin/DeviceEditor";

export default async function EditDevicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const [device, rooms] = await Promise.all([
    getDeviceById(id).catch(() => null),
    getRooms().catch(() => []),
  ]);

  if (!device) {
    notFound();
  }

  return <DeviceEditor device={device} rooms={rooms} />;
}
