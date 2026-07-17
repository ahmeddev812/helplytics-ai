"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Bell, Search, PlusCircle, Sparkles, Menu, X, LayoutDashboard, MessageSquare, Users, ArrowRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Explore", href: "/explore", icon: Search },
  { label: "Leaderboard", href: "/leaderboard", icon: Users },
  { label: "Messages", href: "/messages", icon: MessageSquare },
];

export function Navbar() {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-[60] w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex h-[60px] max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-8 xl:gap-12">
            <Link href="/" className="group flex items-center gap-1.5 sm:gap-2 shrink-0">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                <Sparkles className="size-3.5 sm:size-4 text-white" />
              </div>
              <span className="text-sm sm:text-lg font-black tracking-tight text-slate-900 truncate max-w-[100px] sm:max-w-none">
                Helplytics <span className="text-primary italic">AI</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 lg:px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors",
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? "bg-primary/10 text-primary"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  <link.icon className="size-3.5 lg:size-4" />
                  <span className="hidden lg:inline">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">
            <div className="relative hidden lg:block group">
              <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary" />
              <input
                type="search"
                placeholder="Quick search (⌘+K)"
                className="h-9 w-48 xl:w-64 rounded-xl border border-slate-200/80 bg-slate-50 px-9 py-2 text-xs font-medium outline-none transition-all focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 placeholder:text-slate-400"
              />
            </div>

            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            {isSignedIn ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <Link href="/request/create">
                  <Button size="sm" className="h-8 sm:h-9 rounded-xl px-3 sm:px-4 text-[10px] sm:text-xs font-bold gap-1.5 shadow-lg shadow-primary/20">
                    <PlusCircle className="size-3.5" />
                    <span className="hidden xs:inline">Create</span>
                  </Button>
                </Link>

                <div className="flex items-center gap-1 sm:gap-3">
                  <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200">
                    <Bell className="size-4 sm:size-4.5 text-slate-500" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-white" />
                  </Button>

                  <div className="h-6 sm:h-8 w-px bg-slate-100 mx-0.5 sm:mx-1" />

                  <div className="flex items-center gap-2 sm:gap-3 pl-0.5 sm:pl-1">
                    <UserButton
                     appearance={{
                       elements: {
                         userButtonAvatarBox: "h-8 w-8 sm:h-9 sm:w-9 rounded-xl border-2 border-white shadow-sm ring-1 ring-slate-100",
                         userButtonTrigger: "focus:shadow-none"
                       }
                     }}
                    />
                    <div className="hidden xl:block text-left">
                      <p className="text-[10px] font-black text-slate-900 leading-none truncate max-w-[100px]">{user?.fullName}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Community Tier</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm" className="h-8 sm:h-9 text-[11px] sm:text-xs font-bold px-3 sm:px-4 rounded-xl">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm" className="h-8 sm:h-9 text-[11px] sm:text-xs font-bold px-3 sm:px-5 rounded-xl shadow-lg shadow-primary/10">Get Started</Button>
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[55] md:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-[60px] left-0 right-0 bg-white border-b border-slate-200 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <link.icon className="size-5" />
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="px-4 pb-4 pt-2 border-t border-slate-100">
              {isSignedIn ? (
                <div className="flex items-center gap-3">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "h-10 w-10 rounded-xl border-2 border-white shadow-sm",
                      }
                    }}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">{user?.fullName || "User"}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Community Tier</p>
                  </div>
                  <Link href="/request/create" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button size="sm" className="bg-gradient-to-r from-primary to-purple-600 text-white shadow-md">
                      <PlusCircle className="size-4 mr-1" />
                      Create
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link href="/sign-in" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/sign-up" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-primary to-purple-600 text-white">Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
