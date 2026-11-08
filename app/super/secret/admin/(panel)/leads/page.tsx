import Link from "next/link";
import type { Metadata } from "next";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";
import { EmptyState, LinkButton, PageTitle, formatDate } from "@/components/admin/ui";
import { Icon } from "@/components/ui/Icons";
import { adminRoutes } from "@/lib/admin/paths";
import { leadStatuses, listLeads, type LeadStatus } from "@/lib/data/leads";

export const metadata: Metadata = { title: "Заявки" };

type Search = { status?: string; cursor?: string };

/** Column template shared by the header and the rows (desktop). */
const gridCols = "lg:grid-cols-[10.5rem_minmax(0,1.1fr)_minmax(0,2fr)_8rem_6rem] lg:gap-5";

function contactHref(phone: string) {
  const v = phone.trim();
  if (v.startsWith("@")) return `https://t.me/${v.slice(1)}`;
  const digits = v.replace(/[^\d+]/g, "");
  return digits.length >= 7 ? `tel:${digits}` : null;
}

export default async function AdminLeadsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { status, cursor } = await searchParams;
  const filter = leadStatuses.some((s) => s.value === status) ? (status as LeadStatus) : undefined;
  const { leads, cursor: nextCursor, hasMore } = await listLeads({ cursor, limit: 50 });
  const visible = filter ? leads.filter((l) => l.state.status === filter) : leads;

  const tabs: { value: LeadStatus | "all"; label: string }[] = [{ value: "all", label: "Все" }, ...leadStatuses];

  return (
    <>
      <PageTitle title="Заявки" description="Все отправленные формы с сайта. Меняйте статус прямо в списке; заметки — на странице заявки." />

      <div className="mb-4 flex flex-wrap gap-1.5">
        {tabs.map((t) => {
          const active = (t.value === "all" && !filter) || t.value === filter;
          const href = t.value === "all" ? adminRoutes.leads : `${adminRoutes.leads}?status=${t.value}`;
          return (
            <Link
              key={t.value}
              href={href}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
                active ? "bg-navy-900 text-white" : "border border-line bg-white text-navy-900 hover:bg-surface"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <EmptyState title={filter ? "Нет заявок с таким статусом" : "Заявок пока нет"}>
          Новые заявки с формы на сайте появятся здесь автоматически.
        </EmptyState>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
          {/* Header (desktop only) */}
          <div className={`hidden border-b border-line bg-surface px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted lg:grid ${gridCols}`}>
            <span>Дата</span>
            <span>Клиент</span>
            <span>Автомобиль / комментарий</span>
            <span>Статус</span>
            <span />
          </div>

          <ul className="divide-y divide-line">
            {visible.map((l) => {
              const href = contactHref(l.phone);
              const detail = adminRoutes.lead(l.id);
              return (
                <li key={l.id} className={`grid gap-3 px-5 py-4 transition hover:bg-surface/50 lg:items-center ${gridCols}`}>
                  <div className="text-xs text-muted tabular-nums lg:text-[13px]">{formatDate(l.createdAt)}</div>

                  <div className="min-w-0">
                    <Link href={detail} className="block truncate font-semibold text-navy-900 hover:text-accent-600">
                      {l.name}
                    </Link>
                    {href ? (
                      <a
                        href={href}
                        className="block truncate text-[13px] text-accent-600 hover:underline"
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                      >
                        {l.phone}
                      </a>
                    ) : (
                      <span className="block truncate text-[13px] text-navy-900/80">{l.phone}</span>
                    )}
                  </div>

                  <div className="min-w-0 text-[14px]">
                    {l.car && <p className="truncate text-navy-900">{l.car}</p>}
                    {l.message && <p className="mt-0.5 line-clamp-2 text-[13px] text-muted">{l.message}</p>}
                    {l.state.note && <p className="mt-1 line-clamp-1 text-[12px] text-sky-800">Заметка: {l.state.note}</p>}
                    <p className="mt-1 truncate text-[11px] text-muted/80">со страницы {l.page || "/"}</p>
                  </div>

                  {/* Status + link: one row on mobile, two grid cells on desktop */}
                  <div className="flex items-center justify-between gap-4 lg:contents">
                    <div>
                      <LeadStatusSelect id={l.id} status={l.state.status} />
                    </div>
                    <div className="lg:text-right">
                      <Link href={detail} className="inline-flex items-center gap-1 whitespace-nowrap text-[13px] font-semibold text-navy-900 hover:text-accent-600">
                        Открыть
                        <Icon.ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {hasMore && nextCursor && (
        <div className="mt-4 flex justify-center">
          <LinkButton href={`${adminRoutes.leads}?${new URLSearchParams({ ...(filter ? { status: filter } : {}), cursor: nextCursor })}`} variant="secondary">
            Показать ещё
          </LinkButton>
        </div>
      )}
    </>
  );
}
