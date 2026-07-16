import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { success, error } from "@/lib/api/response";
import { logger } from "@/lib/api/logger";

export async function POST(req: Request) {
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return error({ message: "Missing svix headers", statusCode: 400 });
  }

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    logger.error("CLERK_WEBHOOK_SECRET is not configured");
    return error({ message: "Webhook not configured", statusCode: 500 });
  }

  const wh = new Webhook(webhookSecret);
  let evt: WebhookEvent;

  try {
    const payload = await req.text();
    evt = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch {
    return error({ message: "Invalid webhook signature", statusCode: 400 });
  }

  const eventType = evt.type;
  logger.info(`Clerk webhook received: ${eventType}`);

  return success({ received: true });
}
