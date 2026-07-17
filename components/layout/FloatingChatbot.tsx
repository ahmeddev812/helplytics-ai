"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";

interface Message {
  role: "bot" | "user";
  content: string;
}

const WELCOME_MESSAGE = "Hi! I'm Helplytics AI assistant. Ask me anything about how the platform works, or get help crafting your request!";

const AUTO_REPLIES: Record<string, string> = {
  "hello": "Hey there! 👋 How can I help you today?",
  "hi": "Hi! Ready to get some help or help others?",
  "help": "I can help you with:\n• Creating and optimizing requests\n• Understanding how the platform works\n• Finding the right community members\n• Using AI features\n\nWhat would you like to know?",
  "features": "Our key features include:\n• AI Request Optimizer\n• Smart Community Matching\n• AI Chat Assistant\n• Real-time Notifications\n• Fast Semantic Search\n\nCheck out /features for details!",
  "how it works": "It's simple:\n1. Create an account\n2. Describe your problem\n3. AI improves your request\n4. The community helps you\n\nSee /how-it-works for the full breakdown!",
  "default": "Great question! I'm still learning, but I can help you navigate the platform. Try asking about features, how it works, or creating a request. You can also visit our help center for more info.",
};

function getReply(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const [key, reply] of Object.entries(AUTO_REPLIES)) {
    if (lower.includes(key)) return reply;
  }
  return AUTO_REPLIES["default"];
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", content: getReply(text) }]);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="fixed bottom-4 right-4 xs:bottom-6 xs:right-6 z-40"
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="relative group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative w-10 xs:w-12 h-10 xs:h-12 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            {isOpen ? (
              <X className="h-5 xs:h-6 w-5 xs:w-6 text-white" />
            ) : (
              <Bot className="h-5 xs:h-6 w-5 xs:w-6 text-white" />
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-20 right-4 xs:bottom-24 xs:right-6 z-50 w-[calc(100vw-2rem)] xs:w-[380px] max-h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">AI Assistant</p>
                  <p className="text-[10px] text-slate-400">Online — Powered by Helplytics</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-auto p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0" style={{ maxHeight: "360px" }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-primary to-purple-600 text-white rounded-br-md"
                          : "bg-slate-50 text-slate-700 rounded-bl-md border border-slate-100"
                      }`}
                    >
                      {msg.content.split("\n").map((line, j) => (
                        <span key={j}>
                          {line}
                          {j < msg.content.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 border-t border-slate-100 bg-white">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                    className="flex-1 h-10 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-primary/30 focus:bg-white focus:ring-2 focus:ring-primary/5 transition-all"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="h-10 w-10 rounded-xl bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center shadow-md hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
