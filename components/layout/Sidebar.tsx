"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Compass, 
  PlusCircle, 
  MessageSquare, 
  Trophy, 
  Bot, 
  Bell, 
  UserCircle 
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Explore", icon: Compass, href: "/explore" },
    { label: "Create Request", icon: PlusCircle, href: "/request/create" },
    { label: "Messages", icon: MessageSquare, href: "/messages" },
    { label: "Leaderboard", icon: Trophy, href: "/leaderboard" },
    { label: "AI Center", icon: Bot, href: "/ai-center" },
    { label: "Notifications", icon: Bell, href: "/notifications" },
    { label: "Profile", icon: UserCircle, href: user ? `/profile/${user.id}` : "/onboarding" },
  ];

  return (
    <div className="flex flex-col h-full w-64 border-r bg-card text-card-foreground">
      <div className="p-4 flex flex-col gap-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
              pathname === route.href 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <route.icon className="h-4 w-4" />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
