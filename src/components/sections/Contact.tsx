"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { siteConfig } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: d, duration: 0.7, ease },
  }),
};

const socials = [
  { icon: Github, label: "GitHub", href: siteConfig.socials.github },
  { icon: Linkedin, label: "LinkedIn", href: siteConfig.socials.linkedin },
  { icon: Twitter, label: "Twitter", href: siteConfig.socials.twitter },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    // Simulate send — replace with your actual API endpoint
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("sent");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setFormState("idle"), 4000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a0a] py-28 sm:py-36"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-600/[0.04] blur-[140px]" />
        <div className="absolute -right-48 top-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-4 inline-block text-[11px] font-semibold tracking-[0.2em] text-indigo-400 uppercase"
          >
            Contact
          </motion.span>
          <motion.h2
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-3xl font-bold text-white sm:text-5xl"
          >
            Let&apos;s Work Together
          </motion.h2>
          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mx-auto mt-4 max-w-md text-sm text-zinc-500"
          >
            Have a project in mind or just want to chat? I&apos;d love to hear
            from you.
          </motion.p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* ── Left: Info panel ── */}
          <motion.div
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8 lg:col-span-2"
          >
            {/* Email card */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="group flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-indigo-500/20 hover:bg-white/[0.04]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                <Mail size={18} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                  Email
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-300 transition-colors group-hover:text-white">
                  {siteConfig.email}
                </p>
              </div>
              <ArrowUpRight
                size={14}
                className="ml-auto mt-1 text-zinc-600 opacity-0 transition-all group-hover:opacity-100"
              />
            </a>

            {/* Location card */}
            <div className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
                <MapPin size={18} className="text-violet-400" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                  Location
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-300">
                  United States
                </p>
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                Connect with me
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-zinc-500 transition-all duration-300 hover:border-indigo-500/20 hover:bg-indigo-500/10 hover:text-indigo-400"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-emerald-400">
                Available for freelance & full-time opportunities
              </span>
            </div>
          </motion.div>

          {/* ── Right: Contact form ── */}
          <motion.div
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8"
            >
              <div className="mb-6 grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-zinc-500"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-indigo-500/30 focus:ring-1 focus:ring-indigo-500/20"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-zinc-500"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-indigo-500/30 focus:ring-1 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="mb-5">
                <label
                  htmlFor="subject"
                  className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-zinc-500"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-indigo-500/30 focus:ring-1 focus:ring-indigo-500/20"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-zinc-500"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  className="w-full resize-none rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-indigo-500/30 focus:ring-1 focus:ring-indigo-500/20"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formState !== "idle"}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] disabled:opacity-60 disabled:hover:bg-indigo-600 sm:w-auto"
              >
                {formState === "idle" && (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
                {formState === "sending" && (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Sending...
                  </>
                )}
                {formState === "sent" && (
                  <>
                    <CheckCircle2 size={15} />
                    Message Sent!
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          custom={0.6}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-24 border-t border-white/[0.06] pt-8"
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-zinc-600">
              &copy; {new Date().getFullYear()} {siteConfig.name}. Built with
              Next.js & Framer Motion.
            </p>
            <div className="flex items-center gap-4">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 transition-colors hover:text-zinc-400"
                  aria-label={label}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
