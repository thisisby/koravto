import { formatRange, getCar } from "@/lib/content/cars";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Автомобиль из Кореи с доставкой в Россию";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCar(slug);
  return renderOgImage({
    title: c ? `${c.brand} ${c.model} из Кореи` : "Автомобили из Кореи",
    subtitle: c ? `${c.segment} · ${c.years} · под ключ в России ${formatRange(c.priceTurnkey)}` : undefined,
    eyebrow: "Каталог · Корея → Кыргызстан → Россия",
  });
}
