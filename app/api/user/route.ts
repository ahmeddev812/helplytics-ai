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

    return success({
      id: authUser.id,
      clerkId: authUser.clerkId,
      email: authUser.email,
      name: authUser.name,
      role: "BOTH",
      skills: [],
      interests: [],
      location: null,
      bio: null,
      trustScore: 0,
      badges: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      stats: {
        totalRequests: 0,
        totalHelpOffers: 0,
        totalConversations: 0,
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

    return success({ ...parsed.data, clerkId: authUser.clerkId });
  } catch (err) {
    return error(err);
  }
}
