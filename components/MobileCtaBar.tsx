"use client";

import { usePathname } from "next/navigation";
import { links } from "@/lib/site";
import { Icon } from "@/components/ui/Icons";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";

const PROCESS_HREF = "/kak-eto-rabotaet";

export function MobileCtaBar() {
  const pathname = usePathname();
  const onProcessPage = pathname === PROCESS_HREF || pathname.startsWith(PROCESS_HREF + "/");

  if (onProcessPage) return null;

  return (
    <>
      {/* Spacer so the fixed bar never covers the footer */}
      <div className="h-[4.75rem] bg-navy-950 lg:hidden" aria-hidden />

      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/90 backdrop-blur-xl lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="container-x flex items-center gap-2.5 pt-3">
          <ButtonLink href={PROCESS_HREF} size="md" className="flex-1">
            Как это работает
            <Icon.ArrowRight className="size-4" />
          </ButtonLink>
          <ButtonAnchor
            href={links.whatsapp("Здравствуйте! Интересует автомобиль из Кореи.")}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-light"
            size="md"
            aria-label="Написать в WhatsApp"
            className="shrink-0 px-4"
          >
            <Icon.WhatsApp className="size-5" />
          </ButtonAnchor>
        </div>
      </div>
    </>
  );
}
