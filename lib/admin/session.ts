/**
 * Admin session primitives. Uses only Web Crypto so the same code runs in
 * `proxy.ts` and in Server Components / Server Actions.
 *
 * A session is a signed token `<expiresAt>.<hmac>`; the HMAC key is derived from
 * ADMIN_LOGIN + ADMIN_PASSWORD (+ optional ADMIN_SESSION_SECRET), so changing the
 * password invalidates every existing session.
 */

export { ADMIN_LOGIN_PATH, ADMIN_PATH } from "./paths";
export const SESSION_COOKIE = "ec_admin";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

const enc = new TextEncoder();

function env(name: string) {
  return (process.env[name] ?? "").trim();
}

export function adminConfigured() {
  return env("ADMIN_LOGIN").length > 0 && env("ADMIN_PASSWORD").length >= 8;
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array) {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let bin = "";
  for (const b of arr) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sha256(input: string) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(input)));
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function signingKey() {
  const material = await sha256(`${env("ADMIN_LOGIN")}\n${env("ADMIN_PASSWORD")}\n${env("ADMIN_SESSION_SECRET")}`);
  return crypto.subtle.importKey("raw", material, { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

async function sign(payload: string) {
  const key = await signingKey();
  return toBase64Url(await crypto.subtle.sign("HMAC", key, enc.encode(payload)));
}

export async function createSessionToken(now = Date.now()) {
  const exp = String(now + SESSION_TTL_SECONDS * 1000);
  return `${exp}.${await sign(exp)}`;
}

export async function verifySessionToken(token: string | undefined, now = Date.now()) {
  if (!token || !adminConfigured()) return false;
  const dot = token.indexOf(".");
  if (dot === -1) return false;
  const exp = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^\d{10,16}$/.test(exp) || Number(exp) < now) return false;
  const expected = await sign(exp);
  return timingSafeEqual(enc.encode(sig), enc.encode(expected));
}

/** Constant-time credential check (compares SHA-256 digests to avoid length leaks). */
export async function verifyCredentials(login: string, password: string) {
  if (!adminConfigured()) return false;
  const [l1, l2, p1, p2] = await Promise.all([
    sha256(login),
    sha256(env("ADMIN_LOGIN")),
    sha256(password),
    sha256(env("ADMIN_PASSWORD")),
  ]);
  const loginOk = timingSafeEqual(l1, l2);
  const passOk = timingSafeEqual(p1, p2);
  return loginOk && passOk;
}
