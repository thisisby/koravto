/** Lead (CRM) types and labels — safe to import from Client Components. */

export type LeadStatus = "new" | "in_progress" | "done" | "spam";

export const leadStatuses: { value: LeadStatus; label: string; tone: string }[] = [
  { value: "new", label: "Новая", tone: "bg-amber-100 text-amber-900" },
  { value: "in_progress", label: "В работе", tone: "bg-sky-100 text-sky-900" },
  { value: "done", label: "Закрыта", tone: "bg-emerald-100 text-emerald-900" },
  { value: "spam", label: "Спам", tone: "bg-zinc-200 text-zinc-700" },
];

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  car: string;
  message: string;
  page: string;
  ip?: string;
  userAgent?: string;
  referer?: string;
};

export type LeadState = { status: LeadStatus; note: string; updatedAt: string };

export type LeadRow = Lead & { state: LeadState; url: string };
