"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function Search({ placeholder = "Search..." }: { placeholder?: string }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant">
        <span className="material-symbols-outlined text-[20px]">search</span>
      </div>
      <input
        type="text"
        className="w-full bg-surface-container-low border-none rounded-full py-3 pl-12 pr-4 text-body-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none"
        placeholder={placeholder}
        defaultValue={searchParams.get("query")?.toString()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(e.currentTarget.value);
          }
        }}
      />
      {isPending && (
        <div className="absolute inset-y-0 right-4 flex items-center">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      )}
    </div>
  );
}
