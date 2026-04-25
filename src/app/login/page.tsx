"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getPersonByEmail } from "@/utils/services";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await getPersonByEmail(email);

      const person = Array.isArray(response) ? response[0] : response;

      console.log("Logged in user data:", person);

      if (person && person.email) {
        sessionStorage.setItem("user-auth", JSON.stringify(person));
        window.location.href = "/";

      } else {
        setError("Account not found. Please contact support.");
      }
    } catch (err) {
      console.error(err);
      setError("Account not found. Double check your email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-full mx-auto flex flex-col gap-12 py-10 px-4">
      <header className="text-center flex flex-col items-center gap-6 w-full">
        <div className="bg-rose-50 text-rose-500 p-6 rounded-3xl shadow-sm">
          <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>login</span>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sign In</h1>
          <p className="text-slate-500">Enter your details to access the portal.</p>
        </div>
      </header>

      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col gap-8 w-full">
        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-6 px-2">

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-2">Email Address</label>
              <input
                required
                type="email"
                placeholder="e.g. jan.novak@skola.cz"
                className="w-full bg-slate-50 text-slate-900 rounded-2xl px-6 py-4 border-none focus:ring-2 focus:ring-rose-200 outline-none transition-all placeholder:text-slate-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-2">Full Name</label>
              <input
                required
                type="text"
                placeholder="Jan Novák"
                className="w-full bg-slate-50 text-slate-900 rounded-2xl px-6 py-4 border-none focus:ring-2 focus:ring-rose-200 outline-none transition-all placeholder:text-slate-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {error && (
              <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-sm font-medium border border-rose-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-bold py-5 rounded-2xl shadow-sm active:scale-95 transition-all mt-4 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Continue"}
            </button>
          </div>
        </form>
      </section>

      <div className="text-center opacity-60">
        <p className="text-sm font-medium text-slate-400">
          Internal Helpdesk Access Only
        </p>
      </div>
    </div>
  );
}
