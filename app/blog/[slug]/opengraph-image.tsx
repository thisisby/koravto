import { getArticle } from "@/lib/content/articles";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Статья блога о покупке авто из Кореи";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  return renderOgImage({
    title: a?.title ?? "Блог о покупке авто из Кореи",
    subtitle: a?.description,
    eyebrow: "Блог · Авто из Кореи",
  });
}
