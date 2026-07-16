import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
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

  try {
    switch (eventType) {
      case "user.created": {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data;
        const primaryEmail = email_addresses?.[0]?.email_address || "";
        const name = [first_name, last_name].filter(Boolean).join(" ") || primaryEmail.split("@")[0];

        await prisma.user.upsert({
          where: { clerkId: id },
          update: { email: primaryEmail, name, avatarUrl: image_url },
          create: {
            clerkId: id,
            email: primaryEmail,
            name,
            avatarUrl: image_url,
            skills: [],
            interests: [],
            badges: [],
          },
        });

        await prisma.userSettings.upsert({
          where: { userId: id },
          update: {},
          create: { userId: id },
        });
        break;
      }

      case "user.updated": {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data;
        const primaryEmail = email_addresses?.[0]?.email_address || "";
        const name = [first_name, last_name].filter(Boolean).join(" ") || undefined;

        await prisma.user.update({
          where: { clerkId: id },
          data: {
            ...(primaryEmail && { email: primaryEmail }),
            ...(name && { name }),
            ...(image_url && { avatarUrl: image_url }),
          },
        });
        break;
      }

      case "user.deleted": {
        const { id } = evt.data;
        if (id) {
          await prisma.user.delete({ where: { clerkId: id } }).catch(() => {});
        }
        break;
      }
    }

    return success({ received: true });
  } catch (err) {
    logger.error("Webhook handler failed", { eventType, error: String(err) });
    return error(err);
  }
}
