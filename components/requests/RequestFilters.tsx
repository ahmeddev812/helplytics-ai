"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const categories = ["all", "Technical", "Academic", "Creative", "Career", "Personal", "Other"];
const urgencyLevels = ["all", "LOW", "MEDIUM", "HIGH", "URGENT"];

export function RequestFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete(key);
    else params.set(key, value);
    router.push(`/explore?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Category:</span>
        <select 
          className="text-xs border rounded px-2 py-1 bg-background"
          onChange={(e) => updateFilter("category", e.target.value)}
          value={searchParams.get("category") || "all"}
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Urgency:</span>
        <select 
          className="text-xs border rounded px-2 py-1 bg-background"
          onChange={(e) => updateFilter("urgency", e.target.value)}
          value={searchParams.get("urgency") || "all"}
        >
          {urgencyLevels.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>

      <Button 
        variant="ghost" 
        size="sm" 
        className="text-[10px] h-7 gap-1"
        onClick={() => router.push("/explore")}
      >
        <Filter className="h-3 w-3" />
        Reset
      </Button>
    </div>
  );
}
