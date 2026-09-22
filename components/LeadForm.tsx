"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { links } from "@/lib/site";

type Status = "idle" | "sending" | "ok" | "error";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-navy-900 placeholder:text-muted/70 outline-none transition focus:border-accent-500 focus:ring-4 focus:ring-accent-500/15";

export function LeadForm({ compact = false, defaultCar = "" }: { compact?: boolean; defaultCar?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, page: window.location.pathname }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Не удалось отправить заявку");
      }
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Ошибка отправки");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Icon.Check className="size-6" />
        </div>
        <h3 className="font-display text-xl font-bold text-navy-900">Заявка отправлена</h3>
        <p className="mt-2 text-[15px] text-muted">
          Менеджер свяжется с вами в ближайшее время. Если хотите быстрее — напишите нам напрямую:
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <a
            href={links.whatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
          >
            <Icon.WhatsApp className="size-4" /> WhatsApp
          </a>
          <a
            href={links.telegram()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white"
          >
            <Icon.Telegram className="size-4" /> Telegram
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3.5" noValidate>
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className={compact ? "space-y-3.5" : "grid gap-3.5 sm:grid-cols-2"}>
        <label className="block">
          <span className="sr-only">Ваше имя</span>
          <input name="name" required placeholder="Ваше имя" autoComplete="name" className={inputClass} />
        </label>
        <label className="block">
          <span className="sr-only">Телефон или Telegram</span>
          <input
            name="phone"
            required
            placeholder="Телефон или @telegram"
            autoComplete="tel"
            inputMode="tel"
            className={inputClass}
          />
        </label>
      </div>

      <label className="block">
        <span className="sr-only">Интересующий автомобиль</span>
        <input
          name="car"
          defaultValue={defaultCar}
          placeholder="Какой автомобиль интересует? (модель, год, бюджет)"
          className={inputClass}
        />
      </label>

      {!compact && (
        <label className="block">
          <span className="sr-only">Комментарий</span>
          <textarea
            name="message"
            rows={3}
            placeholder="Комментарий (необязательно)"
            className={`${inputClass} resize-none`}
          />
        </label>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? "Отправляем…" : "Получить расчёт стоимости"}
        {status !== "sending" && <Icon.ArrowRight className="size-5" />}
      </Button>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          {error}. Напишите нам в{" "}
          <a href={links.whatsapp()} className="underline" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          .
        </p>
      )}

      <p className="text-xs leading-relaxed text-muted">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Мы не передаём контакты третьим лицам
        и не рассылаем спам.
      </p>
    </form>
  );
}
