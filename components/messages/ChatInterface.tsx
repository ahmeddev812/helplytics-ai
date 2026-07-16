"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Send, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;
}

interface ChatUser {
  name: string;
  avatar?: string | null;
}

export function ChatInterface({
  requestId,
  currentUserId,
  otherUser,
}: {
  requestId?: string;
  currentUserId?: string;
  otherUser?: ChatUser;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const msg = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: currentUserId,
      createdAt: new Date(),
    };
    
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  return (
    <Card className="flex flex-col h-[500px]">
      <CardHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
            <User className="h-5 w-5 text-slate-500" />
          </div>
          <div>
            <CardTitle className="text-sm font-bold">{otherUser?.name || "User"}</CardTitle>
            <div className="flex items-center gap-1 text-[10px] text-green-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            Start a conversation about this request.
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id}
              className={cn(
                "max-w-[80%] p-3 rounded-lg text-sm",
                msg.senderId === currentUserId 
                  ? "ml-auto bg-primary text-primary-foreground rounded-br-none" 
                  : "mr-auto bg-slate-100 text-slate-800 rounded-bl-none"
              )}
            >
              {msg.content}
              <div className={cn(
                "text-[9px] mt-1 flex justify-end items-center gap-1",
                msg.senderId === currentUserId ? "text-primary-foreground/70" : "text-slate-400"
              )}>
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {msg.senderId === currentUserId && <Check className="h-2 w-2" />}
              </div>
            </div>
          ))
        )}
      </CardContent>
      <div className="p-4 border-t flex gap-2">
        <Input 
          placeholder="Type your message..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button size="icon" onClick={handleSend} disabled={!newMessage.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
