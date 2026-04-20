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
  UserCircle,
  Settings,
  HelpCircle,
  ChevronRight
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  const mainRoutes = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Explore", icon: Compass, href: "/explore" },
    { label: "Create Request", icon: PlusCircle, href: "/request/create" },
    { label: "Messages", icon: MessageSquare, href: "/messages" },
    { label: "Leaderboard", icon: Trophy, href: "/leaderboard" },
    { label: "AI Center", icon: Bot, href: "/ai-center" },
    { label: "Notifications", icon: Bell, href: "/notifications" },
    { label: "Profile", icon: UserCircle, href: user ? `/profile/${user.id}` : "/onboarding" },
  ];

  const secondaryRoutes = [
    { label: "Settings", icon: Settings, href: "/settings" },
    { label: "Help Support", icon: HelpCircle, href: "/support" },
  ];

  return (
    <div className="flex flex-col h-full w-[260px] border-r border-slate-200/60 bg-white shadow-[1px_0_0_0_rgba(0,0,0,0.02)]">
      <div className="flex flex-col h-full p-4 gap-8">
        
        {/* Main Navigation */}
        <div className="space-y-1">
          <p className="px-3 pb-3 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Main Menu</p>
          {mainRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "group relative flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200",
                pathname === route.href 
                  ? "bg-primary/5 text-primary shadow-[inset_0_0_0_1px_rgba(var(--primary-rgb),0.1)]" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-3">
                <route.icon className={cn(
                  "h-4.5 w-4.5 transition-colors",
                  pathname === route.href ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
                )} />
                <span className={cn(
                  "text-[13px] font-bold tracking-tight",
                  pathname === route.href ? "text-primary" : "text-slate-500 group-hover:text-slate-900"
                )}>
                  {route.label}
                </span>
              </div>
              {pathname === route.href && (
                <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]" />
              )}
            </Link>
          ))}
        </div>

        {/* Secondary Navigation */}
        <div className="mt-auto space-y-1">
          <p className="px-3 pb-3 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Settings</p>
          {secondaryRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
            >
              <route.icon className="h-4.5 w-4.5 text-slate-400 group-hover:text-slate-600" />
              <span className="text-[13px] font-bold tracking-tight">{route.label}</span>
            </Link>
          ))}
          
          {/* Pro Badge/CTA */}
          <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-1">Unlock Pro</p>
              <p className="text-[10px] font-medium text-slate-300 leading-relaxed mb-3">Unlimited AI tools & priority matching.</p>
              <button className="w-full h-8 rounded-lg bg-white text-slate-900 text-[11px] font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-1.5">
                Upgrade Now <ChevronRight className="h-3 w-3" />
              </button>
            </div>
            {/* Visual background noise/glow */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-20 h-20 bg-primary rounded-full blur-[40px] opacity-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
