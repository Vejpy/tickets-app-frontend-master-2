"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDevices, getRooms } from "@/utils/services";
import { createTicket } from "@/app/admin/actions";
import { Device } from "@/types/device.types";
import { Room } from "@/types/room.types";
import { TicketPriority, TicketStatus } from "@/types/ticket.types";

export default function PublicTicketAddPage() {
  const router = useRouter();
  const [devices, setDevices] = useState<Device[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: TicketPriority.MEDIUM,
    status: TicketStatus.OPEN,
    deviceId: "",
    roomId: "",
    assignedPersonId: "", // Will be unset initially
  });

  useEffect(() => {
    const user = sessionStorage.getItem("user-auth");
    if (!user) {
      router.replace("/login");
      return;
    }
    setLoggedInUser(JSON.parse(user));

    Promise.all([getDevices(), getRooms()])
      .then(([fetchedDevices, fetchedRooms]) => {
        setDevices(fetchedDevices || []);
        setRooms(fetchedRooms || []);
      })
      .catch((err) => console.error(err));
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.deviceId && !formData.roomId) return alert("Please select a device or a room");
    
    setLoading(true);
    try {
      const payload: any = { ...formData, assignedPersonId: loggedInUser?.id || "" };
      
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
      router.push("/tickets");
      router.refresh();
    } catch (error) {
      alert("Failed to report issue.");
    } finally {
      setLoading(false);
    }
  }

  if (!loggedInUser) return null;

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-lg py-lg">
      <header className="mb-md">
        <h1 className="font-h1 text-[32px] text-on-surface">Report an Issue</h1>
        <p className="font-body-lg text-on-surface-variant">Having trouble with equipment? Let us know.</p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-ambient border border-surface-variant/20 flex flex-col gap-lg">
          
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest pl-2">What's wrong?</label>
            <input
              required
              type="text"
              placeholder="e.g. Printer is jammed or Screen is flickering"
              className="w-full bg-slate-50 text-on-surface font-body-lg rounded-2xl px-6 py-4 border-none focus:ring-2 focus:ring-rose-200 outline-none transition-all placeholder:text-slate-300"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest pl-2">Details</label>
            <textarea
              required
              rows={4}
              placeholder="Please describe the problem in more detail..."
              className="w-full bg-slate-50 text-on-surface font-body-lg rounded-2xl px-6 py-4 border-none focus:ring-2 focus:ring-rose-200 outline-none transition-all placeholder:text-slate-300 resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest pl-2">Device</label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-slate-50 text-on-surface font-button rounded-2xl px-6 py-4 border-none focus:ring-2 focus:ring-rose-200 outline-none pr-12"
                  value={formData.deviceId}
                  onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
                >
                  <option value="">Select a device (Optional)</option>
                  {devices.map((d) => (
                    <option key={d.id} value={d.id}>{d.name} ({d.type})</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest pl-2">Room / Area</label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-slate-50 text-on-surface font-button rounded-2xl px-6 py-4 border-none focus:ring-2 focus:ring-rose-200 outline-none pr-12"
                  value={formData.roomId}
                  onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                >
                  <option value="">Select a room (Optional)</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest pl-2">Priority</label>
            <div className="flex gap-2">
              {Object.values(TicketPriority).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: p })}
                  className={`flex-1 py-3 rounded-xl font-bold text-[12px] uppercase tracking-widest transition-all ${
                    formData.priority === p 
                    ? "bg-slate-900 text-white shadow-md scale-[1.02]" 
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 text-white font-button py-5 rounded-2xl shadow-ambient active:scale-95 transition-all mt-4 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Submit Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
}
