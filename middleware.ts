import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Auth pages must always be reachable
  if (pathname.startsWith("/admin/login") || pathname.startsWith("/portal/login")) {
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
  matcher: ["/admin/:path*", "/portal/:path*"],
};
