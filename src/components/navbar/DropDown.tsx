"use client";

import { ReactNode } from "react";

interface DropdownProps {
  children: ReactNode;
}

export default function Dropdown({ children }: DropdownProps) {
  return (
    <div className="absolute top-full right-1/2 translate-x-1/2 mt-6 w-52 bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_10px_30px_rgba(236,72,153,0.08)] border border-slate-100 p-2 flex flex-col gap-1 animate-in fade-in zoom-in-95">
      {children}
    </div>
  );
}
