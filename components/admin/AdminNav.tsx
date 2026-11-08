"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminRoutes } from "@/lib/admin/paths";

const items = [
  { href: adminRoutes.home, label: "Обзор", exact: true },
  { href: adminRoutes.cars, label: "Автомобили" },
  { href: adminRoutes.gallery, label: "Галерея" },
  { href: adminRoutes.videos, label: "Видео" },
  { href: adminRoutes.leads, label: "Заявки" },
];

export function AdminNav({ newLeads }: { newLeads: number }) {
  const pathname = usePathname();
  return (
    <nav className="-mx-1 flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Разделы админ-панели">
      {items.map((it) => {
        const active = it.exact ? pathname === it.href : pathname.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-[14px] font-semibold transition ${
              active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            {it.label}
            {it.href === adminRoutes.leads && newLeads > 0 && (
              <span className="rounded-full bg-accent-500 px-1.5 py-0.5 text-[11px] font-bold text-navy-900 tabular-nums">{newLeads}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
