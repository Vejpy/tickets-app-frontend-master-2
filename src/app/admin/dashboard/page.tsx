import Link from "next/link";

export default function AdminDashboard() {
  const adminSections = [
    { name: "Manage Persons", href: "/admin/persons", icon: "group", color: "bg-primary-fixed" },
    { name: "Manage Rooms", href: "/admin/rooms", icon: "meeting_room", color: "bg-surface-container" },
    { name: "Manage Devices", href: "/admin/devices", icon: "devices", color: "bg-secondary-container" },
    { name: "Manage Tickets", href: "/admin/tickets", icon: "confirmation_number", color: "bg-error-container" },
  ];

  return (
    <>
      <section className="flex flex-col gap-xs">
        <h2 className="font-h1 text-h1 text-on-primary-fixed">Admin Dashboard</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Central management for all system entities.</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {adminSections.map((section) => (
          <Link 
            key={section.href} 
            href={section.href}
            className="bg-surface-container-lowest rounded-[2rem] p-md flex items-center gap-md shadow-[0px_10px_30px_rgba(0,0,0,0.04)] border border-surface-variant/30 active:scale-[0.98] transition-all group"
          >
            <div className={`w-14 h-14 rounded-2xl ${section.color} flex items-center justify-center shrink-0`}>
              <span className="material-symbols-outlined text-[28px]">{section.icon}</span>
            </div>
            <div className="flex-1">
              <p className="font-h2 text-h2 text-on-primary-fixed group-hover:text-primary transition-colors">{section.name}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Add, edit or remove records.</p>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
          </Link>
        ))}
      </section>
    </>
  );
}
