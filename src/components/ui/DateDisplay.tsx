"use client";

import { useEffect, useState } from "react";

export default function DateDisplay() {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    setDate(new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }));
  }, []);

  if (!date) return <div className="h-6" />; // Skeleton

  return (
    <p className="font-body-sm text-body-sm text-on-surface-variant uppercase tracking-wider font-semibold">
      {date}
    </p>
  );
}
