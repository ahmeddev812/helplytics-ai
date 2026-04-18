import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Clock, Tag, User } from "lucide-react";

export function RequestCard({ request }: { request: any }) {
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
            {request.category}
          </Badge>
          <Badge 
            variant={request.urgency === "URGENT" ? "destructive" : "default"}
            className="text-[10px]"
          >
            {request.urgency}
          </Badge>
        </div>
        <CardTitle className="text-xl line-clamp-2">{request.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {request.aiSummary || request.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {request.tags.slice(0, 3).map((tag: string) => (
            <span key={tag} className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              #{tag}
            </span>
          ))}
          {request.tags.length > 3 && (
            <span className="text-[10px] text-muted-foreground">+{request.tags.length - 3} more</span>
          )}
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {request.user.name}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDistanceToNow(new Date(request.createdAt))} ago
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={`/request/${request.id}`} className="w-full">
          <Button variant="secondary" className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
