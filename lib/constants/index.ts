export const APP_NAME = "Helplytics AI";
export const APP_VERSION = "2.0.0";

export const ROUTES = {
  DASHBOARD: "/dashboard",
  EXPLORE: "/explore",
  AI_CENTER: "/ai-center",
  MESSAGES: "/messages",
  LEADERBOARD: "/leaderboard",
  NOTIFICATIONS: "/notifications",
  PROFILE: "/profile",
  REQUEST_CREATE: "/request/create",
  REQUEST_DETAIL: "/request",
  SETTINGS: "/settings",
  ONBOARDING: "/onboarding",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
} as const;

export const TRUST_SCORE = {
  ELITE: 900,
  TRUSTED: 700,
  ACTIVE: 500,
  getLevel(score: number): string {
    if (score >= this.ELITE) return "Elite Helper";
    if (score >= this.TRUSTED) return "Trusted Member";
    if (score >= this.ACTIVE) return "Active Contributor";
    return "Rising Star";
  },
  getColor(score: number): string {
    if (score >= this.ELITE) return "text-emerald-500";
    if (score >= this.TRUSTED) return "text-blue-500";
    if (score >= this.ACTIVE) return "text-amber-500";
    return "text-slate-500";
  },
} as const;

export const AI_PROMPT_CATEGORIES = [
  { id: "development", label: "Development", icon: "Code2", color: "from-blue-500 to-cyan-500" },
  { id: "design", label: "Design", icon: "Palette", color: "from-purple-500 to-pink-500" },
  { id: "writing", label: "Writing", icon: "PenTool", color: "from-emerald-500 to-teal-500" },
  { id: "business", label: "Business", icon: "Briefcase", color: "from-amber-500 to-orange-500" },
  { id: "academic", label: "Academic", icon: "GraduationCap", color: "from-indigo-500 to-violet-500" },
  { id: "creative", label: "Creative", icon: "Sparkles", color: "from-rose-500 to-pink-500" },
] as const;

export const SUGGESTED_PROMPTS = [
  "Optimize this request description for clarity and reach",
  "Summarize this message into key action points",
  "Write a professional response to this help offer",
  "Break down this problem into smaller tasks",
  "Generate tags and categories for this request",
  "Rewrite this to sound more professional",
] as const;

export const REQUEST_STATUS_COLORS = {
  OPEN: "bg-blue-500",
  IN_PROGRESS: "bg-amber-500",
  RESOLVED: "bg-emerald-500",
  CLOSED: "bg-slate-500",
} as const;

export const URGENCY_CONFIG = {
  LOW: { color: "from-blue-500 to-blue-600", text: "text-blue-700", bg: "bg-blue-50", label: "Low Priority", icon: "🟢" },
  MEDIUM: { color: "from-yellow-500 to-yellow-600", text: "text-yellow-700", bg: "bg-yellow-50", label: "Medium", icon: "🟡" },
  HIGH: { color: "from-orange-500 to-amber-600", text: "text-orange-700", bg: "bg-orange-50", label: "High Priority", icon: "🟠" },
  URGENT: { color: "from-red-500 to-rose-600", text: "text-red-700", bg: "bg-red-50", label: "Urgent", icon: "🔴" },
} as const;

export const STORAGE_KEYS = {
  AI_CONVERSATIONS: "ha_ai_conversations",
  AI_FAVORITES: "ha_ai_favorites",
  NOTIFICATION_PREFS: "ha_notification_prefs",
  USER_PREFERENCES: "ha_user_preferences",
  RECENT_SEARCHES: "ha_recent_searches",
  DRAFT_REQUESTS: "ha_draft_requests",
  THEME: "ha_theme",
} as const;
