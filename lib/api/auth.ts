import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { UnauthorizedError, ForbiddenError } from "./errors";

export async function getAuthUser() {
  const session = await auth();
  const userId = session.userId;
  if (!userId) throw new UnauthorizedError();

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: {
      id: true,
      clerkId: true,
      email: true,
      name: true,
      role: true,
      trustScore: true,
      badges: true,
      avatarUrl: true,
    },
  });

  if (!user) throw new UnauthorizedError("User not found in database");
  return user;
}

export async function requireAuth() {
  const session = await auth();
  const clerkId = session.userId;
  if (!clerkId) throw new UnauthorizedError();

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: {
      id: true,
      clerkId: true,
      email: true,
      name: true,
      role: true,
      trustScore: true,
      badges: true,
      avatarUrl: true,
    },
  });

  if (!user) throw new UnauthorizedError("User not found");
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== "CAN_HELP" && user.role !== "BOTH") {
    throw new ForbiddenError("Admin access required");
  }
  return user;
}

export async function getAuthUserOrNull() {
  try {
    return await getAuthUser();
  } catch {
    return null;
  }
}
