"use client";

import { useUser } from "@clerk/nextjs";
import { useMounted } from "@/lib/hooks";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AIInsightPanel } from "@/components/ai/AIInsightPanel";
import { AnimatedCounter } from "@/components/dashboard/AnimatedCounter";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { RecentConversations } from "@/components/dashboard/RecentConversations";
import { ContinueWorking } from "@/components/dashboard/ContinueWorking";
import { MOCK_REQUESTS } from "@/lib/mock-data";
import { Sparkles, TrendingUp, Award, Users, Clock, Star } from "lucide-react";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const mounted = useMounted();

  const recentRequests = MOCK_REQUESTS;

  if (!mounted || !isLoaded) {
    return (
      <div className="space-y-8 p-6 animate-pulse">
        <div className="h-48 rounded-2xl bg-slate-100" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-xl bg-slate-100" />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4 h-64 rounded-xl bg-slate-100" />
          <div className="lg:col-span-3 space-y-6">
            <div className="h-48 rounded-xl bg-slate-100" />
            <div className="h-32 rounded-xl bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Section with Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back, {user?.fullName || "there"}
              </h1>
              <p className="text-slate-300 mt-1">Here&apos;s what&apos;s happening in your community today.</p>
            </div>
          </div>
          
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

      {/* Stats Cards Grid with Animated Counters */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Requests" 
          value={<AnimatedCounter target={recentRequests.length} />}
          description="Your active requests" 
          icon="file-text"
          trend="+12%"
        />
        <StatsCard 
          title="Trust Score" 
          value={<AnimatedCounter target={0} />}
          description="Community reputation" 
          icon="shield-check"
          trend="+5%"
        />
        <StatsCard 
          title="Badges" 
          value={<AnimatedCounter target={0} />}
          description="Earned achievements" 
          icon="award"
        />
        <StatsCard 
          title="Offers Received" 
          value={<AnimatedCounter target={recentRequests.reduce((acc, req) => acc + (req.helpOffers?.length || 0), 0)} />}
          description="People ready to help" 
          icon="users"
          trend="+3"
        />
      </div>

      {/* Activity Chart */}
      <ActivityChart />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-6">
          <RecentActivity 
            requests={recentRequests} 
            className="w-full" 
          />
        </div>
        <div className="lg:col-span-3 space-y-6">
          <QuickActions />
          <ContinueWorking />
          <RecentConversations />
          <AIInsightPanel />
        </div>
      </div>
    </div>
  );
}
