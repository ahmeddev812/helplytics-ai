"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OnboardingSchema } from "@/lib/validators";
import { updateUserProfile } from "@/server/actions/user.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { UserRole } from "@prisma/client";

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      name: user?.fullName || "",
      role: UserRole.BOTH,
      skills: [],
      interests: [],
      location: "",
      bio: "",
    },
  });

  const onSubmit = async (values: any) => {
    if (!user) return;
    setLoading(true);
    try {
      await updateUserProfile(user.id, values);
      toast.success("Profile updated successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Help us personalize your experience on Helplytics AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input {...form.register("name")} placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <select 
                  {...form.register("role")}
                  className="w-full h-10 px-3 rounded-md border bg-background text-sm"
                >
                  <option value={UserRole.NEED_HELP}>I Need Help</option>
                  <option value={UserRole.CAN_HELP}>I Can Help</option>
                  <option value={UserRole.BOTH}>Both</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Skills (comma separated)</label>
              <Input 
                placeholder="React, Design, Teaching" 
                onChange={(e) => form.setValue("skills", e.target.value.split(",").map(s => s.trim()))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Interests (comma separated)</label>
              <Input 
                placeholder="Open Source, Community, Technology" 
                onChange={(e) => form.setValue("interests", e.target.value.split(",").map(s => s.trim()))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <Textarea {...form.register("bio")} placeholder="Tell us a bit about yourself..." />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Start Helping"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
