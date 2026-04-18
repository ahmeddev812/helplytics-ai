"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Bot, 
  Sparkles, 
  Lightbulb, 
  Zap, 
  RefreshCcw, 
  Search,
  MessageSquare,
  BarChart3
} from "lucide-react";

export default function AICenterPage() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async (action: string) => {
    if (!inputText.trim()) {
      toast.error("Please enter some text first");
      return;
    }

    setLoading(true);
    // Simulate AI response for the prototype
    setTimeout(() => {
      let mockResult = "";
      if (action === "optimize") mockResult = "Optimized Request: " + inputText.toUpperCase();
      if (action === "summarize") mockResult = "Summary: " + inputText.slice(0, 50) + "...";
      if (action === "respond") mockResult = "Suggested Response: I'd be happy to help with " + inputText.slice(0, 20);
      
      setResult(mockResult);
      setLoading(false);
      toast.success("AI analysis complete!");
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Bot className="h-8 w-8 text-primary" />
          AI Center
        </h1>
        <p className="text-muted-foreground">Supercharge your community interactions with our AI tools.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Input */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
              <CardDescription>Paste your request or a message you received below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Enter request description or a message..." 
                className="min-h-[200px] bg-white border-primary/10"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button 
                  onClick={() => handleAction("optimize")} 
                  disabled={loading}
                  className="gap-2 text-xs"
                >
                  <Sparkles className="h-3 w-3" /> Optimize
                </Button>
                <Button 
                  onClick={() => handleAction("summarize")} 
                  disabled={loading}
                  variant="secondary"
                  className="gap-2 text-xs"
                >
                  <Search className="h-3 w-3" /> Summarize
                </Button>
                <Button 
                  onClick={() => handleAction("respond")} 
                  disabled={loading}
                  variant="outline"
                  className="gap-2 text-xs"
                >
                  <MessageSquare className="h-3 w-3" /> Respond
                </Button>
                <Button 
                  variant="ghost" 
                  className="gap-2 text-xs text-muted-foreground"
                  onClick={() => { setInputText(""); setResult(null); }}
                >
                  <RefreshCcw className="h-3 w-3" /> Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {result && (
            <Card className="animate-in fade-in slide-in-from-bottom-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Bot className="h-4 w-4 text-primary" />
                  AI Suggestion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-slate-50 rounded-lg border text-slate-700 italic leading-relaxed">
                  {result}
                </div>
                <div className="flex gap-2 pt-4 justify-end">
                  <Button size="sm" variant="ghost" className="text-xs">Copy</Button>
                  <Button size="sm" className="text-xs">Apply to Request</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: AI Stats & Features */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How it works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Zap className="h-5 w-5 text-yellow-500 shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Request Analyzer</p>
                  <p className="text-xs text-slate-600">Uses GPT-4 to optimize clarity and detect missing information.</p>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <BarChart3 className="h-5 w-5 text-blue-500 shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Urgency Detection</p>
                  <p className="text-xs text-slate-600">Identifies true urgency based on context and keywords.</p>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Lightbulb className="h-5 w-5 text-green-500 shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Smart Tagging</p>
                  <p className="text-xs text-slate-600">Auto-assigns categories and technical tags for discovery.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white border-none overflow-hidden relative">
            <CardHeader>
              <CardTitle className="text-lg">Pro AI Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-slate-400">
                Unlock advanced matching and deep-dive technical summaries.
              </p>
              <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold">
                Upgrade to Pro
              </Button>
            </CardContent>
            {/* Visual Decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-24 h-24 bg-primary rounded-full blur-2xl opacity-20" />
          </Card>
        </div>
      </div>
    </div>
  );
}
