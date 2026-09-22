import { links, siteConfig } from "@/lib/site";
import { Icon } from "@/components/ui/Icons";

/** Fixed bottom bar with instant contact actions — mobile only. */
export function StickyContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-lg lg:hidden">
      <div className="grid grid-cols-3 divide-x divide-line text-[12px] font-semibold text-navy-900">
        <a
          href={links.whatsapp("Здравствуйте! Хочу рассчитать стоимость авто из Кореи.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-2.5"
        >
          <Icon.WhatsApp className="size-5 text-emerald-600" />
          WhatsApp
        </a>
        <a
          href={links.telegram()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-2.5"
        >
          <Icon.Telegram className="size-5 text-sky-600" />
          Telegram
        </a>
        <a href={links.phone()} className="flex flex-col items-center gap-1 py-2.5">
          <Icon.Phone className="size-5 text-accent-600" />
          Позвонить
        </a>
      </div>
      <span className="sr-only">{siteConfig.contacts.phoneDisplay}</span>
    </div>
  );
}
