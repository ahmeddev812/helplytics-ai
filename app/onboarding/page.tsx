"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OnboardingSchema } from "@/lib/validators";
import { updateUserProfile } from "@/server/actions/user.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { UserRole } from "@/types/backend-mock";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  User, 
  Briefcase, 
  MapPin, 
  Sparkles, 
  ArrowRight,
  ArrowLeft,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

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

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-xl w-full space-y-8 relative">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Welcome to <span className="text-primary">Helplytics AI</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Step {step} of 3: {step === 1 ? "The Basics" : step === 2 ? "Skills & Expertise" : "Final Touches"}
          </p>
          <div className="flex justify-center gap-1.5 pt-2">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  step === i ? "w-8 bg-primary" : "w-1.5 bg-slate-200"
                )} 
              />
            ))}
          </div>
        </div>

        <Card className="border-none shadow-2xl rounded-[32px] overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <Input {...form.register("name")} className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-100" placeholder="John Doe" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Your Primary Role</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: UserRole.NEED_HELP, label: "Need Help", icon: Heart },
                          { value: UserRole.CAN_HELP, label: "Can Help", icon: Briefcase },
                          { value: UserRole.BOTH, label: "Both", icon: Sparkles },
                        ].map((role) => (
                          <button
                            key={role.value}
                            type="button"
                            onClick={() => form.setValue("role", role.value)}
                            className={cn(
                              "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all",
                              form.watch("role") === role.value 
                                ? "bg-primary/5 border-primary text-primary shadow-sm" 
                                : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
                            )}
                          >
                            <role.icon className="h-5 w-5" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{role.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <Input {...form.register("location")} className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-100" placeholder="e.g., New York, USA" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Skills (What you can offer)</label>
                      <Input 
                        placeholder="React, Python, Design..." 
                        className="h-12 rounded-xl bg-slate-50 border-slate-100"
                        onChange={(e) => form.setValue("skills", e.target.value.split(",").map(s => s.trim()))}
                      />
                      <p className="text-[10px] text-slate-400 font-medium">Comma separated list of your top technical or creative skills.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Interests (What you want to learn)</label>
                      <Input 
                        placeholder="AI, Blockchain, Web3..." 
                        className="h-12 rounded-xl bg-slate-50 border-slate-100"
                        onChange={(e) => form.setValue("interests", e.target.value.split(",").map(s => s.trim()))}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Your Bio</label>
                      <Textarea 
                        {...form.register("bio")} 
                        className="min-h-[150px] rounded-2xl bg-slate-50 border-slate-100 resize-none p-4"
                        placeholder="Tell the community about yourself, your background, and why you're here..." 
                      />
                    </div>

                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-slate-900">Ready to Launch!</h4>
                        <p className="text-[10px] text-slate-500 font-medium leading-tight">
                          By clicking complete, you agree to our community guidelines and trust system.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-4 pt-4">
                {step > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevStep}
                    className="h-12 w-12 rounded-xl border-slate-200 p-0"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                )}
                
                {step < 3 ? (
                  <Button 
                    type="button" 
                    onClick={nextStep} 
                    className="flex-1 h-12 rounded-xl text-lg font-bold gap-2 shadow-lg shadow-primary/20"
                  >
                    Next Step <ArrowRight className="h-5 w-5" />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="flex-1 h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20"
                    disabled={loading}
                  >
                    {loading ? "Creating Profile..." : "Complete Profile"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
