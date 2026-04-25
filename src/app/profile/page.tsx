"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Person } from "@/types/person.types";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<Person | null>(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user-auth");
    if (!savedUser) {
      router.replace("/login");
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("user-auth");
    router.push("/");
    router.refresh();
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-[50vh] gap-lg text-center">
        <div className="bg-slate-100 text-slate-400 p-6 rounded-[2.5rem]">
          <span className="material-symbols-outlined text-[48px]">account_circle</span>
        </div>
        <div>
          <h1 className="font-h1 text-[24px]">Not Signed In</h1>
          <p className="font-body-lg text-on-surface-variant">Please log in to view your profile and report tickets.</p>
        </div>
        <button 
          onClick={() => router.push("/login")}
          className="bg-black text-white px-8 py-4 rounded-2xl font-bold shadow-ambient active:scale-95 transition-all"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-xl py-lg">
      <header className="flex flex-col items-center gap-md">
        <div className="w-24 h-24 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center border-4 border-white shadow-ambient">
          <span className="material-symbols-outlined text-[48px]">person</span>
        </div>
        <div className="text-center">
          <h1 className="font-h1 text-[32px] text-on-surface">{user.name}</h1>
          <p className="font-body-lg text-on-surface-variant uppercase tracking-widest text-[13px] font-bold mt-1">{user.jobPosition}</p>
        </div>
      </header>

      <section className="bg-white rounded-[2.5rem] p-8 shadow-ambient border border-surface-variant/20 flex flex-col gap-lg">
        <h2 className="font-h2 text-h2 text-on-surface">Information</h2>
        
        <div className="flex flex-col gap-md">
          <div className="flex justify-between items-center py-sm border-b border-surface-variant/10">
            <span className="font-label-caps text-on-surface-variant uppercase text-[11px] tracking-widest">Email</span>
            <span className="font-body-lg text-on-surface">{user.email}</span>
          </div>
          <div className="flex justify-between items-center py-sm border-b border-surface-variant/10">
            <span className="font-label-caps text-on-surface-variant uppercase text-[11px] tracking-widest">ID</span>
            <span className="font-body-sm text-on-surface-variant">{user.id?.slice(0, 8)}...</span>
          </div>
          <div className="flex justify-between items-center py-sm">
            <span className="font-label-caps text-on-surface-variant uppercase text-[11px] tracking-widest">Permissions</span>
            <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-bold text-[12px]">Standard User</span>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full bg-error-container text-on-error-container font-button py-4 rounded-2xl active:scale-95 transition-all mt-4"
        >
          Logout
        </button>
      </section>

      <section className="flex flex-col gap-md">
        <h3 className="font-h2 text-[20px] text-on-surface pl-2">Security</h3>
        <div className="bg-white rounded-[2rem] p-6 shadow-ambient border border-surface-variant/20 flex items-center gap-md">
           <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
             <span className="material-symbols-outlined">shield</span>
           </div>
           <div>
             <p className="font-button text-on-surface text-[15px]">Data Protection</p>
             <p className="font-body-sm text-on-surface-variant">Your session is protected by browser storage.</p>
           </div>
        </div>
      </section>
    </div>
  );
}
