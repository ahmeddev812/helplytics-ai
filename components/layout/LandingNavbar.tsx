"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Bell, Search, PlusCircle, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function LandingNavbar() {
  const { isSignedIn, user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Explore", href: "/explore" },
    { label: "Leaderboard", href: "/leaderboard" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-[60] w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-[60px] max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25 transition-transform group-hover:scale-110">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900">
              Helplytics <span className="text-primary italic">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 font-bold">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-1.5 text-xs text-slate-500 uppercase tracking-widest transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search - hidden on mobile */}
            <div className="relative hidden lg:block group">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Quick search (⌘+K)"
                className="h-9 w-64 rounded-xl border border-slate-200/80 bg-slate-50 px-9 py-2 text-xs font-medium outline-none focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5"
              />
            </div>

            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            {isSignedIn ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <Link href="/request/create" className="hidden sm:block">
                  <Button size="sm" className="h-9 rounded-xl px-3 sm:px-4 text-xs font-bold gap-2 shadow-lg shadow-primary/20 bg-gradient-to-r from-blue-600 to-purple-600">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Create</span>
                  </Button>
                </Link>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-xl hover:bg-slate-50">
                    <Bell className="h-4.5 w-4.5 text-slate-500" />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-white"></span>
                  </Button>
                  
                  <div className="h-8 w-px bg-slate-100 mx-1 hidden sm:block" />
                  
                  <div className="flex items-center gap-2 sm:gap-3 pl-1">
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "h-8 w-8 sm:h-9 sm:w-9 rounded-xl border-2 border-white shadow-sm ring-1 ring-slate-100",
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
                  <Button variant="ghost" size="sm" className="h-8 sm:h-9 text-xs font-bold px-3 sm:px-4 rounded-xl">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm" className="h-8 sm:h-9 text-xs font-bold px-3 sm:px-5 rounded-xl shadow-lg shadow-primary/10 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button - HAMBURGER */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-bold text-slate-900">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-6 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            
            <div className="border-t my-4"></div>
            
            <Link
              href="/request/create"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-6 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              Create Request
            </Link>
            <Link
              href="/ai-center"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-6 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              AI Center
            </Link>
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <p className="text-xs text-slate-400 text-center">
              Helplytics AI © 2026
            </p>
          </div>
        </div>
      </div>
    </>
  );
}