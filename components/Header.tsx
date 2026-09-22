"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { links, nav, siteConfig } from "@/lib/site";
import { Icon } from "@/components/ui/Icons";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 text-white transition-colors duration-300 ${
        scrolled || open ? "border-b border-white/10 bg-navy-900/90 backdrop-blur-xl" : "bg-navy-900"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <Link href="/" className="flex items-center" aria-label={`${siteConfig.name} — на главную`}>
          <Logo className="h-12 w-auto lg:h-14" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-[13.5px] font-medium whitespace-nowrap transition-colors xl:px-3.5 xl:text-[14px] ${
                  active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
                title={item.label}
              >
                {item.short}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={links.phone()}
            className="hidden text-[15px] font-semibold whitespace-nowrap text-white transition hover:text-accent-400 xl:block"
          >
            {siteConfig.contacts.phoneDisplay}
          </a>
          <ButtonAnchor
            href={links.whatsapp("Здравствуйте! Интересует автомобиль из Кореи.")}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
          >
            <Icon.WhatsApp className="size-4" />
            Написать
          </ButtonAnchor>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          {open ? <Icon.X className="size-6" /> : <Icon.Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-navy-900 lg:hidden">
          <nav className="container-x flex flex-col py-4" aria-label="Мобильная навигация">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 text-lg font-medium text-white"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3 pb-24">
              <ButtonAnchor
                href={links.whatsapp("Здравствуйте! Интересует расчёт стоимости автомобиля из Кореи.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon.WhatsApp className="size-5" />
                Написать в WhatsApp
              </ButtonAnchor>
              <ButtonAnchor href={links.telegram()} target="_blank" rel="noopener noreferrer" variant="outline-light">
                <Icon.Telegram className="size-5" />
                Написать в Telegram
              </ButtonAnchor>
              <ButtonLink href="/kontakty" variant="outline-light" onClick={() => setOpen(false)}>
                <Icon.Phone className="size-5" />
                {siteConfig.contacts.phoneDisplay}
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
