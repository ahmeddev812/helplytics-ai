"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_CHART_DATA = [
  { label: "Mon", value: 12 },
  { label: "Tue", value: 18 },
  { label: "Wed", value: 24 },
  { label: "Thu", value: 15 },
  { label: "Fri", value: 30 },
  { label: "Sat", value: 22 },
  { label: "Sun", value: 28 },
];

export function ActivityChart() {
  const maxValue = Math.max(...MOCK_CHART_DATA.map((d) => d.value));

  return (
    <Card className="border-slate-100 shadow-sm overflow-hidden">
      <CardHeader className="border-b bg-slate-50/30 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-black text-slate-900 tracking-tight">
              Activity Overview
            </CardTitle>
            <CardDescription className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              This week's engagement
            </CardDescription>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            +12.5%
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-end justify-between gap-2 sm:gap-3 h-32">
          {MOCK_CHART_DATA.map((item) => (
            <div key={item.label} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
              <span className="text-[9px] font-bold text-slate-400">{item.value}</span>
              <div className="w-full relative rounded-md overflow-hidden" style={{ height: `${(item.value / maxValue) * 100}%` }}>
                <div
                  className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-md transition-all duration-500 hover:from-blue-600 hover:to-purple-600"
                  style={{ height: "100%" }}
                />
              </div>
              <span className="text-[9px] font-medium text-slate-500 mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
