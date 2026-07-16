"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, ArrowRight, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MOCK_ITEMS = [
  { id: "d1", title: "React Hooks Problem", status: "In Progress", type: "request", href: "/request/req1" },
  { id: "d2", title: "Python Script Review", status: "Draft", type: "request", href: "/request/create" },
];

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
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {MOCK_ITEMS.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-xs text-slate-500">No items in progress</p>
            </div>
          ) : (
            MOCK_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-3 p-4 hover:bg-slate-50/80 transition-all group"
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center border",
                  item.status === "In Progress" ? "bg-blue-50 border-blue-100 text-blue-600" : "bg-amber-50 border-amber-100 text-amber-600"
                )}>
                  {item.status === "In Progress" ? <AlertCircle className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] font-medium text-slate-400 flex items-center gap-1 mt-0.5">
                    <Clock className="h-2.5 w-2.5" />
                    {item.status}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
              </Link>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
