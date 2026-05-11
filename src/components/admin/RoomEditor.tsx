"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createRoom, updateRoom } from "@/app/admin/actions";
import { Room } from "@/types/room.types";

interface RoomEditorProps {
  room?: Room;
}

export default function RoomEditor({ room }: RoomEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: room?.name || "",
    floor: room?.floor || 0,
  });

  const isEditing = !!room;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing && room.id) {
        await updateRoom(room.id, formData);
      } else {
        await createRoom(formData);
      }
      router.push("/admin/rooms");
      router.refresh();
    } catch (error) {
      alert(`Failed to ${isEditing ? "update" : "create"} room.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg py-sm flex justify-between items-center w-full mb-lg">
        <button 
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-lowest shadow-ambient text-on-surface hover:bg-surface-container transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Admin Editor</span>
          <h1 className="font-button text-button text-on-surface">
            {isEditing ? `Edit Room ${room.name}` : "New Room"}
          </h1>
        </div>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <main className="max-w-3xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-lg pb-xl">
          <section className="bg-surface-container-lowest rounded-xl shadow-ambient p-md flex flex-col gap-md border border-surface-variant/30">
            <h2 className="font-h2 text-h2 text-on-surface">Room Details</h2>
            
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Room Name / Number</label>
              <input
                id="room-name"
                required
                type="text"
                placeholder="e.g. A101"
                className="w-full bg-surface-container text-on-surface font-body-lg text-body-lg rounded-xl px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-outline-variant"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Floor</label>
              <input
                id="room-floor"
                required
                type="number"
                placeholder="0"
                className="w-full bg-surface-container text-on-surface font-body-lg text-body-lg rounded-xl px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-outline-variant"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) || 0 })}
              />
            </div>
          </section>

          <div className="fixed bottom-0 left-0 right-0 p-lg bg-gradient-to-t from-background via-background/90 to-transparent pt-xl z-40 flex justify-end">
            <button
              id="save-room-btn"
              disabled={loading}
              type="submit"
              className="bg-primary text-on-primary font-button text-button rounded-full px-xl py-[16px] shadow-floating flex items-center gap-sm hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
              {loading ? "Saving..." : isEditing ? "Save Changes" : "Create Room"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
