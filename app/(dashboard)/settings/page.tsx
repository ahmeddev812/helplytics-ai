"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/lib/hooks";
import { useTheme } from "@/components/theme";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Settings, Moon, Sun, Monitor, Globe, Bell, Shield,
  Bot, User, Save, Sparkles, Check, Palette, Languages,
  Eye, EyeOff, Mail, MessageSquare, Volume2, VolumeX,
  Smartphone, Laptop
} from "lucide-react";

interface AppSettings {
  theme: "system" | "light" | "dark";
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  soundEnabled: boolean;
  desktopNotifications: boolean;
  showOnlineStatus: boolean;
  showTrustScore: boolean;
  aiAutoSuggest: boolean;
  aiShowInsights: boolean;
  defaultUrgency: string;
  itemsPerPage: number;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: "system",
  language: "en",
  emailNotifications: true,
  pushNotifications: true,
  soundEnabled: false,
  desktopNotifications: true,
  showOnlineStatus: true,
  showTrustScore: true,
  aiAutoSuggest: true,
  aiShowInsights: true,
  defaultUrgency: "MEDIUM",
  itemsPerPage: 12,
};

export default function SettingsPage() {
  const { setTheme } = useTheme();
  const [settings, setSettings] = useLocalStorage<AppSettings>("ha_user_settings", DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved!");
    }, 400);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    toast.success("Settings reset to defaults");
  };

  const sections = [
    {
      id: "appearance",
      title: "Appearance",
      icon: Palette,
      fields: (
        <div className="space-y-5">
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Moon className="h-3 w-3" /> Theme
            </h4>
            <div className="flex gap-2">
              {[
                { value: "system" as const, icon: Monitor, label: "System" },
                { value: "light" as const, icon: Sun, label: "Light" },
                { value: "dark" as const, icon: Moon, label: "Dark" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => { setTheme(option.value); updateSetting("theme", option.value); }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all flex-1",
                    settings.theme === option.value
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-slate-200 hover:border-slate-300"
                  )}
                >
                  <option.icon className={cn("h-4 w-4", settings.theme === option.value ? "text-primary" : "text-slate-400")} />
                  <span className={cn("text-xs font-bold", settings.theme === option.value ? "text-primary" : "text-slate-600")}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Languages className="h-3 w-3" /> Language
            </h4>
            <select
              value={settings.language}
              onChange={(e) => updateSetting("language", e.target.value)}
              className="w-full h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary/30"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      fields: (
        <div className="space-y-4">
          {[
            { key: "emailNotifications" as const, label: "Email Notifications", desc: "Receive email updates about activity", icon: Mail },
            { key: "pushNotifications" as const, label: "Push Notifications", desc: "Receive push notifications in browser", icon: Smartphone },
            { key: "desktopNotifications" as const, label: "Desktop Notifications", desc: "Show desktop notification alerts", icon: Laptop },
            { key: "soundEnabled" as const, label: "Sound Effects", desc: "Play sounds for notifications", icon: settings.soundEnabled ? Volume2 : VolumeX },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <item.icon className="h-4 w-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{item.label}</p>
                  <p className="text-[10px] text-slate-400">{item.desc}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[item.key]}
                  onChange={(e) => updateSetting(item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-600" />
              </label>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "privacy",
      title: "Privacy",
      icon: Shield,
      fields: (
        <div className="space-y-4">
          {[
            { key: "showOnlineStatus" as const, label: "Show Online Status", desc: "Let others see when you're active" },
            { key: "showTrustScore" as const, label: "Show Trust Score", desc: "Display your trust score on your profile" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-slate-900">{item.label}</p>
                <p className="text-[10px] text-slate-400">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[item.key]}
                  onChange={(e) => updateSetting(item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-600" />
              </label>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "ai",
      title: "AI Preferences",
      icon: Bot,
      fields: (
        <div className="space-y-4">
          {[
            { key: "aiAutoSuggest" as const, label: "Auto-Suggestions", desc: "AI automatically suggests tags and categories" },
            { key: "aiShowInsights" as const, label: "AI Insights", desc: "Show AI-powered insights on dashboard" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-slate-900">{item.label}</p>
                <p className="text-[10px] text-slate-400">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[item.key]}
                  onChange={(e) => updateSetting(item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-600" />
              </label>
            </div>
          ))}

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Default Urgency</h4>
            <select
              value={settings.defaultUrgency}
              onChange={(e) => updateSetting("defaultUrgency", e.target.value)}
              className="w-full h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary/30"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Items Per Page</h4>
            <select
              value={settings.itemsPerPage}
              onChange={(e) => updateSetting("itemsPerPage", Number(e.target.value))}
              className="w-full h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary/30"
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      id: "account",
      title: "Account",
      icon: User,
      fields: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
            <p className="text-xs font-medium text-amber-700">
              Account management is handled through Clerk. Visit the Clerk dashboard to manage your account settings, security, and connected accounts.
            </p>
          </div>
          <Button variant="outline" className="w-full gap-2" onClick={() => toast.info("Redirecting to account management...")}>
            <User className="h-4 w-4" /> Manage Account
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
                <Settings className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-slate-300 text-sm sm:text-base mt-1">Customize your experience.</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleReset} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Reset
              </Button>
              <Button size="sm" onClick={handleSave} disabled={saving} className="bg-white text-slate-900 hover:bg-slate-100 font-bold shadow-lg">
                {saving ? (
                  <div className="h-4 w-4 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <Card key={section.id} className="border-none shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
                  <section.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <CardDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Configure your {section.title.toLowerCase()} preferences
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {section.fields}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <p className="text-[10px] text-slate-400">
          Settings are saved locally in your browser. Clear your browser data to reset all settings.
        </p>
      </div>
    </div>
  );
}
