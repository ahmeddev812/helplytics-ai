"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OnboardingSchema } from "@/lib/validators";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  User, 
  Briefcase, 
  MapPin, 
  Sparkles, 
  ArrowRight,
  ArrowLeft,
  Heart,
  Code,
  Palette,
  TrendingUp,
  Shield,
  Star,
  Rocket,
  Zap,
  Smile,
  Coffee
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
      role: "BOTH",
      skills: [],
      interests: [],
      location: "",
      bio: "",
    },
  });

  const watchedRole = form.watch("role");
  const watchedBio = form.watch("bio");
  const watchedName = form.watch("name");

  const onSubmit = async (values: z.infer<typeof OnboardingSchema>) => {
    if (!user) return;
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 500));
      toast.success("Profile updated successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !form.getValues("name")) {
      toast.error("Please enter your name");
      return;
    }
    setStep(step + 1);
  };
  
  const prevStep = () => setStep(step - 1);

  const roleOptions = [
    { value: "NEED_HELP" as const, label: "Need Help", icon: Heart, color: "from-rose-500 to-pink-600", bg: "bg-rose-50", desc: "Looking for assistance" },
    { value: "CAN_HELP" as const, label: "Can Help", icon: Briefcase, color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50", desc: "Here to help others" },
    { value: "BOTH" as const, label: "Both", icon: Sparkles, color: "from-blue-500 to-purple-600", bg: "bg-blue-50", desc: "Give and receive help" },
  ];

  const skillSuggestions = ["React", "Next.js", "TypeScript", "Python", "UI/UX", "Marketing", "Writing", "Teaching"];
  const interestSuggestions = ["AI", "Machine Learning", "Web3", "Blockchain", "Design", "Business", "Health", "Education"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Animated Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tl from-purple-500/5 to-pink-500/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float hidden lg:block">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg rotate-12" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float-delayed hidden lg:block">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg" />
      </div>

      <div className="max-w-xl w-full space-y-8 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 mx-auto">
            <Rocket className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Welcome Aboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Let&apos;s get you{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              started
            </span>
          </h1>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Tell us a bit about yourself to personalize your experience on Helplytics AI.
          </p>
          
          {/* Step Indicator */}
          <div className="flex justify-center items-center gap-3 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div 
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-500",
                    step === i ? "w-8 bg-gradient-to-r from-primary to-purple-600" : "w-2.5 bg-slate-200",
                    step > i && "w-2.5 bg-emerald-500"
                  )} 
                />
                {step > i && step !== 3 && i !== 3 && (
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Step {step} of 3: {step === 1 ? "Basic Info" : step === 2 ? "Skills & Interests" : "Final Touches"}
          </p>
        </div>

        {/* Main Card */}
        <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8 md:p-10">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                        <User className="h-3.5 w-3.5" />
                        Full Name
                      </label>
                      <div className="relative group">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                          <User className="h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <Input 
                          {...form.register("name")} 
                          className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-200 focus:border-primary/30 focus:ring-4 focus:ring-primary/10 transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">This is how others will see you in the community.</p>
                    </div>

                    {/* Role Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                        <Shield className="h-3.5 w-3.5" />
                        Your Role
                      </label>
                      <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 xs:gap-3">
                        {roleOptions.map((role) => (
                          <button
                            key={role.value}
                            type="button"
                            onClick={() => form.setValue("role", role.value)}
                            className={cn(
                              "group relative flex items-center xs:flex-col gap-2 xs:gap-2 p-3 xs:p-4 rounded-xl border-2 transition-all duration-200",
                              watchedRole === role.value 
                                ? `border-primary bg-gradient-to-br ${role.bg} shadow-md` 
                                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                            )}
                          >
                            <div className={cn(
                              "w-8 xs:w-10 h-8 xs:h-10 rounded-full flex items-center justify-center transition-all duration-200 shrink-0",
                              watchedRole === role.value 
                                ? `bg-gradient-to-r ${role.color} shadow-lg scale-110` 
                                : "bg-slate-100"
                            )}>
                              <role.icon className={cn(
                                "h-5 w-5",
                                watchedRole === role.value ? "text-white" : "text-slate-500"
                              )} />
                            </div>
                            <span className={cn(
                              "text-xs font-bold",
                              watchedRole === role.value ? "text-slate-900" : "text-slate-600"
                            )}>
                              {role.label}
                            </span>
                            <span className="text-[8px] text-slate-400">{role.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location Field */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5" />
                        Location (Optional)
                      </label>
                      <div className="relative group">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Input 
                          {...form.register("location")} 
                          className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-200 focus:border-primary/30 focus:ring-4 focus:ring-primary/10 transition-all"
                          placeholder="e.g., New York, USA"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Skills */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                        <Code className="h-3.5 w-3.5" />
                        Skills (What you can offer)
                      </label>
                      <Input 
                        placeholder="React, Python, UI/UX Design, Marketing..." 
                        className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:border-primary/30 focus:ring-4 focus:ring-primary/10 transition-all"
                        onChange={(e) => form.setValue("skills", e.target.value.split(",").map(s => s.trim()).filter(s => s))}
                      />
                      <div className="flex flex-wrap gap-2">
                        {skillSuggestions.map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => {
                              const current = form.getValues("skills");
                              if (!current.includes(skill)) {
                                form.setValue("skills", [...current, skill]);
                                const input = document.querySelector('input[placeholder*="Skills"]') as HTMLInputElement;
                                if (input) input.value = [...current, skill].join(", ");
                              }
                            }}
                            className="text-[10px] px-2 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            + {skill}
                          </button>
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-400">Add skills you&apos;re proficient in to help others.</p>
                    </div>

                    {/* Interests */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                        <TrendingUp className="h-3.5 w-3.5" />
                        Interests (What you want to learn)
                      </label>
                      <Input 
                        placeholder="AI, Web3, Design Systems, Leadership..." 
                        className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:border-primary/30 focus:ring-4 focus:ring-primary/10 transition-all"
                        onChange={(e) => form.setValue("interests", e.target.value.split(",").map(s => s.trim()).filter(s => s))}
                      />
                      <div className="flex flex-wrap gap-2">
                        {interestSuggestions.map((interest) => (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => {
                              const current = form.getValues("interests");
                              if (!current.includes(interest)) {
                                form.setValue("interests", [...current, interest]);
                                const input = document.querySelector('input[placeholder*="Interests"]') as HTMLInputElement;
                                if (input) input.value = [...current, interest].join(", ");
                              }
                            }}
                            className="text-[10px] px-2 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            + {interest}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tip Box */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
                      <div className="flex items-start gap-3">
                        <Smile className="h-5 w-5 text-amber-500 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-amber-700 mb-1">Pro Tip</p>
                          <p className="text-[10px] text-amber-600">
                            Adding more skills and interests helps our AI match you with the right people!
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Bio */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                        <Coffee className="h-3.5 w-3.5" />
                        Your Bio
                      </label>
                      <Textarea 
                        {...form.register("bio")} 
                        className="min-h-[180px] rounded-xl bg-slate-50 border-slate-200 focus:border-primary/30 focus:ring-4 focus:ring-primary/10 transition-all resize-none p-4"
                        placeholder="Tell the community about yourself, your background, expertise, and what you're looking for..." 
                      />
                      <p className="text-[10px] text-slate-400 text-right">
                        {watchedBio?.length || 0}/500 characters
                      </p>
                    </div>

                    {/* Summary Card */}
                    <div className="p-5 rounded-xl bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/20">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shrink-0 shadow-lg">
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-slate-900">Ready to Launch! 🚀</h4>
                          <p className="text-[10px] text-slate-500 leading-relaxed">
                            By completing your profile, you agree to our Community Guidelines and Trust & Safety policy.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Review Info */}
                    <div className="grid grid-cols-2 gap-3 text-[10px]">
                      <div className="p-2 rounded-lg bg-slate-50">
                        <span className="text-slate-400">Name:</span>
                        <p className="font-medium text-slate-700 truncate">{watchedName || "Not set"}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50">
                        <span className="text-slate-400">Role:</span>
                        <p className="font-medium text-slate-700">{watchedRole}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-4">
                {step > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevStep}
                    className="h-12 w-12 rounded-xl border-slate-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                )}
                
                {step < 3 ? (
                  <Button 
                    type="button" 
                    onClick={nextStep} 
                    className="flex-1 h-12 rounded-xl text-base font-bold gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 shadow-lg shadow-primary/25 transition-all duration-200"
                  >
                    Continue
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="flex-1 h-12 rounded-xl text-base font-bold gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-500/25 transition-all duration-200"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Profile...
                      </>
                    ) : (
                      <>
                        Complete Profile
                        <CheckCircle2 className="h-5 w-5" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <p className="text-center text-[10px] text-slate-400">
          Your information helps us personalize your experience. We take your privacy seriously.
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}