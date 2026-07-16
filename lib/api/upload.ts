import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { ValidationError } from "./errors";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads");
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "text/plain",
  "text/markdown",
  "application/json",
  "application/zip",
];

const CATEGORY_MIME_MAP: Record<string, string[]> = {
  avatar: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  image: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  document: ["application/pdf", "text/plain", "text/markdown", "application/json"],
  project: ["application/zip", "application/json", "text/plain"],
  export: ["text/plain", "text/markdown", "application/json"],
};

export interface UploadOptions {
  userId: string;
  file: File;
  category: string;
  allowedTypes?: string[];
  maxSize?: number;
}

export interface UploadResult {
  id: string;
  url: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  category: string;
}

function validateFile(file: File, category: string, allowedTypes?: string[], maxSize?: number) {
  const sizeLimit = maxSize || MAX_FILE_SIZE;
  if (file.size > sizeLimit) {
    throw new ValidationError(
      `File too large. Maximum size is ${Math.round(sizeLimit / 1024 / 1024)}MB`
    );
  }

  const types = allowedTypes || CATEGORY_MIME_MAP[category] || ALLOWED_MIME_TYPES;
  if (!types.includes(file.type)) {
    throw new ValidationError(
      `Invalid file type "${file.type}". Allowed: ${types.join(", ")}`
    );
  }
}

export async function uploadFile(options: UploadOptions): Promise<UploadResult> {
  const { userId, file, category } = options;
  validateFile(file, category, options.allowedTypes, options.maxSize);

  const ext = file.name.split(".").pop() || "bin";
  const uniqueName = `${randomUUID()}.${ext}`;
  const categoryDir = join(UPLOAD_DIR, category);
  const filePath = join(categoryDir, uniqueName);

  await mkdir(categoryDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  const url = `/uploads/${category}/${uniqueName}`;

  const upload = await prisma.upload.create({
    data: {
      userId,
      filename: uniqueName,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      url,
      category,
    },
  });

  return {
    id: upload.id,
    url: upload.url,
    filename: upload.filename,
    originalName: upload.originalName,
    mimeType: upload.mimeType,
    size: upload.size,
    category: upload.category,
  };
}

export async function deleteUpload(uploadId: string, userId: string): Promise<void> {
  const upload = await prisma.upload.findFirst({
    where: { id: uploadId, userId },
  });
  if (!upload) throw new ValidationError("Upload not found");
  await prisma.upload.delete({ where: { id: uploadId } });
}

export async function getUploadsByUser(userId: string, category?: string) {
  return prisma.upload.findMany({
    where: { userId, ...(category ? { category } : {}) },
    orderBy: { createdAt: "desc" },
  });
}

export function generateSignedUrl(filename: string, category: string): string {
  return `/api/upload/signed?file=${encodeURIComponent(filename)}&category=${encodeURIComponent(category)}&token=${generateToken(filename, category)}`;
}

function generateToken(filename: string, category: string): string {
  const data = `${filename}:${category}:${process.env.UPLOAD_SECRET || "default-secret"}`;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}
