"use client";

import { useState, useRef, useCallback, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { Send, Square, Sparkles } from "lucide-react";

interface PromptInputProps {
  onSend: (message: string) => void;
  onStop: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

export function PromptInput({ onSend, onStop, isGenerating, disabled }: PromptInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "44px";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, []);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isGenerating) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "flex items-end gap-2 p-2 rounded-2xl border transition-all duration-200",
          isGenerating
            ? "border-blue-300 bg-blue-50/50 shadow-sm"
            : "border-slate-200 bg-white hover:border-slate-300 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10"
        )}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            adjustHeight();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Shift+Enter for new line)"
          rows={1}
          disabled={disabled}
          className="flex-1 resize-none bg-transparent border-none outline-none px-3 py-2.5 text-sm placeholder:text-slate-400 disabled:opacity-50 min-h-[44px] max-h-[200px]"
          aria-label="Message input"
        />

        <div className="flex items-center gap-1 shrink-0 pb-1">
          {isGenerating ? (
            <button
              onClick={onStop}
              className="flex items-center gap-1.5 h-9 px-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition-all shadow-sm"
              aria-label="Stop generating"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
              Stop
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={!value.trim() || disabled}
              className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-slate-400" />
          <span className="text-[10px] text-slate-400">
            AI-powered responses
          </span>
        </div>
        <span
          className={cn(
            "text-[10px] font-medium",
            value.length > 2000
              ? "text-red-500"
              : value.length > 1000
              ? "text-amber-500"
              : "text-slate-400"
          )}
        >
          {value.length} / 4000
        </span>
      </div>
    </div>
  );
}
