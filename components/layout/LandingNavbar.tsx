"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function LandingNavbar() {
  const { isSignedIn, isLoaded } = useUser();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const links = publicLinks;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-16">
            <div className="flex justify-start">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/25 transition-transform group-hover:scale-110">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Helplytics AI
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center justify-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-primary"
                      : "text-slate-600 hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-4.5 w-4.5" />
                ) : (
                  <Moon className="h-4.5 w-4.5" />
                )}
              </button>

              <div className="hidden md:flex items-center gap-3">
                {isLoaded && isSignedIn ? (
                  <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                      <Button size="sm" className="bg-gradient-to-r from-primary to-purple-600 text-white shadow-md hover:shadow-lg transition-all text-xs font-bold gap-1.5">
                        Dashboard
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-9 h-9 rounded-xl border-2 border-white shadow-md",
                        },
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <Link href="/sign-in">
                      <Button variant="ghost" size="sm" className="font-semibold">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button size="sm" className="bg-gradient-to-r from-primary to-purple-600 text-white shadow-md hover:shadow-lg transition-all">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors py-2",
                    pathname === link.href
                      ? "text-primary"
                      : "text-slate-600 hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500"
                  aria-label="Toggle theme"
                >
                  {resolvedTheme === "dark" ? (
                    <Sun className="h-4.5 w-4.5" />
                  ) : (
                    <Moon className="h-4.5 w-4.5" />
                  )}
                </button>
                <div className="flex-1 flex gap-3">
                  {isLoaded && isSignedIn ? (
                    <div className="flex items-center justify-between w-full py-2">
                      <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button size="sm" className="bg-gradient-to-r from-primary to-purple-600 text-white">
                          Dashboard
                        </Button>
                      </Link>
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox: "w-9 h-9 rounded-xl border-2 border-white shadow-md",
                          },
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <Link href="/sign-in" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">Sign In</Button>
                      </Link>
                      <Link href="/sign-up" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-primary to-purple-600">Get Started</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
