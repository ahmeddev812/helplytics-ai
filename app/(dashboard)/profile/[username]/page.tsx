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
  Edit,
  Sparkles,
  Star,
  TrendingUp,
  Heart,
  Link2,
  CheckCircle,
  Clock,
  Users,
  Zap
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";  // ADD THIS IMPORT

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  // Assuming clerkId is passed as username for simplicity in this prototype
  const user = await getUserByClerkId(username);
  if (!user) return <div>User not found</div>;

  const userRequests = await getRequests({ userId: user.id });

  const getTrustScoreColor = (score: number) => {
    if (score >= 900) return "text-emerald-500";
    if (score >= 700) return "text-blue-500";
    if (score >= 500) return "text-amber-500";
    return "text-slate-500";
  };

  const getTrustScoreLevel = (score: number) => {
    if (score >= 900) return "Elite Helper";
    if (score >= 700) return "Trusted Member";
    if (score >= 500) return "Active Contributor";
    return "Rising Star";
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header Profile Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl" />
        
        {/* Cover Photo Area */}
        <div className="h-32 sm:h-40 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20" />
        
        <div className="relative z-10 px-4 sm:px-8 pb-6 sm:pb-8 -mt-16 flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border-4 border-white dark:border-slate-900 flex items-center justify-center shadow-2xl">
              <User className="h-12 w-12 sm:h-16 sm:w-16 text-slate-400" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
              <CheckCircle className="h-3 w-3 text-white" />
            </div>
          </div>
          
          <div className="flex-1 pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{user.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-slate-300 text-sm">@{user.clerkId?.slice(-8) || "user"}</span>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">
                    <Star className="h-3 w-3 text-amber-400" />
                    <span className="text-[10px] font-bold text-white">{getTrustScoreLevel(user.trustScore)}</span>
                  </div>
                </div>
              </div>
              <Button size="sm" className="gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all">
                <Edit className="h-4 w-4" /> Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Info */}
        <div className="space-y-5">
          {/* About Card */}
          <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                {user.bio || "No bio provided yet. Tell the community about yourself!"}
              </p>
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Briefcase className="h-4 w-4 text-primary" /> 
                  <span className="font-medium">{user.role || "Community Member"}</span>
                </div>
                {user.location && (
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-primary" /> 
                    <span>{user.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Calendar className="h-4 w-4 text-primary" /> 
                  <span>Joined {user.createdAt ? format(new Date(user.createdAt), "MMMM yyyy") : "Recently"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trust & Reputation Card */}
          <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Trust & Reputation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="relative text-center p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-xl" />
                <div className="relative">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg mb-3">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div className={cn("text-4xl font-black", getTrustScoreColor(user.trustScore))}>
                    {user.trustScore}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                    Trust Score
                  </div>
                  <div className="mt-2 inline-block px-3 py-1 rounded-full bg-white shadow-sm text-[10px] font-bold text-slate-600">
                    {getTrustScoreLevel(user.trustScore)}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Award className="h-3.5 w-3.5" /> Badges Earned
                </h4>
                <div className="flex flex-wrap gap-2">
                  {!user.badges || user.badges.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No badges earned yet. Start helping!</p>
                  ) : (
                    user.badges.map((badge: string) => (
                      <Badge key={badge} className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-0 px-3 py-1">
                        <Star className="h-2.5 w-2.5 mr-1" />
                        {badge}
                      </Badge>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Interests Card */}
          <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Skills & Interests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {!user.skills || user.skills.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No skills added yet.</p>
                  ) : (
                    user.skills.map((skill: string) => (
                      <Badge key={skill} className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100 px-3 py-1">
                        {skill}
                      </Badge>
                    ))
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {!user.interests || user.interests.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No interests added yet.</p>
                  ) : (
                    user.interests.map((interest: string) => (
                      <Badge key={interest} variant="outline" className="border-slate-200 text-slate-600 px-3 py-1">
                        {interest}
                      </Badge>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links Card */}
          <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
          </Card>
        </div>

        {/* Right Column: History */}
        <div className="lg:col-span-2 space-y-5">
          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 text-center">
              <Users className="h-5 w-5 text-blue-500 mx-auto mb-1" />
              <div className="text-xl font-bold text-slate-900">{userRequests.length}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Requests</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 text-center">
              <Zap className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
              <div className="text-xl font-bold text-slate-900">12</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Help Given</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 text-center">
              <Star className="h-5 w-5 text-amber-500 mx-auto mb-1" />
              <div className="text-xl font-bold text-slate-900">{user.badges?.length || 0}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Badges</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 text-center">
              <Heart className="h-5 w-5 text-purple-500 mx-auto mb-1" />
              <div className="text-xl font-bold text-slate-900">47</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Impact</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-slate-900">Contribution History</h2>
            <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
              <button className="px-4 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-900 shadow-sm">
                Requests
              </button>
              <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-700">
                Help Given
              </button>
            </div>
          </div>
          
          <div className="grid gap-4">
            {userRequests.length === 0 ? (
              <div className="text-center py-16 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-slate-500 font-medium">No contribution history yet.</p>
                <p className="text-sm text-slate-400 mt-1">Start helping others to build your reputation!</p>
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