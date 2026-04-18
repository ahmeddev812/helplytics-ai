import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserByClerkId } from "@/server/actions/user.actions";
import { getRequests } from "@/server/actions/requests.actions";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AIInsightPanel } from "@/components/ai/AIInsightPanel";

export default async function DashboardPage() {
  const { userId: clerkId } = auth();
  if (!clerkId) redirect("/sign-in");

  const user = await getUserByClerkId(clerkId);
  if (!user) redirect("/onboarding");

  const recentRequests = await getRequests({ userId: user.id });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}</h1>
        <p className="text-muted-foreground">Here's what's happening in your community today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          value={recentRequests.reduce((acc, req) => acc + req.helpOffers.length, 0)} 
          description="People ready to help" 
          icon="users"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentActivity 
          requests={recentRequests} 
          className="col-span-4" 
        />
        <div className="col-span-3 space-y-4">
          <QuickActions />
          <AIInsightPanel userId={user.id} />
        </div>
      </div>
    </div>
  );
}
