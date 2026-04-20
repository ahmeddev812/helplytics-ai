import { getUserByClerkId } from "@/server/actions/user.actions";
import { getRequests } from "@/server/actions/requests.actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RequestCard } from "@/components/requests/RequestCard";
import { 
  User, 
  MapPin, 
  Calendar, 
  Award, 
  ShieldCheck, 
  Briefcase,
  Mail,
  Edit
} from "lucide-react";
import { format } from "date-fns";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  // Assuming clerkId is passed as username for simplicity in this prototype
  const user = await getUserByClerkId(username);
  if (!user) return <div>User not found</div>;

  const userRequests = await getRequests({ userId: user.id });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      {/* Header Profile Card */}
      <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <CardContent className="p-0">
          <div className="h-32 bg-primary/20" />
          <div className="px-8 pb-8 -mt-16 flex flex-col md:flex-row items-end gap-6">
            <div className="w-32 h-32 rounded-2xl bg-slate-800 border-4 border-slate-900 flex items-center justify-center shadow-2xl">
              <User className="h-16 w-16 text-slate-400" />
            </div>
            <div className="flex-1 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-slate-400">@{user.clerkId.slice(-8)}</p>
                </div>
                <Button size="sm" variant="outline" className="text-white border-white/20 hover:bg-white/10 gap-2">
                  <Edit className="h-4 w-4" /> Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About Me</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                {user.bio || "No bio provided yet."}
              </p>
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Briefcase className="h-4 w-4" /> {user.role}
                </div>
                {user.location && (
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" /> {user.location}
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Calendar className="h-4 w-4" /> Joined {format(new Date(user.createdAt), "MMMM yyyy")}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trust & Reputation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-slate-900">{user.trustScore}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Trust Score
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4" /> Badges Earned
                </h4>
                <div className="flex flex-wrap gap-2">
                  {user.badges.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No badges earned yet.</p>
                  ) : (
                    user.badges.map((badge) => (
                      <Badge key={badge} variant="secondary">{badge}</Badge>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills & Interests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
                    <Badge key={skill} className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <Badge key={interest} variant="outline">{interest}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: History */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Contribution History</h2>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" className="text-primary font-semibold">Requests</Button>
              <Button size="sm" variant="ghost">Help Given</Button>
            </div>
          </div>
          
          <div className="grid gap-6">
            {userRequests.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 border rounded-xl">
                <p className="text-muted-foreground">No contribution history found.</p>
              </div>
            ) : (
              userRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
