import Link from "next/link";
import type { Metadata } from "next";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";
import { EmptyState, LinkButton, PageTitle, formatDate } from "@/components/admin/ui";
import { adminRoutes } from "@/lib/admin/paths";
import { leadStatuses, listLeads, type LeadStatus } from "@/lib/data/leads";

export const metadata: Metadata = { title: "Заявки" };

type Search = { status?: string; cursor?: string };

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
          <table className="w-full text-[14px]">
            <thead className="hidden bg-surface text-left text-xs font-semibold uppercase tracking-wide text-muted md:table-header-group">
              <tr>
                <th className="px-4 py-3">Дата</th>
                <th className="px-4 py-3">Клиент</th>
                <th className="px-4 py-3">Автомобиль / комментарий</th>
                <th className="px-4 py-3">Статус</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {visible.map((l) => {
                const href = contactHref(l.phone);
                return (
                  <tr key={l.id} className="block border-b border-line p-4 last:border-b-0 md:table-row md:p-0 md:align-top">
                    <td className="block whitespace-nowrap text-xs text-muted md:table-cell md:px-4 md:py-3 md:text-[13px]">
                      {formatDate(l.createdAt)}
                    </td>
                    <td className="block pt-1 md:table-cell md:px-4 md:py-3 md:pt-3">
                      <p className="font-semibold text-navy-900">{l.name}</p>
                      {href ? (
                        <a href={href} className="text-accent-600 hover:underline" target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                          {l.phone}
                        </a>
                      ) : (
                        <span className="text-navy-900/80">{l.phone}</span>
                      )}
                    </td>
                    <td className="block pt-1 md:table-cell md:max-w-md md:px-4 md:py-3 md:pt-3">
                      {l.car && <p className="text-navy-900">{l.car}</p>}
                      {l.message && <p className="mt-0.5 line-clamp-2 text-[13px] text-muted">{l.message}</p>}
                      {l.state.note && <p className="mt-1 line-clamp-1 text-[12px] text-sky-800">📝 {l.state.note}</p>}
                      <p className="mt-1 text-[11px] text-muted/80">со страницы {l.page || "/"}</p>
                    </td>
                    <td className="block pt-2 md:table-cell md:px-4 md:py-3 md:pt-3">
                      <LeadStatusSelect id={l.id} status={l.state.status} />
                    </td>
                    <td className="block pt-2 md:table-cell md:px-4 md:py-3 md:pt-3 md:text-right">
                      <Link href={adminRoutes.lead(l.id)} className="text-[13px] font-semibold text-navy-900 hover:text-accent-600">
                        Открыть →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
