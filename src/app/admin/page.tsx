"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("admin-auth") === "true") {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") {
      sessionStorage.setItem("admin-auth", "true");
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      alert("Wrong password! Hint: admin");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[60vh] py-xl">
      <div className="w-full max-w-[400px] flex flex-col gap-xl">
        <header className="text-center flex flex-col items-center gap-md">
          <div className="bg-primary-container text-on-primary-container p-5 rounded-[2.5rem] shadow-ambient">
            <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
          </div>
          <div className="flex flex-col gap-xs">
            <h1 className="font-h1 text-[32px] leading-tight text-on-surface">Admin Portal</h1>
            <p className="font-body-lg text-on-surface-variant max-w-[280px] mx-auto">Sign in to access management tools.</p>
          </div>
        </header>

        <form onSubmit={handleLogin} className="flex flex-col gap-md w-full">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-ambient border border-surface-variant/20 flex flex-col gap-lg">
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest pl-2">Passphrase</label>
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full bg-surface-container-low text-on-surface font-body-lg rounded-2xl px-6 py-4 border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-outline-variant"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white font-button py-5 rounded-2xl shadow-ambient active:scale-[0.98] transition-all hover:bg-slate-900"
            >
              Sign In
            </button>
          </div>
          <div className="text-center">
            <p className="font-body-sm text-on-surface-variant">
              Hint: The password is <span className="font-bold text-on-surface">admin</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
