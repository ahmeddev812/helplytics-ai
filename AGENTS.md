<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:backend-agent-rules -->
# Backend Architecture

## Tech Stack
- **ORM:** Prisma 7.7.0 (PostgreSQL) with `@prisma/adapter-pg`
- **Auth:** Clerk webhooks for user sync (Svix signed payloads)
- **AI:** OpenRouter API (configurable via OPENROUTER_BASE_URL + OPENROUTER_API_KEY)
- **Validation:** Zod 4 (`z.record()` requires 2 args: `z.record(z.string(), z.unknown())`)
- **File Upload:** Local `public/uploads/` directory with type/size validation

## Prisma 7 Notes
- `url` property is NO LONGER supported in `prisma/schema.prisma` datasource block
- Connection string goes in `prisma.config.ts` via `datasource: { url: env("DATABASE_URL") }`
- Use `@prisma/adapter-pg` with `PrismaPg` in `lib/prisma.ts`
- Pass `adapter` to `PrismaClient` constructor: `new PrismaClient({ adapter, log })`

## Project Structure
```
prisma/schema.prisma      # All models: User, Request, HelpOffer, Message,
                          # Notification, Conversation, ChatMessage, PromptHistory,
                          # Favorite, UserSettings, Usage, Feedback, Upload,
                          # AnalyticsDaily, AnalyticsMonthly
prisma.config.ts          # Prisma 7 config (datasource URL)
lib/prisma.ts             # Prisma client singleton with adapter
lib/api/errors.ts         # AppError, NotFoundError, UnauthorizedError, etc.
lib/api/response.ts       # success(), created(), noContent(), error(), paginated()
lib/api/auth.ts           # requireAuth(), getAuthUser(), requireAdmin()
lib/api/rate-limit.ts     # In-memory rate limiter
lib/api/analytics.ts      # trackDailyUsage(), getUsageStats(), getAdminAnalytics()
lib/api/upload.ts         # uploadFile(), deleteUpload(), getUploadsByUser()
lib/api/logger.ts         # Structured logging
```

## API Routes (`app/api/`)
| Route | Purpose |
|-------|---------|
| `webhooks/clerk` | User sync (create/update/delete from Clerk) |
| `chat` | AI chat with OpenRouter, conversation history |
| `conversation` | CRUD AI conversations |
| `conversation/[id]` | Get/Update/Delete single conversation |
| `history` | List/save prompt history |
| `prompts` | List suggested prompts |
| `export` | Export conversation as TXT/MD |
| `dashboard` | User dashboard stats + usage |
| `notifications` | CRUD notifications with bulk ops |
| `notifications/[id]` | Single notification update/delete |
| `requests` | List/create requests with search/pagination/filters |
| `requests/[id]` | Get/Update/Delete single request |
| `requests/[id]/offer` | Offer help on a request |
| `upload` | File upload/download |
| `analytics` | User + admin analytics |
| `settings` | User preferences CRUD |
| `user` | User profile get/update |
| `user/leaderboard` | Top users by trust score |

## Env Vars Required
```
DATABASE_URL
CLERK_SECRET_KEY
CLERK_WEBHOOK_SECRET
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
OPENROUTER_API_KEY
OPENROUTER_BASE_URL
NEXT_PUBLIC_APP_URL
UPLOAD_SECRET
LOG_LEVEL
```

## Key Conventions
- All API routes return `{ success: boolean, data?, error?, meta? }`
- All routes validate with Zod, rate-limited by default (60 req/min)
- Auth uses `requireAuth()` which returns Clerk-authenticated user from DB
- Exports as file downloads use `Content-Disposition: attachment`
- Uploads validated by MIME type per category, max 10MB
- Server actions in `server/actions/` use real API with mock fallbacks
- Dynamic route params: `await ctx.params` (not `ctx.params` directly)
- ClerkProvider only in `app/layout.tsx` (NOT in `app/providers.tsx`)
- There was a duplicate `next.conifg.ts` file (typo) — it's been deleted
<!-- END:backend-agent-rules -->
