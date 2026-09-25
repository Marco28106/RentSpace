import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login", "/register", "/become-owner"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("rentspace_token")?.value;
  const isPublicRoute = publicRoutes.includes(pathname);

  if (!token && (pathname === "/" || !isPublicRoute)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicRoute && pathname !== "/become-owner" && pathname !== "/register" && pathname !== "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
