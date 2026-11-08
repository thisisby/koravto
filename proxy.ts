import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_LOGIN_PATH, ADMIN_PATH, SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";

/**
 * Optimistic guard for the admin panel: redirects anonymous visitors to the login
 * page and keeps the whole area out of search engines. Pages and actions still
 * verify the session themselves (`lib/admin/auth.ts`).
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isLogin = pathname === ADMIN_LOGIN_PATH;
  const authed = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);

  let response: NextResponse;
  if (!authed && !isLogin) {
    const url = new URL(ADMIN_LOGIN_PATH, request.url);
    if (pathname !== ADMIN_PATH) url.searchParams.set("next", pathname + search);
    response = NextResponse.redirect(url);
  } else if (authed && isLogin) {
    response = NextResponse.redirect(new URL(ADMIN_PATH, request.url));
  } else {
    response = NextResponse.next();
  }

  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/super/secret/admin/:path*"],
};
