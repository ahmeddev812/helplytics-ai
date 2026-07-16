"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RequestSchema } from "@/lib/validators";
import { z } from "zod";
import { createRequest } from "@/server/actions/requests.actions";
import { generateAITags, categorizeAIRequest } from "@/server/actions/ai.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDebounce, useLocalStorage } from "@/lib/hooks";
import { toast } from "sonner";
import { UrgencyLevel, RequestStatus } from "@/types/backend-mock";
import { 
  Bot, 
  Sparkles, 
  Loader2, 
  PlusCircle, 
  ArrowRight, 
  X, 
  CheckCircle,
  Lightbulb,
  Zap,
  Shield,
  Tag,
  AlertCircle,
  Wand2,
  Save
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CreateRequestPage() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiApplied, setAiApplied] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [draft, setDraft] = useLocalStorage("ha_draft_request", {
    title: "",
    description: "",
    category: "Other",
    tags: [] as string[],
    urgency: UrgencyLevel.MEDIUM,
  });

  const form = useForm({
    resolver: zodResolver(RequestSchema),
    defaultValues: draft,
  });

  const watchedValues = useDebounce(form.watch(), 1000);

  useEffect(() => {
    const values = form.getValues();
    setDraft({
      title: values.title || "",
      description: values.description || "",
      category: values.category || "Other",
      tags: values.tags || [],
      urgency: values.urgency || UrgencyLevel.MEDIUM,
    });
    setDraftSaved(true);
    const timer = setTimeout(() => setDraftSaved(false), 2000);
    return () => clearTimeout(timer);
  }, [watchedValues]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values: z.infer<typeof RequestSchema>) => {
    if (!user) return;
    setLoading(true);
    try {
      await createRequest(user.id, values);
      toast.success("Request created successfully!");
      router.push("/explore");
    } catch (error) {
      toast.error("Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  const handleAISuggestions = async () => {
    const title = form.getValues("title");
    const description = form.getValues("description");

    if (!title || !description) {
      toast.error("Please enter a title and description first");
      return;
    }

    setAiLoading(true);
    try {
      const tags = await generateAITags(title, description);
      const category = await categorizeAIRequest(description);
      
      if (tags) form.setValue("tags", tags);
      if (category) form.setValue("category", category);
      
      setAiApplied(true);
      toast.success("AI suggestions applied!");
      setTimeout(() => setAiApplied(false), 3000);
    } catch (error) {
      toast.error("AI suggestions failed");
    } finally {
      setAiLoading(false);
    }
  };

  const urgencyOptions = [
    { value: UrgencyLevel.LOW, label: "Low", icon: "🟢", color: "text-green-600", bg: "bg-green-50", desc: "Not urgent, anytime" },
    { value: UrgencyLevel.MEDIUM, label: "Medium", icon: "🟡", color: "text-yellow-600", bg: "bg-yellow-50", desc: "Within a week" },
    { value: UrgencyLevel.HIGH, label: "High", icon: "🟠", color: "text-orange-600", bg: "bg-orange-50", desc: "Within 48 hours" },
    { value: UrgencyLevel.URGENT, label: "Urgent", icon: "🔴", color: "text-red-600", bg: "bg-red-50", desc: "Within 24 hours" },
  ];

  const categoryOptions = [
    "Technical", "Academic", "Creative", "Career", "Personal", "Other"
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
                <PlusCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Create New Request</h1>
                <p className="text-slate-300 text-sm sm:text-base mt-1">
                  Describe what you need help with. AI will help you optimize your request.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-[10px] font-bold">AI Powered</span>
              </div>
              {draftSaved && (
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 animate-in fade-in duration-300">
                  <Save className="h-3 w-3 text-emerald-400" />
                  <span className="text-[10px] font-medium text-emerald-300">Draft saved</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white">
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Request Title
              </label>
              <Input 
                {...form.register("title")} 
                placeholder="e.g., Need help with Next.js dynamic routing for e-commerce site"
                className="h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:border-primary/30 focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all"
              />
              {form.formState.errors.title && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {form.formState.errors.title.message as string}
                </p>
              )}
            </div>

            {/* Description Field with AI Button */}
            <div className="space-y-2">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  Description
                </label>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary gap-2 hover:bg-primary/5 transition-all rounded-full"
                  onClick={handleAISuggestions}
                  disabled={aiLoading}
                >
                  {aiLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Wand2 className="h-3.5 w-3.5" />
                  )}
                  {aiLoading ? "Analyzing..." : "AI Suggestions"}
                </Button>
              </div>
              <Textarea 
                {...form.register("description")} 
                placeholder="Provide as much detail as possible. Include what you need, deadlines, specific requirements, and what you've already tried..."
                className="min-h-[180px] rounded-xl border-slate-200 bg-slate-50/50 focus:border-primary/30 focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all resize-none"
              />
              {form.formState.errors.description && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {form.formState.errors.description.message as string}
                </p>
              )}
              {aiApplied && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 text-emerald-700 text-xs animate-in fade-in slide-in-from-top-2">
                  <CheckCircle className="h-3.5 w-3.5" />
                  AI suggestions applied successfully! Tags and category have been updated.
                </div>
              )}
            </div>

            {/* Category and Urgency Grid */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  Category
                </label>
                <div className="relative">
                  <select 
                    {...form.register("category")}
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:border-primary/30 focus:ring-4 focus:ring-primary/10 focus:bg-white outline-none transition-all appearance-none cursor-pointer"
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Urgency */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  Urgency Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {urgencyOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => form.setValue("urgency", option.value)}
                      className={cn(
                        "flex items-center gap-2 p-2.5 rounded-xl border transition-all duration-200",
                        form.watch("urgency") === option.value 
                          ? `${option.bg} border-primary/50 shadow-sm` 
                          : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                      )}
                    >
                      <span className="text-lg">{option.icon}</span>
                      <div className="text-left">
                        <p className={cn(
                          "text-xs font-bold",
                          form.watch("urgency") === option.value ? option.color : "text-slate-600"
                        )}>
                          {option.label}
                        </p>
                        <p className="text-[9px] text-slate-400">{option.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                Tags (comma separated)
              </label>
              <Input 
                placeholder="React, TypeScript, UI/UX, Frontend, API" 
                value={form.watch("tags").join(", ")}
                onChange={(e) => form.setValue("tags", e.target.value.split(",").map(t => t.trim()).filter(t => t !== ""))}
                className="h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:border-primary/30 focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all"
              />
              <div className="flex items-center gap-2">
                <Bot className="h-3 w-3 text-slate-400" />
                <p className="text-[10px] text-slate-400">
                  Press <span className="font-medium text-primary">AI Suggestions</span> to auto-generate relevant tags based on your description
                </p>
              </div>
            </div>

            {/* Preview Section */}
            {form.watch("title") && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200">
                <p className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-2">
                  <Sparkles className="h-3 w-3" />
                  Preview
                </p>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{form.watch("title")}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{form.watch("description")?.slice(0, 100)}...</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {form.watch("category")}
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {form.watch("urgency")}
                  </span>
                </div>
              </div>
            )}

            {/* Tips Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700 mb-1">Pro Tips for Better Responses</p>
                  <ul className="text-[10px] text-slate-600 space-y-1">
                    <li>• Be specific about what you need help with</li>
                    <li>• Include any deadlines or time constraints</li>
                    <li>• Mention what you&apos;ve already tried to solve the problem</li>
                    <li>• Add relevant tags to help people find your request</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button 
                type="submit" 
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold gap-2 shadow-lg shadow-blue-500/25 transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Request...
                  </>
                ) : (
                  <>
                    Post Request
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                className="h-12 rounded-xl border-slate-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Footer Note */}
      <div className="flex items-center justify-center gap-2 text-center">
        <Shield className="h-3 w-3 text-slate-400" />
        <p className="text-center text-[10px] text-slate-400">
          By posting, you agree to our Community Guidelines. Our AI helps optimize your request for better visibility.
        </p>
      </div>
    </div>
  );
}