"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import ParticleField from "@/components/effects/ParticleField";
import MagneticButton from "@/components/effects/MagneticButton";
import { siteConfig } from "@/lib/data";

const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.04,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

function AnimatedText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i}
          variants={letterAnimation}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const handleScrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      <ParticleField />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute -right-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Status badge */}
        <motion.div
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm text-zinc-400">Available for work</span>
        </motion.div>

        {/* Name */}
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
          <AnimatedText text={`Hi, I'm ${siteConfig.name}`} />
        </h1>

        {/* Title */}
        <motion.div
          custom={1.5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h2 className="mb-6 bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl lg:text-4xl">
            {siteConfig.title}
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          custom={1.8}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          {siteConfig.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={2.1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-12 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-indigo-600 px-7 py-3 text-sm font-medium text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
          >
            <span className="relative z-10">View My Work</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </MagneticButton>

          <MagneticButton
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-7 py-3 text-sm font-medium text-zinc-300 transition-all hover:border-white/[0.2] hover:bg-white/[0.06]"
          >
            Get in Touch
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          custom={2.4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-5"
        >
          {[
            { icon: Github, href: siteConfig.socials.github, label: "GitHub" },
            { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
            { icon: Twitter, href: siteConfig.socials.twitter, label: "Twitter" },
          ].map(({ icon: Icon, href, label }) => (
            <MagneticButton key={label} href={href} strength={0.4}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-400 transition-all hover:border-indigo-500/50 hover:text-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                <Icon size={18} />
              </span>
            </MagneticButton>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium tracking-widest text-zinc-500 uppercase">
            Scroll
          </span>
          <ArrowDown size={16} className="text-zinc-500" />
        </motion.div>
      </motion.button>
    </section>
  );
}
