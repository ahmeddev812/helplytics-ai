import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/profile(.*)",
  "/settings(.*)",
  "/messages(.*)",
  "/notifications(.*)",
  "/request(.*)",
  "/ai-center",
  "/explore",
  "/leaderboard",
  "/onboarding",
]);

export const proxy = clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) {
    auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
