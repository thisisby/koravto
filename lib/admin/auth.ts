import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_LOGIN_PATH,
  ADMIN_PATH,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  createSessionToken,
  verifySessionToken,
} from "./session";

export async function isAdmin() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** For Server Components: redirect to the login page when there is no valid session. */
export async function requireAdminPage() {
  if (!(await isAdmin())) redirect(ADMIN_LOGIN_PATH);
}

/** For Server Actions / Route Handlers: throw when there is no valid session. */
export async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Unauthorized");
}

export async function startSession() {
  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: ADMIN_PATH,
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function endSession() {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", { httpOnly: true, sameSite: "lax", path: ADMIN_PATH, maxAge: 0 });
}
