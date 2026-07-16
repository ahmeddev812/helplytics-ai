"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequestOfferForm } from "@/components/requests/RequestOfferForm";
import { CommentsSection } from "@/components/requests/CommentsSection";
import { MOCK_REQUESTS } from "@/lib/mock-data";
import { RequestStatus } from "@/types/backend-mock";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { Bot, User, CheckCircle2, Clock, Shield, MessageCircle, Heart, ArrowLeft, Flag, Share2, ThumbsUp, Sparkles, Award, Calendar, MapPin, Link2, Edit3, Trash2, Archive, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const request = MOCK_REQUESTS.find(req => req.id === id) || MOCK_REQUESTS[0];
  const [requestStatus, setRequestStatus] = useState(request.status);
  const [showActions, setShowActions] = useState(false);

  if (!request) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Bot className="h-10 w-10 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Request Not Found</h2>
        <p className="text-slate-500">The request you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/explore" className="inline-block mt-6">
          <Button className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Explore
          </Button>
        </Link>
      </div>
    </div>
  );

  const isOwner = true;
  const canHelp = true;

  const getUrgencyConfig = (urgency: string) => {
    switch (urgency) {
      case "URGENT": 
        return { 
          color: "bg-gradient-to-r from-red-500 to-rose-600", 
          text: "text-red-700", 
          bg: "bg-red-50", 
          label: "⚠️ Urgent",
          border: "border-red-200",
          icon: "🔴"
        };
      case "HIGH": 
        return { 
          color: "bg-gradient-to-r from-orange-500 to-amber-600", 
          text: "text-orange-700", 
          bg: "bg-orange-50", 
          label: "⚡ High Priority",
          border: "border-orange-200",
          icon: "🟠"
        };
      case "MEDIUM": 
        return { 
          color: "bg-gradient-to-r from-yellow-500 to-yellow-600", 
          text: "text-yellow-700", 
          bg: "bg-yellow-50", 
          label: "📋 Medium",
          border: "border-yellow-200",
          icon: "🟡"
        };
      default: 
        return { 
          color: "bg-gradient-to-r from-blue-500 to-blue-600", 
          text: "text-blue-700", 
          bg: "bg-blue-50", 
          label: "✅ Low Priority",
          border: "border-blue-200",
          icon: "🔵"
        };
    }
  };

  const urgencyConfig = getUrgencyConfig(request.urgency);

  const handleEdit = () => {
    toast.info("Edit mode would open here");
    setShowActions(false);
  };

  const handleDelete = () => {
    toast.success("Request deleted");
    setShowActions(false);
    router.push("/explore");
  };

  const handleArchive = () => {
    toast.success("Request archived");
    setShowActions(false);
  };

  const handleResolve = () => {
    setRequestStatus(RequestStatus.RESOLVED);
    toast.success("Request marked as resolved!");
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Back Navigation with Breadcrumb */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Link 
          href="/explore" 
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Explore
        </Link>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Request</span>
            <span>•</span>
            <span>ID: {id.slice(-8)}</span>
          </div>
          
          {/* Actions dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowActions(!showActions)}
              className="h-8 w-8 rounded-lg"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            {showActions && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowActions(false)} />
                <div className="absolute right-0 top-full mt-1 z-20 w-44 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
                  <button onClick={handleEdit} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    <Edit3 className="h-3.5 w-3.5" /> Edit Request
                  </button>
                  <button onClick={handleArchive} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    <Archive className="h-3.5 w-3.5" /> Archive
                  </button>
                  <button onClick={handleResolve} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Mark Resolved
                  </button>
                  <div className="border-t border-slate-100" />
                  <button onClick={handleDelete} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors">
                    <Trash2 className="h-3.5 w-3.5" /> Delete Request
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Request Card */}
      <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white">
        {/* Animated Header Banner */}
        <div className={cn("h-1.5 animate-in slide-in-from-left duration-500", urgencyConfig.color)} />
        
        <CardHeader className="pb-4 pt-6">
          {/* Badges Row */}
          <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-0 px-3 py-1.5 text-xs font-medium rounded-full">
                📁 {request.category}
              </Badge>
              <Badge className={cn(urgencyConfig.bg, urgencyConfig.text, "border-0 px-3 py-1.5 text-xs font-medium rounded-full")}>
                {urgencyConfig.icon} {urgencyConfig.label}
              </Badge>
              {requestStatus === RequestStatus.RESOLVED && (
                <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 px-3 py-1.5 text-xs font-medium rounded-full">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Solved
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">
              <Clock className="h-3 w-3" />
              Posted {formatDistanceToNow(new Date(request.createdAt))} ago
            </div>
          </div>
          
          {/* Title */}
          <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            {request.title}
          </CardTitle>
          
          {/* Author Info */}
          <div className="flex items-center justify-between flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 ring-4 ring-white shadow-md">
                  <User className="h-6 w-6 text-slate-500" />
                </div>
                {(request.user?.trustScore ?? 0) > 800 && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center ring-2 ring-white">
                    <Sparkles className="h-2.5 w-2.5 text-white" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-900">{request.user?.name || "Unknown User"}</span>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10">
                    <Shield className="h-3 w-3 text-primary" />
                    <span className="text-xs font-semibold text-primary">{request.user?.trustScore || 0}</span>
                  </div>
                  {(request.user?.badges?.length ?? 0) > 0 && (
                    <div className="flex items-center gap-0.5">
                      <Award className="h-3 w-3 text-amber-500" />
                      <span className="text-[10px] text-slate-500">{request.user?.badges?.length ?? 0} badges</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-primary transition-colors">
                    <MessageCircle className="h-3 w-3" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-slate-500 hover:text-slate-700 rounded-full">
                <Share2 className="h-3.5 w-3.5" />
                <span className="text-xs hidden sm:inline">Share</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-slate-500 hover:text-red-600 rounded-full">
                <Flag className="h-3.5 w-3.5" />
                <span className="text-xs hidden sm:inline">Report</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-8 pt-2">
          {/* AI Summary - Enhanced */}
          {request.aiSummary && (
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 p-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-2xl" />
              <div className="relative flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">AI Summary</p>
                    <Sparkles className="h-3 w-3 text-indigo-400" />
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    &ldquo;{request.aiSummary}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10">
                <Heart className="h-3.5 w-3.5 text-primary" />
              </div>
              Detailed Description
            </h3>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
              <p className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                {request.description}
              </p>
            </div>
          </div>

          {/* Tags Section */}
          {request.tags && request.tags.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <div className="h-1 w-4 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
                Popular Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {request.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-primary/30 transition-all px-3 py-1 rounded-full text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-center">
          <div className="text-xl font-bold text-blue-600">{request.helpOffers?.length || 0}</div>
          <div className="text-[10px] font-medium text-slate-500">Help Offers</div>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 text-center">
          <div className="text-xl font-bold text-emerald-600">{(request as Request & { views?: number }).views ?? 42}</div>
          <div className="text-[10px] font-medium text-slate-500">Total Views</div>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 text-center">
          <div className="text-xl font-bold text-amber-600">{Math.floor((request as Request & { trustImpact?: number }).trustImpact ?? 0)}</div>
          <div className="text-[10px] font-medium text-slate-500">Trust Impact</div>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 text-center">
          <div className="text-xl font-bold text-purple-600">{(request as Request & { shares?: number }).shares ?? 8}</div>
          <div className="text-[10px] font-medium text-slate-500">Shares</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Help Offers + Comments Section */}
        <div className="lg:col-span-2 space-y-5">
          <CommentsSection requestId={id} />
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="pb-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                Help Offers ({request.helpOffers?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              {(request.helpOffers?.length || 0) === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <Heart className="h-10 w-10 text-slate-300" />
                  </div>
                  <p className="text-slate-500 font-medium">No help offers yet</p>
                  <p className="text-sm text-slate-400 mt-1">Be the first to offer help to this request!</p>
                  {canHelp && requestStatus === RequestStatus.OPEN && (
                    <Button className="mt-4 gap-2 bg-gradient-to-r from-emerald-500 to-teal-600">
                      <Heart className="h-4 w-4" />
                      Offer Help
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {request.helpOffers?.map((offer, idx) => (
                    <div 
                      key={offer.id} 
                      className="group p-5 rounded-xl border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300">
                              <User className="h-6 w-6 text-slate-500" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-slate-900">{offer.user?.name || "Anonymous Helper"}</span>
                              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10">
                                <Shield className="h-2.5 w-2.5 text-primary" />
                                <span className="text-[10px] font-semibold text-primary">{offer.user?.trustScore || 0}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-2.5 w-2.5 text-slate-300" />
                              <p className="text-[10px] text-slate-400">
                                {formatDistanceToNow(new Date(offer.createdAt))} ago
                              </p>
                            </div>
                          </div>
                        </div>
                        <ThumbsUp className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed pl-14">
                        {offer.message}
                      </p>
                      {isOwner && requestStatus !== RequestStatus.RESOLVED && (
                        <div className="flex gap-3 pl-14 mt-4">
                          <Button size="sm" variant="outline" className="h-8 text-xs gap-1 rounded-full">
                            <MessageCircle className="h-3 w-3" />
                            Chat
                          </Button>
                          <Button size="sm" className="h-8 text-xs gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700">
                            <CheckCircle2 className="h-3 w-3" />
                            Accept Help
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {canHelp && requestStatus === RequestStatus.OPEN && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <RequestOfferForm requestId={request.id} />
            </div>
          )}
          
          {/* Safety Tips Card */}
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
                  <Shield className="h-3.5 w-3.5 text-white" />
                </div>
                Safety Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {[
                "Never share passwords or sensitive data",
                "Review helper's trust score before accepting",
                "Use built-in messaging for coordination",
                "Meet in public places if meeting in person",
                "Report suspicious behavior immediately"
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                  <div className="w-4 h-4 rounded-full bg-blue-200 flex items-center justify-center mt-0.5 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  </div>
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Helpful Card */}
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden text-center bg-gradient-to-br from-slate-50 to-white">
            <CardContent className="p-6">
              <div className="w-14 h-14 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-3">
                <ThumbsUp className="h-7 w-7 text-green-600" />
              </div>
              <p className="text-sm font-bold text-slate-900 mb-1">Was this helpful?</p>
              <p className="text-xs text-slate-400 mb-4">Help others discover this request</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline" className="gap-1.5 rounded-full text-xs">
                  👍 Yes
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5 rounded-full text-xs">
                  👎 No
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Related Info Card */}
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <Link2 className="h-3.5 w-3.5" />
                <span>Request ID: {request.id}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}