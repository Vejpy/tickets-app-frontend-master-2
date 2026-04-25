import { getDevices } from "@/utils/services";
import Search from "@/components/ui/Search";

export default async function DevicesPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const allDevices = await getDevices().catch(() => []);
  
  const filteredDevices = query 
    ? allDevices.filter(d => d.name.toLowerCase().includes(query.toLowerCase()) || d.serialNumber.toLowerCase().includes(query.toLowerCase()))
    : allDevices;

  return (
    <>
      <section className="space-y-md">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface">Inventory</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">Manage hardware and devices</p>
        </div>
        <Search placeholder="Search laptops, monitors, IDs..." />
      </section>

      <section className="bg-surface-container-lowest rounded-[28px] shadow-[0px_10px_30px_rgba(0,0,0,0.04)] overflow-hidden border border-surface-variant/30">
        <div className="px-md py-sm bg-surface-bright/50 flex justify-between items-center border-b border-surface-variant/30">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Device Details</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase pr-2">Status</span>
        </div>
        <div className="flex flex-col">
          {filteredDevices.length > 0 ? (
            filteredDevices.map((device, index) => (
              <div key={device.id}>
                <div className="group flex items-center justify-between p-md hover:bg-surface-bright transition-colors cursor-pointer active:bg-surface-container-low">
                  <div className="flex items-center gap-md">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-white group-hover:shadow-sm transition-all">
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
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Type: {device.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-primary-fixed text-on-primary-fixed px-3 py-1.5 rounded-full font-label-caps text-[10px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-on-primary-fixed"></span> In Use
                    </span>
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-on-surface transition-colors">chevron_right</span>
                  </div>
                </div>
                {index < filteredDevices.length - 1 && (
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
