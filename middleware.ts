import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  const { pathname } = url;

  // 1. अगर यूजर 'admin.' सबडोमेन खोल रहा है
  if (hostname.startsWith("admin.")) {
    if (!pathname.startsWith("/admin")) {
      return NextResponse.rewrite(
        new URL(`/admin${pathname === "/" ? "" : pathname}`, req.url)
      );
    }
  }

  // 2. अगर यूजर 'portal.' सबडोमेन खोल रहा है
  if (hostname.startsWith("portal.")) {
    if (!pathname.startsWith("/portal")) {
      return NextResponse.rewrite(
        new URL(`/portal${pathname === "/" ? "" : pathname}`, req.url)
      );
    }
  }

  // Auth pages must always be reachable
  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/portal/login")
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("surefund_admin_token")?.value;
    if (!token) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/portal")) {
    const token = req.cookies.get("surefund_token")?.value;
    if (!token) {
      const loginUrl = new URL("/portal/login", req.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};