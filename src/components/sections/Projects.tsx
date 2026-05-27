"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  X,
  ChevronRight,
  ArrowUpRight,
  Layers,
  Globe,
  Code2,
} from "lucide-react";
import { projectsData } from "@/lib/data";

type Project = (typeof projectsData.projects)[0];

/* ─── Animations ───────────────────────────────────────────── */

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: d, duration: 0.7, ease },
  }),
};

const stagger = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.6, ease },
  }),
};

/* ─── Color map ────────────────────────────────────────────── */

const catStyle: Record<string, { accent: string; bg: string; border: string; gradient: string }> = {
  "Full Stack": {
    accent: "text-indigo-400",
    bg: "bg-indigo-500/8",
    border: "border-indigo-500/15",
    gradient: "from-indigo-500/30 via-indigo-500/5 to-transparent",
  },
  Blockchain: {
    accent: "text-emerald-400",
    bg: "bg-emerald-500/8",
    border: "border-emerald-500/15",
    gradient: "from-emerald-500/30 via-emerald-500/5 to-transparent",
  },
  "ML & AI": {
    accent: "text-cyan-400",
    bg: "bg-cyan-500/8",
    border: "border-cyan-500/15",
    gradient: "from-cyan-500/30 via-cyan-500/5 to-transparent",
  },
  FinTech: {
    accent: "text-amber-400",
    bg: "bg-amber-500/8",
    border: "border-amber-500/15",
    gradient: "from-amber-500/30 via-amber-500/5 to-transparent",
  },
};

const statusDot: Record<string, string> = {
  Live: "bg-emerald-500",
  "In Development": "bg-amber-500",
  Archived: "bg-zinc-500",
};

