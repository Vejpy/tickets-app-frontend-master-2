"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-xl text-center px-safe-margin">
      <div className="bg-error-container text-on-error-container p-6 rounded-[2.5rem] shadow-ambient">
        <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
      </div>
      
      <div className="flex flex-col gap-sm max-w-md">
        <h1 className="font-h1 text-h1 text-on-surface">Something went wrong</h1>
        <p className="font-body-lg text-on-surface-variant">
          We encountered an error while trying to process your request. 
          {error.message && <span className="block mt-2 font-mono text-sm opacity-70">"{error.message}"</span>}
        </p>
      </div>

      <div className="flex gap-md">
        <button
          onClick={() => window.location.href = "/"}
          className="bg-surface-container text-on-surface font-button px-8 py-4 rounded-full active:scale-95 transition-all"
        >
          Go Home
        </button>
        <button
          onClick={() => reset()}
          className="bg-primary text-on-primary font-button px-8 py-4 rounded-full active:scale-95 transition-all shadow-floating"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
