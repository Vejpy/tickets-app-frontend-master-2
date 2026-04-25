"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPerson } from "../../actions";
import { JobPosition } from "@/types/person.types";

export default function AddPersonPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobPosition: JobPosition.STUDENT,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await createPerson(formData);
      router.push("/admin/persons");
      router.refresh();
    } catch (error) {
      alert("Failed to create person.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="mb-lg">
        <div className="flex items-center gap-sm mb-xs">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-surface-container-lowest shadow-[0px_10px_30px_rgba(0,0,0,0.04)] text-on-surface flex items-center justify-center hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Admin Editor</span>
        </div>
        <h1 className="font-h1 text-h1 text-on-surface">New Person</h1>
      </header>

      <section className="max-w-3xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
          
          <div className="bg-surface-container-lowest rounded-xl shadow-[0px_10px_30px_rgba(0,0,0,0.04)] p-md flex flex-col gap-md border border-surface-variant/30">
            <h2 className="font-h2 text-h2 text-on-surface">Core Details</h2>
            
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Jan Novák"
                className="w-full bg-surface-container text-on-surface font-body-lg text-body-lg rounded-xl px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-outline-variant"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Email address</label>
              <input
                required
                type="email"
                placeholder="jan.novak@skola.cz"
                className="w-full bg-surface-container text-on-surface font-body-lg text-body-lg rounded-xl px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-outline-variant"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Job Position</label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-surface-container text-on-surface font-button text-button rounded-lg px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none pr-xl"
                  value={formData.jobPosition}
                  onChange={(e) => setFormData({ ...formData, jobPosition: e.target.value as JobPosition })}
                >
                  {Object.values(JobPosition).map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-sm text-on-surface-variant">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-md pt-lg">
            <button
              disabled={loading}
              type="submit"
              className="bg-primary text-on-primary font-button text-button rounded-full px-xl py-[16px] shadow-[0px_15px_35px_rgba(0,0,0,0.08)] flex items-center gap-sm hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
              {loading ? "Saving..." : "Save Person"}
            </button>
          </div>

        </form>
      </section>
    </>
  );
}
