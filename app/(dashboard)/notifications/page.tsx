"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocalStorage } from "@/lib/hooks";
import { toast } from "sonner";
import { formatDate } from "@/lib/services";
import { 
  Bell, MessageSquare, UserPlus, CheckCircle2, Clock, Trash2,
  CheckCircle, Sparkles, Mail, Filter, AlertCircle, Star,
  X, Settings, Ban, RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { generateId } from "@/lib/services";

interface Notification {
  id: string;
  type: "offer" | "message" | "resolved" | "system" | "badge";
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [];

const NOTIFICATION_ICONS = {
  offer: UserPlus,
  message: MessageSquare,
  resolved: CheckCircle2,
  system: Bell,
  badge: Star,
} as const;

const NOTIFICATION_COLORS = {
  offer: "text-blue-500 bg-blue-50",
  message: "text-purple-500 bg-purple-50",
  resolved: "text-green-500 bg-green-50",
  system: "text-orange-500 bg-orange-50",
  badge: "text-amber-500 bg-amber-50",
} as const;

export default function NotificationsPage() {
  const [notifications, setNotifications] = useLocalStorage<Notification[]>(
    "ha_notifications",
    INITIAL_NOTIFICATIONS
  );
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification deleted");
  };

  const deleteAllRead = () => {
    setNotifications((prev) => prev.filter((n) => !n.read));
    toast.success("Cleared all read notifications");
  };

  const resetNotifications = () => {
    setNotifications(INITIAL_NOTIFICATIONS);
    toast.success("Notifications reset");
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
                <Bell className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Notifications</h1>
                <p className="text-slate-300 text-sm sm:text-base mt-1">Stay updated with your community activity.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-xs font-semibold">{unreadCount} unread</span>
                </div>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white disabled:opacity-30"
              >
                <CheckCircle className="h-4 w-4" /> Mark all read
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
            {(["all", "unread", "read"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 capitalize",
                  filter === option
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {option} {option === "unread" && unreadCount > 0 && `(${unreadCount})`}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-slate-400 hover:text-slate-600"
            onClick={deleteAllRead}
          >
            <Trash2 className="h-3 w-3 mr-1" /> Clear read
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-slate-400 hover:text-slate-600"
            onClick={resetNotifications}
          >
            <RotateCcw className="h-3 w-3 mr-1" /> Reset
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            <Settings className="h-3 w-3 mr-1" /> Configure
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <Card className="border-none shadow-xl overflow-hidden bg-white rounded-2xl">
        <CardContent className="p-0">
          {filteredNotifications.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <Bell className="h-10 w-10 text-slate-300" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold mt-6 mb-2 text-slate-900">All caught up!</h3>
              <p className="text-slate-500 max-w-xs mx-auto">
                {filter === "unread" ? "No unread notifications." : filter === "read" ? "No read notifications." : "No notifications yet. We'll notify you when something important happens."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredNotifications.map((notif) => {
                const Icon = NOTIFICATION_ICONS[notif.type] || Bell;
                const color = NOTIFICATION_COLORS[notif.type] || "text-slate-500 bg-slate-50";
                return (
                  <div 
                    key={notif.id}
                    className={cn(
                      "group relative p-4 sm:p-6 flex gap-4 transition-all duration-300 hover:bg-slate-50/80",
                      !notif.read && "bg-gradient-to-r from-blue-50/30 to-transparent"
                    )}
                  >
                    {!notif.read && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600" />
                    )}
                    
                    <div className={cn(
                      "relative w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105",
                      color
                    )}>
                      <Icon className="h-6 w-6" />
                      {!notif.read && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={cn("font-bold text-sm", !notif.read ? "text-slate-900" : "text-slate-600")}>
                            {notif.title}
                          </h3>
                          {!notif.read && (
                            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-[9px] px-2 py-0 border-0">New</Badge>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 whitespace-nowrap">
                          <Clock className="h-3 w-3" />
                          {formatDate(notif.timestamp, "relative")}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-500 leading-relaxed">{notif.description}</p>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button size="sm" className="h-8 text-[11px] font-bold rounded-lg bg-gradient-to-r from-slate-800 to-slate-700 text-white hover:from-slate-700 hover:to-slate-600 shadow-sm">
                          View Details
                        </Button>
                        {!notif.read && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="h-8 text-[11px] font-bold rounded-lg border-slate-200 text-slate-600 hover:border-primary/30 hover:text-primary"
                            onClick={() => markAsRead(notif.id)}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" /> Mark read
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50 hover:text-red-500 shrink-0"
                      onClick={() => deleteNotification(notif.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {notifications.length > 0 && (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-slate-400 hover:text-red-500 gap-2"
            onClick={() => {
              setNotifications([]);
              toast.success("All notifications cleared");
            }}
          >
            <Ban className="h-3 w-3" /> Clear all notifications
          </Button>
        </div>
      )}

      {/* Settings Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <h2 className="text-xl font-bold">Notification Settings</h2>
            </div>
            <p className="text-slate-300 text-sm max-w-md">
              Customize how and when you want to be notified about community activity.
            </p>
          </div>
          <Button className="bg-white text-slate-900 hover:bg-slate-100 font-bold shadow-lg whitespace-nowrap">
            Configure Preferences
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
        <AlertCircle className="h-5 w-5 text-blue-500 shrink-0" />
        <p className="text-xs text-blue-700">
          You can manage your notification preferences anytime from your profile settings.
        </p>
      </div>
    </div>
  );
}
