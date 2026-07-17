"use client";

import { useState, useEffect } from "react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMounted, useLocalStorage } from "@/lib/hooks";
import { useTheme } from "@/components/theme";
import { TRUST_SCORE } from "@/lib/constants";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  User, MapPin, Calendar, Award, ShieldCheck, Briefcase,
  Mail, Edit, Sparkles, Star, TrendingUp, Heart, Globe,
  CheckCircle, Clock, Users, Zap, Save, X, Camera,
  Code, MessageSquare, Share2, Link2, Palette, Languages,
  Moon, Sun, Monitor, LogOut
} from "lucide-react";

interface UserProfile {
  name: string;
  bio: string;
  role: string;
  location: string;
  skills: string[];
  interests: string[];
  website: string;
  github: string;
  twitter: string;
  linkedin: string;
  theme: "system" | "light" | "dark";
  language: string;
}

const DEFAULT_PROFILE: UserProfile = {
  name: "",
  bio: "",
  role: "",
  location: "",
  skills: [],
  interests: [],
  website: "",
  github: "",
  twitter: "",
  linkedin: "",
  theme: "system",
  language: "en",
};

const SKILL_SUGGESTIONS = ["React", "TypeScript", "Next.js", "Python", "UI/UX", "Marketing", "Writing", "Teaching"];
const INTEREST_SUGGESTIONS = ["AI", "Machine Learning", "Web3", "Design", "Business", "Health", "Education"];

