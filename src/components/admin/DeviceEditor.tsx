"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDevice, updateDevice } from "@/app/admin/actions";
import { Device, DeviceType } from "@/types/device.types";
import { Room } from "@/types/room.types";

interface DeviceEditorProps {
  device?: Device;
  rooms: Room[];
}

export default function DeviceEditor({ device, rooms }: DeviceEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: device?.name || "",
    type: device?.type || DeviceType.OTHER,
    serialNumber: device?.serialNumber || "",
    roomId: device?.roomId || (rooms.length > 0 ? rooms[0].id : ""),
  });

  const isEditing = !!device;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing && device.id) {
        await updateDevice(device.id, formData);
      } else {
        await createDevice(formData);
      }
      router.push("/admin/devices");
      router.refresh();
    } catch (error) {
      alert(`Failed to ${isEditing ? "update" : "create"} device.`);
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
            {isEditing ? `Edit Device ${device.name}` : "New Device"}
          </h1>
        </div>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <main className="max-w-3xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-lg pb-xl">
          <section className="bg-surface-container-lowest rounded-xl shadow-ambient p-md flex flex-col gap-md border border-surface-variant/30">
            <h2 className="font-h2 text-h2 text-on-surface">Device Details</h2>
            
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Device Name</label>
              <input
                id="device-name"
                required
                type="text"
                placeholder="e.g. Dell Monitor 24"
                className="w-full bg-surface-container text-on-surface font-body-lg text-body-lg rounded-xl px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-outline-variant"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Serial Number</label>
              <input
                id="device-serial"
                required
                type="text"
                placeholder="e.g. SN-123456"
                className="w-full bg-surface-container text-on-surface font-body-lg text-body-lg rounded-xl px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-outline-variant"
                value={formData.serialNumber}
                onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Device Type</label>
                <div className="relative">
                  <select
                    id="device-type"
                    className="w-full appearance-none bg-surface-container text-on-surface font-button text-button rounded-lg px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none pr-xl cursor-pointer"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as DeviceType })}
                  >
                    {Object.values(DeviceType).map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-sm text-on-surface-variant">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Location (Room)</label>
                <div className="relative">
                  <select
                    id="device-room"
                    required
                    className="w-full appearance-none bg-surface-container text-on-surface font-button text-button rounded-lg px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none pr-xl cursor-pointer"
                    value={formData.roomId}
                    onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                  >
                    <option value="" disabled>Select a room</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>{room.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-sm text-on-surface-variant">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="fixed bottom-0 left-0 right-0 p-lg bg-gradient-to-t from-background via-background/90 to-transparent pt-xl z-40 flex justify-end">
            <button
              id="save-device-btn"
              disabled={loading}
              type="submit"
              className="bg-primary text-on-primary font-button text-button rounded-full px-xl py-[16px] shadow-floating flex items-center gap-sm hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
              {loading ? "Saving..." : isEditing ? "Save Changes" : "Create Device"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
