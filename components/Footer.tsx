import Link from "next/link";
import { links, nav, siteConfig } from "@/lib/site";
import { Icon } from "@/components/ui/Icons";
import { Logo } from "@/components/Logo";
import { getPublishedCars } from "@/lib/data/cars";

export async function Footer() {
  const year = new Date().getFullYear();
  const cars = await getPublishedCars();
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
              className="inline-flex size-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_18px_-6px_rgb(37_211_102/0.7)] transition hover:bg-[#1ebe57]"
            >
              <Icon.WhatsApp className="size-5" />
            </a>
            <a
              href={links.telegram()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="inline-flex size-10 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-[0_6px_18px_-6px_rgb(34_158_217/0.7)] transition hover:bg-[#1b8fc7]"
            >
              <Icon.Telegram className="size-5" />
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white shadow-[0_6px_18px_-6px_rgb(221_42_123/0.7)] transition hover:brightness-110"
            >
              <Icon.Instagram className="size-5" />
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="inline-flex size-10 items-center justify-center rounded-full bg-[#FF0000] text-white shadow-[0_6px_18px_-6px_rgb(255_0_0/0.55)] transition hover:bg-[#e60000]"
            >
              <Icon.YouTube className="size-5" />
            </a>
            <a
              href={links.email()}
              aria-label="Email"
              className="inline-flex size-10 items-center justify-center rounded-full bg-[#EA4335] text-white shadow-[0_6px_18px_-6px_rgb(234_67_53/0.55)] transition hover:bg-[#d33426]"
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
