import { getDevices } from "@/utils/services";
import Link from "next/link";
import { deleteDevice } from "../actions";

export default async function AdminDevicesPage() {
  const devices = await getDevices().catch(() => []);

  return (
    <>
      <section className="flex justify-between items-end gap-md">
        <div className="flex flex-col gap-xs">
          <h2 className="font-h1 text-h1 text-on-primary-fixed">Manage Inventory</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Track hardware, laptops and peripherals.</p>
        </div>
        <Link 
          href="/admin/devices/add"
          className="bg-[#001221] text-white font-button text-button px-6 py-3 rounded-full flex items-center gap-sm active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          Add Device
        </Link>
      </section>

      <section className="bg-surface-container-lowest rounded-[28px] shadow-[0px_10px_30px_rgba(0,0,0,0.04)] overflow-hidden border border-surface-variant/30 mt-md">
        <div className="px-md py-sm bg-surface-bright/50 flex justify-between items-center border-b border-surface-variant/30">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Device Details</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase pr-2">Actions</span>
        </div>
        <div className="flex flex-col">
          {devices.length > 0 ? (
            devices.map((device, index) => (
              <div key={device.id}>
                <div className="group flex items-center justify-between p-md hover:bg-surface-bright transition-colors">
                  <div className="flex items-center gap-md">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-[28px]">
                        {device.type.toLowerCase().includes('laptop') ? 'laptop_mac' : 
                         device.type.toLowerCase().includes('monitor') ? 'desktop_windows' : 
                         'devices'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-button text-button text-on-surface">{device.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-md text-[10px]">{device.serialNumber}</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">{device.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <form action={async () => {
                      "use server";
                      await deleteDevice(device.id);
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
                {index < devices.length - 1 && (
                  <div className="h-[1px] bg-surface-variant/50 mx-md"></div>
                )}
              </div>
            ))
          ) : (
            <div className="p-xl text-center">
              <p className="font-body-lg text-on-surface-variant">No devices found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
