"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
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
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const links = publicLinks;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group shrink-0">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/25 transition-transform group-hover:scale-110">
                <Sparkles className="size-3.5 sm:size-4 text-white" />
              </div>
              <span className="text-sm xs:text-base sm:text-xl font-black tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent truncate max-w-[110px] xs:max-w-none">
                Helplytics AI
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors relative py-1",
                    pathname === link.href
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                      : "text-slate-600 hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-0.5 xs:gap-1 sm:gap-3">
              <button
                onClick={toggleTheme}
                className="p-1.5 xs:p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="size-3.5 xs:size-4" />
                ) : (
                  <Moon className="size-3.5 xs:size-4" />
                )}
              </button>

              <div className="hidden md:flex items-center gap-2 lg:gap-3">
                {isLoaded && isSignedIn ? (
                  <div className="flex items-center gap-3 lg:gap-4">
                    <Link href="/dashboard">
                      <Button size="sm" className="h-8 lg:h-9 bg-gradient-to-r from-primary to-purple-600 text-white shadow-md hover:shadow-lg transition-all text-[11px] lg:text-xs font-bold gap-1.5 px-3 lg:px-4">
                        Dashboard
                        <ArrowRight className="size-3 lg:size-3.5" />
                      </Button>
                    </Link>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "h-8 w-8 lg:h-9 lg:w-9 rounded-xl border-2 border-white shadow-md",
                        },
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <Link href="/sign-in">
                      <Button variant="ghost" size="sm" className="h-8 lg:h-9 text-[11px] lg:text-xs font-semibold px-3 lg:px-4">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button size="sm" className="h-8 lg:h-9 text-[11px] lg:text-xs bg-gradient-to-r from-primary to-purple-600 text-white shadow-md hover:shadow-lg transition-all px-3 lg:px-4">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1.5 xs:p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="size-4 xs:size-5" /> : <Menu className="size-4 xs:size-5" />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-white border-t border-slate-100">
            <div className="container mx-auto px-3 xs:px-4 py-2 xs:py-3 flex flex-col gap-0.5 xs:gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 xs:px-4 py-2.5 xs:py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 xs:gap-3 pt-2 xs:pt-3 mt-1 border-t border-slate-100">
                <button
                  onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}
                  className="p-2 xs:p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-slate-500"
                  aria-label="Toggle theme"
                >
                  {resolvedTheme === "dark" ? (
                    <Sun className="size-4 xs:size-4.5" />
                  ) : (
                    <Moon className="size-4 xs:size-4.5" />
                  )}
                </button>
                <div className="flex-1 flex gap-2 xs:gap-3">
                  {isLoaded && isSignedIn ? (
                    <div className="flex items-center justify-between w-full py-1">
                      <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button size="sm" className="h-9 bg-gradient-to-r from-primary to-purple-600 text-white shadow-md text-xs">
                          Dashboard
                          <ArrowRight className="size-3.5 ml-1" />
                        </Button>
                      </Link>
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox: "h-9 w-9 rounded-xl border-2 border-white shadow-md",
                          },
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <Link href="/sign-in" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full h-9 text-xs">Sign In</Button>
                      </Link>
                      <Link href="/sign-up" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full h-9 bg-gradient-to-r from-primary to-purple-600 text-white shadow-md text-xs">Get Started</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
