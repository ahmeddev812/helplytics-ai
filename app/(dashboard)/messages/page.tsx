"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
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
  CheckCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

// Mock conversation data for the UI
const MOCK_CONVERSATIONS = [
  {
    id: "1",
    user: {
      name: "John Doe",
      avatar: null,
      status: "online",
      trustScore: 850,
    },
    lastMessage: "I can help you with the React hooks problem. When are you free?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    unread: 2,
    requestId: "req1",
    requestTitle: "Help with React Hooks",
  },
  {
    id: "2",
    user: {
      name: "Jane Smith",
      avatar: null,
      status: "offline",
      trustScore: 920,
    },
    lastMessage: "The pandas script looks much better now, thanks!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unread: 0,
    requestId: "req2",
    requestTitle: "Python Data Analysis Review",
  },
  {
    id: "3",
    user: {
      name: "Alex Johnson",
      avatar: null,
      status: "online",
      trustScore: 780,
    },
    lastMessage: "Can we hop on a quick call to discuss the requirements?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unread: 0,
    requestId: "req3",
    requestTitle: "UI/UX Feedback for Dashboard",
  },
];

const MOCK_MESSAGES = [
  { id: "m1", senderId: "other", content: "Hi there! I saw your request about React hooks.", timestamp: new Date(Date.now() - 1000 * 60 * 60) },
  { id: "m2", senderId: "me", content: "Hey! Yes, I'm struggling with some complex state transitions.", timestamp: new Date(Date.now() - 1000 * 60 * 45) },
  { id: "m3", senderId: "other", content: "I can help you with that. When are you free?", timestamp: new Date(Date.now() - 1000 * 60 * 30) },
];

export default function MessagesPage() {
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  useEffect(() => {
    setMounted(true);
    setSelectedChat(MOCK_CONVERSATIONS[0]);
  }, []);

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

  if (!mounted) return null;

  return (
    <div className="flex h-[calc(100vh-120px)] border rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* Sidebar: Chat List */}
      <div className="w-full md:w-80 border-r flex flex-col bg-slate-50/30">
        <div className="p-4 border-b space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Messages</h1>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search chats..." 
              className="pl-9 bg-white h-9 text-sm"
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="flex flex-col">
            {MOCK_CONVERSATIONS.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={cn(
                  "p-4 flex gap-3 text-left transition-colors border-b last:border-0",
                  selectedChat?.id === chat.id 
                    ? "bg-white shadow-sm z-10" 
                    : "hover:bg-slate-100/50"
                )}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border border-white">
                    <User className="h-6 w-6 text-slate-500" />
                  </div>
                  {chat.user.status === "online" && (
                    <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm truncate">{chat.user.name}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {formatDistanceToNow(chat.timestamp, { addSuffix: false }).replace('about ', '')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className="text-xs text-muted-foreground truncate leading-relaxed">
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main: Chat View */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <header className="h-[65px] px-6 border-b flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <h2 className="font-bold text-sm leading-none mb-1">{selectedChat.user.name}</h2>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      selectedChat.user.status === "online" ? "bg-green-500" : "bg-slate-300"
                    )} />
                    {selectedChat.user.status} • {selectedChat.requestTitle}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400">
                  <Info className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </header>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                <div className="flex justify-center my-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full border">
                    Chat started regarding "{selectedChat.requestTitle}"
                  </span>
                </div>
                
                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={cn(
                      "flex flex-col gap-1 max-w-[75%]",
                      msg.senderId === "me" ? "ml-auto items-end" : "items-start"
                    )}
                  >
                    <div className={cn(
                      "p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm",
                      msg.senderId === "me" 
                        ? "bg-slate-900 text-white rounded-tr-none" 
                        : "bg-slate-100 text-slate-800 rounded-tl-none border"
                    )}>
                      {msg.content}
                    </div>
                    <div className="flex items-center gap-1.5 px-1">
                      <span className="text-[9px] text-muted-foreground font-medium">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {msg.senderId === "me" && <CheckCheck className="h-3 w-3 text-blue-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <footer className="p-4 border-t bg-slate-50/50">
              <div className="flex gap-2 items-end max-w-4xl mx-auto">
                <div className="flex-1 bg-white border rounded-xl shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <Textarea 
                    placeholder="Type your message..." 
                    rows={1}
                    className="w-full border-none focus-visible:ring-0 py-3 resize-none min-h-[44px]"
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
                  className="h-11 w-11 rounded-xl shrink-0 shadow-lg shadow-primary/20"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-50/20">
            <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">No conversation selected</h3>
            <p className="text-muted-foreground max-w-xs">
              Select a conversation from the list to start messaging or view request details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Local helper component for Textarea auto-resize (simplified)
function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
