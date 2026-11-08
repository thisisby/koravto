"use client";

import { useActionState } from "react";
import { saveLeadNoteAction } from "@/lib/admin/actions/leads";
import { leadStatuses, type LeadRow } from "@/lib/content/leads";
import { SubmitButton } from "./SubmitButton";
import { Field, Notice, Select, Textarea } from "./ui";

export function LeadNoteForm({ lead }: { lead: LeadRow }) {
  const [state, action] = useActionState(saveLeadNoteAction, null);
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="id" value={lead.id} />
      <Field label="Статус">
        <Select name="status" defaultValue={lead.state.status}>
          {leadStatuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Заметка менеджера" hint="Договорённости, следующий шаг, результат звонка. Видна только в админке.">
        <Textarea name="note" defaultValue={lead.state.note} rows={6} />
      </Field>
      {state && (state.ok ? <Notice tone="success">{state.message}</Notice> : <Notice tone="error">{state.error}</Notice>)}
      <SubmitButton>Сохранить</SubmitButton>
    </form>
  );
}
