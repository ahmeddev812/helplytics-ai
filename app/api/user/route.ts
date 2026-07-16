import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";
import { z } from "zod";

const UpdateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  role: z.enum(["NEED_HELP", "CAN_HELP", "BOTH"]).optional(),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  location: z.string().max(200).optional().nullable(),
  bio: z.string().max(500).optional().nullable(),
});

export async function GET() {
  try {
    const authUser = await requireAuth();

    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: {
        id: true,
        clerkId: true,
        email: true,
        name: true,
        role: true,
        skills: true,
        interests: true,
        location: true,
        bio: true,
        avatarUrl: true,
        trustScore: true,
        badges: true,
        theme: true,
        language: true,
        createdAt: true,
        _count: {
          select: {
            requests: true,
            helpOffers: true,
            conversations: true,
            notifications: true,
          },
        },
      },
    });

    return success({
      ...user,
      stats: {
        totalRequests: user?._count?.requests || 0,
        totalHelpOffers: user?._count?.helpOffers || 0,
        totalConversations: user?._count?.conversations || 0,
      },
    });
  } catch (err) {
    return error(err);
  }
}

export async function PATCH(req: Request) {
  try {
    const authUser = await requireAuth();
    const body = await req.json();
    const parsed = UpdateProfileSchema.safeParse(body);

    if (!parsed.success) return error(parsed.error);

    const user = await prisma.user.update({
      where: { id: authUser.id },
      data: parsed.data,
      select: {
        id: true,
        name: true,
        role: true,
        skills: true,
        interests: true,
        location: true,
        bio: true,
        updatedAt: true,
      },
    });

    return success(user);
  } catch (err) {
    return error(err);
  }
}
