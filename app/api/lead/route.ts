import { NextResponse, type NextRequest } from "next/server";
import { siteConfig } from "@/lib/site";
import { createLead } from "@/lib/data/leads";

type LeadPayload = {
  name?: string;
  phone?: string;
  car?: string;
  message?: string;
  page?: string;
  website?: string; // honeypot
};

const MAX = { name: 80, phone: 60, car: 200, message: 1000 };

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/* Simple in-memory rate limit (per server instance) */
const hits = new Map<string, { count: number; ts: number }>();
function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.ts > 60_000) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Слишком много запросов, попробуйте позже" }, { status: 429 });
  }

  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  // Bots fill hidden fields — silently accept and drop.
  if (body.website) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(body.name, MAX.name),
    phone: clean(body.phone, MAX.phone),
    car: clean(body.car, MAX.car),
    message: clean(body.message, MAX.message),
    page: clean(body.page, 200),
  };

  if (lead.name.length < 2 || lead.phone.length < 5) {
    return NextResponse.json({ error: "Укажите имя и телефон" }, { status: 400 });
  }

  // 1. Persist to the CRM (storage). This is the system of record.
  let saved = false;
  try {
    await createLead({
      ...lead,
      ip: ip === "unknown" ? undefined : ip,
      userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? undefined,
      referer: request.headers.get("referer")?.slice(0, 300) ?? undefined,
    });
    saved = true;
  } catch (err) {
    console.error("[lead] storage write failed", err);
  }

  // 2. Notify via Telegram (optional).
  const text = [
    `🚗 Новая заявка — ${siteConfig.name}`,
    ``,
    `👤 Имя: ${lead.name}`,
    `📞 Контакт: ${lead.phone}`,
    lead.car ? `🔎 Авто: ${lead.car}` : null,
    lead.message ? `💬 Комментарий: ${lead.message}` : null,
    ``,
    `📄 Страница: ${lead.page || "/"}`,
    `🗂 CRM: ${new URL("/super/secret/admin/leads", siteConfig.url).toString()}`,
  ]
    .filter((l): l is string => l !== null)
    .join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  let notified = false;
  if (token && chatId) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
      if (res.ok) notified = true;
      else console.error("Telegram sendMessage failed", res.status, await res.text());
    } catch (err) {
      console.error("Telegram request error", err);
    }
  } else {
    // No delivery channel configured yet — log so nothing is lost during development.
    console.log("[lead]", text);
  }

  if (!saved && !notified) {
    return NextResponse.json({ error: "Не удалось отправить заявку" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
