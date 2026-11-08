"use client";

import { useActionState } from "react";
import { saveVideosAction } from "@/lib/admin/actions/videos";
import { SubmitButton } from "./SubmitButton";
import { Card, Field, Notice, Textarea } from "./ui";

type StepInfo = { index: number; title: string; heading?: string; duration: string };

export function VideosForm({ steps, videos }: { steps: StepInfo[]; videos: Record<string, string[]> }) {
  const [state, action] = useActionState(saveVideosAction, null);

  return (
    <form action={action} className="space-y-4">
      {steps.map((s) => (
        <Card key={s.index}>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-lg font-bold text-navy-900">
              <span className="mr-2 text-accent-600">{String(s.index + 1).padStart(2, "0")}</span>
              {s.title}
            </h2>
            <span className="text-xs text-muted">{s.duration}</span>
          </div>
          {s.heading && <p className="mt-1 text-[13px] text-muted">Заголовок блока на сайте: «{s.heading}»</p>}
          <div className="mt-4">
            <Field label="Ссылки YouTube" hint="По одной в строке: youtube.com/watch?v=…, youtu.be/…, youtube.com/shorts/… (Shorts показываются вертикально). Пустое поле — без видео.">
              <Textarea
                name={`step-${s.index}`}
                defaultValue={(videos[String(s.index)] ?? []).join("\n")}
                rows={Math.max(3, (videos[String(s.index)] ?? []).length + 1)}
                placeholder="https://www.youtube.com/watch?v=…"
                spellCheck={false}
              />
            </Field>
          </div>
        </Card>
      ))}

      {state && (state.ok ? <Notice tone="success">{state.message}</Notice> : <Notice tone="error">{state.error}</Notice>)}

      <SubmitButton>Сохранить видео</SubmitButton>
    </form>
  );
}
