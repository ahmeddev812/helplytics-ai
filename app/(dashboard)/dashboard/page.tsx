import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserByClerkId } from "@/server/actions/user.actions";
import { getRequests } from "@/server/actions/requests.actions";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AIInsightPanel } from "@/components/ai/AIInsightPanel";
import { Sparkles, TrendingUp, Award, Users, Clock, Star } from "lucide-react";

export default async function DashboardPage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/sign-in");

  const user = await getUserByClerkId(clerkId);
  if (!user) redirect("/onboarding");

  const recentRequests = await getRequests({ userId: user.id });

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Section with Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}</h1>
              <p className="text-slate-300 mt-1">Here's what's happening in your community today.</p>
            </div>
          </div>
          
          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-slate-300">Active for 2 weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-400" />
              <span className="text-sm text-slate-300">Top 10% Helper</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-slate-300">+47% this month</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-slate-300">15 connections</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Requests" 
          value={recentRequests.length} 
          description="Your active requests" 
          icon="file-text"
        />
        <StatsCard 
          title="Trust Score" 
          value={user.trustScore} 
          description="Community reputation" 
          icon="shield-check"
        />
        <StatsCard 
          title="Badges" 
          value={user.badges.length} 
          description="Earned achievements" 
          icon="award"
        />
        <StatsCard 
          title="Offers Received" 
          value={recentRequests.reduce((acc, req) => acc + (req.helpOffers?.length || 0), 0)} 
          description="People ready to help" 
          icon="users"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-6">
          <RecentActivity 
            requests={recentRequests} 
            className="w-full" 
          />
        </div>
        <div className="lg:col-span-3 space-y-6">
          <QuickActions />
          <AIInsightPanel userId={user.id} />
        </div>
      </div>
    </div>
  );
}