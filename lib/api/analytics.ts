import { prisma } from "@/lib/prisma";

export async function trackDailyUsage(userId: string, type: "ai_request" | "prompt" | "export") {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const usage = await prisma.usage.upsert({
    where: {
      userId_date: { userId, date: today },
    },
    update: {
      aiRequests: type === "ai_request" ? { increment: 1 } : undefined,
      promptsUsed: type === "prompt" ? { increment: 1 } : undefined,
      exports: type === "export" ? { increment: 1 } : undefined,
    },
    create: {
      userId,
      date: today,
      aiRequests: type === "ai_request" ? 1 : 0,
      promptsUsed: type === "prompt" ? 1 : 0,
      exports: type === "export" ? 1 : 0,
    },
  });

  return usage;
}

export async function getUserAnalytics(userId: string, days = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  since.setHours(0, 0, 0, 0);

  const usage = await prisma.usage.findMany({
    where: {
      userId,
      date: { gte: since },
    },
    orderBy: { date: "asc" },
  });

  const totalAiRequests = usage.reduce((sum, u) => sum + u.aiRequests, 0);
  const totalPrompts = usage.reduce((sum, u) => sum + u.promptsUsed, 0);
  const totalExports = usage.reduce((sum, u) => sum + u.exports, 0);

  return {
    daily: usage,
    totals: {
      aiRequests: totalAiRequests,
      prompts: totalPrompts,
      exports: totalExports,
    },
    days: usage.length,
  };
}

export async function getAdminAnalytics(startDate?: Date, endDate?: Date) {
  const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const end = endDate || new Date();
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  const [
    totalUsers,
    newUsers,
    totalRequests,
    resolvedRequests,
    totalMessages,
    dailyAnalytics,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: start, lte: end } } }),
    prisma.request.count(),
    prisma.request.count({ where: { status: "RESOLVED", updatedAt: { gte: start, lte: end } } }),
    prisma.message.count({ where: { createdAt: { gte: start, lte: end } } }),
    prisma.analyticsDaily.findMany({
      where: { date: { gte: start, lte: end } },
      orderBy: { date: "asc" },
    }),
  ]);

  const totalAiRequests = dailyAnalytics.reduce((s, d) => s + d.aiRequests, 0);
  const totalPrompts = dailyAnalytics.reduce((s, d) => s + d.totalPrompts, 0);
  const favorites = dailyAnalytics.reduce((s, d) => s + d.totalFavorites, 0);
  const avgResponseTime = dailyAnalytics.reduce((s, d) => s + (d.avgResponseTime || 0), 0) / (dailyAnalytics.length || 1);

  return {
    overview: {
      totalUsers,
      newUsers,
      totalRequests,
      resolvedRequests,
      totalMessages,
    },
    ai: {
      totalAiRequests,
      totalPrompts,
      avgResponseTime: Math.round(avgResponseTime * 100) / 100,
      favorites,
    },
    daily: dailyAnalytics,
  };
}

export async function updateDailyAnalytics() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    totalUsers,
    newUsers,
    totalRequests,
    resolvedRequests,
    totalMessages,
    aiRequests,
    totalPrompts,
    totalFavorites,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: today } } }),
    prisma.request.count(),
    prisma.request.count({ where: { status: "RESOLVED", updatedAt: { gte: today } } }),
    prisma.message.count({ where: { createdAt: { gte: today } } }),
    prisma.usage.aggregate({ where: { date: today }, _sum: { aiRequests: true } }),
    prisma.usage.aggregate({ where: { date: today }, _sum: { promptsUsed: true } }),
    prisma.favorite.count({ where: { createdAt: { gte: today } } }),
  ]);

  await prisma.analyticsDaily.upsert({
    where: { date: today },
    update: {
      totalUsers,
      newUsers,
      totalRequests,
      resolvedRequests,
      totalMessages,
      aiRequests: aiRequests._sum.aiRequests || 0,
      totalPrompts: totalPrompts._sum.promptsUsed || 0,
      totalFavorites,
    },
    create: {
      date: today,
      totalUsers,
      newUsers,
      totalRequests,
      resolvedRequests,
      totalMessages,
      aiRequests: aiRequests._sum.aiRequests || 0,
      totalPrompts: totalPrompts._sum.promptsUsed || 0,
      totalFavorites,
    },
  });
}

export async function getUsageStats(userId: string) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [dailyUsage, monthlyUsage, totalUsage] = await Promise.all([
    prisma.usage.findUnique({
      where: { userId_date: { userId, date: startOfDay } },
    }),
    prisma.usage.findMany({
      where: { userId, date: { gte: startOfMonth } },
      select: { aiRequests: true, promptsUsed: true, exports: true },
    }),
    prisma.usage.aggregate({
      where: { userId },
      _sum: { aiRequests: true, promptsUsed: true, exports: true },
    }),
  ]);

  return {
    daily: {
      aiRequests: dailyUsage?.aiRequests || 0,
      promptsUsed: dailyUsage?.promptsUsed || 0,
      exports: dailyUsage?.exports || 0,
    },
    monthly: {
      aiRequests: monthlyUsage.reduce((s, u) => s + u.aiRequests, 0),
      promptsUsed: monthlyUsage.reduce((s, u) => s + u.promptsUsed, 0),
      exports: monthlyUsage.reduce((s, u) => s + u.exports, 0),
    },
    total: {
      aiRequests: totalUsage._sum.aiRequests || 0,
      promptsUsed: totalUsage._sum.promptsUsed || 0,
      exports: totalUsage._sum.exports || 0,
    },
  };
}
