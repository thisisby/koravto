import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const Icon = {
  Phone: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  ),
  Telegram: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M21.9 4.3 18.8 19c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-.9.5l.3-4.8 8.7-7.9c.4-.3-.1-.5-.6-.2L6.8 12.9 2.2 11.4c-1-.3-1-1 .2-1.5L20.6 3c.8-.3 1.6.2 1.3 1.3Z" />
    </svg>
  ),
  WhatsApp: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.7 3.1.6a2.7 2.7 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  ),
  Mail: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  Pin: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  Clock: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  Check: (p: IconProps) => (
    <svg {...base} strokeWidth={2.25} {...p}>
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  ),
  ArrowRight: (p: IconProps) => (
    <svg {...base} strokeWidth={2} {...p}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  ),
  ChevronDown: (p: IconProps) => (
    <svg {...base} strokeWidth={2} {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  Menu: (p: IconProps) => (
    <svg {...base} strokeWidth={2} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  X: (p: IconProps) => (
    <svg {...base} strokeWidth={2} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  Shield: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Steering: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M3.5 11c3-1.2 6-1.5 8.5-1.5s5.5.3 8.5 1.5M12 14.5V21M9.8 13.6 5 18M14.2 13.6 19 18" />
    </svg>
  ),
  Sparkles: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 3v4m0 10v4m9-9h-4M7 12H3m13.5-5.5-2 2m-9 9-2 2m0-13 2 2m9 9 2 2" />
    </svg>
  ),
  Document: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h5M10 17h5" />
    </svg>
  ),
  Wallet: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M16 14.5h2" />
    </svg>
  ),
  Truck: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M3 7h10v9H3zM13 10h4l3 3v3h-7z" />
      <circle cx="7" cy="17.5" r="1.5" />
      <circle cx="17" cy="17.5" r="1.5" />
    </svg>
  ),
  Ship: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M3 17c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0" />
      <path d="M5 14 4 10h16l-1 4M8 10V6h8v4M12 3v3" />
    </svg>
  ),
  Eye: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Snow: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" />
    </svg>
  ),
  Camera: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  ),
  Handshake: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="m3 10 4-4 5 4-3 3a2 2 0 0 0 3 3l4-4 5 4" />
      <path d="m11 6 4-1 6 5" />
    </svg>
  ),
  Star: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="m12 2 3 6.5 7 .9-5.1 4.8 1.3 7L12 17.8 5.8 21.2l1.3-7L2 9.4l7-.9L12 2Z" />
    </svg>
  ),
  Calculator: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 12h2m2 0h2m2 0h0M8 16h2m2 0h2m2 0h0" />
    </svg>
  ),
  Globe: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
};
