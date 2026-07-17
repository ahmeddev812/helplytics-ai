"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton, SignOutButton } from "@clerk/nextjs";
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
  ChevronRight,
  LogOut,
  X
} from "lucide-react";

export function Sidebar({ onClose }: { onClose?: () => void }) {
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
    { label: "Sign Out", icon: LogOut, href: "#", signOut: true },
  ];

  return (
    <div className="flex flex-col h-full w-[280px] max-w-[85vw] bg-gradient-to-b from-background via-background to-muted/30 border-r border-slate-200/40 shadow-xl shadow-slate-200/20">
      {/* Close button for mobile */}
      <div className="flex justify-end p-2 lg:hidden">
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="h-5 w-5 text-slate-500" />
        </button>
      </div>

      <div className="flex flex-col h-full p-4 gap-6 overflow-y-auto">
        {/* Logo Section */}
        <div className="px-3 py-2">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-black tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Helplytics AI
            </span>
          </Link>
        </div>
        
        {/* Main Navigation */}
        <div className="space-y-2">
          <p className="px-3 pb-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400/80">Main Menu</p>
          {mainRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={onClose}
              className={cn(
                "group relative flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200",
                pathname === route.href 
                  ? "bg-gradient-to-r from-primary/8 to-primary/4 text-primary shadow-sm" 
                  : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-900 hover:shadow-sm"
              )}
            >
              <div className="flex items-center gap-3">
                <route.icon className={cn(
                  "h-5 w-5 transition-all duration-200",
                  pathname === route.href 
                    ? "text-primary drop-shadow-sm" 
                    : "text-slate-400 group-hover:text-slate-600 group-hover:scale-105"
                )} />
                <span className={cn(
                  "text-sm font-semibold tracking-tight transition-all duration-200",
                  pathname === route.href 
                    ? "text-slate-900" 
                    : "text-slate-600 group-hover:text-slate-900"
                )}>
                  {route.label}
                </span>
              </div>
              {pathname === route.href && (
                <div className="h-2 w-2 rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-md shadow-primary/30" />
              )}
            </Link>
          ))}
        </div>

        {/* Secondary Navigation */}
        <div className="mt-auto space-y-2">
          <p className="px-3 pb-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400/80">Settings</p>
          {secondaryRoutes.map((route) =>
            route.signOut ? (
              <SignOutButton key="sign-out">
                <button
                  onClick={onClose}
                  className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50/80 hover:text-red-600 transition-all duration-200 hover:shadow-sm"
                >
                  <route.icon className="h-5 w-5 text-slate-400 group-hover:text-red-500 group-hover:scale-105 transition-all duration-200" />
                  <span className="text-sm font-semibold tracking-tight text-slate-600 group-hover:text-red-600 transition-colors">
                    {route.label}
                  </span>
                </button>
              </SignOutButton>
            ) : (
              <Link
                key={route.href}
                href={route.href}
                onClick={onClose}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50/80 hover:text-slate-900 transition-all duration-200 hover:shadow-sm"
              >
                <route.icon className="h-5 w-5 text-slate-400 group-hover:text-slate-600 group-hover:scale-105 transition-all duration-200" />
                <span className="text-sm font-semibold tracking-tight text-slate-600 group-hover:text-slate-900 transition-colors">
                  {route.label}
                </span>
              </Link>
            )
          )}
          
          {/* Pro Badge/CTA */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
            <div className="relative z-10">
              <p className="text-[11px] font-black uppercase tracking-widest text-amber-400/90 mb-1">Unlock Pro</p>
              <p className="text-[10px] font-medium text-slate-300 leading-relaxed mb-3">Unlimited AI tools & priority matching.</p>
              <button className="w-full py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[11px] font-bold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-1.5 group/btn">
                Upgrade Now 
                <ChevronRight className="h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-amber-500/30 to-primary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}