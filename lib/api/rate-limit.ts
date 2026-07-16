import { RateLimitError } from "./errors";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const defaultConfig: RateLimitConfig = {
  windowMs: 60_000,
  maxRequests: 60,
};

export function checkRateLimit(
  key: string,
  config: RateLimitConfig = defaultConfig
): void {
  cleanup();
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + config.windowMs });
    return;
  }

  if (entry.count >= config.maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    const error = new RateLimitError(`Too many requests. Retry after ${retryAfter}s`);
    error.details = { retryAfter };
    throw error;
  }

  entry.count++;
}

export function getRateLimitKey(identifier: string, route: string): string {
  return `${identifier}:${route}`;
}
