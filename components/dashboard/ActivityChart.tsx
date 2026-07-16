"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ActivityChart() {
  return (
    <Card className="border-slate-100 shadow-sm overflow-hidden">
      <CardHeader className="border-b bg-slate-50/30 pb-4">
        <div>
          <CardTitle className="text-xl font-black text-slate-900 tracking-tight">
            Activity Overview
          </CardTitle>
          <CardDescription className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            This week&apos;s engagement
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm text-slate-500 font-medium">No activity data available yet.</p>
          <p className="text-xs text-slate-400 mt-1">Start helping others to see your activity stats.</p>
        </div>
      </CardContent>
    </Card>
  );
}
