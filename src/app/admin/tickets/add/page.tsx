"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createTicket } from "../../actions";
import { getPersons, getDevices, getRooms } from "@/utils/services";
import { Person } from "@/types/person.types";
import { Device } from "@/types/device.types";
import { Room } from "@/types/room.types";
import { TicketStatus, TicketPriority } from "@/types/ticket.types";

export default function AddTicketPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: TicketStatus.OPEN,
    priority: TicketPriority.MEDIUM,
    deviceId: "",
    roomId: "",
    assignedPersonId: "",
  });

  useEffect(() => {
    Promise.all([getPersons(), getDevices(), getRooms()])
      .then(([fetchedPersons, fetchedDevices, fetchedRooms]) => {
        setPersons(fetchedPersons || []);
        setDevices(fetchedDevices || []);
        setRooms(fetchedRooms || []);
      })
      .catch((err) => console.error(err));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if ((!formData.deviceId && !formData.roomId) || !formData.assignedPersonId) {
      alert("Please select a device or room, and an assigned person.");
      return;
    }
    setLoading(true);
    try {
      const payload = { ...formData } as any;

      // The API strictly forbids 'roomId'. Append it to description and delete it.
      if (payload.roomId) {
        const selectedRoom = rooms.find(r => r.id === payload.roomId);
        if (selectedRoom) payload.description += `\n\n[Location: ${selectedRoom.name}]`;
      }
      delete payload.roomId;

      // Clean up empty optional fields to prevent UUID parse errors
      if (!payload.deviceId) delete payload.deviceId;
      if (!payload.assignedPersonId) delete payload.assignedPersonId;

      await createTicket(payload);
      router.push("/admin/tickets");
      router.refresh();
    } catch (error) {
      alert("Failed to create ticket.");
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
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Support Editor</span>
        </div>
        <h1 className="font-h1 text-h1 text-on-surface">New Ticket</h1>
      </header>

      <section className="max-w-3xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
          
          <div className="bg-surface-container-lowest rounded-xl shadow-[0px_10px_30px_rgba(0,0,0,0.04)] p-md flex flex-col gap-md border border-surface-variant/30">
            <h2 className="font-h2 text-h2 text-on-surface">Ticket Content</h2>
            
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Issue Title</label>
              <input
                required
                type="text"
                placeholder="e.g. Projector bulb burnt out"
                className="w-full bg-surface-container text-on-surface font-body-lg text-body-lg rounded-xl px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-outline-variant"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Description</label>
              <textarea
                required
                rows={4}
                placeholder="Describe the issue in detail..."
                className="w-full bg-surface-container text-on-surface font-body-lg text-body-lg rounded-xl px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-outline-variant resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="bg-surface-container-lowest rounded-xl shadow-[0px_10px_30px_rgba(0,0,0,0.04)] p-md flex flex-col gap-sm border border-surface-variant/30">
              <label className="font-label-caps text-label-caps text-on-surface-variant">Status</label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-surface-container text-on-surface font-button text-button rounded-lg px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none pr-xl"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as TicketStatus })}
                >
                  {Object.values(TicketStatus).map((s) => (
                    <option key={s} value={s}>{s.replace('_', ' ')}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-sm text-on-surface-variant">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl shadow-[0px_10px_30px_rgba(0,0,0,0.04)] p-md flex flex-col gap-sm border border-surface-variant/30">
              <label className="font-label-caps text-label-caps text-on-surface-variant">Priority</label>
              <div className="flex gap-sm">
                {Object.values(TicketPriority).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: p })}
                    className={`flex-1 font-button text-[12px] rounded-lg py-sm flex items-center justify-center gap-xs active:scale-95 transition-all ${
                      formData.priority === p 
                        ? (p === TicketPriority.HIGH ? 'bg-error-container text-on-error-container' : 'bg-primary-fixed text-on-primary-fixed')
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl shadow-[0px_10px_30px_rgba(0,0,0,0.04)] p-md flex flex-col gap-md border border-surface-variant/30">
            <h2 className="font-h2 text-h2 text-on-surface">Assignment</h2>
            
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Related Device</label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-surface-container text-on-surface font-button text-button rounded-lg px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none pr-xl"
                  value={formData.deviceId}
                  onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
                >
                  <option value="">Select device (Optional)</option>
                  {devices.map((d) => (
                    <option key={d.id} value={d.id}>{d.name} ({d.serialNumber})</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-sm text-on-surface-variant">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Related Room</label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-surface-container text-on-surface font-button text-button rounded-lg px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none pr-xl"
                  value={formData.roomId}
                  onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                >
                  <option value="">Select room (Optional)</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-sm text-on-surface-variant">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Assigned Technician</label>
              <div className="relative">
                <select
                  required
                  className="w-full appearance-none bg-surface-container text-on-surface font-button text-button rounded-lg px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none pr-xl"
                  value={formData.assignedPersonId}
                  onChange={(e) => setFormData({ ...formData, assignedPersonId: e.target.value })}
                >
                  <option value="">Select person...</option>
                  {persons.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.jobPosition})</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-sm text-on-surface-variant">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-lg">
            <button
              disabled={loading}
              type="submit"
              className="bg-primary text-on-primary font-button text-button rounded-full px-xl py-[16px] shadow-[0px_15px_35px_rgba(0,0,0,0.08)] flex items-center gap-sm hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
              {loading ? "Saving..." : "Save Ticket"}
            </button>
          </div>

        </form>
      </section>
    </>
  );
}
