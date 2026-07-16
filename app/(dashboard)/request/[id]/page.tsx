"use client";

import { Bot, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RequestDetailPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Bot className="h-10 w-10 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Request Not Found</h2>
        <p className="text-slate-500 max-w-sm mx-auto mb-6">The request you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/explore">
          <Button className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Explore
          </Button>
        </Link>
      </div>
    </div>
  );
}
