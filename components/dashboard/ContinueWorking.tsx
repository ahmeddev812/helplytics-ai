"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export function ContinueWorking() {
  return (
    <Card className="border-slate-100 shadow-sm overflow-hidden">
      <CardHeader className="border-b bg-slate-50/30 pb-4">
        <CardTitle className="text-xl font-black text-slate-900 tracking-tight">
          Continue Working
        </CardTitle>
        <CardDescription className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          Pick up where you left off
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="py-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
            <FileText className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-sm text-slate-500 font-medium">No items in progress</p>
          <p className="text-xs text-slate-400 mt-1">Create a request to get started.</p>
        </div>
      </CardContent>
    </Card>
  );
}
