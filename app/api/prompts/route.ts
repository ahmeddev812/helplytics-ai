import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";
import { SUGGESTED_PROMPTS } from "@/lib/constants";

export async function GET() {
  try {
    await requireAuth();
    return success([...SUGGESTED_PROMPTS]);
  } catch (err) {
    return error(err);
  }
}

export async function POST(req: Request) {
  try {
    await requireAuth();
    const { prompt, category } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return error({ message: "Prompt is required", statusCode: 400 });
    }

    return success({
      id: Date.now().toString(),
      prompt,
      response: "",
      category: category || null,
      createdAt: new Date(),
    }, 201);
  } catch (err) {
    return error(err);
  }
}
