import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Автомобили из Кореи в Россию через Кыргызстан под ключ";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Авто из Кореи в Россию через Кыргызстан под ключ",
    subtitle: "Подбор, проверка, выкуп, доставка и легальное оформление в ЕАЭС. Экономия 15–30% относительно цен в РФ.",
  });
}
