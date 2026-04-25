import { getPersons } from "@/utils/services";
import Search from "@/components/ui/Search";

export default async function PersonsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const allPersons = await getPersons().catch(() => []);
  
  const filteredPersons = query 
    ? allPersons.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.email.toLowerCase().includes(query.toLowerCase()))
    : allPersons;

  return (
    <>
      <section className="flex flex-col gap-xs mb-sm">
        <h1 className="font-h1 text-h1 text-on-surface mb-sm inline-block relative">
          Registered Persons
          <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-pink-500 rounded-full"></div>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Manage the list of teachers, students and staff.</p>
      </section>

      <section className="w-full">
        <Search placeholder="Search persons by name or email... (Press Enter)" />
      </section>

      <section className="flex flex-col gap-md">
        <div className="bg-surface-container-lowest rounded-[2rem] shadow-[0px_10px_30px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden border border-surface-variant/30">
          {filteredPersons.length > 0 ? (
            filteredPersons.map((person, index) => (
              <div key={person.id}>
                <div className="flex items-center gap-md p-md hover:bg-surface-bright transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-button text-button text-on-primary-fixed truncate">{person.name}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      {person.jobPosition} • {person.email}
                    </p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
                  </div>
                </div>
                {index < filteredPersons.length - 1 && (
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
