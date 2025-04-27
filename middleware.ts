import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // ✅ Read from cookies
  const details = request.cookies.get("details")?.value; // ✅ Read from cookies
  
  const userId = request.cookies.get("userId")?.value;

  const { pathname } = request.nextUrl;

 
  if (["/home", "/profile", "/settings"].includes(pathname) && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If details is false, redirect to /app/details
  if (
    ["/dashboard", "/profile", "/home"].includes(pathname) &&
    details === "false"
  ) {
    const detailUrl = new URL("/details", request.url);
    return NextResponse.redirect(detailUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/home", "/login"], // where middleware should apply
};
