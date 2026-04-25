"use client";

import Link from "next/link";

interface NavItemProps {
  label: string;
  href: string;
  active?: boolean;
}

export default function NavItem({ label, href, active }: NavItemProps) {
  return (
    <Link href={href}>
      <div
        className={`
          px-4 py-2 rounded-xl cursor-pointer
          transition-all duration-300 ease-out
          hover:scale-105 active:scale-95
          ${active ? "bg-blue-100 text-blue-600" : "text-slate-700"}
          hover:bg-slate-100 hover:shadow-sm
        `}
      >
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
}
