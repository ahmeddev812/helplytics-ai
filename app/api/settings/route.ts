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
    await requireAuth();
    return success({
      theme: "system",
      language: "en",
      emailNotifications: true,
      pushNotifications: true,
      desktopNotifications: false,
      soundEnabled: true,
      showOnlineStatus: true,
      showTrustScore: true,
      autoSuggestions: true,
      aiInsights: true,
      defaultUrgency: "MEDIUM",
      itemsPerPage: 10,
    });
  } catch (err) {
    return error(err);
  }
}

export async function PATCH(req: Request) {
  try {
    await requireAuth();
    const body = await req.json();
    const parsed = SettingsSchema.safeParse(body);
    if (!parsed.success) return error(parsed.error);

    return success(parsed.data);
  } catch (err) {
    return error(err);
  }
}
