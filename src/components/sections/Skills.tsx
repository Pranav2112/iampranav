"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { skillsData } from "@/lib/data";

const colorMap: Record<string, { bar: string; bg: string; text: string; glow: string; border: string }> = {
  indigo: {
    bar: "bg-indigo-500",
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    glow: "shadow-[0_0_20px_rgba(99,102,241,0.3)]",
    border: "border-indigo-500/30",
  },
  violet: {
    bar: "bg-violet-500",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.3)]",
    border: "border-violet-500/30",
  },
  cyan: {
    bar: "bg-cyan-500",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.3)]",
    border: "border-cyan-500/30",
  },
  emerald: {
    bar: "bg-emerald-500",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]",
    border: "border-emerald-500/30",
  },
  amber: {
    bar: "bg-amber-500",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.3)]",
    border: "border-amber-500/30",
  },
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

function SkillBar({
  name,
  level,
  color,
  index,
}: {
  name: string;
  level: number;
  color: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const colors = colorMap[color] || colorMap.indigo;

  return (
    <div ref={ref} className="group">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-300 transition-colors group-hover:text-white">
          {name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 + index * 0.08, duration: 0.4 }}
          className={`text-xs font-semibold ${colors.text}`}
        >
          {level}%
        </motion.span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            delay: 0.3 + index * 0.08,
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`absolute inset-y-0 left-0 rounded-full ${colors.bar}`}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function CategoryTab({
  name,
  color,
  isActive,
  onClick,
}: {
  name: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const colors = colorMap[color] || colorMap.indigo;

  return (
    <button
      onClick={onClick}
      className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
        isActive
          ? `${colors.text} ${colors.border} border ${colors.bg}`
          : "border border-transparent text-zinc-500 hover:text-zinc-300"
      }`}
    >
      {name}
      {isActive && (
        <motion.div
          layoutId="activeSkillTab"
          className={`absolute inset-0 rounded-full ${colors.bg} ${colors.border} border`}
          style={{ zIndex: -1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(0);

  const currentCategory = skillsData.categories[activeCategory];
  const currentColors = colorMap[currentCategory.color] || colorMap.indigo;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a0a] py-28 sm:py-36"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-60 top-1/3 h-[400px] w-[400px] rounded-full bg-violet-600/8 blur-[120px]" />
        <div className="absolute -left-40 bottom-1/4 h-[350px] w-[350px] rounded-full bg-indigo-600/8 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-4 inline-block text-sm font-medium tracking-widest text-indigo-400 uppercase"
          >
            Skills
          </motion.span>
          <motion.h2
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-3xl font-bold text-white sm:text-5xl"
          >
            {skillsData.headline}
          </motion.h2>
          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mx-auto mt-4 max-w-lg text-zinc-400"
          >
            {skillsData.subtitle}
          </motion.p>
          <motion.div
            custom={0.3}
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
          />
        </div>

        {/* Category tabs */}
        <motion.div
          custom={0.35}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 flex flex-wrap justify-center gap-2"
        >
          {skillsData.categories.map((category, i) => (
            <CategoryTab
              key={category.name}
              name={category.name}
              color={category.color}
              isActive={activeCategory === i}
              onClick={() => setActiveCategory(i)}
            />
          ))}
        </motion.div>

        {/* Skills display — two-column layout */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Skill bars */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategory.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                {currentCategory.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={currentCategory.color}
                    index={i}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Category showcase card */}
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategory.name}
                initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8`}
              >
                {/* Glow backdrop */}
                <div
                  className={`absolute -right-12 -top-12 h-40 w-40 rounded-full ${currentColors.bg} blur-3xl`}
                />
                <div
                  className={`absolute -bottom-12 -left-12 h-32 w-32 rounded-full ${currentColors.bg} blur-3xl`}
                />

                <div className="relative z-10">
                  <div
                    className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${currentColors.bg}`}
                  >
                    <span className={`text-2xl font-bold ${currentColors.text}`}>
                      {currentCategory.name.charAt(0)}
                    </span>
                  </div>

                  <h3 className="mb-2 text-2xl font-bold text-white">
                    {currentCategory.name}
                  </h3>

                  <p className="mb-6 text-sm text-zinc-400">
                    {currentCategory.skills.length} technologies
                  </p>

                  {/* Skill chips */}
                  <div className="flex flex-wrap gap-2">
                    {currentCategory.skills.map((skill, i) => (
                      <motion.span
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                        className={`rounded-full border ${currentColors.border} ${currentColors.bg} px-3 py-1 text-xs font-medium ${currentColors.text}`}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>

                  {/* Average proficiency */}
                  <div className="mt-6 pt-6 border-t border-white/[0.06]">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">Avg. Proficiency</span>
                      <span className={`font-semibold ${currentColors.text}`}>
                        {Math.round(
                          currentCategory.skills.reduce((sum, s) => sum + s.level, 0) /
                            currentCategory.skills.length
                        )}
                        %
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.round(
                            currentCategory.skills.reduce((sum, s) => sum + s.level, 0) /
                              currentCategory.skills.length
                          )}%`,
                        }}
                        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full rounded-full ${currentColors.bar}`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom: All skills marquee */}
        <motion.div
          custom={0.5}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 overflow-hidden"
        >
          <div className="relative">
            {/* Fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

            <div className="flex animate-marquee gap-4">
              {[...skillsData.categories, ...skillsData.categories].flatMap((cat) =>
                cat.skills.map((skill, i) => {
                  const colors = colorMap[cat.color] || colorMap.indigo;
                  return (
                    <span
                      key={`${cat.name}-${skill.name}-${i}`}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full border ${colors.border} ${colors.bg} px-4 py-2 text-xs font-medium ${colors.text}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${colors.bar}`} />
                      {skill.name}
                    </span>
                  );
                })
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
