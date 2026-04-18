import { getLeaderboard } from "@/server/actions/user.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, User } from "lucide-react";

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard(20);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-500" />
          Community Leaderboard
        </h1>
        <p className="text-muted-foreground">Recognizing our most helpful community members.</p>
      </div>

      <div className="grid gap-6">
        {leaderboard.map((user, index) => (
          <Card key={user.id} className={index < 3 ? "border-primary/20 shadow-md" : ""}>
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center justify-center w-10 h-10 font-bold text-xl text-slate-400">
                  {index === 0 && <Trophy className="h-8 w-8 text-yellow-500" />}
                  {index === 1 && <Medal className="h-8 w-8 text-slate-400" />}
                  {index === 2 && <Award className="h-8 w-8 text-amber-600" />}
                  {index > 2 && index + 1}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{user.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-[10px]">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{user.trustScore}</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Trust Score
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
