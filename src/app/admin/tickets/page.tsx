import { getTickets, getPersons } from "@/utils/services";
import Link from "next/link";
import { deleteTicket } from "../actions";
import { TicketPriority, TicketStatus } from "@/types/ticket.types";

export default async function AdminTicketsPage() {
  const tickets = await getTickets().catch(() => []);
  const persons = await getPersons().catch(() => []);

  return (
    <>
      <section className="flex justify-between items-end gap-md">
        <div className="flex flex-col gap-xs">
          <h2 className="font-h1 text-h1 text-on-primary-fixed">Manage Tickets</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Resolve issues and track maintenance.</p>
        </div>
        <Link 
          href="/admin/tickets/add"
          className="bg-[#001221] text-white font-button text-button px-6 py-3 rounded-full flex items-center gap-sm active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          New Ticket
        </Link>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-md">
        {tickets.length > 0 ? (
          tickets.map((ticket) => {
            const assignedPerson = persons.find(p => p.id === ticket.assignedPersonId);
            return (
              <div 
                key={ticket.id}
                className="bg-surface-container-lowest rounded-[24px] p-md shadow-[0px_10px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between min-h-[160px] border border-surface-variant/30 relative group"
              >
                <div>
                  <div className="flex justify-between items-start mb-sm">
                    <span className="font-label-caps text-label-caps text-outline uppercase text-[10px]">#HD-{ticket.id.slice(-4)}</span>
                    <div className="flex items-center gap-2">
                       <form action={async () => {
                        "use server";
                        await deleteTicket(ticket.id);
                      }}>
                        <button 
                          type="submit"
                          className="w-8 h-8 rounded-full flex items-center justify-center text-error border border-error/10 hover:bg-error-container/30 transition-all active:scale-[0.8]"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </form>
                      <span className={`px-2 py-1 rounded-md font-label-caps text-[10px] ${
                        ticket.priority === TicketPriority.HIGH ? 'bg-error-container text-on-error-container' : 
                        'bg-surface-variant text-on-surface-variant'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>
                  <h2 className="font-h2 text-h2 text-on-surface line-clamp-2 mb-sm">{ticket.title}</h2>
                </div>
                <div className="flex items-center justify-between mt-auto pt-sm border-t border-surface-variant/50">
                  <div className="flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-button text-[12px]">
                      {assignedPerson ? assignedPerson.name.slice(0, 2).toUpperCase() : "??"}
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {assignedPerson ? assignedPerson.name : "Unassigned"}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-md font-label-caps text-[10px] ${
                    ticket.status === TicketStatus.OPEN ? 'bg-[#F2F2F7] text-on-surface-variant' : 
                    'bg-primary-fixed text-on-primary-fixed'
                  }`}>
                    {ticket.status.replace('_', ' ')}
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
