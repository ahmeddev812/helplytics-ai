"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Plus,
  Trash2,
  Pencil,
  Star,
  Search,
  X,
  Check,
  MoreHorizontal,
  Download,
  Sparkles,
} from "lucide-react";
import type { AIConversation } from "@/lib/services";
import { formatDate } from "@/lib/services";

interface ConversationSidebarProps {
  conversations: AIConversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onClearAll: () => void;
  onExport: (id: string) => void;
}

export function ConversationSidebar({
  conversations,
  activeId,
  onSelect,
  onNew,
  onRename,
  onDelete,
  onToggleFavorite,
  onClearAll,
  onExport,
}: ConversationSidebarProps) {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleStartRename = (conv: AIConversation) => {
    setEditingId(conv.id);
    setEditTitle(conv.title);
  };

  const handleFinishRename = () => {
    if (editingId && editTitle.trim()) {
      onRename(editingId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle("");
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      <div className="p-4 border-b border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-900">AI Chat</span>
          </div>
          <button
            onClick={onNew}
            className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="New conversation"
          >
            <Plus className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full h-8 pl-8 pr-2 rounded-lg bg-slate-50 border border-slate-200 text-xs outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <X className="h-3 w-3 text-slate-400" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {filtered.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
              <MessageSquare className="h-6 w-6 text-slate-300" />
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {search ? "No conversations found" : "No conversations yet"}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              {search ? "Try a different search term" : "Start a new chat to begin"}
            </p>
          </div>
        ) : (
          filtered.map((conv) => (
            <div
              key={conv.id}
              className={cn(
                "group relative flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200",
                activeId === conv.id
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 shadow-sm"
                  : "hover:bg-slate-50 border border-transparent"
              )}
              onClick={() => onSelect(conv.id)}
              onKeyDown={(e) => e.key === "Enter" && onSelect(conv.id)}
              tabIndex={0}
              role="button"
              aria-current={activeId === conv.id ? "true" : undefined}
            >
              <div className="shrink-0">
                <Star
                  className={cn(
                    "h-3.5 w-3.5 transition-colors",
                    conv.favorite ? "fill-amber-400 text-amber-400" : "text-slate-300"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(conv.id);
                  }}
                  role="button"
                  aria-label={conv.favorite ? "Remove from favorites" : "Add to favorites"}
                />
              </div>

              <div className="flex-1 min-w-0">
                {editingId === conv.id ? (
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={handleFinishRename}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleFinishRename();
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    className="w-full text-xs font-medium bg-white border border-primary/30 rounded px-1.5 py-0.5 outline-none"
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <p className="text-xs font-medium text-slate-700 truncate">
                    {conv.title}
                  </p>
                )}
                <p className="text-[9px] text-slate-400 mt-0.5">
                  {conv.messages.length} messages · {formatDate(conv.updatedAt, "relative")}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {!editingId && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartRename(conv);
                      }}
                      className="p-1 rounded hover:bg-slate-200 transition-colors"
                      aria-label="Rename conversation"
                    >
                      <Pencil className="h-3 w-3 text-slate-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onExport(conv.id);
                      }}
                      className="p-1 rounded hover:bg-slate-200 transition-colors"
                      aria-label="Export conversation"
                    >
                      <Download className="h-3 w-3 text-slate-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(conv.id);
                      }}
                      className="p-1 rounded hover:bg-red-100 transition-colors"
                      aria-label="Delete conversation"
                    >
                      <Trash2 className="h-3 w-3 text-slate-400 hover:text-red-500" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {conversations.length > 0 && (
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={onClearAll}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[10px] font-medium text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-3 w-3" />
            Clear all conversations
          </button>
        </div>
      )}
    </div>
  );
}
