"use client";

import Link from "next/link";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { FloatingChatbot } from "@/components/layout/FloatingChatbot";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Sparkles,
  UserPlus,
  FileEdit,
  Wand2,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  ArrowDown,
  Star,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up in seconds with your email or Google account. No credit card required. You'll immediately join a thriving community of experts and learners ready to collaborate.",
    color: "from-blue-500 to-cyan-500",
    highlights: [
      "Free account setup",
      "Google OAuth support",
      "Instant access",
    ],
  },
  {
    icon: FileEdit,
    title: "Describe Your Problem",
    description:
      "Tell us what you need help with. Our intelligent form guides you through every detail, suggesting relevant tags and categories to make your request clear and actionable.",
    color: "from-purple-500 to-pink-500",
    highlights: [
      "Smart form suggestions",
      "Auto-tagging",
      "Rich text editor",
    ],
  },
  {
    icon: Wand2,
    title: "AI Improves Your Request",
    description:
      "Our AI engine analyzes your request in real-time, optimizing the language, adding context-aware tags, and categorizing it for maximum visibility. Your request is polished and published in moments.",
    color: "from-emerald-500 to-teal-500",
    highlights: [
      "AI language polish",
      "Smart categorization",
      "Reach optimization",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Community Helps You",
    description:
      "Qualified community members receive your request through smart matching. Get offers, collaborate in real-time, and resolve your issue. Build your reputation as you help others in return.",
    color: "from-amber-500 to-orange-500",
    highlights: [
      "Expert matching",
      "Real-time chat",
      "Reputation rewards",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-primary/10 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <LandingNavbar />

      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4"
            >
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                How It Works
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight"
            >
              Get help in{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                four simple steps
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              From signing up to getting the help you need. Our streamlined
              process makes collaboration effortless.
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative mb-12 last:mb-0"
              >
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                  <div className="relative flex items-start justify-center sm:justify-end sm:w-48 shrink-0">
                    <div
                      className={cn(
                        "w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-xl shrink-0",
                        step.color
                      )}
                    >
                      <step.icon className="h-9 w-9 text-white" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden sm:block absolute -bottom-12 left-1/2 -translate-x-1/2">
                        <ArrowDown className="h-6 w-6 text-slate-300 animate-bounce" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={cn(
                          "inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-black text-white",
                          step.color.replace("to-", "to-").replace("from-", "bg-gradient-to-br from-")
                        )}
                        style={{
                          backgroundImage: `linear-gradient(to bottom right, ${step.color.replace("from-", "").split(" ")[0]}, ${step.color.replace("to-", "").split(" ")[1]})`,
                        }}
                      >
                        {i + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        {step.title}
                      </h2>
                    </div>
                    <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.highlights.map((h, j) => (
                        <span
                          key={j}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600"
                        >
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile connector dots */}
          <div className="sm:hidden flex justify-center gap-2 mt-8">
            {steps.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-purple-600"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-primary/90 to-purple-900 p-12 lg:p-20 text-center shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-6"
            >
              <Star className="h-3 w-3 text-white" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                Get Started
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Ready to get the help you deserve?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg mb-10 max-w-2xl mx-auto"
            >
              Join thousands of members already helping each other grow.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="h-14 px-10 text-lg font-bold rounded-xl bg-white text-slate-900 hover:bg-slate-100 shadow-2xl transition-all gap-2 group"
                >
                  Start Your Journey
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-slate-100 bg-slate-50/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                Helplytics AI
              </span>
            </Link>
            <p className="text-sm text-slate-400">
              &copy; 2026 Helplytics AI. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Link href="/features" className="hover:text-slate-900 transition-colors">Features</Link>
              <Link href="/contact" className="hover:text-slate-900 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
      <FloatingChatbot />
    </div>
  );
}
