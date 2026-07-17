"use client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Sidebar } from "@/components/layout/Sidebar";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Menu, X, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    setCurrentTime(new Date().toLocaleTimeString());
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when clicking escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-muted via-background to-muted">
      {/* Mobile Sidebar Toggle Button */}
      <button
          onClick={() => setIsSidebarOpen(true)}
          className={cn(
            "lg:hidden fixed bottom-4 right-4 xs:bottom-6 xs:right-6 z-50 p-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 group",
            isSidebarOpen && "opacity-0 pointer-events-none"
          )}
        >
        <Menu className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Sidebar - Desktop always visible, Mobile conditional */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-out lg:relative lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Top Bar - Optional (shows current time and page title on mobile) */}
        {isMobile && (
          <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/50 px-3 xs:px-4 py-2.5 xs:py-3 flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
                <span className="text-white text-xs font-bold">HA</span>
              </div>
              <span className="text-sm font-bold text-slate-800">Helplytics AI</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-400">Live</span>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full px-2 xs:px-3 sm:px-5 md:px-6 lg:px-8 py-3 xs:py-4 sm:py-6 lg:py-8">
            {/* Page transition animation */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              {children}
            </div>
          </div>
        </main>

        <CommandPalette />

        {/* Footer - Optional */}
        <footer className="hidden lg:block py-3 px-6 border-t border-slate-200/50 bg-white/30 backdrop-blur-sm">
          <div className="flex justify-between items-center text-[10px] text-slate-400">
            <div className="flex items-center gap-4">
              <span>© 2026 Helplytics AI</span>
              <span>•</span>
              <span>v2.0.0</span>
            </div>
            <div className="flex items-center gap-4">
              <span suppressHydrationWarning>
                ✨ {currentTime || "..."}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}