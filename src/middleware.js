import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const isClientProtectedPath = (pathname) =>
  pathname.startsWith("/dashboard") ||
  pathname.startsWith("/profile") ||
  pathname.startsWith("/bookings") ||
  pathname.startsWith("/booking") ||
  pathname.startsWith("/checkout") ||
  pathname.startsWith("/favorites");

const isProfessionalProtectedPath = (pathname) => pathname.startsWith("/pro/") || pathname === "/pro";
const isSalonAdminProtectedPath = (pathname) => pathname.startsWith("/salon/") || pathname === "/salon";

const redirectToLogin = (req) => {
  const callbackUrl = `${req.nextUrl.pathname}${req.nextUrl.search}`;
  const url = req.nextUrl.clone();
  url.pathname = "/auth/choose-login";
  url.searchParams.set("callbackUrl", callbackUrl);
  return NextResponse.redirect(url);
};

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || "tzeyni-mock-secret-key-for-development",
  });

  if (!token) {
    return redirectToLogin(req);
  }

  if (isProfessionalProtectedPath(pathname)) {
    return token.role === "professional" ? NextResponse.next() : redirectToLogin(req);
  }

  if (isSalonAdminProtectedPath(pathname)) {
    return token.role === "salon_admin" ? NextResponse.next() : redirectToLogin(req);
  }

  if (isClientProtectedPath(pathname)) {
    return token.role === "client" ? NextResponse.next() : redirectToLogin(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/bookings/:path*",
    "/booking/:path*",
    "/checkout/:path*",
    "/favorites/:path*",
    "/pro/:path*",
    "/salon/:path*",
  ],
};