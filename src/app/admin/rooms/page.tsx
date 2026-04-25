import { getRooms } from "@/utils/services";
import Link from "next/link";
import { deleteRoom } from "../actions";

export default async function AdminRoomsPage() {
  const rooms = await getRooms().catch(() => []);

  return (
    <>
      <section className="flex justify-between items-end gap-md">
        <div className="flex flex-col gap-xs">
          <h2 className="font-h1 text-h1 text-on-primary-fixed">Manage Rooms</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Configure school rooms and floors.</p>
        </div>
        <Link 
          href="/admin/rooms/add"
          className="bg-[#001221] text-white font-button text-button px-6 py-3 rounded-full flex items-center gap-sm active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          Add Room
        </Link>
      </section>

      <section className="flex flex-col gap-md">
        <div className="bg-surface-container-lowest rounded-[2rem] shadow-[0px_10px_30px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden border border-surface-variant/30">
          {rooms.length > 0 ? (
            rooms.map((room, index) => (
              <div key={room.id}>
                <div className="flex items-center gap-md p-md">
                  <div className="w-12 h-12 rounded-xl bg-surface-container text-on-surface flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">meeting_room</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-button text-button text-on-primary-fixed truncate">{room.name}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      Floor: {room.floor}
                    </p>
                  </div>
                  <div className="flex items-center gap-sm">
                    <form action={async () => {
                      "use server";
                      await deleteRoom(room.id);
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
                {index < rooms.length - 1 && (
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
