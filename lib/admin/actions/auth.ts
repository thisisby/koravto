"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { endSession, startSession } from "@/lib/admin/auth";
import { ADMIN_LOGIN_PATH, ADMIN_PATH } from "@/lib/admin/paths";
import { adminConfigured, verifyCredentials } from "@/lib/admin/session";
import { str, type ActionState } from "./types";

/* Login attempts per IP (per server instance): 10 per 15 minutes. */
const attempts = new Map<string, { count: number; ts: number }>();
function tooManyAttempts(ip: string) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.ts > 15 * 60_000) {
    attempts.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count += 1;
  return entry.count > 10;
}

function safeNext(next: string) {
  return next.startsWith(ADMIN_PATH) && !next.startsWith(ADMIN_LOGIN_PATH) && !next.includes("//") ? next : ADMIN_PATH;
}

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (!adminConfigured()) {
    return { ok: false, error: "Админ-панель не настроена: задайте ADMIN_LOGIN и ADMIN_PASSWORD (не короче 8 символов)." };
  }
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (tooManyAttempts(ip)) {
    return { ok: false, error: "Слишком много попыток. Подождите 15 минут." };
  }

  const login = str(formData, "login", 100);
  const password = str(formData, "password", 200);
  // Small constant delay to slow down brute force.
  await new Promise((r) => setTimeout(r, 300));
  if (!(await verifyCredentials(login, password))) {
    return { ok: false, error: "Неверный логин или пароль" };
  }

  await startSession();
  redirect(safeNext(str(formData, "next", 300)));
}

export async function logoutAction() {
  await endSession();
  redirect(ADMIN_LOGIN_PATH);
}
