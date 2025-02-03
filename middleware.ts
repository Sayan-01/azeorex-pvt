import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  const { pathname, searchParams, host } = req.nextUrl;

  console.log("Middleware Pathname:", pathname, "Host:", host, "URL:", req.url);

  const searchParamsString = searchParams.toString();
  const pathWithSearchParams = `${pathname}${searchParamsString.length > 0 ? `?${searchParamsString}` : ""}`;

  // Extract custom subdomain
  const domain = process.env.NEXT_PUBLIC_URL_DOMAIN;
  const subdomains = host.split(`.${domain}`).filter(Boolean); // Ensure domain is handled as expected
  const customSubDomain = subdomains.length > 0 ? subdomains[0] : null;

  if (customSubDomain) {
    return NextResponse.rewrite(new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url));
  }

  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return NextResponse.redirect(new URL(`/agency/sign-in`, req.url));
  }

  if (pathname === "/" || (pathname === "/site" && host === domain)) {
    return NextResponse.rewrite(new URL("/site", req.url));
  }

  if (pathname.startsWith("/agency") || pathname.startsWith("/subaccount")) {
    return NextResponse.rewrite(new URL(pathWithSearchParams, req.url));
  }

  return NextResponse.next();
});

// Exclude static files and `_next` paths
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)", // Exclude specific static paths
    "/",
    "/(api|trpc)(.*)",
    "/sign-in",
  ],
};
