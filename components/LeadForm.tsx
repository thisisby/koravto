"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { LEAD_NAME_KEY, LEAD_PENDING_KEY } from "@/components/ThankYou";
import { links } from "@/lib/site";

type Status = "idle" | "sending" | "ok" | "error";

export const THANK_YOU_PATH = "/spasibo";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-navy-900 placeholder:text-muted/70 outline-none transition focus:border-accent-500 focus:ring-4 focus:ring-accent-500/15";

export function LeadForm({ compact = false, defaultCar = "" }: { compact?: boolean; defaultCar?: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    router.prefetch(THANK_YOU_PATH);
  }, [router]);

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
      // Hand the name and a one-shot flag to the thank-you page (greeting + analytics goal).
      try {
        sessionStorage.setItem(LEAD_NAME_KEY, typeof data.name === "string" ? data.name : "");
        sessionStorage.setItem(LEAD_PENDING_KEY, "1");
      } catch {
        /* storage unavailable (private mode) — page still works, just without the name */
      }
      form.reset();
      router.push(THANK_YOU_PATH);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Ошибка отправки");
    }
  }

  const busy = status === "sending" || status === "ok";

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

      <Button type="submit" size="lg" className="w-full" disabled={busy}>
        {status === "sending" ? "Отправляем…" : status === "ok" ? "Отправлено" : "Получить расчёт стоимости"}
        {!busy && <Icon.ArrowRight className="size-5" />}
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
