"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { HelpCircle, Search, MessageSquare, FileText, Mail, ArrowRight, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  { q: "How do I create a request?", a: "Navigate to the Create Request page from the sidebar. Fill in the title, description, category, and tags. Our AI can help auto-generate tags and suggestions." },
  { q: "How does the trust score work?", a: "Your trust score increases as you help others, receive positive feedback, and earn badges. Higher scores unlock more community features." },
  { q: "How do I use the AI Center?", a: "The AI Center helps optimize requests, summarize messages, and draft responses. Type your text and choose an action, or use the chat interface for free-form AI assistance." },
  { q: "Can I edit or delete my requests?", a: "Yes, you can edit, archive, or delete your requests from the request detail page using the actions menu (three dots icon)." },
  { q: "How do I reset my settings?", a: "Go to Settings page and click 'Reset' to restore default preferences. All settings are saved locally in your browser." },
  { q: "How do I report inappropriate content?", a: "Use the Report button on any request or message. Our moderation team reviews reports and takes appropriate action." },
];

export default function SupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Support ticket submitted! We'll get back to you soon.");
    }, 1000);
  };

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
                <HelpCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Help & Support</h1>
                <p className="text-slate-300 text-sm sm:text-base mt-1">Find answers and get help from our team.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
              <CardDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Quick answers to common questions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {FAQS.map((faq) => (
              <div key={faq.q} className="group">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.q ? null : faq.q)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50/80 transition-colors"
                >
                  <span className="text-sm font-medium text-slate-900">{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ml-4",
                      expandedFaq === faq.q && "rotate-180"
                    )}
                  />
                </button>
                {expandedFaq === faq.q && (
                  <div className="px-6 pb-4 animate-in fade-in slide-in-from-top-1 duration-200">
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm">
              <Mail className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Contact Us</CardTitle>
              <CardDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Can't find what you're looking for? Send us a message
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="h-11 rounded-xl border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Email</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="your@email.com"
                  className="h-11 rounded-xl border-slate-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or question in detail..."
                className="min-h-[140px] rounded-xl border-slate-200 resize-none"
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={sending}
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
              >
                {sending ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <MessageSquare className="h-4 w-4" />
                )}
                Submit Ticket
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Resources */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: FileText, title: "Documentation", desc: "Read our comprehensive guides", color: "from-blue-500 to-cyan-500" },
          { icon: MessageSquare, title: "Community Forum", desc: "Ask the community for help", color: "from-purple-500 to-pink-500" },
          { icon: Sparkles, title: "Video Tutorials", desc: "Watch step-by-step tutorials", color: "from-amber-500 to-orange-500" },
        ].map((resource) => (
          <button
            key={resource.title}
            onClick={() => toast.info("Coming soon!")}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/20 transition-all text-left group"
          >
            <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3 shadow-sm", resource.color)}>
              <resource.icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">{resource.title}</h3>
            <p className="text-xs text-slate-500">{resource.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
