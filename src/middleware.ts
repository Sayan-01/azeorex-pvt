import { auth } from "../auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export default auth((req) => {

  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  let hostname = req.headers;
  let host = req.headers.get("host");

  const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;
  const publicRoutes = ["/", "/api/uploadthing"];
  const isPublicRoute = publicRoutes.some((route) => url.pathname.startsWith(route));

  const isAuthenticated = !!req.auth;

  const customSubDomain = hostname.get("host")?.split(`${process.env.NEXT_PUBLIC_URL_DOMAIN}`).filter(Boolean)[0];

  if (customSubDomain && host !== process.env.NEXT_PUBLIC_URL_DOMAIN) {
    return NextResponse.rewrite(new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url));
  } 

  // Redirect sign-in and sign-up routes
  if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
    return NextResponse.redirect(new URL(`auth/login`, req.url));
  }

  // Protect private routes - redirect to sign-in if not authenticated
  if (!isAuthenticated && !isPublicRoute) {
    // Allow access to auth pages
    if (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up")) {
      return NextResponse.next();
    }

    // Redirect to sign-in for protected routes
    if (url.pathname.startsWith("/agency") || url.pathname.startsWith("/subaccount") || url.pathname.startsWith("/api")) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
