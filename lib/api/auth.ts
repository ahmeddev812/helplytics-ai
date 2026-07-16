import { auth } from "@clerk/nextjs/server";
import { UnauthorizedError, ForbiddenError } from "./errors";

export interface AuthUser {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  role: string;
  trustScore: number;
  badges: string[];
  avatarUrl: string | null;
}

export async function getAuthUser(): Promise<AuthUser> {
  const session = await auth();
  const userId = session.userId;
  if (!userId) throw new UnauthorizedError();

  return {
    id: userId,
    clerkId: userId,
    email: session.sessionClaims?.email as string || "",
    name: (session.sessionClaims?.name as string) || null,
    role: "BOTH",
    trustScore: 0,
    badges: [],
    avatarUrl: null,
  };
}

export async function requireAuth(): Promise<AuthUser> {
  const session = await auth();
  const clerkId = session.userId;
  if (!clerkId) throw new UnauthorizedError();

  return {
    id: clerkId,
    clerkId,
    email: session.sessionClaims?.email as string || "",
    name: (session.sessionClaims?.name as string) || null,
    role: "BOTH",
    trustScore: 0,
    badges: [],
    avatarUrl: null,
  };
}

export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireAuth();
  if (user.role !== "CAN_HELP" && user.role !== "BOTH") {
    throw new ForbiddenError("Admin access required");
  }
  return user;
}

export async function getAuthUserOrNull(): Promise<AuthUser | null> {
  try {
    return await getAuthUser();
  } catch {
    return null;
  }
}
