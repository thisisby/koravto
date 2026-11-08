import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/Logo";
import { Notice } from "@/components/admin/ui";
import { adminConfigured } from "@/lib/admin/session";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Вход" };

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next = "" } = await searchParams;
  const configured = adminConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center rounded-2xl bg-navy-900 px-6 py-5">
          <Logo className="h-12 w-auto" />
        </div>
        <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
          <h1 className="font-display text-xl font-bold text-navy-900">Админ-панель</h1>
          <p className="mt-1 text-[13px] text-muted">{siteConfig.name} · управление сайтом</p>
          <div className="mt-5">
            {configured ? (
              <LoginForm next={next} />
            ) : (
              <Notice tone="warn">
                Задайте переменные окружения <code>ADMIN_LOGIN</code> и <code>ADMIN_PASSWORD</code> (минимум 8 символов)
                и перезапустите приложение.
              </Notice>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
