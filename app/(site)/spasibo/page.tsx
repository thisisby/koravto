import type { Metadata } from "next";
import Link from "next/link";
import { links, siteConfig } from "@/lib/site";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { ThankYouGreeting, LeadGoal } from "@/components/ThankYou";

export const metadata: Metadata = {
  title: "Заявка отправлена",
  description: "Спасибо! Мы получили вашу заявку и свяжемся с вами в ближайшее время.",
  robots: { index: false, follow: false },
};

const next = [
  {
    icon: Icon.Phone,
    title: "Свяжемся с вами",
    text: "Менеджер напишет или позвонит, чтобы уточнить модель, год и бюджет.",
    when: "в течение 1 часа",
  },
  {
    icon: Icon.Camera,
    title: "Пришлём подборку",
    text: "3–5 автомобилей с корейского рынка с фото, отчётами и расчётом под ключ.",
    when: "в течение суток",
  },
  {
    icon: Icon.Handshake,
    title: "Начнём работу",
    text: "Договор, осмотр в Корее с видеоотчётом и выкуп — только после вашего решения.",
    when: "когда вы будете готовы",
  },
];

export default function ThankYouPage() {
  return (
    <>
      <LeadGoal />

      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
        <div className="container-x relative py-20 text-center sm:py-28">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent-500 text-navy-900 shadow-[0_12px_32px_-8px_rgb(201_162_74/0.8)] sm:size-20">
            <Icon.Check className="size-8 sm:size-10" />
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">Заявка отправлена</p>
          <h1 className="font-display mt-3 text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
            <ThankYouGreeting />
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg leading-relaxed text-white/70">
            Мы получили вашу заявку. Менеджер свяжется с вами в ближайшее время — обычно в течение часа в рабочее
            время ({siteConfig.contacts.workingHours.toLowerCase()}).
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonAnchor
              href={links.whatsapp("Здравствуйте! Я только что оставил заявку на сайте.")}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              <Icon.WhatsApp className="size-5" />
              Написать в WhatsApp
            </ButtonAnchor>
            <ButtonAnchor href={links.telegram()} target="_blank" rel="noopener noreferrer" variant="outline-light" size="lg">
              <Icon.Telegram className="size-5" />
              Telegram
            </ButtonAnchor>
          </div>
          <p className="mt-4 text-sm text-white/50">
            Хотите быстрее — напишите нам напрямую, мы ответим сразу.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">Что дальше</p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              Три следующих шага
            </h2>
          </div>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {next.map(({ icon: I, title, text, when }, i) => (
              <li key={title} className="rounded-3xl border border-line bg-white p-7 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-navy-900 text-accent-400">
                    <I className="size-5" />
                  </span>
                  <span className="font-display text-4xl font-extrabold text-navy-900/10">{i + 1}</span>
                </div>
                <h3 className="font-display mt-5 text-xl font-bold text-navy-900">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-navy-900">
                  <Icon.Clock className="size-3.5" />
                  {when}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            <Link
              href="/kak-eto-rabotaet"
              className="group flex items-center justify-between gap-4 rounded-3xl bg-navy-900 p-7 text-white transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-400">Пока ждёте</p>
                <p className="font-display mt-2 text-xl font-bold">Как проходит сделка — 6 этапов и видео осмотра</p>
              </div>
              <Icon.ArrowRight className="size-6 shrink-0 text-accent-400 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/galereya"
              className="group flex items-center justify-between gap-4 rounded-3xl border border-line bg-white p-7 text-navy-900 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-600">Галерея</p>
                <p className="font-display mt-2 text-xl font-bold">Фото реального осмотра автомобиля в Корее</p>
              </div>
              <Icon.ArrowRight className="size-6 shrink-0 text-accent-600 transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 text-center">
            <ButtonLink href="/" variant="ghost" className="border border-line bg-white">
              На главную
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
