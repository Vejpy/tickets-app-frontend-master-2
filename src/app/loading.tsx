export default function GlobalLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-md">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-primary/10 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="font-body-lg text-on-surface-variant animate-pulse">Loading system data...</p>
    </div>
  );
}
