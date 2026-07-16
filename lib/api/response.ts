import { NextResponse } from "next/server";
import { AppError, handleError } from "./errors";

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export function success<T>(data: T, status = 200, meta?: ApiResponse["meta"]) {
  const body: ApiResponse<T> = { success: true, data };
  if (meta) body.meta = meta;
  return NextResponse.json(body, { status });
}

export function created<T>(data: T) {
  return success(data, 201);
}

export function noContent() {
  return new NextResponse(null, { status: 204 });
}

export function error(err: unknown) {
  const appError = handleError(err);
  const body: ApiResponse = {
    success: false,
    error: {
      code: appError.code,
      message: appError.message,
      details: appError.details,
    },
  };
  return NextResponse.json(body, { status: appError.statusCode });
}

export function paginated<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
) {
  return success(data, 200, {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
}
