"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createDevice } from "../../actions";
import { getRooms } from "@/utils/services";
import { Room } from "@/types/room.types";
import { DeviceType } from "@/types/device.types";

export default function AddDevicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    type: DeviceType.PC,
    serialNumber: "",
    roomId: "",
  });

  useEffect(() => {
    getRooms().then(setRooms).catch(() => []);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.roomId) {
      alert("Please select a room.");
      return;
    }
    setLoading(true);
    try {
      await createDevice(formData);
      router.push("/admin/devices");
      router.refresh();
    } catch (error) {
      alert("Failed to create device.");
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
        <h1 className="font-h1 text-h1 text-on-surface">New Device</h1>
      </header>

      <section className="max-w-3xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
          
          <div className="bg-surface-container-lowest rounded-xl shadow-[0px_10px_30px_rgba(0,0,0,0.04)] p-md flex flex-col gap-md border border-surface-variant/30">
            <h2 className="font-h2 text-h2 text-on-surface">Device Specifications</h2>
            
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Device Name</label>
              <input
                required
                type="text"
                placeholder="e.g. MacBook Pro 14"
                className="w-full bg-surface-container text-on-surface font-body-lg text-body-lg rounded-xl px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-outline-variant"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Type</label>
                <div className="relative">
                  <select
                    required
                    className="w-full appearance-none bg-surface-container text-on-surface font-button text-button rounded-xl px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none pr-xl"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as DeviceType })}
                  >
                    {Object.values(DeviceType).map((dt) => (
                      <option key={dt} value={dt}>{dt}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-sm text-on-surface-variant">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Serial Number</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. SN-98234"
                  className="w-full bg-surface-container text-on-surface font-body-lg text-body-lg rounded-xl px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-outline-variant"
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Location (Room)</label>
              <div className="relative">
                <select
                  required
                  className="w-full appearance-none bg-surface-container text-on-surface font-button text-button rounded-lg px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none pr-xl"
                  value={formData.roomId}
                  onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                >
                  <option value="">Select a room...</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>{room.name} (Floor {room.floor})</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-sm text-on-surface-variant">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-end gap-md pt-lg">
            <button
              disabled={loading}
              type="submit"
              className="bg-primary text-on-primary font-button text-button rounded-full px-xl py-[16px] shadow-[0px_15px_35_rgba(0,0,0,0.08)] flex items-center gap-sm hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
              {loading ? "Saving..." : "Save Device"}
            </button>
          </div>

        </form>
      </section>
    </>
  );
}
