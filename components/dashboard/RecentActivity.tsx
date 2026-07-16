import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { 
  Clock, 
  ArrowRight, 
  Circle, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Request } from "@/types/backend-mock";

export function RecentActivity({ requests, className }: { requests: Request[], className?: string }) {
  return (
    <Card className={cn("border-slate-100 shadow-sm overflow-hidden", className)}>
      <CardHeader className="border-b bg-slate-50/30 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Recent Activity</CardTitle>
            <CardDescription className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Track your {requests.length} active requests
            </CardDescription>
          </div>
          <Link href="/explore">
            <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {requests.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-slate-500 font-medium">No recent activity found.</p>
              <Link href="/request/create" className="text-xs text-primary font-bold mt-2 inline-block">
                Create your first request
              </Link>
            </div>
          ) : (
            requests.slice(0, 6).map((request) => (
              <Link 
                key={request.id}
                href={`/request/${request.id}`}
                className="flex items-center p-4 hover:bg-slate-50/80 transition-all group"
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                  request.status === "OPEN" ? "bg-blue-50 border-blue-100 text-blue-600" :
                  request.status === "RESOLVED" ? "bg-green-50 border-green-100 text-green-600" :
                  "bg-slate-50 border-slate-100 text-slate-400"
                )}>
                  {request.status === "OPEN" ? <AlertCircle className="h-5 w-5" /> :
                   request.status === "RESOLVED" ? <CheckCircle2 className="h-5 w-5" /> :
                   <Circle className="h-5 w-5" />}
                </div>
                
                <div className="ml-4 flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-primary transition-colors">
                    {request.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-200" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {request.category}
                    </span>
                  </div>
                </div>
                
                <div className="ml-4">
                  <Badge 
                    variant={request.status === "OPEN" ? "default" : "secondary"}
                    className={cn(
                      "text-[10px] px-2 py-0 h-5 font-bold uppercase tracking-wider",
                      request.status === "OPEN" ? "bg-primary" : "bg-slate-100 text-slate-500 border-none"
                    )}
                  >
                    {request.status}
                  </Badge>
                </div>
                <MoreVertical className="h-4 w-4 text-slate-300 ml-4 group-hover:text-slate-400 opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
