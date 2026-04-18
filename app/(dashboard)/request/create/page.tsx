"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RequestSchema } from "@/lib/validators";
import { createRequest } from "@/server/actions/requests.actions";
import { generateAITags, categorizeAIRequest } from "@/server/actions/ai.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { UrgencyLevel, RequestStatus } from "@/types/backend-mock";
import { Bot, Sparkles, Loader2 } from "lucide-react";

export default function CreateRequestPage() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(RequestSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "Other",
      tags: [],
      urgency: UrgencyLevel.MEDIUM,
    },
  });

  const onSubmit = async (values: any) => {
    if (!user) return;
    setLoading(true);
    try {
      await createRequest(user.id, values);
      toast.success("Request created successfully!");
      router.push("/explore");
    } catch (error) {
      toast.error("Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  const handleAISuggestions = async () => {
    const title = form.getValues("title");
    const description = form.getValues("description");

    if (!title || !description) {
      toast.error("Please enter a title and description first");
      return;
    }

    setAiLoading(true);
    try {
      const tags = await generateAITags(title, description);
      const category = await categorizeAIRequest(description);
      
      if (tags) form.setValue("tags", tags);
      if (category) form.setValue("category", category);
      
      toast.success("AI suggestions applied!");
    } catch (error) {
      toast.error("AI suggestions failed");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <PlusCircleIcon className="h-6 w-6 text-primary" />
            Create New Request
          </CardTitle>
          <CardDescription>
            Describe what you need help with. AI will help you optimize your request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Request Title</label>
              <Input 
                {...form.register("title")} 
                placeholder="e.g., Need help with Next.js dynamic routing" 
              />
              {form.formState.errors.title && (
                <p className="text-xs text-destructive">{form.formState.errors.title.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Description</label>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary gap-1"
                  onClick={handleAISuggestions}
                  disabled={aiLoading}
                >
                  {aiLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Bot className="h-3 w-3" />}
                  AI Suggestions
                </Button>
              </div>
              <Textarea 
                {...form.register("description")} 
                placeholder="Provide as much detail as possible..." 
                className="min-h-[150px]"
              />
              {form.formState.errors.description && (
                <p className="text-xs text-destructive">{form.formState.errors.description.message as string}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select 
                  {...form.register("category")}
                  className="w-full h-10 px-3 rounded-md border bg-background text-sm"
                >
                  <option value="Technical">Technical</option>
                  <option value="Academic">Academic</option>
                  <option value="Creative">Creative</option>
                  <option value="Career">Career</option>
                  <option value="Personal">Personal</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Urgency</label>
                <select 
                  {...form.register("urgency")}
                  className="w-full h-10 px-3 rounded-md border bg-background text-sm"
                >
                  <option value={UrgencyLevel.LOW}>Low</option>
                  <option value={UrgencyLevel.MEDIUM}>Medium</option>
                  <option value={UrgencyLevel.HIGH}>High</option>
                  <option value={UrgencyLevel.URGENT}>Urgent</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tags (comma separated)</label>
              <Input 
                placeholder="React, TypeScript, UI/UX" 
                value={form.watch("tags").join(", ")}
                onChange={(e) => form.setValue("tags", e.target.value.split(",").map(t => t.trim()).filter(t => t !== ""))}
              />
              <p className="text-[10px] text-muted-foreground">Press AI Suggestions to auto-generate tags.</p>
            </div>

            <div className="pt-4 flex gap-4">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Creating..." : "Post Request"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function PlusCircleIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}
