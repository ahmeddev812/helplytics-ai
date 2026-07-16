import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  ShieldCheck, 
  Award, 
  Users, 
  LucideIcon,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number | React.ReactNode;
  description: string;
  icon: string;
  trend?: string;
  className?: string;
}

const icons: Record<string, LucideIcon> = {
  "file-text": FileText,
  "shield-check": ShieldCheck,
  "award": Award,
  "users": Users,
};

export function StatsCard({ title, value, description, icon, trend, className }: StatsCardProps) {
  const Icon = icons[icon] || FileText;

  return (
    <Card className={cn("overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-100", className)}>
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
        <Icon className="h-24 w-24 -mr-8 -mt-8" />
      </div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
          <Icon className="h-4 w-4 text-slate-600 group-hover:text-primary transition-colors" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-[10px] font-bold text-green-600 border border-green-100">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h2>
            <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-primary transition-colors shrink-0" />
          </div>
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
