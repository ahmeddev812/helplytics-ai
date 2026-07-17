"use client";

import Link from "next/link";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { FloatingChatbot } from "@/components/layout/FloatingChatbot";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Sparkles,
  Bot,
  Users,
  MessageSquare,
  ShieldCheck,
  Bell,
  Search,
  LayoutDashboard,
  MonitorSmartphone,
  ArrowRight,
  CheckCircle2,
  Zap,
  BrainCircuit,
  Star,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Request Optimizer",
    description:
      "Our AI analyzes your request and automatically improves its clarity, reach, and structure. Get better responses by letting AI refine your wording, add relevant tags, and categorize your request for maximum visibility.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Smart Community Matching",
    description:
      "Advanced algorithms match your request with the most qualified community members based on expertise, availability, and past performance. Never wait for the right person to find you.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Bot,
    title: "AI Chat Assistant",
    description:
      "Get instant answers and suggestions from our AI chat assistant. Draft responses, summarize conversations, generate action items, and brainstorm solutions before posting your request.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description:
      "Enterprise-grade security powered by Clerk. Multi-factor authentication, session management, and granular permission controls keep your data and conversations safe and private.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description:
      "Stay updated with instant push notifications when someone offers help, replies to your request, or mentions you. Never miss an important update with customizable notification preferences.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Search,
    title: "Fast Semantic Search",
    description:
      "Find exactly what you need with context-aware semantic search. Search across requests, conversations, and community members using natural language queries that understand intent, not just keywords.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: LayoutDashboard,
    title: "Modern Dashboard",
    description:
      "A clean, intuitive dashboard gives you a complete overview of your activity, requests, trust score, and community impact. Track everything that matters in one place with beautiful data visualizations.",
    color: "from-sky-500 to-blue-500",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive Design",
    description:
      "Every feature is fully responsive and works flawlessly across desktop, tablet, and mobile devices. Collaborate from anywhere, on any device, without losing functionality or visual quality.",
    color: "from-violet-500 to-purple-500",
  },
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-primary/10 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <LandingNavbar />

      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4"
            >
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Features
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight"
            >
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                collaborate smarter
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              AI-powered tools designed to transform how communities help each
              other. From smart matching to real-time collaboration.
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                className="group p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg shrink-0",
                      feature.color
                    )}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
              <Zap className="h-3 w-3 text-white" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                Start Free
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Ready to experience the power of AI-driven collaboration?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg mb-10 max-w-2xl mx-auto"
            >
              Join Helplytics AI today and transform how you give and receive
              help.
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
                  Get Started Free
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
              <Link href="/about" className="hover:text-slate-900 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-slate-900 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
      <FloatingChatbot />
    </div>
  );
}
