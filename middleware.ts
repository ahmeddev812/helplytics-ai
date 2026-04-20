import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  const isPublic = ["/", "/sign-in", "/sign-up"].some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!userId && !isPublic) {
    return Response.redirect(new URL("/sign-in", req.url));
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};