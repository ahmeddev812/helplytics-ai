"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useMounted } from "@/lib/hooks";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  MessageSquare, 
  User, 
  Send, 
  MoreVertical, 
  Phone, 
  Video,
  Info,
  CheckCheck,
  Sparkles,
  Star,
  Shield,
  Clock,
  Pin,
  Smile,
  Paperclip,
  Mic,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export default function MessagesPage() {
  const { user } = useUser();
  const mounted = useMounted();
  const [selectedChat, setSelectedChat] = useState<{
    user: { name: string; status: string; trustScore: number; role: string };
  } | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<{
    id: string;
    senderId: string;
    content: string;
    timestamp: Date;
  }[]>([]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const msg = {
      id: Date.now().toString(),
      senderId: "me",
      content: newMessage,
      timestamp: new Date(),
    };
    
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 900) return "text-emerald-500";
    if (score >= 800) return "text-blue-500";
    if (score >= 700) return "text-amber-500";
    return "text-slate-500";
  };

  if (!mounted) return null;

  return (
    <div className="h-[calc(100vh-80px)] lg:h-[calc(100vh-100px)] overflow-hidden">
      <div className="flex h-full bg-gradient-to-br from-muted to-background rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden">
        
        {/* Sidebar: Chat List */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-40 w-80 max-w-[85vw] bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* Sidebar Header */}
          <div className="p-5 border-b bg-gradient-to-r from-muted to-background">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-black tracking-tight text-slate-900">Messages</h1>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400">3 active</span>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary" />
              <input
                type="search"
                placeholder="Search conversations..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none transition-all focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 placeholder:text-slate-400"
              />
            </div>
          </div>
          
          {/* Conversations List */}
          <ScrollArea className="flex-1">
            <div className="flex flex-col p-2">
              {[].length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">No conversations yet</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-[200px]">Start by offering help on a request or creating one.</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Sidebar Footer */}
          <div className="p-4 border-t bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-200 to-slate-300">
                <Sparkles className="h-4 w-4 text-slate-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">AI Assistant</p>
                <p className="text-[10px] text-slate-400">Available 24/7 for quick help</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Backdrop */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Main: Chat View */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-200/50 px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  {/* Mobile back button */}
                  <button
                    onClick={() => setIsMobileSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5 text-slate-500" />
                  </button>
                  
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                      <User className="h-5 w-5 text-slate-500" />
                    </div>
                    {selectedChat.user.status === "online" && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    )}
                  </div>
                  
                  <div>
                    <h2 className="font-bold text-slate-900 leading-none mb-1">
                      {selectedChat.user.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3 text-primary" />
                        <span className={cn("text-[10px] font-bold", getTrustScoreColor(selectedChat.user.trustScore))}>
                          {selectedChat.user.trustScore} Trust Score
                        </span>
                      </div>
                      <span className="text-[9px] text-slate-400 capitalize">{selectedChat.user.role}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-500 hover:bg-slate-100">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-500 hover:bg-slate-100">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-500 hover:bg-slate-100">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <ScrollArea className="flex-1 px-4 py-6" ref={scrollRef}>
                <div className="space-y-4 max-w-3xl mx-auto">
                  {/* Conversation Start Indicator */}
                  <div className="flex justify-center my-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
                      <Pin className="h-3 w-3 text-slate-400" />
                      <span className="text-[10px] font-medium text-slate-500">
                        Conversation started
                      </span>
                      <Clock className="h-3 w-3 text-slate-400" />
                    </div>
                  </div>
                  
                  {messages.map((msg, idx) => (
                    <div 
                      key={msg.id}
                      className={cn(
                        "flex flex-col gap-1 animate-in fade-in slide-in-from-bottom-2 duration-300",
                        msg.senderId === "me" ? "items-end" : "items-start"
                      )}
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className={cn(
                        "relative max-w-[85%] sm:max-w-[70%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                        msg.senderId === "me" 
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none" 
                          : "bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200"
                      )}>
                        {msg.content}
                      </div>
                      <div className="flex items-center gap-1.5 px-1">
                        <span className="text-[9px] text-slate-400 font-medium">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {msg.senderId === "me" && <CheckCheck className="h-3 w-3 text-blue-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-200/50 p-4">
                <div className="flex gap-2 items-end max-w-3xl mx-auto">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-slate-600">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-slate-600">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/20 transition-all">
                    <textarea 
                      placeholder="Type your message..."
                      rows={1}
                      className="w-full bg-transparent border-none focus:outline-none p-3 resize-none min-h-[44px] text-sm placeholder:text-slate-400"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!newMessage.trim()}
                    className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                  <MessageSquare className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mt-6 mb-2">No conversation selected</h3>
              <p className="text-slate-500 max-w-sm">
                Select a conversation from the list to start messaging or view request details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}