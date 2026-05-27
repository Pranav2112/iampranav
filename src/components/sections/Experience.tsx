"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Zap,
  Star,
  ChevronRight,
  Briefcase,
  GraduationCap,
  FlaskConical,
  Code2,
  Shield,
} from "lucide-react";
import { experienceData } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: d, duration: 0.7, ease },
  }),
};

/* ─── Color system ─────────────────────────────────────────── */

const colors: Record<
  string,
  { accent: string; bg: string; border: string; bar: string; glow: string; ring: string }
> = {
  indigo: {
    accent: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    bar: "bg-indigo-500",
    glow: "shadow-[0_0_20px_rgba(99,102,241,0.4)]",
    ring: "ring-indigo-500/30",
  },
  violet: {
    accent: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    bar: "bg-violet-500",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.4)]",
    ring: "ring-violet-500/30",
  },
  cyan: {
    accent: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    bar: "bg-cyan-500",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.4)]",
    ring: "ring-cyan-500/30",
  },
  emerald: {
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    bar: "bg-emerald-500",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    ring: "ring-emerald-500/30",
  },
  amber: {
    accent: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    bar: "bg-amber-500",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.4)]",
    ring: "ring-amber-500/30",
  },
};

const levelBadge: Record<string, { label: string; color: string }> = {
  Legendary: { label: "LEGENDARY", color: "text-amber-300 bg-amber-500/10 border-amber-500/20" },
  Epic: { label: "EPIC", color: "text-violet-300 bg-violet-500/10 border-violet-500/20" },
  Rare: { label: "RARE", color: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20" },
  Common: { label: "COMMON", color: "text-zinc-300 bg-zinc-500/10 border-zinc-500/20" },
};

const typeIcon: Record<string, typeof Briefcase> = {
  Education: GraduationCap,
  Freelance: Code2,
  Project: Briefcase,
  Research: FlaskConical,
  Work: Briefcase,
};

/* ─── Player HUD ───────────────────────────────────────────── */

function PlayerHUD() {
  const { playerStats } = experienceData;
  const xpProgress = (playerStats.totalXP % 1000) / 1000;

  return (
    <div className="mx-auto mb-14 max-w-md">
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Level badge */}
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 ring-2 ring-indigo-500/20">
              <Shield size={20} className="text-indigo-400" />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white">
                {playerStats.level}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{playerStats.title}</p>
              <p className="text-[11px] text-zinc-500">Level {playerStats.level} Developer</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm font-bold text-indigo-400">
              {playerStats.totalXP.toLocaleString()} XP
            </p>
            <p className="text-[10px] text-zinc-600">Total Experience</p>
          </div>
        </div>

        {/* XP bar */}
        <div className="relative">
          <div className="flex items-center justify-between text-[10px] text-zinc-600 mb-1.5">
            <span>LEVEL {playerStats.level}</span>
            <span>LEVEL {playerStats.level + 1}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${xpProgress * 100}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1.2, ease }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-500"
            >
              <div className="h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Timeline Node ────────────────────────────────────────── */

function TimelineNode({
  item,
  index,
  isLast,
}: {
  item: (typeof experienceData.timeline)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);
  const c = colors[item.color] || colors.indigo;
  const badge = levelBadge[item.level] || levelBadge.Common;
  const TypeIcon = typeIcon[item.type] || Briefcase;
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex justify-center">
      {/* ── Center timeline line ── */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center z-0 hidden lg:flex">
        {/* Node dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.2 + index * 0.15, duration: 0.5, ease }}
          className={`relative z-10 flex h-5 w-5 items-center justify-center rounded-full ${c.bar} ${c.glow}`}
        >
          <div className="h-2 w-2 rounded-full bg-white" />
          {/* Pulse ring */}
          <div className={`absolute inset-0 animate-ping rounded-full ${c.bar} opacity-20`} />
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ delay: 0.4 + index * 0.15, duration: 0.8, ease }}
            className={`w-[2px] ${c.bar} opacity-20`}
            style={{ minHeight: "100%" }}
          />
        )}
      </div>

      {/* ── Mobile: left line ── */}
      <div className="absolute left-6 top-0 flex flex-col items-center z-0 lg:hidden">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease }}
          className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full ${c.bar} ${c.glow}`}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-white" />
        </motion.div>
        {!isLast && (
          <div className={`w-[2px] flex-1 ${c.bar} opacity-20`} style={{ minHeight: 40 }} />
        )}
      </div>

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ delay: 0.3 + index * 0.15, duration: 0.6, ease }}
        className={`relative z-10 w-full lg:w-[calc(50%-40px)] ${
          isLeft ? "lg:mr-auto lg:pr-0" : "lg:ml-auto lg:pl-0"
        } pl-14 lg:pl-0`}
      >
        <div
          className={`group overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111111] transition-all duration-500 hover:border-white/[0.1]`}
        >
          {/* Top gradient */}
          <div className={`h-[2px] bg-gradient-to-r from-transparent ${c.bar === "bg-indigo-500" ? "via-indigo-500/50" : c.bar === "bg-violet-500" ? "via-violet-500/50" : c.bar === "bg-cyan-500" ? "via-cyan-500/50" : c.bar === "bg-emerald-500" ? "via-emerald-500/50" : "via-amber-500/50"} to-transparent opacity-60`} />

          <div className="p-5 sm:p-6">
            {/* Header row */}
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.bg}`}>
                  <TypeIcon size={18} className={c.accent} />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-white">{item.role}</h3>
                  <p className="text-[12px] text-zinc-500">{item.company}</p>
                </div>
              </div>

              {/* XP badge */}
              <div className="shrink-0 text-right">
                <div className="flex items-center gap-1">
                  <Zap size={12} className="text-amber-400" />
                  <span className="font-mono text-sm font-bold text-amber-400">
                    +{item.xp} XP
                  </span>
                </div>
                <span
                  className={`mt-1 inline-block rounded-md border px-1.5 py-[1px] text-[9px] font-bold uppercase tracking-wider ${badge.color}`}
                >
                  {badge.label}
                </span>
              </div>
            </div>

            {/* Meta */}
            <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] text-zinc-500">
              <span className="font-mono">{item.period}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-700" />
              <span>{item.location}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-700" />
              <span className={`rounded-md border px-1.5 py-[1px] text-[10px] font-medium ${c.bg} ${c.accent} ${c.border}`}>
                {item.type}
              </span>
            </div>

            {/* Description */}
            <p className="mb-4 text-[13px] leading-relaxed text-zinc-400">
              {item.description}
            </p>

            {/* Skills row */}
            <div className="mb-4 flex flex-wrap gap-1.5">
              {item.skills.map((skill) => (
                <span
                  key={skill}
                  className={`rounded-md border ${c.border} ${c.bg} px-2 py-[2px] text-[10px] font-medium ${c.accent}`}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Achievements toggle */}
            <button
              onClick={() => setExpanded(!expanded)}
              className={`flex items-center gap-1.5 text-[12px] font-semibold ${c.accent} transition-all hover:gap-2`}
            >
              <Trophy size={13} />
              {expanded ? "Hide" : "Show"} Achievements ({item.achievements.length})
              <ChevronRight
                size={13}
                className={`transition-transform ${expanded ? "rotate-90" : ""}`}
              />
            </button>

            {/* Achievements list */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-2 border-t border-white/[0.05] pt-4">
                    {item.achievements.map((ach, i) => (
                      <motion.div
                        key={ach}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 * i, duration: 0.4 }}
                        className="flex items-start gap-2.5"
                      >
                        <Star size={11} className={`mt-[3px] shrink-0 ${c.accent}`} />
                        <span className="text-[12px] leading-snug text-zinc-300">
                          {ach}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────── */

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a0a] py-28 sm:py-36"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-48 top-1/4 h-[450px] w-[450px] rounded-full bg-violet-600/[0.04] blur-[140px]" />
        <div className="absolute -left-48 bottom-1/3 h-[400px] w-[400px] rounded-full bg-indigo-600/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-4 inline-block text-[11px] font-semibold tracking-[0.2em] text-indigo-400 uppercase"
          >
            Experience
          </motion.span>
          <motion.h2
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center justify-center gap-3 text-3xl font-bold text-white sm:text-5xl"
          >
            <Trophy size={32} className="text-amber-400" />
            {experienceData.headline}
          </motion.h2>
          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mx-auto mt-4 max-w-lg text-sm text-zinc-500"
          >
            {experienceData.subtitle}
          </motion.p>
        </div>

        {/* Player HUD */}
        <motion.div
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <PlayerHUD />
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-8 lg:space-y-12">
          {/* Center line (desktop) */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-white/[0.06] via-white/[0.03] to-transparent lg:block" />

          {experienceData.timeline.map((item, i) => (
            <TimelineNode
              key={item.id}
              item={item}
              index={i}
              isLast={i === experienceData.timeline.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
