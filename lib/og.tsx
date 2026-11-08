import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

async function loadAssets() {
  const [manrope, inter, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/Manrope-ExtraBold.ttf")),
    readFile(join(process.cwd(), "assets/Inter-Medium.ttf")),
    readFile(join(process.cwd(), "public/logo-wide.png")),
  ]);
  return {
    fonts: [
      { name: "Manrope", data: manrope, weight: 800 as const, style: "normal" as const },
      { name: "Inter", data: inter, weight: 500 as const, style: "normal" as const },
    ],
    logoSrc: `data:image/png;base64,${logo.toString("base64")}`,
  };
}

/** Loads a photo as a data URL; remote URLs are fetched, local paths are read from /public. Never throws. */
async function loadPhoto(photo: string): Promise<string | null> {
  try {
    if (/^https?:\/\//.test(photo)) {
      const res = await fetch(photo);
      if (!res.ok) return null;
      const type = res.headers.get("content-type")?.split(";")[0] || "image/jpeg";
      return `data:${type};base64,${Buffer.from(await res.arrayBuffer()).toString("base64")}`;
    }
    const file = await readFile(join(process.cwd(), "public", photo));
    const type = photo.endsWith(".png") ? "image/png" : photo.endsWith(".webp") ? "image/webp" : "image/jpeg";
    return `data:${type};base64,${file.toString("base64")}`;
  } catch (err) {
    console.warn("[og] could not load photo", photo, err);
    return null;
  }
}

/** Shared branded OG image with the official logo. */
export async function renderOgImage({
  title,
  subtitle,
  eyebrow = "Корея → Кыргызстан → Россия",
  photo,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  /** Photo shown on the right side: absolute URL (Vercel Blob) or a path under /public (e.g. "/cars/genesis-g90.jpg") */
  photo?: string;
}) {
  const { fonts, logoSrc } = await loadAssets();
  const photoSrc = photo ? await loadPhoto(photo) : null;
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
          background: "linear-gradient(135deg, #000000 0%, #000000 55%, #1c2029 100%)",
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
            background: "rgba(201,162,74,0.2)",
            filter: "blur(80px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={278} height={110} alt="" style={{ borderRadius: 12 }} />
          <span style={{ fontSize: 18, color: "rgba(255,255,255,0.55)" }}>{eyebrow}</span>
        </div>

        {photoSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoSrc}
            width={480}
            height={300}
            alt=""
            style={{
              position: "absolute",
              right: 64,
              top: 200,
              borderRadius: 24,
              objectFit: "cover",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          />
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: photoSrc ? 560 : 1000 }}>
          <div
            style={{
              fontFamily: "Manrope",
              fontSize: photoSrc ? 50 : title.length > 60 ? 54 : 66,
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
