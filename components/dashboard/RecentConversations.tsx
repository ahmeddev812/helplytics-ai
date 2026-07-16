"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/services";

const MOCK_CONVERSATIONS = [
  { id: "c1", title: "Optimizing React hooks performance", date: new Date(Date.now() - 1000 * 60 * 30), count: 4 },
  { id: "c2", title: "Writing a professional response", date: new Date(Date.now() - 1000 * 60 * 120), count: 2 },
  { id: "c3", title: "Generating tags for new request", date: new Date(Date.now() - 1000 * 60 * 60 * 5), count: 3 },
];

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
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {MOCK_CONVERSATIONS.map((conv) => (
            <Link
              key={conv.id}
              href="/ai-center"
              className="flex items-center gap-3 p-4 hover:bg-slate-50/80 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 flex items-center justify-center">
                <Bot className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-primary transition-colors">
                  {conv.title}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    {formatDate(conv.date, "relative")}
                  </span>
                  <span className="text-[10px] text-slate-400">{conv.count} messages</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
