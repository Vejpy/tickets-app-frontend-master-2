import { getRoomById } from "@/utils/services";
import { notFound } from "next/navigation";
import RoomEditor from "@/components/admin/RoomEditor";

export default async function EditRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const room = await getRoomById(id).catch(() => null);

  if (!room) {
    notFound();
  }

  return <RoomEditor room={room} />;
}
