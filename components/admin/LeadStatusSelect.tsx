"use client";

import { useOptimistic, useTransition } from "react";
import { setLeadStatusAction } from "@/lib/admin/actions/leads";
import { leadStatuses, type LeadStatus } from "@/lib/content/leads";
import { Icon } from "@/components/ui/Icons";

export function LeadStatusSelect({ id, status }: { id: string; status: LeadStatus }) {
  const [pending, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(status);
  const tone = leadStatuses.find((s) => s.value === optimistic)?.tone ?? "";

  return (
    <span className={`relative inline-flex h-7 items-center rounded-full ${tone} ${pending ? "opacity-60" : ""}`}>
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
        className="h-full cursor-pointer appearance-none rounded-full border-0 bg-transparent py-0 pr-7 pl-3 text-[12px] font-semibold text-current outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40 disabled:cursor-default"
      >
        {leadStatuses.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <Icon.ChevronDown className="pointer-events-none absolute right-2 size-3.5 opacity-70" />
    </span>
  );
}
