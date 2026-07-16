"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Message, ConversationSidebar, SuggestedPrompts, PromptInput } from "@/components/ai-center";
import { simulateStreamingResponse, simulateAIResponse } from "@/lib/services";
import { useLocalStorage, useMediaQuery, useKeyboardShortcut } from "@/lib/hooks";
import { generateId } from "@/lib/services";
import type { AIMessage, AIConversation } from "@/lib/services";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Bot,
  Download,
  Share2,
  Copy,
  Check,
  Menu,
  X,
  Sparkles,
  Cpu,
  Trash2,
  FileDown,
  ChevronDown,
} from "lucide-react";

export default function AICenterPage() {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useLocalStorage<AIConversation[]>(
    "ha_ai_conversations",
    []
  );
  const [activeId, setActiveId] = useLocalStorage<string | null>(
    "ha_active_conversation",
    null
  );

  const activeConversation = conversations.find((c) => c.id === activeId) || null;

  useKeyboardShortcut({
    key: "n",
    modifiers: ["ctrl"],
    handler: () => handleNewConversation(),
  });

  useKeyboardShortcut({
    key: "/",
    handler: () => {
      document.querySelector("textarea")?.focus();
    },
  });

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, streamingContent, scrollToBottom]);

  const getOrCreateActiveConversation = useCallback(() => {
    if (activeId && conversations.find((c) => c.id === activeId)) {
      return activeId;
    }
    return handleNewConversation();
  }, [activeId, conversations]);

  function handleNewConversation(): string {
    const id = generateId();
    const newConv: AIConversation = {
      id,
      title: "New conversation",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      favorite: false,
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveId(id);
    return id;
  }

  const updateConversation = useCallback(
    (id: string, updater: (conv: AIConversation) => AIConversation) => {
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? updater(c) : c))
      );
    },
    [setConversations]
  );

  const handleSend = useCallback(
    async (content: string) => {
      const convId = getOrCreateActiveConversation();

      const userMessage: AIMessage = {
        id: generateId(),
        role: "user",
        content,
        timestamp: new Date(),
      };

      updateConversation(convId, (conv) => ({
        ...conv,
        messages: [...conv.messages, userMessage],
        updatedAt: new Date(),
        title: conv.messages.length === 0 ? content.slice(0, 50) + (content.length > 50 ? "..." : "") : conv.title,
      }));

      setIsGenerating(true);
      setStreamingContent("");

      const fullResponse = await simulateAIResponse(content, convId);

      const aiMessage: AIMessage = {
        id: generateId(),
        role: "assistant",
        content: fullResponse,
        timestamp: new Date(),
      };

      updateConversation(convId, (conv) => ({
        ...conv,
        messages: [...conv.messages, aiMessage],
        updatedAt: new Date(),
      }));

      setIsGenerating(false);
      setStreamingContent("");
    },
    [getOrCreateActiveConversation, updateConversation]
  );

  const handleStop = useCallback(() => {
    setIsGenerating(false);
    toast.info("Generation stopped");
  }, []);

  const handleRegenerate = useCallback(async () => {
    const conv = activeConversation;
    if (!conv || conv.messages.length < 1) return;
    const lastUserMsg = [...conv.messages].reverse().find((m) => m.role === "user");
    if (!lastUserMsg) return;

    const updatedMessages = conv.messages.filter((m) => m.role === "user" || m !== conv.messages[conv.messages.length - 1]);
    updateConversation(conv.id, (c) => ({
      ...c,
      messages: updatedMessages,
      updatedAt: new Date(),
    }));

    setIsGenerating(true);
    setStreamingContent("");

    const response = await simulateAIResponse(lastUserMsg.content, conv.id);

    const newMessage: AIMessage = {
      id: generateId(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    updateConversation(conv.id, (c) => ({
      ...c,
      messages: [...c.messages, newMessage],
      updatedAt: new Date(),
    }));

    setIsGenerating(false);
    toast.success("Response regenerated");
  }, [activeConversation, updateConversation]);

  const handleSelectPrompt = useCallback((prompt: string) => {
    document.querySelector("textarea")?.focus();
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      "value"
    )?.set;
    const textarea = document.querySelector("textarea");
    if (textarea && nativeInputValueSetter) {
      nativeInputValueSetter.call(textarea, prompt);
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }, []);

  const handleRename = useCallback(
    (id: string, title: string) => {
      updateConversation(id, (c) => ({ ...c, title, updatedAt: new Date() }));
      toast.success("Conversation renamed");
    },
    [updateConversation]
  );

  const handleDelete = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeId === id) {
        const remaining = conversations.filter((c) => c.id !== id);
        setActiveId(remaining.length > 0 ? remaining[0].id : null);
      }
      toast.success("Conversation deleted");
    },
    [activeId, conversations, setConversations, setActiveId]
  );

  const handleToggleFavorite = useCallback(
    (id: string) => {
      updateConversation(id, (c) => ({
        ...c,
        favorite: !c.favorite,
        updatedAt: new Date(),
      }));
    },
    [updateConversation]
  );

  const handleClearConversation = useCallback(() => {
    if (!activeId) return;
    updateConversation(activeId, (c) => ({
      ...c,
      messages: [],
      updatedAt: new Date(),
    }));
    toast.success("Conversation cleared");
  }, [activeId, updateConversation]);

  const handleClearAll = useCallback(() => {
    setConversations([]);
    setActiveId(null);
    toast.success("All conversations cleared");
  }, [setConversations, setActiveId]);

  const handleCopyResponse = useCallback(async () => {
    const conv = activeConversation;
    if (!conv || conv.messages.length === 0) return;
    const text = conv.messages
      .map((m) => `[${m.role.toUpperCase()}]\n${m.content}`)
      .join("\n\n");
    await navigator.clipboard.writeText(text);
    toast.success("Conversation copied to clipboard");
  }, [activeConversation]);

  const handleExportConversation = useCallback(
    (id: string) => {
      const conv = conversations.find((c) => c.id === id);
      if (!conv) return;
      const markdown = conv.messages
        .map((m) => `## ${m.role === "user" ? "You" : "AI"}\n\n${m.content}\n`)
        .join("\n---\n");
      const blob = new Blob([markdown], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${conv.title.replace(/[^a-zA-Z0-9]/g, "_")}.md`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Conversation exported");
    },
    [conversations]
  );

  const handleDownloadResponse = useCallback(() => {
    const conv = activeConversation;
    if (!conv || conv.messages.length === 0) return;
    const text = conv.messages
      .map((m) => `[${m.role === "user" ? "You" : "AI"}]\n${m.content}`)
      .join("\n\n---\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${conv.title.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Response downloaded");
  }, [activeConversation]);

  const handleShare = useCallback(async () => {
    const conv = activeConversation;
    if (!conv || conv.messages.length === 0) return;
    const text = conv.messages.map((m) => `${m.role}: ${m.content}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard - ready to share!");
    } catch {
      toast.error("Failed to copy");
    }
  }, [activeConversation]);

  const messages = activeConversation?.messages || [];

  return (
    <div className="h-[calc(100vh-80px)] lg:h-[calc(100vh-100px)] overflow-hidden">
      <div className="flex h-full bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden">
        {/* Sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 lg:relative lg:translate-x-0 transform transition-all duration-300 ease-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <ConversationSidebar
            conversations={conversations}
            activeId={activeId}
            onSelect={setActiveId}
            onNew={handleNewConversation}
            onRename={handleRename}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavorite}
            onClearAll={handleClearAll}
            onExport={handleExportConversation}
          />
        </div>

        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-200/50 px-4 py-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors lg:block"
                aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              >
                <Menu className="h-4 w-4 text-slate-500" />
              </button>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-sm">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-bold text-slate-900 leading-tight">
                    {activeConversation?.title || "AI Center"}
                  </h1>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[9px] text-slate-400">AI Ready</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => document.querySelector("textarea")?.focus()}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <kbd className="px-1 py-0.5 rounded bg-slate-200 text-[9px] font-mono text-slate-500">
                  /
                </kbd>
                Focus
              </button>

              <button
                onClick={handleRegenerate}
                disabled={isGenerating || messages.length === 0}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-30"
                aria-label="Regenerate response"
                title="Regenerate"
              >
                <Sparkles className="h-4 w-4 text-slate-500" />
              </button>

              <button
                onClick={handleCopyResponse}
                disabled={messages.length === 0}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-30"
                aria-label="Copy conversation"
                title="Copy"
              >
                <Copy className="h-4 w-4 text-slate-500" />
              </button>

              <button
                onClick={handleDownloadResponse}
                disabled={messages.length === 0}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-30"
                aria-label="Download response"
                title="Download"
              >
                <Download className="h-4 w-4 text-slate-500" />
              </button>

              <button
                onClick={handleShare}
                disabled={messages.length === 0}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-30"
                aria-label="Share conversation"
                title="Share"
              >
                <Share2 className="h-4 w-4 text-slate-500" />
              </button>

              <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />

              <button
                onClick={handleClearConversation}
                disabled={messages.length === 0}
                className="p-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-30"
                aria-label="Clear conversation"
                title="Clear conversation"
              >
                <Trash2 className="h-4 w-4 text-slate-400 hover:text-red-500" />
              </button>

              <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200">
                <Cpu className="h-3 w-3 text-blue-500" />
                <span className="text-[9px] font-bold text-slate-500">GPT-4</span>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.length === 0 && !isGenerating ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-6">
                    <Bot className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    How can I help you today?
                  </h2>
                  <p className="text-sm text-slate-500 max-w-md mb-8">
                    Ask me to optimize requests, summarize messages, write responses, or brainstorm ideas.
                  </p>

                  <div className="w-full max-w-lg space-y-4">
                    <SuggestedPrompts onSelect={handleSelectPrompt} />
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <Message
                      key={msg.id}
                      role={msg.role}
                      content={msg.content}
                      timestamp={msg.timestamp}
                    />
                  ))}

                  {isGenerating && (
                    <Message
                      role="assistant"
                      content=""
                      timestamp={new Date()}
                      isStreaming
                    />
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-200/50 p-4">
            <div className="max-w-3xl mx-auto">
              <PromptInput
                onSend={handleSend}
                onStop={handleStop}
                isGenerating={isGenerating}
              />
              <p className="text-center text-[9px] text-slate-400 mt-2">
                AI responses are simulated for demonstration. Press Ctrl+N for new conversation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
