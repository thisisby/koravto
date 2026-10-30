"use client";

import { useEffect, useSyncExternalStore } from "react";
import { siteConfig } from "@/lib/site";

/** sessionStorage keys the lead form writes right before redirecting to /spasibo. */
export const LEAD_NAME_KEY = "lead:name";
export const LEAD_PENDING_KEY = "lead:pending";

declare global {
  interface Window {
    ym?: (id: number | string, action: string, goal?: string, params?: Record<string, unknown>) => void;
  }
}

/** "Спасибо, Имя!" if the form passed a name, otherwise just "Спасибо!". */
const noop = () => () => {};
const readName = () => {
  try {
    return sessionStorage.getItem(LEAD_NAME_KEY)?.trim().split(/\s+/)[0] ?? "";
  } catch {
    return "";
  }
};

export function ThankYouGreeting() {
  // Server renders the generic greeting; the client swaps in the name after hydration.
  const name = useSyncExternalStore(noop, readName, () => "");
  return <>{name ? `Спасибо, ${name}!` : "Спасибо!"}</>;
}

/** Fires the Yandex.Metrika "lead" goal once per form submission (not on reloads). */
export function LeadGoal() {
  useEffect(() => {
    if (!sessionStorage.getItem(LEAD_PENDING_KEY)) return;
    sessionStorage.removeItem(LEAD_PENDING_KEY);
    const id = siteConfig.analytics.yandexMetrikaId;
    if (id) window.ym?.(id, "reachGoal", "lead");
  }, []);
  return null;
}
