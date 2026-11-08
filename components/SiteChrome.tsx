import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { YandexMetrika } from "@/components/YandexMetrika";

/** Public-site frame: header, footer, analytics and site-wide JSON-LD. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <YandexMetrika />
    </>
  );
}
