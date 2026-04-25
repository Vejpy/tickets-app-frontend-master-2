"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createRoom } from "../../actions";

export default function AddRoomPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    floor: 0,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await createRoom(formData);
      router.push("/admin/rooms");
      router.refresh();
    } catch (error) {
      alert("Failed to create room.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="mb-lg">
        <div className="flex items-center gap-sm mb-xs">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-surface-container-lowest shadow-[0px_10px_30px_rgba(0,0,0,0.04)] text-on-surface flex items-center justify-center hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Admin Editor</span>
        </div>
        <h1 className="font-h1 text-h1 text-on-surface">New Room</h1>
      </header>

      <section className="max-w-3xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
          
          <div className="bg-surface-container-lowest rounded-xl shadow-[0px_10px_30px_rgba(0,0,0,0.04)] p-md flex flex-col gap-md border border-surface-variant/30">
            <h2 className="font-h2 text-h2 text-on-surface">Room Details</h2>
            
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Room Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Server Room"
                className="w-full bg-surface-container text-on-surface font-body-lg text-body-lg rounded-xl px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-outline-variant"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Floor</label>
              <input
                required
                type="number"
                placeholder="0"
                className="w-full bg-surface-container text-on-surface font-body-lg text-body-lg rounded-xl px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-outline-variant"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-md pt-lg">
            <button
              disabled={loading}
              type="submit"
              className="bg-primary text-on-primary font-button text-button rounded-full px-xl py-[16px] shadow-[0px_15px_35px_rgba(0,0,0,0.08)] flex items-center gap-sm hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
              {loading ? "Saving..." : "Save Room"}
            </button>
          </div>

        </form>
      </section>
    </>
  );
}
