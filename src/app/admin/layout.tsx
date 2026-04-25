"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Skip auth check for the login page itself
    if (pathname === "/admin") {
      setAuthorized(true);
      return;
    }

    const isAuth = sessionStorage.getItem("admin-auth") === "true";
    if (!isAuth) {
      setAuthorized(false);
      router.replace("/admin");
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (authorized === null) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="font-body-lg text-on-surface-variant">Verifying access...</p>
      </div>
    );
  }

  return <>{children}</>;
}
