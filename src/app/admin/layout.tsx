import { Suspense } from "react";
import AdminGuard from "@/components/admin/AdminGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AdminGuard>{children}</AdminGuard>
    </Suspense>
  );
}
