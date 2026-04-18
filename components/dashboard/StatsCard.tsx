import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  ShieldCheck, 
  Award, 
  Users, 
  LucideIcon 
} from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: string;
}

const icons: Record<string, LucideIcon> = {
  "file-text": FileText,
  "shield-check": ShieldCheck,
  "award": Award,
  "users": Users,
};

export function StatsCard({ title, value, description, icon }: StatsCardProps) {
  const Icon = icons[icon] || FileText;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
