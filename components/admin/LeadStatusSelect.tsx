"use client";

import { useOptimistic, useTransition } from "react";
import { setLeadStatusAction } from "@/lib/admin/actions/leads";
import { leadStatuses, type LeadStatus } from "@/lib/content/leads";

export function LeadStatusSelect({ id, status }: { id: string; status: LeadStatus }) {
  const [pending, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(status);
  const tone = leadStatuses.find((s) => s.value === optimistic)?.tone ?? "";

  return (
    <select
      aria-label="Статус заявки"
      value={optimistic}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as LeadStatus;
        startTransition(async () => {
          setOptimistic(next);
          await setLeadStatusAction(id, next);
        });
      }}
      className={`rounded-full border-0 px-2.5 py-1 text-[12px] font-semibold outline-none ring-accent-500/30 focus:ring-2 disabled:opacity-60 ${tone}`}
    >
      {leadStatuses.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
