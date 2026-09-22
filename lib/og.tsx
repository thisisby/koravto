import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

async function loadFonts() {
  const [manrope, inter] = await Promise.all([
    readFile(join(process.cwd(), "assets/Manrope-ExtraBold.ttf")),
    readFile(join(process.cwd(), "assets/Inter-Medium.ttf")),
  ]);
  return [
    { name: "Manrope", data: manrope, weight: 800 as const, style: "normal" as const },
    { name: "Inter", data: inter, weight: 500 as const, style: "normal" as const },
  ];
}

/** Shared branded OG image. */
export async function renderOgImage({
  title,
  subtitle,
  eyebrow = "Корея → Кыргызстан → Россия",
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  const fonts = await loadFonts();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(135deg, #070b16 0%, #0b1220 55%, #1a2540 100%)",
          color: "#fff",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -160,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "rgba(245,158,11,0.22)",
            filter: "blur(80px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 40 40">
            <rect width="40" height="40" rx="11" fill="#111a2e" />
            <path d="M9 26.5c3-9 6-13 11-13s8 4 11 13" fill="none" stroke="#f59e0b" strokeWidth="3.2" strokeLinecap="round" />
            <circle cx="9" cy="26.5" r="2.4" fill="#fff" />
            <circle cx="20" cy="13.5" r="2.4" fill="#fff" />
            <circle cx="31" cy="26.5" r="2.4" fill="#fff" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "Manrope", fontSize: 30, fontWeight: 800 }}>{siteConfig.name}</span>
            <span style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>{eyebrow}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 1000 }}>
          <div
            style={{
              fontFamily: "Manrope",
              fontSize: title.length > 60 ? 54 : 66,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 26, lineHeight: 1.4, color: "rgba(255,255,255,0.72)" }}>{subtitle}</div>
          )}
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Подбор и проверка", "Доставка в Бишкек", "Оформление ЕАЭС", "Передача в РФ"].map((t) => (
            <div
              key={t}
              style={{
                padding: "10px 18px",
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: 20,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