export default function ProfilePage() {
  const { user: clerkUser, isLoaded } = useUser();
  const { theme: currentTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useLocalStorage<UserProfile>("ha_user_profile", DEFAULT_PROFILE);
  const [editForm, setEditForm] = useState<UserProfile>(profile);

  useEffect(() => {
    if (mounted && profile.name === "" && clerkUser?.fullName) {
      const newProfile = { ...profile, name: clerkUser.fullName };
      setProfile(newProfile);
    }
  }, [mounted, clerkUser]);

  useEffect(() => {
    if (mounted && profile.theme) {
      setTheme(profile.theme);
    }
  }, [mounted]);

  const startEditing = () => {
    setEditForm(profile);
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const saveProfile = () => {
    setSaving(true);
    setTheme(editForm.theme);
    setProfile(editForm);
    setTimeout(() => {
      setSaving(false);
      setEditing(false);
      toast.success("Profile saved locally!");
    }, 500);
  };

  const addItem = (field: "skills" | "interests", item: string) => {
    if (!editForm[field].includes(item)) {
      setEditForm((prev) => ({
        ...prev,
        [field]: [...prev[field], item],
      }));
    }
  };

  const removeItem = (field: "skills" | "interests", item: string) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((i) => i !== item),
    }));
  };

  const displayName = profile.name || clerkUser?.fullName || "User";
  const displayRole = profile.role || "Member";
  const displayBio = profile.bio || "No bio provided yet. Tell the community about yourself!";
  const displayLocation = profile.location || "";
  const displaySkills = profile.skills.length > 0 ? profile.skills : [];
  const displayInterests = profile.interests.length > 0 ? profile.interests : [];
  const trustScore = 0;

  if (!mounted || !isLoaded) {
    return (
      <div className="space-y-6 p-4 sm:p-6 animate-pulse">
        <div className="h-64 rounded-2xl bg-slate-100" />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-5">
            <div className="h-48 rounded-2xl bg-slate-100" />
            <div className="h-48 rounded-2xl bg-slate-100" />
          </div>
          <div className="lg:col-span-2 h-96 rounded-2xl bg-slate-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header Profile Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl" />
        
        <div className="h-24 xs:h-32 sm:h-40 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 relative">
          {editing && (
            <button className="absolute bottom-3 right-3 p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors" aria-label="Change cover">
              <Camera className="h-4 w-4 text-white" />
            </button>
          )}
        </div>
        
        <div className="relative z-10 px-4 sm:px-8 pb-6 sm:pb-8 -mt-16 flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
          <div className="relative group">
            <div className="w-20 xs:w-24 h-20 xs:h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border-4 border-white dark:border-slate-900 flex items-center justify-center shadow-2xl">
              <User className="h-12 w-12 sm:h-16 sm:w-16 text-slate-400" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
              <CheckCircle className="h-3 w-3 text-white" />
            </div>
            {editing && (
              <button className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Change avatar">
                <Camera className="h-6 w-6 text-white" />
              </button>
            )}
          </div>
          
          <div className="flex-1 pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                {editing ? (
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="text-2xl font-bold bg-white/10 border-white/20 text-white placeholder:text-white/50 h-10 max-w-sm"
                    placeholder="Your name"
                  />
                ) : (
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">{displayName}</h1>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-slate-300 text-sm">@{clerkUser?.id?.slice(-8) || "user"}</span>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">
                    <Star className="h-3 w-3 text-amber-400" />
                    <span className="text-[10px] font-bold text-white">{TRUST_SCORE.getLevel(trustScore)}</span>
                  </div>
                </div>
              </div>
              {!editing ? (
                <div className="flex gap-2">
                  <Button size="sm" className="gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all" onClick={startEditing}>
                    <Edit className="h-4 w-4" /> Edit Profile
                  </Button>
                  <SignOutButton>
                    <Button size="sm" variant="outline" className="gap-2 bg-white/5 border-red-400/30 text-red-300 hover:bg-red-500/20 hover:text-red-200">
                      <LogOut className="h-4 w-4" /> Sign Out
                    </Button>
                  </SignOutButton>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20" onClick={cancelEditing}>
                    <X className="h-4 w-4" /> Cancel
                  </Button>
                  <Button size="sm" className="gap-2 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg" onClick={saveProfile} disabled={saving}>
                    {saving ? (
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-5">
          {/* About Card */}
          <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editing ? (
                <Textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, bio: e.target.value }))}
                  className="min-h-[100px] rounded-xl border-slate-200"
                  placeholder="Tell the community about yourself..."
                />
              ) : (
                <p className="text-sm text-slate-600 leading-relaxed">{displayBio}</p>
              )}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                {editing ? (
                  <>
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-4 w-4 text-primary shrink-0" />
                      <Input
                        value={editForm.role}
                        onChange={(e) => setEditForm((prev) => ({ ...prev, role: e.target.value }))}
                        className="h-9 text-sm rounded-lg border-slate-200"
                        placeholder="Your role"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                      <Input
                        value={editForm.location}
                        onChange={(e) => setEditForm((prev) => ({ ...prev, location: e.target.value }))}
                        className="h-9 text-sm rounded-lg border-slate-200"
                        placeholder="Your location"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Briefcase className="h-4 w-4 text-primary" /> 
                      <span className="font-medium">{displayRole}</span>
                    </div>
                    {displayLocation && (
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <MapPin className="h-4 w-4 text-primary" /> 
                        <span>{displayLocation}</span>
                      </div>
                    )}
                  </>
                )}
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Calendar className="h-4 w-4 text-primary" /> 
                  <span>Joined {format(new Date(), "MMMM yyyy")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trust & Reputation Card */}
          <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Trust & Reputation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="relative text-center p-5 bg-gradient-to-br from-muted to-muted/80 rounded-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-xl" />
                <div className="relative">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg mb-3">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div className={cn("text-4xl font-black", TRUST_SCORE.getColor(trustScore))}>
                    {trustScore}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Trust Score</div>
                  <div className="mt-2 inline-block px-3 py-1 rounded-full bg-white shadow-sm text-[10px] font-bold text-slate-600">
                    {TRUST_SCORE.getLevel(trustScore)}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Award className="h-3.5 w-3.5" /> Badges Earned
                </h4>
                <div className="flex flex-wrap gap-2">
                  <p className="text-xs text-slate-400 italic">No badges earned yet.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Interests Card */}
          <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Skills & Interests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(editing ? editForm.skills : displaySkills).map((skill: string) => (
                    <Badge key={skill} className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100 px-3 py-1">
                      {skill}
                      {editing && (
                        <button onClick={() => removeItem("skills", skill)} className="ml-1 hover:text-red-500">
                          <X className="h-2.5 w-2.5" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {editing && (
                  <div className="flex flex-wrap gap-1.5">
                    {SKILL_SUGGESTIONS.filter((s) => !editForm.skills.includes(s)).map((skill) => (
                      <button
                        key={skill}
                        onClick={() => addItem("skills", skill)}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        + {skill}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Interests</h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(editing ? editForm.interests : displayInterests).map((interest: string) => (
                    <Badge key={interest} variant="outline" className="border-slate-200 text-slate-600 px-3 py-1">
                      {interest}
                      {editing && (
                        <button onClick={() => removeItem("interests", interest)} className="ml-1 hover:text-red-500">
                          <X className="h-2.5 w-2.5" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {editing && (
                  <div className="flex flex-wrap gap-1.5">
                    {INTEREST_SUGGESTIONS.filter((s) => !editForm.interests.includes(s)).map((interest) => (
                      <button
                        key={interest}
                        onClick={() => addItem("interests", interest)}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        + {interest}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Social Links Card */}
          <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Social Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: Globe, label: "Website", key: "website" as const, placeholder: "https://yoursite.com" },
                { icon: Code, label: "GitHub", key: "github" as const, placeholder: "https://github.com/username" },
                { icon: MessageSquare, label: "Twitter", key: "twitter" as const, placeholder: "https://twitter.com/username" },
                { icon: Share2, label: "LinkedIn", key: "linkedin" as const, placeholder: "https://linkedin.com/in/username" },
              ].map((link) => (
                <div key={link.key} className="flex items-center gap-3">
                  <link.icon className="h-4 w-4 text-slate-400 shrink-0" />
                  {editing ? (
                    <Input
                      value={editForm[link.key]}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, [link.key]: e.target.value }))}
                      className="h-9 text-sm rounded-lg border-slate-200"
                      placeholder={link.placeholder}
                    />
                  ) : (
                    <span className="text-sm text-slate-600">
                      {profile[link.key] || <span className="text-slate-400 italic">Not set</span>}
                    </span>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Preferences Card */}
          <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
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
                      onClick={() => { setTheme(option.value); if (editing) { setEditForm((prev) => ({ ...prev, theme: option.value })); } }}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
                        currentTheme === option.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      )}
                    >
                      <option.icon className="h-3 w-3" />
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Languages className="h-3 w-3" /> Language
                </h4>
                <select
                  value={editing ? editForm.language : profile.language}
                  onChange={(e) => editing && setEditForm((prev) => ({ ...prev, language: e.target.value }))}
                  disabled={!editing}
                  className="w-full h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary/30 disabled:opacity-50"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="ja">Japanese</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 text-center">
              <Users className="h-5 w-5 text-blue-500 mx-auto mb-1" />
              <div className="text-xl font-bold text-slate-900">0</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Requests</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 text-center">
              <Zap className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
              <div className="text-xl font-bold text-slate-900">12</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Help Given</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 text-center">
              <Star className="h-5 w-5 text-amber-500 mx-auto mb-1" />
              <div className="text-xl font-bold text-slate-900">0</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Badges</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 text-center">
              <Heart className="h-5 w-5 text-purple-500 mx-auto mb-1" />
              <div className="text-xl font-bold text-slate-900">47</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Impact</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-slate-900">Contribution History</h2>
            <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
              <button className="px-4 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-900 shadow-sm">
                Requests
              </button>
              <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-700">
                Help Given
              </button>
            </div>
          </div>
          
          <div className="grid gap-4">
            <div className="text-center py-16 bg-gradient-to-br from-muted to-background rounded-2xl border border-slate-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-slate-500 font-medium">No contribution history yet.</p>
              <p className="text-sm text-slate-400 mt-1">Start helping others to build your reputation!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
