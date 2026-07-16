import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/auth";
import { error } from "@/lib/api/response";
import { trackDailyUsage } from "@/lib/api/analytics";
import { NotFoundError, ForbiddenError } from "@/lib/api/errors";

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const { conversationId, format } = await req.json();

    if (!conversationId) {
      return error({ message: "conversationId is required", statusCode: 400 });
    }

    const fmt = format === "md" ? "md" : "txt";

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });

    if (!conversation) throw new NotFoundError("Conversation not found");
    if (conversation.userId !== user.id) throw new ForbiddenError();

    let content: string;
    let contentType: string;
    let filename: string;

    if (fmt === "md") {
      content = `# ${conversation.title}\n\n`;
      content += `*Exported: ${new Date().toISOString()}*\n\n---\n\n`;
      for (const msg of conversation.messages) {
        const role = msg.role === "user" ? "**You**" : "**AI Assistant**";
        content += `### ${role}\n${msg.content}\n\n---\n\n`;
      }
      contentType = "text/markdown";
      filename = `${conversation.title.replace(/\s+/g, "_")}.md`;
    } else {
      content = `${conversation.title}\n`;
      content += `${"=".repeat(conversation.title.length)}\n\n`;
      content += `Exported: ${new Date().toISOString()}\n\n---\n\n`;
      for (const msg of conversation.messages) {
        const role = msg.role === "user" ? "You" : "AI Assistant";
        content += `${role}:\n${msg.content}\n\n---\n\n`;
      }
      contentType = "text/plain";
      filename = `${conversation.title.replace(/\s+/g, "_")}.txt`;
    }

    await trackDailyUsage(user.id, "export");

    return new Response(content, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    return error(err);
  }
}
