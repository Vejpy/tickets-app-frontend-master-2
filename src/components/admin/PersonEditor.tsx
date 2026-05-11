"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPerson, updatePerson } from "@/app/admin/actions";
import { Person, JobPosition } from "@/types/person.types";

interface PersonEditorProps {
  person?: Person;
}

export default function PersonEditor({ person }: PersonEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: person?.name || "",
    email: person?.email || "",
    jobPosition: person?.jobPosition || JobPosition.STUDENT,
  });

  const isEditing = !!person;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing && person.id) {
        await updatePerson(person.id, formData);
      } else {
        await createPerson(formData);
      }
      router.push("/admin/persons");
      router.refresh();
    } catch (error) {
      alert(`Failed to ${isEditing ? "update" : "create"} person.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg py-sm flex justify-between items-center w-full mb-lg">
        <button 
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-lowest shadow-ambient text-on-surface hover:bg-surface-container transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Admin Editor</span>
          <h1 className="font-button text-button text-on-surface">
            {isEditing ? `Edit ${person.name}` : "New Person"}
          </h1>
        </div>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <main className="max-w-3xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-lg pb-xl">
          <section className="bg-surface-container-lowest rounded-xl shadow-ambient p-md flex flex-col gap-md border border-surface-variant/30">
            <h2 className="font-h2 text-h2 text-on-surface">Core Details</h2>
            
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant pl-xs">Full Name</label>
              <input
                id="person-name"
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
                id="person-email"
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
                  className="w-full appearance-none bg-surface-container text-on-surface font-button text-button rounded-lg px-md py-sm border-none focus:ring-2 focus:ring-primary-container outline-none pr-xl cursor-pointer"
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
          </section>

          <div className="fixed bottom-0 left-0 right-0 p-lg bg-gradient-to-t from-background via-background/90 to-transparent pt-xl z-40 flex justify-end">
            <button
              id="save-person-btn"
              disabled={loading}
              type="submit"
              className="bg-primary text-on-primary font-button text-button rounded-full px-xl py-[16px] shadow-floating flex items-center gap-sm hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
              {loading ? "Saving..." : isEditing ? "Save Changes" : "Create Person"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
