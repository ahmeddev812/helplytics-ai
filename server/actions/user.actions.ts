"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";

export async function createUser(clerkId: string, email: string, name: string) {
  try {
    const user = await prisma.user.create({
      data: {
        clerkId,
        email,
        name,
      },
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

export async function getUserByClerkId(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        badges: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function updateUserProfile(clerkId: string, data: any) {
  try {
    const user = await prisma.user.update({
      where: { clerkId },
      data: {
        ...data,
      },
    });
    revalidatePath("/profile");
    revalidatePath("/dashboard");
    return user;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile");
  }
}

export async function getLeaderboard(limit = 10) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        trustScore: "desc",
      },
      take: limit,
      select: {
        id: true,
        name: true,
        trustScore: true,
        badges: true,
        clerkId: true,
      },
    });
    return users;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
}

export async function updateTrustScore(userId: string, increment: number) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        trustScore: {
          increment,
        },
      },
    });
    return user;
  } catch (error) {
    console.error("Error updating trust score:", error);
    throw new Error("Failed to update trust score");
  }
}
