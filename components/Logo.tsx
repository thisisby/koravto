import Image from "next/image";
import { siteConfig } from "@/lib/site";
import logoWide from "@/public/logo-wide.png";

/**
 * Official Elite Cars logo (wide crop). The artwork has a black background,
 * so it is always shown on dark surfaces.
 */
export function Logo({ className = "h-11 w-auto" }: { className?: string }) {
  return (
    <Image
      src={logoWide}
      alt={`${siteConfig.name} — ${siteConfig.logoTagline}`}
      className={`${className} select-none`}
      priority
      sizes="140px"
    />
  );
}
