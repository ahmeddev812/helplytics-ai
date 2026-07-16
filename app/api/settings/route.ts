import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";
import { z } from "zod";

const SettingsSchema = z.object({
  theme: z.enum(["system", "light", "dark"]).optional(),
  language: z.string().min(2).max(10).optional(),
  emailNotifications: z.boolean().optional(),
  pushNotifications: z.boolean().optional(),
  desktopNotifications: z.boolean().optional(),
  soundEnabled: z.boolean().optional(),
  showOnlineStatus: z.boolean().optional(),
  showTrustScore: z.boolean().optional(),
  autoSuggestions: z.boolean().optional(),
  aiInsights: z.boolean().optional(),
  defaultUrgency: z.string().optional(),
  itemsPerPage: z.number().int().min(5).max(100).optional(),
  preferences: z.any().optional(),
});

export async function GET() {
  try {
    const user = await requireAuth();

    let settings = await prisma.userSettings.findUnique({
      where: { userId: user.id },
    });

    if (!settings) {
      settings = await prisma.userSettings.create({
        data: { userId: user.id },
      });
    }

    return success(settings);
  } catch (err) {
    return error(err);
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const parsed = SettingsSchema.safeParse(body);

    if (!parsed.success) return error(parsed.error);

    const settings = await prisma.userSettings.upsert({
      where: { userId: user.id },
      update: parsed.data,
      create: { userId: user.id, ...parsed.data },
    });

    if (parsed.data.theme) {
      await prisma.user.update({
        where: { id: user.id },
        data: { theme: parsed.data.theme },
      });
    }

    return success(settings);
  } catch (err) {
    return error(err);
  }
}
