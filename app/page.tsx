import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { cn } from "@/lib/utils";
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
  BrainCircuit
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-primary/10">
    
      <LandingNavbar />
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[70%] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-20%] w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[120px]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Next-Gen Community Support</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black tracking-tight mb-8 text-slate-900 leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Get help. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Give back.</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-slate-500 mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              The world's first AI-native platform for community collaboration. 
              Find expert help in seconds or grow your reputation by helping others.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
              <Link href="/sign-up">
                <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-2xl shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all gap-3">
                  Get Started for Free <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/explore">
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold rounded-2xl border-slate-200 hover:bg-slate-50">
                  Explore Network
                </Button>
              </Link>
            </div>
          </div>

          {/* Feature Cards Preview */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-1000 delay-700">
            {[
              { 
                icon: BrainCircuit, 
                title: "AI Analysis", 
                desc: "Smart categorization & tag suggestions",
                color: "bg-blue-500"
              },
              { 
                icon: ShieldCheck, 
                title: "Verified Trust", 
                desc: "Reputation system powered by impact",
                color: "bg-primary"
              },
              { 
                icon: Zap, 
                title: "Fast Matching", 
                desc: "Connect with experts in real-time",
                color: "bg-amber-500"
              }
            ].map((item, i) => (
              <div key={i} className="group p-8 rounded-3xl border border-slate-100 bg-white/50 backdrop-blur-sm hover:border-primary/20 hover:shadow-xl transition-all duration-300">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg", item.color)}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-20 border-y border-slate-100 bg-slate-50/50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Trusted by over 10,000+ members worldwide</h2>
              <p className="text-slate-500">
                Join a global network of professionals, students, and creators helping each other grow.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 w-full md:w-auto">
              <div>
                <div className="text-4xl font-black text-primary mb-1">25k+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Requests Solved</div>
              </div>
              <div>
                <div className="text-4xl font-black text-slate-900 mb-1">4.9/5</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Avg Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Section */}
      <section className="py-32 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
              Smart Platform
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1]">
              Collaboration <br />
              <span className="text-primary">Redefined by AI.</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              We've built Helplytics AI from the ground up to make getting help as seamless as 
              ordering a coffee. Our AI doesn't just categorize; it understands intent.
            </p>
            
            <ul className="space-y-4">
              {[
                { icon: Search, title: "Intelligent Search", desc: "Find exactly what you need with semantic search." },
                { icon: MessageSquare, title: "Contextual Chat", desc: "Built-in messaging with code highlighting." },
                { icon: Trophy, title: "Gamified Growth", desc: "Earn badges and climb the leaderboard." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <item.icon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-[40px] bg-gradient-to-br from-primary/10 via-blue-500/5 to-transparent border border-slate-100 p-8">
              <div className="w-full h-full rounded-[32px] bg-white shadow-2xl overflow-hidden border border-slate-100 relative group">
                {/* Mock UI Preview */}
                <div className="p-6 border-b bg-slate-50/50 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">helplytics-ai-dashboard</div>
                </div>
                <div className="p-8 space-y-6">
                  <div className="h-8 w-1/3 bg-slate-100 rounded-lg animate-pulse" />
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-slate-50 rounded-lg animate-pulse" />
                    <div className="h-4 w-[90%] bg-slate-50 rounded-lg animate-pulse" />
                    <div className="h-4 w-[95%] bg-slate-50 rounded-lg animate-pulse" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-primary/5 rounded-2xl border border-primary/10 animate-pulse" />
                    <div className="h-24 bg-blue-500/5 rounded-2xl border border-blue-500/10 animate-pulse" />
                  </div>
                </div>
                
                {/* Float Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all duration-1000" />
              </div>
            </div>
            
            {/* Absolute Badges */}
            <div className="absolute -top-6 -right-6 p-4 bg-white rounded-2xl shadow-xl border border-slate-100 animate-bounce duration-[3s]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</div>
                  <div className="text-sm font-black text-slate-900">Request Solved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="bg-slate-900 rounded-[40px] p-12 lg:p-24 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight">
              Ready to join the future of community support?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/sign-up">
                <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-2xl bg-white text-slate-900 hover:bg-slate-100 shadow-2xl">
                  Get Started Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold rounded-2xl border-white/20 text-white hover:bg-white/10">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Decorative gradients */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-50">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary rounded-full blur-[140px] opacity-20" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600 rounded-full blur-[140px] opacity-20" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="text-2xl font-black text-primary mb-6 inline-block">
                Helplytics AI
              </Link>
              <p className="text-slate-500 max-w-xs mb-8">
                Empowering communities with AI-driven collaboration and trust.
              </p>
              <div className="flex gap-4">
                {/* Social icons could go here */}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><Link href="/explore" className="hover:text-primary transition-colors">Explore</Link></li>
                <li><Link href="/ai-center" className="hover:text-primary transition-colors">AI Center</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Community</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><Link href="/leaderboard" className="hover:text-primary transition-colors">Leaderboard</Link></li>
                <li><Link href="/guidelines" className="hover:text-primary transition-colors">Guidelines</Link></li>
                <li><Link href="/support" className="hover:text-primary transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-slate-400 font-medium">
              © 2026 Helplytics AI. Built with ❤️ for the Hackathon.
            </div>
            <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Link href="#" className="hover:text-slate-900 transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-slate-900 transition-colors">GitHub</Link>
              <Link href="#" className="hover:text-slate-900 transition-colors">Discord</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
