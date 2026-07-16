"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage, useDebounce, useKeyboardShortcut } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import {
  Search,
  LayoutDashboard,
  Compass,
  MessageSquare,
  Trophy,
  Bot,
  Bell,
  UserCircle,
  Settings,
  PlusCircle,
  FileText,
  Sparkles,
  ArrowRight,
  Clock,
  Star,
  Command,
} from "lucide-react";

interface SearchResult {
  id: string;
  label: string;
  description?: string;
  href: string;
  icon: typeof Search;
  category: string;
}

const PAGES: SearchResult[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, category: "Pages" },
  { id: "explore", label: "Explore Requests", href: "/explore", icon: Compass, category: "Pages" },
  { id: "messages", label: "Messages", href: "/messages", icon: MessageSquare, category: "Pages" },
  { id: "leaderboard", label: "Leaderboard", href: "/leaderboard", icon: Trophy, category: "Pages" },
  { id: "ai-center", label: "AI Center", href: "/ai-center", icon: Bot, category: "Pages" },
  { id: "notifications", label: "Notifications", href: "/notifications", icon: Bell, category: "Pages" },
  { id: "profile", label: "Profile", href: "/profile/me", icon: UserCircle, category: "Pages" },
  { id: "settings", label: "Settings", href: "/settings", icon: Settings, category: "Pages" },
  { id: "create-request", label: "Create Request", href: "/request/create", icon: PlusCircle, category: "Actions" },
];

const ACTIONS: SearchResult[] = [
  { id: "new-request", label: "Create New Request", description: "Post a new help request", href: "/request/create", icon: FileText, category: "Actions" },
  { id: "ai-assist", label: "AI Assistant", description: "Get AI-powered help", href: "/ai-center", icon: Sparkles, category: "Actions" },
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>("ha_recent_searches", []);
  const debouncedQuery = useDebounce(query, 100);

  useKeyboardShortcut({
    key: "k",
    modifiers: ["ctrl"],
    handler: () => {
      setOpen((prev) => !prev);
      setSelectedIndex(0);
      if (!open) {
        setQuery("");
      }
    },
  });

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const allItems = [...PAGES, ...ACTIONS];

  const filtered = debouncedQuery
    ? allItems.filter(
        (item) =>
          item.label.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : allItems;

  const handleSelect = useCallback(
    (item: SearchResult) => {
      setRecentSearches((prev) => {
        const filtered = prev.filter((s) => s !== item.label);
        return [item.label, ...filtered].slice(0, 5);
      });
      setOpen(false);
      router.push(item.href);
    },
    [router, setRecentSearches]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Trigger button in the UI */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-400 hover:border-slate-300 hover:text-slate-600 transition-all w-full"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Quick search...</span>
          <span className="ml-auto flex items-center gap-0.5 text-[9px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
            <Command className="h-2.5 w-2.5" />K
          </span>
        </button>
      )}

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onKeyDown={handleKeyDown}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
              <Search className="h-5 w-5 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, actions, or anything..."
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-slate-400"
              />
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-100 text-[9px] font-mono text-slate-500">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {query && (
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Search results
                </div>
              )}

              {!query && recentSearches.length > 0 && (
                <div className="mb-2">
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    Recent searches
                  </div>
                  {recentSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => {
                        const item = allItems.find((i) => i.label === search);
                        if (item) handleSelect(item);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <Clock className="h-4 w-4 text-slate-400" />
                      {search}
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-0.5">
                {filtered.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all",
                      index === selectedIndex
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100"
                        : "hover:bg-slate-50"
                    )}
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <item.icon className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{item.label}</p>
                      {item.description && (
                        <p className="text-[10px] text-slate-400">{item.description}</p>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300" />
                  </button>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="py-12 text-center">
                  <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500 font-medium">No results found</p>
                  <p className="text-xs text-slate-400 mt-1">Try a different search term</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center gap-4 text-[9px] text-slate-400">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-slate-200 font-mono">↑↓</kbd> Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-slate-200 font-mono">↵</kbd> Open
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-slate-200 font-mono">Esc</kbd> Close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
