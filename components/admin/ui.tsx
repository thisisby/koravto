import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* Small set of form/layout primitives for the admin panel. */

export const inputClass =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-[14px] text-navy-900 outline-none transition placeholder:text-muted/60 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 disabled:bg-surface";

export function Input(props: ComponentProps<"input">) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function Textarea(props: ComponentProps<"textarea">) {
  return <textarea {...props} className={`${inputClass} min-h-24 resize-y ${props.className ?? ""}`} />;
}

export function Select(props: ComponentProps<"select">) {
  return <select {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function Field({ label, hint, children, className = "" }: { label: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[13px] font-semibold text-navy-900">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6 ${className}`}>{children}</section>;
}

export function PageTitle({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-[14px] text-muted">{description}</p>}
      </div>
      {action && <div className="flex shrink-0 gap-2">{action}</div>}
    </div>
  );
}

const btn = {
  base: "inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-[14px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
  primary: "bg-navy-900 text-white hover:bg-navy-700",
  secondary: "border border-line bg-white text-navy-900 hover:border-navy-900/30 hover:bg-surface",
  danger: "border border-red-200 bg-white text-red-700 hover:bg-red-50",
  ghost: "text-navy-900 hover:bg-surface",
};

export type ButtonVariant = keyof Omit<typeof btn, "base">;

export function buttonClass(variant: ButtonVariant = "primary", extra = "") {
  return `${btn.base} ${btn[variant]} ${extra}`;
}

export function Button({ variant = "primary", className = "", ...props }: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return <button {...props} className={buttonClass(variant, className)} />;
}

export function LinkButton({ variant = "primary", className = "", ...props }: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return <Link {...props} className={buttonClass(variant, className)} />;
}

export function Notice({ tone = "info", children }: { tone?: "info" | "error" | "success" | "warn"; children: ReactNode }) {
  const tones = {
    info: "border-sky-200 bg-sky-50 text-sky-900",
    error: "border-red-200 bg-red-50 text-red-800",
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
    warn: "border-amber-300 bg-amber-50 text-amber-900",
  };
  return (
    <div role={tone === "error" ? "alert" : undefined} className={`rounded-xl border px-4 py-3 text-[14px] leading-relaxed ${tones[tone]}`}>
      {children}
    </div>
  );
}

export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${className}`}>{children}</span>;
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface/60 p-10 text-center">
      <p className="font-semibold text-navy-900">{title}</p>
      {children && <div className="mt-2 text-[14px] text-muted">{children}</div>}
    </div>
  );
}

export function formatDate(iso: string) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("ru-RU", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Moscow" }).format(new Date(iso));
}
