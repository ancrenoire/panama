import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AUTH_COOKIE_NAME,
  isAuthorized,
} from "@/lib/site-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authorized = isAuthorized(
    request.cookies.get(AUTH_COOKIE_NAME)?.value,
  );

  if (pathname === "/login") {
    if (authorized) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!authorized) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Protect all routes except Next internals and static public assets.
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|robots.txt).*)",
  ],
};
