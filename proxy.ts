import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/onboarding",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  // Define the Content Security Policy header
  // Note: 'unsafe-eval' is included to allow libraries that require string evaluation.
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.clerk.com clerk.com;
    connect-src 'self' *.clerk.com clerk.com;
    img-src 'self' data: img.clerk.com;
    worker-src 'self' blob:;
    style-src 'self' 'unsafe-inline';
    frame-src 'self' *.clerk.com clerk.com;
  `.replace(/\s{2,}/g, ' ').trim();

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', cspHeader);
  
  return response;
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};