/* ─── 3D Tilt Card Wrapper ─────────────────────────────────── */

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouse(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Project Card ─────────────────────────────────────────── */

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const style = catStyle[project.category] || catStyle["Full Stack"];

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <TiltCard className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111111] transition-colors duration-500 hover:border-white/[0.1]">
        {/* Animated top-border gradient on hover */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${style.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
        />

        {/* ── Preview area ── */}
        <div className="relative h-44 shrink-0 overflow-hidden">
          {/* Grid dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Soft category glow */}
          <div
            className={`absolute -top-16 left-1/2 h-32 w-48 -translate-x-1/2 rounded-full ${style.bg} blur-3xl transition-all duration-700 group-hover:w-64 group-hover:opacity-100`}
          />

          {/* Project number */}
          <span className="absolute bottom-3 left-4 font-mono text-[11px] font-medium text-white/10 transition-colors duration-300 group-hover:text-white/20">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-xl border ${style.border} ${style.bg} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}
            >
              <span className={`text-xl font-bold ${style.accent}`}>
                {project.title
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
          </div>

          {/* Year */}
          <span className="absolute right-3 top-3 rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-zinc-600">
            {project.year}
          </span>

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
            <button
              onClick={onOpen}
              className="flex items-center gap-2 rounded-lg bg-white/[0.08] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/[0.15]"
            >
              <Layers size={15} />
              Explore Project
            </button>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-1 flex-col p-5">
          {/* Meta row */}
          <div className="mb-3 flex items-center gap-2.5">
            <span
              className={`rounded-md border px-2 py-[3px] text-[10px] font-semibold uppercase tracking-wider ${style.bg} ${style.accent} ${style.border}`}
            >
              {project.category}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  statusDot[project.status] || "bg-zinc-500"
                }`}
              />
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-1.5 text-[17px] font-semibold leading-snug text-zinc-100 transition-colors group-hover:text-white">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-zinc-500">
            {project.shortDescription}
          </p>

          {/* Tech pills */}
          <div className="mb-5 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded bg-white/[0.03] px-2 py-[2px] text-[10px] font-medium text-zinc-500"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="rounded bg-white/[0.03] px-2 py-[2px] text-[10px] font-medium text-zinc-600">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Footer — pushed to bottom */}
          <div className="mt-auto flex items-center justify-between border-t border-white/[0.05] pt-4">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-600 transition-colors hover:text-zinc-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={13} />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-600 transition-colors hover:text-zinc-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Globe size={13} />
                  Demo
                </a>
              )}
            </div>
            <button
              onClick={onOpen}
              className={`flex items-center gap-0.5 text-[11px] font-semibold ${style.accent} opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:gap-1.5`}
            >
              Details
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ─── Project Modal ────────────────────────────────────────── */

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const style = catStyle[project.category] || catStyle["Full Stack"];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.35, ease }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#0f0f0f]"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05] text-zinc-500 transition-colors hover:bg-white/[0.1] hover:text-white"
        >
          <X size={14} />
        </button>

        {/* Header */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div
            className={`absolute -top-20 left-1/2 h-40 w-56 -translate-x-1/2 rounded-full ${style.bg} blur-3xl`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-2xl border ${style.border} ${style.bg}`}
            >
              <span className={`text-3xl font-bold ${style.accent}`}>
                {project.title
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
        </div>

        {/* Body */}
        <div className="px-6 pb-6">
          {/* Badges */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-md border px-2.5 py-[3px] text-[10px] font-semibold uppercase tracking-wider ${style.bg} ${style.accent} ${style.border}`}
            >
              {project.category}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  statusDot[project.status] || "bg-zinc-500"
                }`}
              />
              {project.status}
            </span>
            <span className="font-mono text-[10px] text-zinc-600">{project.year}</span>
          </div>

          <h2 className="mb-2 text-xl font-bold text-white sm:text-2xl">
            {project.title}
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-zinc-400">
            {project.fullDescription}
          </p>

          {/* Highlights */}
          <div className="mb-6">
            <h4 className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
              <Code2 size={12} />
              Key Highlights
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                  className="flex items-start gap-2.5"
                >
                  <ChevronRight size={12} className={`mt-[3px] shrink-0 ${style.accent}`} />
                  <span className="text-[13px] leading-snug text-zinc-300">{h}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div className="mb-6">
            <h4 className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
              <Layers size={12} />
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.04 * i }}
                  className={`rounded-md border ${style.border} ${style.bg} px-2.5 py-1 text-[11px] font-medium ${style.accent}`}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2.5 border-t border-white/[0.06] pt-5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-500"
              >
                <ArrowUpRight size={15} />
                Visit Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-5 py-2 text-sm font-medium text-zinc-300 transition-all hover:bg-white/[0.06]"
              >
                <Github size={15} />
                View Source
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Section ─────────────────────────────────────────── */

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered =
    filter === "All"
      ? projectsData.projects
      : projectsData.projects.filter((p) => p.category === filter);

  const openModal = useCallback((p: Project) => setSelected(p), []);

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="relative overflow-hidden bg-[#0a0a0a] py-28 sm:py-36"
      >
        {/* Ambient bg */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-48 top-1/4 h-[450px] w-[450px] rounded-full bg-indigo-600/[0.04] blur-[140px]" />
          <div className="absolute -right-48 bottom-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/[0.04] blur-[120px]" />
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
              Projects
            </motion.span>
            <motion.h2
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-3xl font-bold text-white sm:text-5xl"
            >
              {projectsData.headline}
            </motion.h2>
            <motion.p
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mx-auto mt-4 max-w-md text-sm text-zinc-500"
            >
              {projectsData.subtitle}
            </motion.p>
          </div>

          {/* Filters */}
          <motion.div
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-10 flex flex-wrap justify-center gap-1.5"
          >
            {projectsData.categories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`relative rounded-lg px-4 py-1.5 text-[13px] font-medium transition-all duration-300 ${
                    active ? "text-white" : "text-zinc-600 hover:text-zinc-400"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="projFilter"
                      className="absolute inset-0 rounded-lg border border-white/[0.08] bg-white/[0.04]"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  {cat}
                  {active && (
                    <span className="ml-1.5 text-[10px] text-zinc-500">
                      ({filtered.length})
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Grid — consistent 3-column, equal height */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onOpen={() => openModal(project)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-sm text-zinc-600">
              No projects in this category yet.
            </div>
          )}

          {/* Bottom link */}
          <motion.div
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-14 text-center"
          >
            <a
              href="https://github.com/pranav"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-zinc-600 transition-colors hover:text-zinc-300"
            >
              View all on GitHub
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
