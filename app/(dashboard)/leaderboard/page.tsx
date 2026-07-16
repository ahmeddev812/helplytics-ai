import { prisma } from "@/lib/prisma";

async function getLeaderboard(limit = 20) {
  try {
    return await prisma.user.findMany({
      orderBy: { trustScore: "desc" },
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        trustScore: true,
        badges: true,
        role: true,
        skills: true,
        location: true,
        createdAt: true,
      },
    });
  } catch {
    const { MOCK_USERS } = await import("@/lib/mock-data");
    return MOCK_USERS.sort((a: { trustScore: number }, b: { trustScore: number }) => b.trustScore - a.trustScore)
      .slice(0, limit);
  }
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, User, Crown, Star, TrendingUp, Zap, Shield, Sparkles } from "lucide-react";

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard(20);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="h-7 w-7 text-yellow-500 drop-shadow-lg" />;
      case 1:
        return <Medal className="h-7 w-7 text-slate-400 drop-shadow-md" />;
      case 2:
        return <Award className="h-7 w-7 text-amber-600 drop-shadow-md" />;
      default:
        return null;
    }
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return "bg-gradient-to-r from-yellow-500 to-amber-500 text-white";
    if (index === 1) return "bg-gradient-to-r from-slate-400 to-slate-500 text-white";
    if (index === 2) return "bg-gradient-to-r from-amber-600 to-orange-600 text-white";
    return "bg-slate-100 text-slate-600";
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 900) return "text-emerald-500";
    if (score >= 700) return "text-blue-500";
    if (score >= 500) return "text-amber-500";
    return "text-slate-500";
  };

  return (
    <div className="space-y-8 p-4 sm:p-6">
      {/* Header Section with Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 shadow-lg shadow-yellow-500/25">
                <Trophy className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Community Leaderboard</h1>
                <p className="text-slate-300 text-sm sm:text-base mt-1">
                  Recognizing our most helpful community members.
                </p>
              </div>
            </div>
            
            {/* Stats Badge */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <User className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-semibold">{leaderboard.length} Top Contributors</span>
            </div>
          </div>
        </div>
      </div>

      {/* Podium Section for Top 3 */}
      {leaderboard.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* 2nd Place */}
          <div className="order-2 md:order-1">
            <div className="relative bg-gradient-to-b from-slate-100 to-white rounded-2xl p-6 text-center border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-400 text-white text-xs font-bold">
                2nd Place
              </div>
              <div className="mt-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center shadow-lg">
                  <Medal className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-lg mt-4">{leaderboard[1].name}</h3>
                <p className="text-2xl font-bold text-slate-700 mt-2">{leaderboard[1].trustScore}</p>
                <p className="text-xs text-slate-500">Trust Score</p>
                <div className="flex flex-wrap gap-1 justify-center mt-3">
                  {leaderboard[1].badges.slice(0, 2).map((badge) => (
                    <Badge key={badge} variant="secondary" className="text-[10px]">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="order-1 md:order-2 transform scale-105">
            <div className="relative bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 text-center border-2 border-yellow-300 shadow-2xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold shadow-lg">
                🏆 1st Place 🏆
              </div>
              <div className="relative mt-4">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-xl ring-4 ring-yellow-300">
                  <Crown className="h-12 w-12 text-white" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-yellow-500 animate-pulse" />
              </div>
              <h3 className="font-bold text-xl mt-4 text-slate-900">{leaderboard[0].name}</h3>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600 mt-2">
                {leaderboard[0].trustScore}
              </p>
              <p className="text-xs text-slate-500">Trust Score</p>
              <div className="flex flex-wrap gap-1 justify-center mt-3">
                {leaderboard[0].badges.slice(0, 3).map((badge) => (
                  <Badge key={badge} className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-[10px] border-0">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="order-3">
            <div className="relative bg-gradient-to-b from-orange-50 to-white rounded-2xl p-6 text-center border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">
                3rd Place
              </div>
              <div className="mt-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-lg mt-4">{leaderboard[2].name}</h3>
                <p className="text-2xl font-bold text-slate-700 mt-2">{leaderboard[2].trustScore}</p>
                <p className="text-xs text-slate-500">Trust Score</p>
                <div className="flex flex-wrap gap-1 justify-center mt-3">
                  {leaderboard[2].badges.slice(0, 2).map((badge) => (
                    <Badge key={badge} variant="secondary" className="text-[10px]">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rest of the Leaderboard List */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-slate-500" />
          <h2 className="text-lg font-bold text-slate-900">All Rankings</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
        </div>

        <div className="grid gap-3">
          {leaderboard.slice(3).map((user, idx) => {
            const rank = idx + 4;
            return (
              <div
                key={user.id}
                className="group relative bg-white rounded-xl p-4 flex items-center justify-between border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
              >
                {/* Rank Number */}
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${getRankBadge(rank - 1)}`}>
                    {rank}
                  </div>
                  
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-inner">
                    <User className="h-6 w-6 text-slate-500" />
                  </div>
                  
                  {/* User Info */}
                  <div>
                    <h3 className="font-bold text-slate-900">{user.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.badges.slice(0, 3).map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-[9px] px-1.5">
                          {badge}
                        </Badge>
                      ))}
                      {user.badges.length > 3 && (
                        <span className="text-[9px] text-slate-400">+{user.badges.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Trust Score */}
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getTrustScoreColor(user.trustScore)}`}>
                    {user.trustScore}
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    <Shield className="h-3 w-3 text-slate-400" />
                    <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                      Trust Score
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50 text-center border border-slate-200">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-slate-900">Want to be on this list?</h3>
        </div>
        <p className="text-sm text-slate-500 mb-3">
          Help others in the community, earn badges, and increase your trust score!
        </p>
        <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all">
          Start Helping Today
        </button>
      </div>
    </div>
  );
}