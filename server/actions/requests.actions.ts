"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { RequestStatus, UrgencyLevel } from "@prisma/client";

export async function createRequest(clerkId: string, data: any) {
  try {
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) throw new Error("User not found");

    const request = await prisma.request.create({
      data: {
        ...data,
        userId: user.id,
      },
    });
    revalidatePath("/explore");
    revalidatePath("/dashboard");
    return request;
  } catch (error) {
    console.error("Error creating request:", error);
    throw new Error("Failed to create request");
  }
}

export async function getRequests(filters: any = {}) {
  try {
    const requests = await prisma.request.findMany({
      where: filters,
      include: {
        user: true,
        helpOffers: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return requests;
  } catch (error) {
    console.error("Error fetching requests:", error);
    return [];
  }
}

export async function getRequestById(id: string) {
  try {
    const request = await prisma.request.findUnique({
      where: { id },
      include: {
        user: true,
        helpOffers: {
          include: {
            user: true,
          },
        },
      },
    });
    return request;
  } catch (error) {
    console.error("Error fetching request:", error);
    return null;
  }
}

export async function updateRequestStatus(id: string, status: RequestStatus) {
  try {
    const request = await prisma.request.update({
      where: { id },
      data: { status },
    });
    revalidatePath(`/request/${id}`);
    revalidatePath("/explore");
    return request;
  } catch (error) {
    console.error("Error updating request status:", error);
    throw new Error("Failed to update status");
  }
}

export async function offerHelp(requestId: string, clerkId: string, message: string) {
  try {
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) throw new Error("User not found");

    const offer = await prisma.helpOffer.create({
      data: {
        requestId,
        userId: user.id,
        message,
      },
    });

    await prisma.notification.create({
      data: {
        userId: (await prisma.request.findUnique({ where: { id: requestId } }))?.userId || "",
        title: "New Help Offer",
        message: `${user.name} has offered to help with your request.`,
        type: "HELP_OFFER",
      },
    });

    revalidatePath(`/request/${requestId}`);
    return offer;
  } catch (error) {
    console.error("Error offering help:", error);
    throw new Error("Failed to offer help");
  }
}

export async function markAsSolved(requestId: string, helperId: string) {
  try {
    const request = await prisma.request.update({
      where: { id: requestId },
      data: {
        status: "RESOLVED",
        helperId: helperId,
        solvedAt: new Date(),
      },
    });

    // Award trust points to helper
    await prisma.user.update({
      where: { id: helperId },
      data: {
        trustScore: {
          increment: 10,
        },
      },
    });

    revalidatePath(`/request/${requestId}`);
    revalidatePath("/dashboard");
    return request;
  } catch (error) {
    console.error("Error marking request as solved:", error);
    throw new Error("Failed to mark as solved");
  }
}
