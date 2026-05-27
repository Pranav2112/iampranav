"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Brain, Blocks, TrendingUp } from "lucide-react";
import { aboutData } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  code: Code2,
  brain: Brain,
  blocks: Blocks,
  trending: TrendingUp,
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

function StatCounter({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      custom={0.2 + index * 0.1}
      variants={scaleIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group relative flex flex-col items-center gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-6 transition-all duration-500 hover:border-indigo-500/20 hover:bg-white/[0.04]"
    >
      <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
        {value}
      </span>
      <span className="text-xs font-medium tracking-wide text-zinc-500 uppercase">{label}</span>
      {/* hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl bg-indigo-500/[0.04]" />
      </div>
    </motion.div>
  );
}

function InterestCard({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = iconMap[icon] || Code2;

  return (
    <motion.div
      ref={ref}
      custom={0.3 + index * 0.12}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-500 hover:border-indigo-500/20 hover:bg-white/[0.04]"
    >
      {/* Icon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 transition-all duration-500 group-hover:bg-indigo-500/20 group-hover:text-indigo-300">
        <Icon size={24} />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-400">{description}</p>

      {/* Corner accent */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/[0.06] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a0a] py-28 sm:py-36"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-60 top-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute -right-60 bottom-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/8 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-20 text-center">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-4 inline-block text-sm font-medium tracking-widest text-indigo-400 uppercase"
          >
            About Me
          </motion.span>
          <motion.h2
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-3xl font-bold text-white sm:text-5xl"
          >
            {aboutData.headline}
          </motion.h2>
          {/* Decorative line */}
          <motion.div
            custom={0.2}
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
          />
        </div>

        {/* Bio + Stats grid */}
        <div className="mb-20 grid gap-12 lg:grid-cols-5">
          {/* Bio text — takes 3 cols */}
          <div className="lg:col-span-3">
            <div className="space-y-5">
              {aboutData.bio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  custom={0.2 + i * 0.15}
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="text-base leading-relaxed text-zinc-400 sm:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Inline accent */}
            <motion.div
              custom={0.7}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-8 flex items-center gap-3 rounded-xl border border-indigo-500/10 bg-indigo-500/[0.04] px-5 py-3"
            >
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
              <span className="text-sm text-zinc-300">
                Currently exploring{" "}
                <span className="font-medium text-indigo-400">AI agents</span>,{" "}
                <span className="font-medium text-indigo-400">DeFi protocols</span>, and{" "}
                <span className="font-medium text-indigo-400">edge computing</span>
              </span>
            </motion.div>
          </div>

          {/* Stats — takes 2 cols */}
          <div className="grid grid-cols-2 gap-4 self-start lg:col-span-2">
            {aboutData.stats.map((stat, i) => (
              <StatCounter key={stat.label} value={stat.value} label={stat.label} index={i} />
            ))}
          </div>
        </div>

        {/* Interest cards */}
        <motion.div
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-8"
        >
          <h3 className="text-center text-lg font-semibold text-zinc-300 sm:text-xl">
            What I Work With
          </h3>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutData.interests.map((interest, i) => (
            <InterestCard
              key={interest.title}
              title={interest.title}
              description={interest.description}
              icon={interest.icon}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
