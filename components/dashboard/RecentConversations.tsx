"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, ArrowRight } from "lucide-react";
import Link from "next/link";

export function RecentConversations() {
  return (
    <Card className="border-slate-100 shadow-sm overflow-hidden">
      <CardHeader className="border-b bg-slate-50/30 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-black text-slate-900 tracking-tight">
              Recent AI Chats
            </CardTitle>
            <CardDescription className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Continue where you left off
            </CardDescription>
          </div>
          <Link href="/ai-center">
            <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
            <Bot className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-sm text-slate-500 font-medium">No recent AI chats</p>
          <p className="text-xs text-slate-400 mt-1">Start a conversation in AI Center.</p>
        </div>
      </CardContent>
    </Card>
  );
}
