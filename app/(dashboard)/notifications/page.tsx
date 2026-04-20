"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  MessageSquare, 
  UserPlus, 
  CheckCircle2, 
  Clock, 
  MoreHorizontal,
  Trash2,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    type: "offer",
    title: "New Help Offer",
    description: "John Doe offered to help with 'React Hooks problem'",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
    icon: UserPlus,
    color: "text-blue-500 bg-blue-50",
  },
  {
    id: "2",
    type: "message",
    title: "New Message",
    description: "Jane Smith sent you a message regarding 'Python Review'",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    icon: MessageSquare,
    color: "text-purple-500 bg-purple-50",
  },
  {
    id: "3",
    type: "resolved",
    title: "Request Resolved",
    description: "Your request 'UI/UX Feedback' has been marked as solved",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    icon: CheckCircle2,
    color: "text-green-500 bg-green-50",
  },
  {
    id: "4",
    type: "system",
    title: "Trust Score Increased",
    description: "Congratulations! Your trust score increased by 50 points.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    read: true,
    icon: Bell,
    color: "text-orange-500 bg-orange-50",
  },
];

export default function NotificationsPage() {
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    setNotifications(MOCK_NOTIFICATIONS);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            Notifications
          </h1>
          <p className="text-muted-foreground">Stay updated with your community activity.</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead} className="gap-2">
            <CheckCircle className="h-4 w-4" /> Mark all as read
          </Button>
        )}
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                <Bell className="h-8 w-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No notifications</h3>
              <p className="text-slate-500 max-w-xs mx-auto">
                We'll notify you when someone offers help or sends you a message.
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {notifications.map((notif) => (
                <div 
                  key={notif.id}
                  className={cn(
                    "p-6 flex gap-4 transition-colors border-b last:border-0 hover:bg-slate-50/50 relative group",
                    !notif.read && "bg-primary/[0.02]"
                  )}
                >
                  {!notif.read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                  )}
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                    notif.color
                  )}>
                    <notif.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={cn(
                        "font-bold text-sm",
                        !notif.read ? "text-slate-900" : "text-slate-600"
                      )}>
                        {notif.title}
                      </h3>
                      <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(notif.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed truncate pr-8">
                      {notif.description}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="secondary" className="h-7 text-[10px] px-3 font-bold uppercase tracking-wider">
                        View Details
                      </Button>
                      {!notif.read && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 text-[10px] px-3 text-primary hover:text-primary font-bold uppercase tracking-wider"
                          onClick={() => setNotifications(notifications.map(n => n.id === notif.id ? { ...n, read: true } : n))}
                        >
                          Mark read
                        </Button>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => deleteNotification(notif.id)}
                  >
                    <Trash2 className="h-4 w-4 text-slate-400 hover:text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-white">Notification Settings</h2>
          <p className="text-slate-400 text-sm mb-6">
            Customize how and when you want to be notified about community activity.
          </p>
          <Button className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
            Configure Preferences
          </Button>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
