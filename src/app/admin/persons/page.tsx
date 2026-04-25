import { getPersons } from "@/utils/services";
import Link from "next/link";
import { deletePerson } from "../actions";

export default async function AdminPersonsPage() {
  const persons = await getPersons().catch(() => []);

  return (
    <>
      <section className="flex justify-between items-end gap-md">
        <div className="flex flex-col gap-xs">
          <h2 className="font-h1 text-h1 text-on-primary-fixed">Manage Persons</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Create, edit or remove staff and students.</p>
        </div>
        <Link 
          href="/admin/persons/add"
          className="bg-[#001221] text-white font-button text-button px-6 py-3 rounded-full flex items-center gap-sm active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          Add Person
        </Link>
      </section>

      <section className="flex flex-col gap-md">
        <div className="bg-surface-container-lowest rounded-[2rem] shadow-[0px_10px_30px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden border border-surface-variant/30">
          {persons.length > 0 ? (
            persons.map((person, index) => (
              <div key={person.id}>
                <div className="flex items-center gap-md p-md">
                  <div className="w-12 h-12 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-button text-button text-on-primary-fixed truncate">{person.name}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      {person.jobPosition} • {person.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-sm">
                    {/* Delete Action - Using a small form for server action */}
                    <form action={async () => {
                      "use server";
                      if (person.id) {
                        await deletePerson(person.id);
                      }
                    }}>
                      <button 
                        type="submit"
                        className="w-10 h-10 rounded-full flex items-center justify-center text-error border border-error/10 hover:bg-error-container/30 transition-all active:scale-[0.95]"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </form>
                  </div>
                </div>
                {index < persons.length - 1 && (
                  <div className="h-[1px] bg-surface-variant/50 ml-[76px] mr-md"></div>
                )}
              </div>
            ))
          ) : (
            <div className="p-xl text-center">
              <p className="font-body-lg text-on-surface-variant">No persons found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
