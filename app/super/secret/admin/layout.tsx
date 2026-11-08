import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { default: "Админ-панель", template: "%s — Админ-панель" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

// Everything in the admin area depends on the session cookie and live storage.
export const dynamic = "force-dynamic";

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-full flex-1 bg-surface text-ink">{children}</div>;
}
