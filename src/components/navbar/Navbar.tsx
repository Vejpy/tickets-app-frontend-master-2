"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: "dashboard" },
    { name: "Persons", href: "/persons", icon: "group" },
    { name: "Rooms", href: "/rooms", icon: "meeting_room" },
    { name: "Inventory", href: "/devices", icon: "inventory_2" },
    { name: "Tickets", href: "/tickets", icon: "confirmation_number" },
    { name: "Admin", href: "/admin", icon: "admin_panel_settings" },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-fit z-50 flex justify-center items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg rounded-full px-4 py-2 border border-surface-variant/20 gap-2 shadow-[0px_15px_35px_rgba(0,0,0,0.1)]">
      {navItems.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 rounded-full px-3 py-2 transition-all duration-300 cubic-bezier(0.34,1.56,0.64,1) ${
              isActive
                ? "bg-[#F2F2F7] dark:bg-slate-800 text-[#001221] dark:text-white shadow-sm"
                : "text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
            } active:scale-[0.9] group`}
          >
            <span 
              className={`material-symbols-outlined text-[24px] ${!isActive && 'group-hover:scale-110 transition-transform'}`} 
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            {isActive && (
              <span className="text-[10px] font-bold font-['Plus_Jakarta_Sans'] uppercase tracking-widest whitespace-nowrap">
                {item.name}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
