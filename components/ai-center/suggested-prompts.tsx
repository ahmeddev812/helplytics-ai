"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Lightbulb, ChevronDown, Sparkles, Code2, Palette, PenTool, Briefcase, GraduationCap } from "lucide-react";
import { AI_PROMPT_CATEGORIES, SUGGESTED_PROMPTS } from "@/lib/constants";

const CATEGORY_ICONS: Record<string, typeof Sparkles> = {
  Code2, Palette, PenTool, Briefcase, GraduationCap, Sparkles,
};

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  const [expanded, setExpanded] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = selectedCategory
    ? SUGGESTED_PROMPTS
    : SUGGESTED_PROMPTS;

  return (
    <div className="space-y-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors"
      >
        <Lightbulb className="h-3.5 w-3.5" />
        Suggested Prompts
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            expanded && "rotate-180"
          )}
        />
      </button>

      {expanded && (
        <>
          <div className="flex gap-1.5 flex-wrap">
            {AI_PROMPT_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.icon] || Sparkles;
              return (
                <button
                  key={cat.id}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === cat.id ? null : cat.id
                    )
                  }
                  className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all",
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r text-white shadow-sm " + cat.color
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  <Icon className="h-3 w-3" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {filtered.map((prompt) => (
              <button
                key={prompt}
                onClick={() => onSelect(prompt)}
                className="text-left px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-primary/30 hover:bg-primary/5 transition-all text-[11px] text-slate-600 hover:text-slate-900 leading-relaxed"
              >
                {prompt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
