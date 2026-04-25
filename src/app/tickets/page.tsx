import { getTickets, getPersons } from "@/utils/services";
import Search from "@/components/ui/Search";
import { TicketStatus, TicketPriority } from "@/types/ticket.types";
import TicketActions from "@/components/ui/TicketActions";

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const allTickets = await getTickets().catch(() => []);
  const allPersons = await getPersons().catch(() => []);
  
  const filteredTickets = query 
    ? allTickets.filter(t => t.title.toLowerCase().includes(query.toLowerCase()))
    : allTickets;

  return (
    <>
      <TicketActions />
      <section className="w-full mb-lg">
        <Search placeholder="Search tickets (Press Enter)" />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => {
            const assignedPerson = allPersons.find(p => p.id === ticket.assignedPersonId);
            return (
              <div 
                key={ticket.id}
                className="bg-surface-container-lowest rounded-[24px] p-md shadow-[0px_10px_30px_rgba(0,0,0,0.04)] active:scale-[0.97] transition-all cursor-pointer flex flex-col justify-between min-h-[160px] border border-surface-variant/30"
              >
                <div>
                  <div className="flex justify-between items-start mb-sm">
                    <span className="font-label-caps text-label-caps text-outline uppercase text-[10px]">#HD-{ticket.id.slice(-4)}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-md font-label-caps text-[10px] ${
                        ticket.priority === TicketPriority.HIGH ? 'bg-error-container text-on-error-container' : 
                        'bg-surface-variant text-on-surface-variant'
                      }`}>
                        {ticket.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-md font-label-caps text-[10px] ${
                        ticket.status === TicketStatus.OPEN ? 'bg-[#F2F2F7] text-on-surface-variant' : 
                        'bg-primary-fixed text-on-primary-fixed'
                      }`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <h2 className="font-h2 text-h2 text-on-surface line-clamp-2 mb-sm">{ticket.title}</h2>
                </div>
                <div className="flex items-center gap-sm mt-auto pt-sm border-t border-surface-variant/50">
                  <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-button text-[12px]">
                    {assignedPerson ? assignedPerson.name.slice(0, 2).toUpperCase() : "??"}
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {assignedPerson ? assignedPerson.name : "Unassigned"}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full p-xl text-center">
            <p className="font-body-lg text-on-surface-variant">No tickets found.</p>
          </div>
        )}
      </div>
    </>
  );
}