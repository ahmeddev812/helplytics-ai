"use client";

import Link from "next/link";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { FloatingChatbot } from "@/components/layout/FloatingChatbot";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Sparkles,
  Target,
  Eye,
  Heart,
  BrainCircuit,
  Users,
  ShieldCheck,
  Zap,
  ArrowRight,
  Quote,
  CheckCircle2,
  Bot,
  Star,
} from "lucide-react";

const stats = [
  { value: "25K+", label: "Requests Solved" },
  { value: "4.9/5", label: "Satisfaction Rate" },
  { value: "10K+", label: "Community Members" },
  { value: "99.9%", label: "Platform Uptime" },
];

const values = [
  {
    icon: BrainCircuit,
    title: "AI-First Innovation",
    description:
      "We believe AI should amplify human connection, not replace it. Our technology intelligently matches people and optimizes collaboration.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Heart,
    title: "Community First",
    description:
      "Every feature we build starts with the question: how does this help our community grow stronger and more connected?",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    description:
      "Trust is the foundation of collaboration. Our reputation system and verification processes ensure a safe environment for everyone.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Zap,
    title: "Speed & Efficiency",
    description:
      "Time is precious. We optimize every interaction to help you get the help you need faster, without sacrificing quality.",
    color: "from-amber-500 to-orange-500",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-primary/10 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <LandingNavbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4"
            >
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                About Us
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight"
            >
              We&apos;re on a mission to{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                transform help
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              Helplytics AI brings together the power of artificial intelligence
              and the warmth of human collaboration to create a world where
              getting help is instant, intelligent, and inclusive.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border bg-gradient-to-r from-muted/50 to-background/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2"
              >
                <div className="text-3xl sm:text-4xl font-black text-primary mb-1">
                  {stat.value}
                </div>
                <p className="text-[10px] xs:text-xs font-bold uppercase tracking-widest text-slate-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-900 via-primary/95 to-purple-900 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-5">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-white/80 leading-relaxed text-base sm:text-lg">
                To democratize access to expertise by building an intelligent
                platform where anyone can get the help they need, when they need
                it, from people they can trust.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-5 shadow-lg">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Our Vision
            </h2>
            <p className="text-slate-500 leading-relaxed text-base sm:text-lg">
              A world where every question finds an answer, every problem finds
              a solution, and every person finds a community that helps them
              thrive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Helplytics AI */}
      <section className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4"
            >
              <Bot className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Why Helplytics AI
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
            >
              AI + Community ={" "}
              <span className="text-primary">Unstoppable Collaboration</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 max-w-2xl mx-auto"
            >
              We combine cutting-edge AI with genuine human connection to create
              a help ecosystem that&apos;s faster, smarter, and more rewarding
              than traditional forums or Q&amp;A sites.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg",
                    value.color
                  )}
                >
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
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
              <Users className="h-3 w-3 text-white" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                Join Us
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Be part of the help revolution
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg mb-10 max-w-2xl mx-auto"
            >
              Whether you&apos;re here to help or be helped, there&apos;s a
              place for you in our community.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
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
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-10 text-lg font-bold rounded-xl border-white/20 text-white hover:bg-white/10"
                >
                  Contact Us
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
