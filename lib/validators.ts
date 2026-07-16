import { z } from "zod";

export const OnboardingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["NEED_HELP", "CAN_HELP", "BOTH"]),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  interests: z.array(z.string()).min(1, "At least one interest is required"),
  location: z.string().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

export const RequestSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  urgency: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
});

export const HelpOfferSchema = z.object({
  message: z.string().min(10, "Message must be at least 10 characters"),
});
