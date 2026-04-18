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

export function RecentActivity({ requests, className }: { requests: any[], className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Requests</CardTitle>
        <CardDescription>
          You have {requests.length} active requests.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {requests.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent activity found.</p>
          ) : (
            requests.slice(0, 5).map((request) => (
              <div key={request.id} className="flex items-center">
                <div className="ml-4 space-y-1">
                  <Link 
                    href={`/request/${request.id}`}
                    className="text-sm font-medium leading-none hover:underline"
                  >
                    {request.title}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                  </p>
                </div>
                <div className="ml-auto">
                  <Badge variant={request.status === "OPEN" ? "default" : "secondary"}>
                    {request.status}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
