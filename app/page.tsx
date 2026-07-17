"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { FloatingChatbot } from "@/components/layout/FloatingChatbot";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Bot, 
  Users, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Search,
  MessageSquare,
  Trophy,
  BrainCircuit,
  Star,
  Rocket,
  Heart,
  Quote,
  PlusCircle,
  Wand2,
  Tag,
  Clock,
  FileText,
  Send
} from "lucide-react";

// Animated Counter Component
const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl font-black text-primary mb-1">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating?: number;
  delay?: number;
}

interface FeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const TestimonialCard = ({ name, role, content, delay }: TestimonialProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02, y: -5 }}
    className="p-6 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
    <Quote className="h-8 w-8 text-primary/20 mb-3" />
    <p className="text-slate-600 text-sm leading-relaxed mb-4">{content}</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
        {name[0]}
      </div>
      <div>
        <p className="font-bold text-slate-900 text-sm">{name}</p>
        <p className="text-xs text-slate-500">{role}</p>
      </div>
    </div>
  </motion.div>
);

const CreateRequestFeature = ({ icon: Icon, title, description, color }: FeatureProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="p-6 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg", color)}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
  </motion.div>
);

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  


  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-primary/10 overflow-x-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative pt-28 xs:pt-32 pb-16 xs:pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <motion.div style={{ opacity }} className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 mb-8"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">AI-Powered Support</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-6 text-slate-900 leading-[1.1]"
            >
              Get help.{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Give back.
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-500 mb-10 leading-relaxed"
            >
              The world&apos;s first AI-native platform for community collaboration. 
              Find expert help in seconds or grow your reputation by helping others.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link href="/sign-up">
                <Button size="lg" className="h-12 sm:h-14 w-full xs:w-auto px-6 sm:px-10 text-sm xs:text-base sm:text-lg font-bold rounded-xl shadow-xl shadow-primary/25 hover:shadow-2xl transition-all gap-2 group">
                  Get Started for Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/explore" className="w-full xs:w-auto">
                <Button size="lg" variant="outline" className="h-12 sm:h-14 w-full px-6 sm:px-10 text-sm xs:text-base sm:text-lg font-bold rounded-xl border-slate-200 hover:bg-slate-50">
                  Explore Network
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Animated UI Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative mt-20 mx-auto max-w-5xl"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <div className="bg-gradient-to-r from-slate-100 to-white p-4 border-b">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="h-8 w-2/3 bg-slate-200 rounded-lg animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-slate-100 rounded-lg animate-pulse" />
                      <div className="h-4 w-11/12 bg-slate-100 rounded-lg animate-pulse" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 w-20 bg-primary/10 rounded-lg animate-pulse" />
                      <div className="h-8 w-20 bg-slate-100 rounded-lg animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-8 w-full bg-slate-200 rounded-lg animate-pulse" />
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/2 bg-slate-100 rounded-lg animate-pulse" />
                        <div className="h-3 w-full bg-slate-100 rounded-lg animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-3 border border-slate-200"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400">Request Solved</p>
                  <p className="text-xs font-bold text-slate-900">In 2 hours!</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-3 border border-slate-200"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400">AI Match</p>
                  <p className="text-xs font-bold text-slate-900">95% accuracy</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Social Proof / Stats Bar */}
      <section className="py-16 border-y border-slate-100 bg-gradient-to-r from-muted/50 to-background/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <AnimatedCounter target={25000} suffix="+" />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Requests Solved</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <div className="text-4xl font-black text-primary mb-1">4.9/5</div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Avg Satisfaction</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-2"
            >
              <AnimatedCounter target={10000} suffix="+" />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Active Members</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Features Grid */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4"
          >
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">AI Features</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
          >
            Intelligent features for <span className="text-primary">smart collaboration</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500"
          >
            Powered by cutting-edge AI to connect you with the right help, faster.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: BrainCircuit, title: "AI Smart Categorization", desc: "Auto-tags and categorizes requests for better visibility", color: "from-blue-500 to-cyan-500" },
            { icon: Search, title: "Semantic Search", desc: "Find exactly what you need with context-aware search", color: "from-purple-500 to-pink-500" },
            { icon: Zap, title: "Real-time Expert Matching", desc: "AI matches you with the right experts instantly", color: "from-amber-500 to-orange-500" },
            { icon: Trophy, title: "Gamified Reputation", desc: "Earn badges and build your trust score", color: "from-emerald-500 to-teal-500" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg", feature.color)}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Create Request Feature Section - NEW (Replaced Pricing) */}
      <section className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4"
            >
              <PlusCircle className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Create Request</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
            >
              Post a request in <span className="text-primary">minutes</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 max-w-2xl mx-auto"
            >
              Our AI-powered form helps you create the perfect request with smart suggestions and optimization.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <CreateRequestFeature
              icon={Wand2}
              title="AI Suggestions"
              description="Get AI-powered tag and category suggestions based on your request content"
              color="from-purple-500 to-pink-500"
            />
            <CreateRequestFeature
              icon={Tag}
              title="Smart Tagging"
              description="Auto-generate relevant tags to help others discover your request"
              color="from-blue-500 to-cyan-500"
            />
            <CreateRequestFeature
              icon={Clock}
              title="Urgency Levels"
              description="Set urgency (Low/Medium/High/Urgent) to get faster responses"
              color="from-amber-500 to-orange-500"
            />
            <CreateRequestFeature
              icon={FileText}
              title="Rich Description"
              description="Write detailed descriptions with formatting to explain your needs clearly"
              color="from-emerald-500 to-teal-500"
            />
            <CreateRequestFeature
              icon={Send}
              title="Instant Publishing"
              description="Post your request immediately and start receiving help offers"
              color="from-red-500 to-rose-500"
            />
            <CreateRequestFeature
              icon={CheckCircle2}
              title="Request Tracking"
              description="Track your request status and manage help offers in one place"
              color="from-indigo-500 to-purple-500"
            />
          </div>

          {/* CTA Button for Create Request */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/request/create">
              <Button size="lg" className="h-12 px-8 text-base font-bold rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/25 hover:shadow-xl transition-all gap-2 group">
                Create Your First Request
                <PlusCircle className="h-4 w-4 group-hover:rotate-90 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4"
          >
            <Rocket className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Simple Process</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
          >
            How <span className="text-primary">Helplytics AI</span> works
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative max-w-4xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -translate-y-1/2" />
          
          {[
            { step: 1, icon: FileText, title: "Create Request", desc: "Post what you need help with using our AI-powered form", color: "from-blue-500 to-cyan-500" },
            { step: 2, icon: Users, title: "Get Matched", desc: "Our AI connects you with verified experts instantly", color: "from-purple-500 to-pink-500" },
            { step: 3, icon: CheckCircle2, title: "Solve & Earn", desc: "Resolve your issue and earn reputation points", color: "from-emerald-500 to-teal-500" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="relative text-center"
            >
              <div className="relative z-10 w-20 h-20 mx-auto rounded-full bg-gradient-to-br flex items-center justify-center shadow-xl mb-6" style={{ backgroundImage: `linear-gradient(to bottom right, ${item.color.split(' ')[1]}, ${item.color.split(' ')[3]})` }}>
                <item.icon className="h-8 w-8 text-white" />
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-sm font-bold text-primary border-2 border-primary/20">
                  {item.step}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials / Wall of Love */}
      <section className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4"
            >
              <Heart className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Wall of Love</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
            >
              Loved by <span className="text-primary">10,000+</span> community members
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Sarah Chen", role: "Software Engineer", content: "Helplytics AI completely transformed how our team collaborates. The AI matching is incredibly accurate!", rating: 5, delay: 0 },
              { name: "Michael Rodriguez", role: "Product Manager", content: "The trust score system is brilliant. I always know who I'm working with.", rating: 5, delay: 0.1 },
              { name: "Emily Watson", role: "Student", content: "Found help for my thesis in under 2 hours. This platform is a game-changer!", rating: 5, delay: 0.2 },
            ].map((testimonial, i) => (
              <TestimonialCard key={i} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
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
              <Rocket className="h-3 w-3 text-white" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">Join the Community</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Ready to transform your community experience?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg mb-10 max-w-2xl mx-auto"
            >
              Join thousands of members who are already helping and growing together.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/sign-up">
                <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-xl bg-white text-slate-900 hover:bg-slate-100 shadow-2xl transition-all gap-2 group">
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-black tracking-tight text-slate-900">Helplytics AI</span>
              </Link>
              <p className="text-slate-500 text-sm max-w-xs mb-6">
                Empowering communities with AI-driven collaboration and trust.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4 text-sm">Community</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
                <li><Link href="/cookies" className="hover:text-primary transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              © 2026 Helplytics AI. Built with ❤️ for the community.
            </p>
            <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Link href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      <FloatingChatbot />
    </div>
  );
}