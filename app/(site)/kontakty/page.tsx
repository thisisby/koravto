import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { links, siteConfig } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { LeadForm } from "@/components/LeadForm";
import { Icon } from "@/components/ui/Icons";

export const metadata: Metadata = buildMetadata({
  title: "Контакты: заказать премиальный автомобиль из Кореи",
  description: `${siteConfig.name}: телефон, WhatsApp, Telegram, email. Подбор автомобиля из Кореи и расчёт стоимости под ключ в течение суток.`,
  path: "/kontakty",
});

const channels = [
  {
    icon: Icon.WhatsApp,
    title: "WhatsApp",
    value: siteConfig.contacts.phoneDisplay,
    href: links.whatsapp("Здравствуйте! Интересует подбор автомобиля из Кореи."),
    color: "bg-[#25D366] text-white shadow-[0_8px_20px_-8px_rgb(37_211_102/0.7)]",
    card: "border-[#25D366]/35 hover:border-[#25D366]/60 hover:bg-[#25D366]/5",
    hint: "Самый быстрый способ",
  },
  {
    icon: Icon.Telegram,
    title: "Telegram",
    value: `@${siteConfig.contacts.telegram}`,
    href: links.telegram(),
    color: "bg-[#229ED9] text-white shadow-[0_8px_20px_-8px_rgb(34_158_217/0.7)]",
    card: "border-[#229ED9]/35 hover:border-[#229ED9]/60 hover:bg-[#229ED9]/5",
    hint: "Отчёты и фото удобно смотреть здесь",
  },
  {
    icon: Icon.Phone,
    title: "Телефон",
    value: siteConfig.contacts.phoneDisplay,
    href: links.phone(),
    color: "bg-accent-500 text-navy-900 shadow-[0_8px_20px_-8px_rgb(201_162_74/0.6)]",
    card: "border-accent-500/35 hover:border-accent-500/60 hover:bg-accent-500/5",
    hint: `Кыргызстан · ${siteConfig.contacts.workingHours}`,
  },
  {
    icon: Icon.Phone,
    title: "Телефон в Корее",
    value: siteConfig.contacts.phoneKoreaDisplay,
    href: links.phoneKorea(),
    color: "bg-accent-500 text-navy-900 shadow-[0_8px_20px_-8px_rgb(201_162_74/0.6)]",
    card: "border-accent-500/35 hover:border-accent-500/60 hover:bg-accent-500/5",
    hint: "Офис в Южной Корее",
  },
  {
    icon: Icon.Mail,
    title: "Email",
    value: siteConfig.contacts.email,
    href: links.email(),
    color: "bg-[#EA4335] text-white shadow-[0_8px_20px_-8px_rgb(234_67_53/0.55)]",
    card: "border-[#EA4335]/30 hover:border-[#EA4335]/55 hover:bg-[#EA4335]/5",
    hint: "Для договоров и документов",
  },
  {
    icon: Icon.Telegram,
    title: "Telegram-канал",
    value: "@elitecarsko",
    href: siteConfig.social.telegramChannel,
    color: "bg-[#229ED9] text-white shadow-[0_8px_20px_-8px_rgb(34_158_217/0.7)]",
    card: "border-[#229ED9]/35 hover:border-[#229ED9]/60 hover:bg-[#229ED9]/5",
    hint: "Каталог доступных автомобилей",
  },
  {
    icon: Icon.Instagram,
    title: "Instagram",
    value: "@elitecars.co.ltd",
    href: siteConfig.social.instagram,
    color:
      "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white shadow-[0_8px_20px_-8px_rgb(221_42_123/0.65)]",
    card: "border-[#dd2a7b]/35 hover:border-[#dd2a7b]/60 hover:bg-[#dd2a7b]/5",
    hint: "Фото и видео автомобилей",
  },
  {
    icon: Icon.YouTube,
    title: "YouTube",
    value: "@elitecarskr",
    href: siteConfig.social.youtube,
    color: "bg-[#FF0000] text-white shadow-[0_8px_20px_-8px_rgb(255_0_0/0.55)]",
    card: "border-[#FF0000]/30 hover:border-[#FF0000]/55 hover:bg-[#FF0000]/5",
    hint: "Видеоотчёты осмотров и обзоры",
  },
];

export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Свяжитесь с нами"
        description="Ответим на вопросы, подберём варианты и пришлём расчёт под ключ."
        crumbs={[{ name: "Контакты", path: "/kontakty" }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {channels.map(({ icon: I, title, value, href, color, card, hint }) => (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`group rounded-3xl border bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift ${card}`}
                >
                  <span className={`flex size-12 items-center justify-center rounded-2xl ${color}`}>
                    <I className="size-6" />
                  </span>
                  <p className="mt-4 text-sm font-medium text-muted">{title}</p>
                  <p className="font-display text-lg font-bold text-navy-900 break-all group-hover:text-navy-700">{value}</p>
                  <p className="mt-1 text-xs text-muted">{hint}</p>
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-3xl bg-navy-900 p-7 text-white">
              <div className="flex items-start gap-4">
                <Icon.Pin className="mt-0.5 size-6 shrink-0 text-accent-400" />
                <div>
                  <p className="font-display text-lg font-bold">Офис и приёмка автомобилей</p>
                  <p className="mt-1 text-white/70">{siteConfig.contacts.address}</p>
                  <p className="mt-3 text-sm text-white/55">
                    Наши специалисты работают в Корее (Сеул, Инчхон) и в Бишкеке. Передача автомобилей клиентам —
                    в любом городе России.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-start gap-4">
                <Icon.Clock className="mt-0.5 size-6 shrink-0 text-accent-400" />
                <div>
                  <p className="font-display text-lg font-bold">Время работы</p>
                  <p className="mt-1 text-white/70">{siteConfig.contacts.workingHours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6 shadow-lift sm:p-8">
            <h2 className="font-display text-2xl font-bold text-navy-900">Оставьте заявку</h2>
            <p className="mt-1 text-[15px] text-muted">
              Опишите желаемый автомобиль — пришлём подборку с отчётами и расчётом стоимости в течение суток.
            </p>
            <div className="mt-6">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
