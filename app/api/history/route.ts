import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";

export async function GET() {
  try {
    await requireAuth();
    return success([]);
  } catch (err) {
    return error(err);
  }
}

export async function POST(req: Request) {
  try {
    await requireAuth();
    const { prompt, response, category } = await req.json();

    if (!prompt || !response) {
      return error({ message: "Prompt and response are required", statusCode: 400 });
    }

    return success({
      id: Date.now().toString(),
      prompt,
      response,
      category: category || null,
      createdAt: new Date(),
    }, 201);
  } catch (err) {
    return error(err);
  }
}
