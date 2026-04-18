import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { 
  Bot, 
  Users, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-950 text-white">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-6">
            <SparkleIcon className="h-4 w-4" />
            <span>AI-Powered Community Support</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            Help Others, <span className="text-primary">Grow Together.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-10">
            Helplytics AI connects people who need help with those who can provide it, 
            supercharged with AI to make collaboration faster and smarter.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="h-12 px-8 text-lg gap-2">
                Join the Community <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg text-slate-900 bg-white hover:bg-slate-100">
                Explore Requests
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Background Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Users", value: "10,000+" },
              { label: "Requests Solved", value: "25,000+" },
              { label: "Trust Score Avg", value: "4.8/5" },
              { label: "AI Suggestions", value: "1M+" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">Built for Real Impact</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Everything you need to get help or offer your skills to others.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "AI-Powered Analyis",
              desc: "Get smart tag suggestions, urgency detection, and auto-summaries for your requests.",
              icon: Bot,
              color: "text-blue-600 bg-blue-50"
            },
            {
              title: "Trust & Reputation",
              desc: "Build your trust score by helping others and earn exclusive community badges.",
              icon: ShieldCheck,
              color: "text-green-600 bg-green-50"
            },
            {
              title: "Smart Matching",
              desc: "Our AI matches your requests with the best-suited helpers in the community.",
              icon: Users,
              color: "text-purple-600 bg-purple-50"
            }
          ].map((feat, i) => (
            <div key={i} className="p-8 rounded-2xl border bg-white hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feat.color}`}>
                <feat.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t py-12 bg-slate-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold text-primary">Helplytics AI</div>
          <div className="flex gap-8 text-sm text-slate-600">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
            <Link href="/contact" className="hover:text-primary">Contact Us</Link>
          </div>
          <div className="text-sm text-slate-500">
            © 2024 Helplytics AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function SparkleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
