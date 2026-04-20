"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Bell, Search, PlusCircle, Sparkles, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="sticky top-0 z-[60] w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-[60px] max-w-[1600px] items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-8 lg:gap-12">
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900">Helplytics <span className="text-primary italic">AI</span></span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1.5 font-bold">
            {[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Explore", href: "/explore" },
              { label: "Leaderboard", href: "/leaderboard" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-1.5 text-xs text-slate-500 uppercase tracking-widest transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative hidden lg:block group">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary" />
            <input
              type="search"
              placeholder="Quick search (⌘+K)"
              className="h-9 w-64 rounded-xl border border-slate-200/80 bg-slate-50 px-9 py-2 text-xs font-medium outline-none transition-all focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 placeholder:text-slate-400"
            />
          </div>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/request/create" className="hidden sm:block">
                <Button size="sm" className="h-9 rounded-xl px-4 text-xs font-bold gap-2 shadow-lg shadow-primary/20">
                  <PlusCircle className="h-3.5 w-3.5" />
                  Create
                </Button>
              </Link>
              
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200">
                  <Bell className="h-4.5 w-4.5 text-slate-500" />
                  <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-white"></span>
                </Button>
                
                <div className="h-8 w-px bg-slate-100 mx-1" />
                
                <div className="flex items-center gap-3 pl-1">
                  <UserButton 
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "h-9 w-9 rounded-xl border-2 border-white shadow-sm ring-1 ring-slate-100",
                        userButtonTrigger: "focus:shadow-none"
                      }
                    }}
                    afterSignOutUrl="/" 
                  />
                  <div className="hidden xl:block text-left">
                    <p className="text-[10px] font-black text-slate-900 leading-none truncate max-w-[100px]">{user?.fullName}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Community Tier</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm" className="h-9 text-xs font-bold px-4 rounded-xl">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="h-9 text-xs font-bold px-5 rounded-xl shadow-lg shadow-primary/10">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
