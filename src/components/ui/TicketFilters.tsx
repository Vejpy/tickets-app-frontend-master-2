"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Person } from "@/types/person.types";
import { Room } from "@/types/room.types";
import { TicketPriority } from "@/types/ticket.types";
import { DeviceType } from "@/types/device.types";

export default function TicketFilters({ 
  persons, 
  rooms 
}: { 
  persons: Person[], 
  rooms: Room[] 
}) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function handleFilterChange(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  function handleClearFilters() {
    const params = new URLSearchParams(searchParams);
    params.delete("priority");
    params.delete("personId");
    params.delete("roomId");
    params.delete("deviceType");
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  const hasFilters = searchParams.get("priority") || searchParams.get("personId") || searchParams.get("roomId") || searchParams.get("deviceType");

  return (
    <div className="bg-surface-container-lowest border border-surface-variant/30 rounded-2xl p-4 mb-6 shadow-sm flex flex-col gap-4 relative">
      {isPending && (
        <div className="absolute top-2 right-4 flex items-center">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <h3 className="font-button text-sm text-on-surface-variant flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">tune</span>
          Filters
        </h3>
        {hasFilters && (
          <button 
            onClick={handleClearFilters}
            className="text-error font-label-caps text-[10px] uppercase tracking-wider hover:bg-error/10 px-3 py-1.5 rounded-full transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Priority Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-caps text-[10px] text-on-surface-variant uppercase pl-2">Priority</label>
          <div className="relative">
            <select
              className="w-full appearance-none bg-surface-container-low text-on-surface font-button text-sm rounded-xl px-4 py-2.5 border-none focus:ring-2 focus:ring-primary/20 outline-none pr-8 cursor-pointer"
              value={searchParams.get("priority") || ""}
              onChange={(e) => handleFilterChange("priority", e.target.value)}
            >
              <option value="">All Priorities</option>
              {Object.values(TicketPriority).map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-on-surface-variant/60">
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </div>
          </div>
        </div>

        {/* Person Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-caps text-[10px] text-on-surface-variant uppercase pl-2">Assignee</label>
          <div className="relative">
            <select
              className="w-full appearance-none bg-surface-container-low text-on-surface font-button text-sm rounded-xl px-4 py-2.5 border-none focus:ring-2 focus:ring-primary/20 outline-none pr-8 cursor-pointer"
              value={searchParams.get("personId") || ""}
              onChange={(e) => handleFilterChange("personId", e.target.value)}
            >
              <option value="">All People</option>
              {persons.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-on-surface-variant/60">
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </div>
          </div>
        </div>

        {/* Room Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-caps text-[10px] text-on-surface-variant uppercase pl-2">Room / Area</label>
          <div className="relative">
            <select
              className="w-full appearance-none bg-surface-container-low text-on-surface font-button text-sm rounded-xl px-4 py-2.5 border-none focus:ring-2 focus:ring-primary/20 outline-none pr-8 cursor-pointer"
              value={searchParams.get("roomId") || ""}
              onChange={(e) => handleFilterChange("roomId", e.target.value)}
            >
              <option value="">All Rooms</option>
              {rooms.map(r => (
                <option key={r.id} value={r.id}>{r.name} (Floor {r.floor})</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-on-surface-variant/60">
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </div>
          </div>
        </div>

        {/* Device Type Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-caps text-[10px] text-on-surface-variant uppercase pl-2">Device Type</label>
          <div className="relative">
            <select
              className="w-full appearance-none bg-surface-container-low text-on-surface font-button text-sm rounded-xl px-4 py-2.5 border-none focus:ring-2 focus:ring-primary/20 outline-none pr-8 cursor-pointer"
              value={searchParams.get("deviceType") || ""}
              onChange={(e) => handleFilterChange("deviceType", e.target.value)}
            >
              <option value="">All Devices</option>
              {Object.values(DeviceType).map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-on-surface-variant/60">
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
