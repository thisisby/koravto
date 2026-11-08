import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActionButton } from "@/components/admin/ActionButton";
import { LeadNoteForm } from "@/components/admin/LeadNoteForm";
import { Badge, Card, LinkButton, PageTitle, formatDate } from "@/components/admin/ui";
import { deleteLeadAction } from "@/lib/admin/actions/leads";
import { adminRoutes } from "@/lib/admin/paths";
import { getLead, leadStatuses } from "@/lib/data/leads";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "Заявка" };

type Props = { params: Promise<{ id: string }> };

export default async function AdminLeadPage({ params }: Props) {
  const { id } = await params;
  const lead = await getLead(decodeURIComponent(id));
  if (!lead) notFound();

  const status = leadStatuses.find((s) => s.value === lead.state.status) ?? leadStatuses[0];
  const digits = lead.phone.replace(/[^\d]/g, "");
  const telegram = lead.phone.trim().startsWith("@") ? `https://t.me/${lead.phone.trim().slice(1)}` : null;
  const whatsapp = digits.length >= 10 ? `https://wa.me/${digits}?text=${encodeURIComponent(`Здравствуйте, ${lead.name}! Это Elite Cars — вы оставляли заявку на сайте.`)}` : null;

  const rows: [string, string | undefined][] = [
    ["Имя", lead.name],
    ["Контакт", lead.phone],
    ["Автомобиль", lead.car],
    ["Комментарий", lead.message],
    ["Страница", lead.page],
    ["Источник (referer)", lead.referer],
    ["IP", lead.ip],
    ["Браузер", lead.userAgent],
  ];

  return (
    <>
      <PageTitle
        title={lead.name}
        description={`Заявка от ${formatDate(lead.createdAt)}`}
        action={
          <>
            <LinkButton href={adminRoutes.leads} variant="secondary">
              ← Все заявки
            </LinkButton>
            <ActionButton action={deleteLeadAction.bind(null, lead.id)} confirm="Удалить заявку без возможности восстановления?" variant="danger">
              Удалить
            </ActionButton>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-lg font-bold text-navy-900">Данные заявки</h2>
            <Badge className={status.tone}>{status.label}</Badge>
          </div>
          <dl className="mt-4 divide-y divide-line text-[14px]">
            {rows
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k} className="grid gap-1 py-2.5 sm:grid-cols-[160px_1fr] sm:gap-4">
                  <dt className="text-muted">{k}</dt>
                  <dd className="break-words whitespace-pre-wrap text-navy-900">{v}</dd>
                </div>
              ))}
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            {digits.length >= 7 && (
              <LinkButton href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`} variant="secondary">
                Позвонить
              </LinkButton>
            )}
            {whatsapp && (
              <LinkButton href={whatsapp} target="_blank" rel="noreferrer" variant="secondary">
                Написать в WhatsApp
              </LinkButton>
            )}
            {telegram && (
              <LinkButton href={telegram} target="_blank" rel="noreferrer" variant="secondary">
                Открыть Telegram
              </LinkButton>
            )}
            <LinkButton href={links.whatsapp()} target="_blank" rel="noreferrer" variant="ghost">
              Наш WhatsApp
            </LinkButton>
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-lg font-bold text-navy-900">Работа с заявкой</h2>
          <p className="mt-1 text-[13px] text-muted">
            {lead.state.updatedAt ? `Обновлено ${formatDate(lead.state.updatedAt)}` : "Ещё не обрабатывалась"}
          </p>
          <div className="mt-4">
            <LeadNoteForm lead={lead} />
          </div>
        </Card>
      </div>
    </>
  );
}
