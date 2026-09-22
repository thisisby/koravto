import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Премиальные автомобили из Кореи с доставкой в Россию";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Премиальные автомобили из Кореи с доставкой в Россию",
    subtitle: "Mercedes-Benz, BMW, Porsche, Land Rover, Genesis — от 60 000 $. Подбор, проверка, доставка и оформление под ключ.",
  });
}
