import Link from "next/link";
import { getDashboardStats } from "@/utils/services";
import DateDisplay from "@/components/ui/DateDisplay";

export default async function HomePage() {
  const stats = await getDashboardStats().catch(() => ({
    personsCount: 0,
    roomsCount: 0,
    devicesCount: 0,
    ticketsCount: 0,
  }));

  return (
    <>
      <div className="mb-lg">
        <DateDisplay />
        <h1 className="font-h1 text-h1 text-on-surface mb-sm inline-block relative">
          Good Morning
          <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-pink-500 rounded-full"></div>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-sm">Here's what's happening across the system today.</p>
      </div>

      {/* Metrics Bento Grid */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {/* Metric Card 1 (Tickets) */}
        <div className="bg-white rounded-[2rem] p-6 flex flex-col justify-between shadow-ambient aspect-[1.1] active:scale-[0.98] transition-transform duration-200 border border-slate-100">
          <div className="flex justify-between items-start w-full">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>confirmation_number</span>
            </div>
            <span className="bg-slate-50 text-slate-500 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">Active</span>
          </div>
          <div className="mt-4">
            <p className="text-[44px] font-extrabold text-slate-900 leading-none">{stats.ticketsCount}</p>
            <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mt-2">Tickets</p>
          </div>
        </div>

        {/* Metric Card 2 (Devices) */}
        <div className="bg-white rounded-[2rem] p-6 flex flex-col justify-between shadow-ambient aspect-[1.1] active:scale-[0.98] transition-transform duration-200 border border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>devices</span>
          </div>
          <div className="mt-4">
            <p className="text-[44px] font-extrabold text-slate-900 leading-none">{stats.devicesCount}</p>
            <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mt-2">Devices</p>
          </div>
        </div>

        {/* Metric Card 3 (Rooms) */}
        <div className="bg-white rounded-[2rem] p-6 flex flex-col justify-between shadow-ambient aspect-[1.1] active:scale-[0.98] transition-transform duration-200 border border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>meeting_room</span>
          </div>
          <div className="mt-4">
            <p className="text-[44px] font-extrabold text-slate-900 leading-none">{stats.roomsCount}</p>
            <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mt-2">Rooms</p>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="flex flex-col gap-md">
        <div className="flex justify-between items-end">
          <h3 className="font-h2 text-h2 text-on-primary-fixed">Quick Access</h3>
        </div>
        <div className="bg-surface-container-lowest rounded-[28px] shadow-[0px_10px_30px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden border border-surface-variant/30">
         
          <Link href="/tickets" className="flex items-center gap-md p-md hover:bg-surface-bright transition-colors cursor-pointer active:bg-surface-container group">
            <div className="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">confirmation_number</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-button text-button text-on-primary-fixed truncate">Browse Tickets</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">View and manage open support issues.</p>
            </div>
            <div className="flex flex-col items-end shrink-0 text-on-surface-variant group-hover:translate-x-1 transition-transform">
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </Link>

          <div className="h-[1px] bg-surface-variant/50 ml-[76px] mr-md"></div>

          <Link href="/devices" className="flex items-center gap-md p-md hover:bg-surface-bright transition-colors cursor-pointer active:bg-surface-container group">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">devices</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-button text-button text-on-primary-fixed truncate">Device Inventory</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">Check out all logged devices and their status.</p>
            </div>
            <div className="flex flex-col items-end shrink-0 text-on-surface-variant group-hover:translate-x-1 transition-transform">
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </Link>

        </div>
      </section>
    </>
  );
}
