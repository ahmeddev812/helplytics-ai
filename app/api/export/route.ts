import { requireAuth } from "@/lib/api/auth";
import { error } from "@/lib/api/response";

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const { conversationId, format } = await req.json();

    if (!conversationId) {
      return error({ message: "conversationId is required", statusCode: 400 });
    }

    const fmt = format === "md" ? "md" : "txt";
    const title = "Exported Conversation";
    const messages: { role: string; content: string }[] = [];

    let content: string;
    let contentType: string;
    let filename: string;

    if (fmt === "md") {
      content = `# ${title}\n\n`;
      content += `*Exported: ${new Date().toISOString()}*\n\n---\n\n`;
      for (const msg of messages) {
        const role = msg.role === "user" ? "**You**" : "**AI Assistant**";
        content += `### ${role}\n${msg.content}\n\n---\n\n`;
      }
      contentType = "text/markdown";
      filename = `${title.replace(/\s+/g, "_")}.md`;
    } else {
      content = `${title}\n`;
      content += `${"=".repeat(title.length)}\n\n`;
      content += `Exported: ${new Date().toISOString()}\n\n---\n\n`;
      for (const msg of messages) {
        const role = msg.role === "user" ? "You" : "AI Assistant";
        content += `${role}:\n${msg.content}\n\n---\n\n`;
      }
      contentType = "text/plain";
      filename = `${title.replace(/\s+/g, "_")}.txt`;
    }

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
