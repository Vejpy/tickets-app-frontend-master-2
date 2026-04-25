"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TicketActions() {
  const [isClient, setIsClient] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const user = sessionStorage.getItem("user-auth");
    if (user) {
      setIsLogged(true);
    }
  }, []);

  if (!isClient) return null; // Avoid hydration mismatch on server

  return (
    <>
      <div className="mb-lg flex justify-between items-end gap-md">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface mb-sm inline-block relative">
            Tickets
            <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-pink-500 rounded-full"></div>
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-sm">Manage and track all support requests.</p>
        </div>
        
        {isLogged && (
          <Link 
            href="/tickets/new" 
            className="bg-black text-white px-6 py-4 rounded-2xl font-bold text-[14px] flex items-center gap-2 shadow-ambient active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Report Problem
          </Link>
        )}
      </div>

      {!isLogged && (
        <div className="bg-rose-50 border border-border-variant/20 rounded-[2rem] p-6 flex items-center justify-between gap-md mb-8">
          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-rose-500 shadow-sm">
              <span className="material-symbols-outlined">campaign</span>
            </div>
            <div>
               <p className="font-button text-rose-900">Need immediate help?</p>
               <p className="font-body-sm text-rose-700/80">Login to your employee account to report and track issues.</p>
            </div>
          </div>
          <Link href="/login" className="bg-rose-500 text-white px-6 py-2.5 rounded-xl font-bold text-[12px] uppercase tracking-widest shadow-sm active:scale-95 transition-transform">
            Sign In
          </Link>
        </div>
      )}
    </>
  );
}
