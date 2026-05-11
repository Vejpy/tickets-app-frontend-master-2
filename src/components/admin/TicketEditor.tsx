"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTicket, updateTicket } from "@/app/admin/actions";
import { Ticket, TicketStatus, TicketPriority } from "@/types/ticket.types";
import { Person } from "@/types/person.types";
import { Room } from "@/types/room.types";
import { Device } from "@/types/device.types";

interface TicketEditorProps {
  ticket?: Ticket;
  persons: Person[];
  rooms: Room[];
  devices: Device[];
}

export default function TicketEditor({ ticket, persons, rooms, devices }: TicketEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: ticket?.title || "",
    description: ticket?.description || "",
    status: ticket?.status || TicketStatus.OPEN,
    priority: ticket?.priority || TicketPriority.MEDIUM,
    deviceId: ticket?.deviceId || "",
    roomId: ticket?.roomId || "",
    assignedPersonId: ticket?.assignedPersonId || "",
  });

  const isEditing = !!ticket;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData } as any;

      // Handle the API limitation for roomId as per existing logic
      if (payload.roomId) {
        const selectedRoom = rooms.find(r => r.id === payload.roomId);
        if (selectedRoom) {
          // Only append if it's not already in the description (for updates)
          if (!payload.description.includes(`[Location: ${selectedRoom.name}]`)) {
            payload.description += `\n\n[Location: ${selectedRoom.name}]`;
          }
        }
      }
      delete payload.roomId;

      // Clean up empty optional fields
      if (!payload.deviceId) delete payload.deviceId;
      if (!payload.assignedPersonId) delete payload.assignedPersonId;

      if (isEditing && ticket.id) {
        await updateTicket(ticket.id, payload);
      } else {
        await createTicket(payload);
      }
      router.push("/admin/tickets");
      router.refresh();
    } catch (error) {
      alert(`Failed to ${isEditing ? "update" : "create"} ticket.`);
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
            {isEditing ? `Ticket #${ticket.id.slice(-4)}` : "New Ticket"}
          </h1>
        </div>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <main className="max-w-3xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-lg pb-xl">
          <section className="bg-surface-container-lowest rounded-xl shadow-ambient p-md flex flex-col gap-md border border-surface-variant/30">
            <h2 className="font-h2 text-h2 text-on-surface">Ticket Content</h2>
            
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Issue Title</label>
              <input
                id="ticket-title"
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
                id="ticket-desc"
                required
                rows={4}
                placeholder="Describe the issue in detail..."
                className="w-full bg-surface-container text-on-surface font-body-lg text-body-lg rounded-xl px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-outline-variant resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="bg-surface-container-lowest rounded-xl shadow-ambient p-md flex flex-col gap-sm border border-surface-variant/30">
              <label className="font-label-caps text-label-caps text-on-surface-variant">Status</label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-surface-container text-on-surface font-button text-button rounded-lg px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none pr-xl cursor-pointer"
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

            <div className="bg-surface-container-lowest rounded-xl shadow-ambient p-md flex flex-col gap-sm border border-surface-variant/30">
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
          </section>

          <section className="bg-surface-container-lowest rounded-xl shadow-ambient p-md flex flex-col gap-md border border-surface-variant/30">
            <h2 className="font-h2 text-h2 text-on-surface">Assignment</h2>
            
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Related Device</label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-surface-container text-on-surface font-button text-button rounded-lg px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none pr-xl cursor-pointer"
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
                  className="w-full appearance-none bg-surface-container text-on-surface font-button text-button rounded-lg px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none pr-xl cursor-pointer"
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
                  id="ticket-assignee"
                  required
                  className="w-full appearance-none bg-surface-container text-on-surface font-button text-button rounded-lg px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none pr-xl cursor-pointer"
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
          </section>

          <div className="fixed bottom-0 left-0 right-0 p-lg bg-gradient-to-t from-background via-background/90 to-transparent pt-xl z-40 flex justify-end">
            <button
              id="save-ticket-btn"
              disabled={loading}
              type="submit"
              className="bg-primary text-on-primary font-button text-button rounded-full px-xl py-[16px] shadow-floating flex items-center gap-sm hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
              {loading ? "Saving..." : isEditing ? "Save Changes" : "Create Ticket"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
