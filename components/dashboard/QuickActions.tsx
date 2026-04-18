import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Compass, MessageSquare, Bot } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Link href="/request/create" className="w-full">
          <Button className="w-full justify-start gap-2" variant="outline">
            <PlusCircle className="h-4 w-4" />
            New Request
          </Button>
        </Link>
        <Link href="/explore" className="w-full">
          <Button className="w-full justify-start gap-2" variant="outline">
            <Compass className="h-4 w-4" />
            Explore Requests
          </Button>
        </Link>
        <Link href="/messages" className="w-full">
          <Button className="w-full justify-start gap-2" variant="outline">
            <MessageSquare className="h-4 w-4" />
            Messages
          </Button>
        </Link>
        <Link href="/ai-center" className="w-full">
          <Button className="w-full justify-start gap-2" variant="outline">
            <Bot className="h-4 w-4" />
            AI Center
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
