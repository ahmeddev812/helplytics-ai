import { auth } from "@clerk/nextjs/server";
import { getRequestById } from "@/server/actions/requests.actions";
import { getUserByClerkId } from "@/server/actions/user.actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequestForm } from "@/components/requests/RequestForm"; // Reuse for edit
import { RequestOfferForm } from "@/components/requests/RequestOfferForm";
import { formatDistanceToNow } from "date-fns";
import { Bot, User, Clock, CheckCircle2, MessageSquare } from "lucide-react";
import Link from "next/link";

export default async function RequestDetailPage({ params }: { params: { id: string } }) {
  const { userId: clerkId } = auth();
  const request = await getRequestById(params.id);
  const user = clerkId ? await getUserByClerkId(clerkId) : null;

  if (!request) return <div>Request not found</div>;

  const isOwner = user?.id === request.userId;
  const canHelp = user?.role !== "NEED_HELP" && !isOwner;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader className="border-b bg-slate-50/50">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-2">
              <Badge variant="outline">{request.category}</Badge>
              <Badge variant={request.urgency === "URGENT" ? "destructive" : "default"}>
                {request.urgency}
              </Badge>
              {request.status === "RESOLVED" && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Solved
                </Badge>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              Posted {formatDistanceToNow(new Date(request.createdAt))} ago
            </div>
          </div>
          <CardTitle className="text-3xl">{request.title}</CardTitle>
          <div className="flex items-center gap-4 pt-2 text-sm">
            <div className="flex items-center gap-1.5 font-medium">
              <User className="h-4 w-4" />
              {request.user.name}
              <span className="text-xs font-normal text-muted-foreground">
                ({request.user.trustScore} Trust)
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {request.aiSummary && (
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2 text-primary text-sm font-semibold">
                <Bot className="h-4 w-4" />
                AI Summary
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic">
                "{request.aiSummary}"
              </p>
            </div>
          )}

          <div className="prose prose-slate max-w-none">
            <h3 className="text-lg font-semibold mb-2">Detailed Description</h3>
            <p className="whitespace-pre-wrap text-slate-700">
              {request.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            {request.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">#{tag}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Help Offers ({request.helpOffers.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {request.helpOffers.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No help offers yet. Be the first!</p>
              ) : (
                request.helpOffers.map((offer: any) => (
                  <div key={offer.id} className="p-4 border rounded-lg flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 font-medium text-sm">
                        <User className="h-4 w-4" />
                        {offer.user.name}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {formatDistanceToNow(new Date(offer.createdAt))} ago
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{offer.message}</p>
                    {isOwner && request.status !== "RESOLVED" && (
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="text-xs h-8">Chat</Button>
                        <Button 
                          size="sm" 
                          className="text-xs h-8 bg-green-600 hover:bg-green-700"
                        >
                          Accept Help
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {canHelp && request.status === "OPEN" && (
            <RequestOfferForm requestId={request.id} />
          )}
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Safety Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-3">
              <p>• Never share your passwords or sensitive personal data.</p>
              <p>• Review the helper's trust score and badges before accepting help.</p>
              <p>• Use our built-in messaging for all coordination.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
