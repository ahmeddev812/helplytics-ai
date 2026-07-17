"use client";

import { useState } from "react";
import Link from "next/link";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { FloatingChatbot } from "@/components/layout/FloatingChatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Sparkles,
  Mail,
  MapPin,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Send,
  Globe,
  MessageCircle,
  Link2,
  HelpCircle,
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "hello@helplytics.ai",
    href: "mailto:hello@helplytics.ai",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "San Francisco, CA",
    href: null,
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    value: "Check our frequently asked questions",
    href: "#",
  },
];

const socialLinks = [
  { icon: Globe, label: "GitHub", href: "#" },
  { icon: MessageCircle, label: "Twitter", href: "#" },
  { icon: Link2, label: "LinkedIn", href: "#" },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message sent successfully! We'll get back to you soon.");
    reset();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-primary/10 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <LandingNavbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4"
            >
              <MessageSquare className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Contact
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight"
            >
              Get in{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                touch
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              Have a question, suggestion, or just want to say hello? We&apos;d
              love to hear from you.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Contact Information
              </h2>

              {contactInfo.map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        {item.title}
                      </h3>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-sm text-slate-500 hover:text-primary transition-colors"
                        >
                          {item.value}
                        </Link>
                      ) : (
                        <p className="text-sm text-slate-500">{item.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-3">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, i) => (
                    <Link
                      key={i}
                      href={social.href}
                      className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all"
                    >
                      <social.icon className="h-4.5 w-4.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 sm:p-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-background border border-emerald-200 text-center shadow-lg"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                    Thank you for reaching out. Our team will review your
                    message and get back to you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-lg"
                >
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Send us a message
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Full Name
                      </label>
                      <Input
                        {...register("name")}
                        placeholder="John Doe"
                        className={cn(
                          "h-11 rounded-xl",
                          errors.name && "border-destructive"
                        )}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Email Address
                      </label>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="john@example.com"
                        className={cn(
                          "h-11 rounded-xl",
                          errors.email && "border-destructive"
                        )}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Subject
                      </label>
                      <Input
                        {...register("subject")}
                        placeholder="How can we help?"
                        className={cn(
                          "h-11 rounded-xl",
                          errors.subject && "border-destructive"
                        )}
                      />
                      {errors.subject && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Message
                      </label>
                      <Textarea
                        {...register("message")}
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        className={cn(
                          "rounded-xl resize-none",
                          errors.message && "border-destructive"
                        )}
                      />
                      {errors.message && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full h-12 text-base font-bold rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/25 hover:shadow-xl transition-all gap-2 group"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-slate-100 bg-slate-50/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                Helplytics AI
              </span>
            </Link>
            <p className="text-sm text-slate-400">
              &copy; 2026 Helplytics AI. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Link href="/features" className="hover:text-slate-900 transition-colors">Features</Link>
              <Link href="/about" className="hover:text-slate-900 transition-colors">About</Link>
            </div>
          </div>
        </div>
      </footer>
      <FloatingChatbot />
    </div>
  );
}
