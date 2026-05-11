import { getPersonById } from "@/utils/services";
import { notFound } from "next/navigation";
import PersonEditor from "@/components/admin/PersonEditor";

export default async function EditPersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const person = await getPersonById(id).catch(() => null);

  if (!person) {
    notFound();
  }

  return <PersonEditor person={person} />;
}
