import Link from "next/link";
import type { ReactNode } from "react";
import { AdminNav } from "@/components/admin/AdminNav";
import { Logo } from "@/components/Logo";
import { Button, Notice } from "@/components/admin/ui";
import { logoutAction } from "@/lib/admin/actions/auth";
import { requireAdminPage } from "@/lib/admin/auth";
import { leadStats } from "@/lib/data/leads";
import { getStorage } from "@/lib/storage";

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  await requireAdminPage();

  const storage = getStorage();
  const stats = await leadStats().catch(() => ({ total: 0, new: 0 }));

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-navy-900 text-white">
        <div className="container-x flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center" title="Открыть сайт" target="_blank">
              <Logo className="h-9 w-auto" />
            </Link>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-white/50 sm:block">Админ-панель</span>
          </div>
          <form action={logoutAction}>
            <Button type="submit" variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white">
              Выйти
            </Button>
          </form>
        </div>
        <div className="container-x pb-2">
          <AdminNav newLeads={stats.new} />
        </div>
      </header>

      <div className="container-x flex-1 py-8">
        {storage.mode === "local" && (
          <div className="mb-6">
            <Notice tone="warn">
              Хранилище Vercel Blob не подключено — данные и фото сохраняются локально в <code>public/uploads/</code>.
              Для продакшена задайте <code>BLOB_READ_WRITE_TOKEN</code> (см. README).
            </Notice>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
