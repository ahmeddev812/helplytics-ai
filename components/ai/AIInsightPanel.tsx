"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Sparkles, Lightbulb } from "lucide-react";

export function AIInsightPanel() {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <Sparkles className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Weekly Tip</p>
            <p className="text-xs text-muted-foreground">
              Requests with detailed descriptions and 3+ tags get 40% faster responses.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Lightbulb className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Community Opportunity</p>
            <p className="text-xs text-muted-foreground">
              There are 5 open requests matching your &ldquo;TypeScript&rdquo; skill.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
