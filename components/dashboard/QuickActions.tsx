import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Compass, MessageSquare, Bot, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ACTIONS = [
  {
    title: "New Request",
    desc: "Get help from community",
    icon: PlusCircle,
    href: "/request/create",
    color: "text-blue-600 bg-blue-50 border-blue-100",
    hover: "hover:border-blue-200 hover:bg-blue-100/50"
  },
  {
    title: "Explore",
    desc: "Find ways to give back",
    icon: Compass,
    href: "/explore",
    color: "text-purple-600 bg-purple-50 border-purple-100",
    hover: "hover:border-purple-200 hover:bg-purple-100/50"
  },
  {
    title: "Messages",
    desc: "Chat with collaborators",
    icon: MessageSquare,
    href: "/messages",
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    hover: "hover:border-emerald-200 hover:bg-emerald-100/50"
  },
  {
    title: "AI Center",
    desc: "Supercharge with AI",
    icon: Bot,
    href: "/ai-center",
    color: "text-amber-600 bg-amber-50 border-amber-100",
    hover: "hover:border-amber-200 hover:bg-amber-100/50"
  }
];

export function QuickActions() {
  return (
    <Card className="border-slate-100 shadow-sm overflow-hidden">
      <CardHeader className="border-b bg-slate-50/30 pb-4">
        <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Quick Actions</CardTitle>
        <CardDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Common tasks & shortcuts
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 grid grid-cols-2 gap-3">
        {ACTIONS.map((action) => (
          <Link key={action.href} href={action.href} className="group">
            <div className={cn(
              "p-4 rounded-2xl border transition-all duration-200 flex flex-col gap-3 relative",
              action.color,
              action.hover
            )}>
              <div className="flex justify-between items-start">
                <action.icon className="h-5 w-5" />
                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-black uppercase tracking-wider">{action.title}</h4>
                <p className="text-[9px] font-medium opacity-70 leading-tight">{action.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
