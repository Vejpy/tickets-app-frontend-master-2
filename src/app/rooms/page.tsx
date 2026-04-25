import { getRooms } from "@/utils/services";
import Search from "@/components/ui/Search";

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const allRooms = await getRooms().catch(() => []);
  
  const filteredRooms = query 
    ? allRooms.filter(r => r.name.toLowerCase().includes(query.toLowerCase()))
    : allRooms;

  return (
    <>
      <section className="flex flex-col gap-xs">
        <h2 className="font-h1 text-h1 text-on-primary-fixed">Rooms</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">List of all educational and administrative spaces.</p>
      </section>

      <section className="w-full">
        <Search placeholder="Search rooms... (Press Enter)" />
      </section>

      <section className="flex flex-col gap-md">
        <div className="bg-surface-container-lowest rounded-[2rem] shadow-[0px_10px_30px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden border border-surface-variant/30">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room, index) => (
              <div key={room.id}>
                <div className="flex items-center gap-md p-md hover:bg-surface-bright transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-surface-container text-on-surface flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">meeting_room</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-button text-button text-on-primary-fixed truncate">{room.name}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      Floor: {room.floor}
                    </p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
                  </div>
                </div>
                {index < filteredRooms.length - 1 && (
                  <div className="h-[1px] bg-surface-variant/50 ml-[76px] mr-md"></div>
                )}
              </div>
            ))
          ) : (
            <div className="p-xl text-center">
              <p className="font-body-lg text-on-surface-variant">No rooms found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
