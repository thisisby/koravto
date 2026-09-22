import Link from "next/link";
import { links, nav, siteConfig } from "@/lib/site";
import { Icon } from "@/components/ui/Icons";
import { Logo } from "@/components/Logo";
import { cars } from "@/lib/content/cars";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="inline-flex items-center">
            <Logo className="h-20 w-auto" />
          </Link>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/60">
            Премиальные автомобили с корейского рынка — с доставкой в Россию через Кыргызстан и легальным
            оформлением в ЕАЭС.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={links.whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-accent-500 hover:text-navy-900"
            >
              <Icon.WhatsApp className="size-5" />
            </a>
            <a
              href={links.telegram()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-accent-500 hover:text-navy-900"
            >
              <Icon.Telegram className="size-5" />
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-accent-500 hover:text-navy-900"
            >
              <Icon.Instagram className="size-5" />
            </a>
            <a
              href={links.email()}
              aria-label="Email"
              className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-accent-500 hover:text-navy-900"
            >
              <Icon.Mail className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/50">Разделы</h3>
          <ul className="mt-4 space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-[15px] text-white/80 transition hover:text-accent-400">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/50">
            Автомобили
          </h3>
          <ul className="mt-4 space-y-2.5">
            {cars.slice(0, 7).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/avtomobili/${c.slug}`}
                  className="text-[15px] text-white/80 transition hover:text-accent-400"
                >
                  {c.brand} {c.model} из Кореи
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/50">Контакты</h3>
          <ul className="mt-4 space-y-3 text-[15px] text-white/80">
            <li className="flex items-start gap-3">
              <Icon.Phone className="mt-0.5 size-5 shrink-0 text-accent-400" />
              <a href={links.phone()} className="hover:text-accent-400">
                {siteConfig.contacts.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Icon.Phone className="mt-0.5 size-5 shrink-0 text-accent-400" />
              <a href={links.phoneKorea()} className="hover:text-accent-400">
                {siteConfig.contacts.phoneKoreaDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Icon.Mail className="mt-0.5 size-5 shrink-0 text-accent-400" />
              <a href={links.email()} className="hover:text-accent-400">
                {siteConfig.contacts.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Icon.Pin className="mt-0.5 size-5 shrink-0 text-accent-400" />
              <span>{siteConfig.contacts.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Icon.Clock className="mt-0.5 size-5 shrink-0 text-accent-400" />
              <span>{siteConfig.contacts.workingHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-[13px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Все права защищены.
          </p>
          <p className="max-w-xl">
            Информация на сайте носит ознакомительный характер и не является публичной офертой.
            Итоговая стоимость фиксируется в договоре.
          </p>
        </div>
      </div>
    </footer>
  );
}
