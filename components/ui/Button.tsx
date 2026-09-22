import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "white" | "outline-light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-500 text-navy-900 hover:bg-accent-400 shadow-[0_8px_24px_-8px_rgb(201_162_74/0.6)]",
  secondary: "bg-navy-900 text-white hover:bg-navy-800",
  ghost: "text-navy-900 hover:bg-navy-900/5",
  white: "bg-white text-navy-900 hover:bg-white/90 shadow-soft",
  "outline-light": "border border-white/25 text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 ${variants[variant]} ${sizes[size]} ${extra}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

type AnchorProps = ComponentProps<"a"> & { variant?: Variant; size?: Size };

export function ButtonAnchor({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: AnchorProps) {
  return (
    <a className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </a>
  );
}

type NativeButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: NativeButtonProps) {
  return (
    <button className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </button>
  );
}
