"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { 
  Bot, 
  Sparkles, 
  Lightbulb, 
  Zap, 
  RefreshCcw, 
  Search,
  MessageSquare,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Brain,
  Star,
  TrendingUp,
  Clock,
  Copy,
  Check
} from "lucide-react";

export default function AICenterPage() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleAction = async (action: string) => {
    if (!inputText.trim()) {
      toast.error("Please enter some text first");
      return;
    }

    setActiveAction(action);
    setLoading(true);
    
    // Simulate AI response for the prototype
    setTimeout(() => {
      let mockResult = "";
      if (action === "optimize") mockResult = "✨ Optimized Request: " + inputText + " \n\n💡 Tip: Consider adding specific deadlines and required skills to attract better matches.";
      if (action === "summarize") mockResult = "📋 Summary: " + inputText.slice(0, 80) + "...\n\n📊 Key Points: Action needed, Community support available, High engagement potential.";
      if (action === "respond") mockResult = "💬 Suggested Response: Thank you for reaching out! I'd be happy to help with " + inputText.slice(0, 30) + ". Could you share more details about your specific requirements?";
      
      setResult(mockResult);
      setLoading(false);
      setActiveAction(null);
      toast.success("AI analysis complete!");
    }, 1500);
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInputText("");
    setResult(null);
    toast.info("Cleared");
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header Section with Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
                <Bot className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">AI Center</h1>
                <p className="text-slate-300 text-sm sm:text-base mt-1">
                  Supercharge your community interactions with our AI tools.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Cpu className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-[10px] font-bold">Powered by GPT-4</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Input */}
        <div className="lg:col-span-2 space-y-5">
          {/* Main AI Input Card */}
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-gradient-to-br from-white to-slate-50/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <CardTitle className="text-xl">AI Assistant</CardTitle>
              </div>
              <CardDescription className="text-slate-500">
                Paste your request or a message you received below. Our AI will help you optimize, summarize, or craft responses.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <Textarea 
                placeholder="Paste your request description or a message here... Example: 'I need help with React hooks for my e-commerce project'"
                className="min-h-[180px] bg-white border-slate-200 focus:border-primary/30 resize-none rounded-xl text-sm"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button 
                  onClick={() => handleAction("optimize")} 
                  disabled={loading}
                  className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md"
                >
                  {loading && activeAction === "optimize" ? (
                    <RefreshCcw className="h-3 w-3 animate-spin" />
                  ) : (
                    <Sparkles className="h-3 w-3" />
                  )}
                  Optimize
                </Button>
                <Button 
                  onClick={() => handleAction("summarize")} 
                  disabled={loading}
                  variant="secondary"
                  className="gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  {loading && activeAction === "summarize" ? (
                    <RefreshCcw className="h-3 w-3 animate-spin" />
                  ) : (
                    <Search className="h-3 w-3" />
                  )}
                  Summarize
                </Button>
                <Button 
                  onClick={() => handleAction("respond")} 
                  disabled={loading}
                  variant="outline"
                  className="gap-2 border-slate-200 hover:border-primary/30"
                >
                  {loading && activeAction === "respond" ? (
                    <RefreshCcw className="h-3 w-3 animate-spin" />
                  ) : (
                    <MessageSquare className="h-3 w-3" />
                  )}
                  Respond
                </Button>
                <Button 
                  variant="ghost" 
                  className="gap-2 text-slate-500 hover:text-red-500"
                  onClick={handleClear}
                >
                  <RefreshCcw className="h-3 w-3" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Result Card */}
          {result && (
            <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 border-0 shadow-xl rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-blue-500/5">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    AI Suggestion
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] text-slate-400">Generated just now</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed">
                    {result}
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-xs gap-2 hover:bg-slate-100"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button size="sm" className="text-xs gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
                    Apply to Request
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Usage Stats */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Today's Usage</p>
                <p className="text-[10px] text-slate-500">12/50 AI requests remaining</p>
              </div>
            </div>
            <div className="w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full w-1/4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* Right Column: AI Stats & Features */}
        <div className="space-y-5">
          {/* How it works Card */}
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">How it works</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50", title: "Request Analyzer", desc: "Uses GPT-4 to optimize clarity and detect missing information." },
                { icon: BarChart3, color: "text-blue-500", bg: "bg-blue-50", title: "Urgency Detection", desc: "Identifies true urgency based on context and keywords." },
                { icon: Lightbulb, color: "text-green-500", bg: "bg-green-50", title: "Smart Tagging", desc: "Auto-assigns categories and technical tags for discovery." },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200">
                  <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", item.bg)}>
                    <item.icon className={cn("h-4 w-4", item.color)} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-500">{item.title}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="text-2xl font-bold text-blue-600">94%</div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Accuracy</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
                  <div className="text-2xl font-bold text-purple-600">&lt;2s</div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Response Time</div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-400" />
                  <span className="text-[10px] font-bold text-slate-600">4.9/5 rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  <span className="text-[10px] text-slate-400">24/7 available</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pro Upgrade Card */}
          <Card className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-0 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-xl" />
            
            <CardHeader className="relative z-10">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <CardTitle className="text-lg text-white">Pro AI Features</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Unlock advanced matching, deep-dive technical summaries, and priority processing.
              </p>
              <ul className="space-y-2">
                {["Unlimited AI requests", "Priority queue", "Advanced analytics"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-[11px] text-slate-300">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold shadow-lg">
                Upgrade to Pro
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Tip Card */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
            <Lightbulb className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-blue-700">Pro Tip</p>
              <p className="text-[10px] text-blue-600 mt-0.5">
                Paste longer messages for better AI analysis and more accurate suggestions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}