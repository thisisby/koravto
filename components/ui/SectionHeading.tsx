import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Tag = "h2",
}: Props) {
  const isDark = tone === "dark";
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.18em] ${
            isDark ? "text-accent-400" : "text-accent-600"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        className={`font-display text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          isDark ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={`mt-4 text-balance text-lg leading-relaxed ${
            isDark ? "text-white/70" : "text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
