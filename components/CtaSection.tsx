import { LeadForm } from "@/components/LeadForm";
import { Icon } from "@/components/ui/Icons";
import { links, siteConfig } from "@/lib/site";

export function CtaSection({
  title = "Получите расчёт по вашему автомобилю",
  description = "Опишите модель, год и бюджет — пришлём 3–5 вариантов с корейского рынка с отчётами и расчётом под ключ в течение суток.",
  defaultCar,
}: {
  title?: string;
  description?: string;
  defaultCar?: string;
}) {
  return (
    <section id="zayavka" className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">Подбор без обязательств</p>
          <h2 className="font-display text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">{description}</p>

          <ul className="mt-8 space-y-3 text-[15px] text-white/85">
            {[
              "Варианты с отчётами Carhistory и дилерской историей",
              "Расчёт по каждой статье — без скрытых платежей",
              "Ответ в течение суток",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-accent-500 text-navy-900">
                  <Icon.Check className="size-3.5" />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={links.whatsapp("Здравствуйте! Интересует подбор автомобиля из Кореи.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgb(37_211_102/0.55)] transition hover:bg-[#1ebe57]"
            >
              <Icon.WhatsApp className="size-5" /> WhatsApp
            </a>
            <a
              href={links.telegram()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#229ED9] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgb(34_158_217/0.55)] transition hover:bg-[#1b8fc7]"
            >
              <Icon.Telegram className="size-5" /> Telegram
            </a>
            <a
              href={links.phone()}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy-900 shadow-soft transition hover:bg-white/90"
            >
              <Icon.Phone className="size-5 text-accent-600" /> {siteConfig.contacts.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 text-navy-900 shadow-lift sm:p-8">
          <h3 className="font-display text-xl font-bold">Оставить заявку</h3>
          <p className="mt-1 text-sm text-muted">Заполните форму — мы перезвоним или напишем в мессенджер.</p>
          <div className="mt-6">
            <LeadForm defaultCar={defaultCar} />
          </div>
        </div>
      </div>
    </section>
  );
}
