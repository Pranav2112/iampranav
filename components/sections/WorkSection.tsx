"use client";

import { motion } from "framer-motion";
import { projects, Project, ProjectStatus } from "@/data/projects";

const featured = projects.filter((p) => p.featured);
const rest = projects.filter((p) => !p.featured);

const STATUS_LABEL: Record<ProjectStatus, string> = {
  LIVE:      "Live",
  SHIPPED:   "Shipped",
  WIP:       "In Progress",
  HACKATHON: "Hackathon",
};

const STATUS_COLOR: Record<ProjectStatus, string> = {
  LIVE:      "#22C55E",
  SHIPPED:   "#555555",
  WIP:       "#C9B89A",
  HACKATHON: "#555555",
};

function BlueprintVisual({ project }: { project: Project }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10", background: "#0A0A0A" }}>
      <svg className="absolute inset-0 w-full h-full" aria-hidden>
        <defs>
          <pattern id={`grid-${project.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.3" strokeOpacity="0.04" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-condensed font-black select-none pointer-events-none leading-none"
          style={{ fontSize: "clamp(2rem, 6vw, 5rem)", color: "rgba(255,255,255,0.03)", letterSpacing: "-0.02em" }}>
          {project.track.toUpperCase()}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-wrap gap-2">
        {project.tech.slice(0, 6).map((t) => (
          <span key={t} className="font-mono text-[9px] tracking-widest uppercase px-2 py-1"
            style={{ color: "#555", border: "1px solid #262626" }}>{t}</span>
        ))}
      </div>
      {project.highlight && (
        <div className="absolute top-5 left-5">
          <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "#C9B89A" }}>
            {project.highlight}
          </span>
        </div>
      )}
      <div className="absolute top-4 right-4 w-3 h-3 border-t border-r" style={{ borderColor: "rgba(201,184,154,0.2)" }} />
      <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l" style={{ borderColor: "rgba(201,184,154,0.2)" }} />
    </div>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  if (!project.live) return <BlueprintVisual project={project} />;

  const screenshotSrc = `https://api.microlink.io/?url=${encodeURIComponent(project.live)}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    <div className="relative w-full overflow-hidden" style={{ border: "1px solid #1A1A1A" }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3" style={{ height: 28, background: "#111", borderBottom: "1px solid #1A1A1A" }}>
        <span className="w-2 h-2 rounded-full" style={{ background: "#2A2A2A" }} />
        <span className="w-2 h-2 rounded-full" style={{ background: "#2A2A2A" }} />
        <span className="w-2 h-2 rounded-full" style={{ background: "#2A2A2A" }} />
        <div className="flex-1 rounded-sm mx-2 flex items-center px-2" style={{ height: 14, background: "#1A1A1A" }}>
          <span className="font-mono truncate" style={{ fontSize: "8px", color: "#444" }}>
            {project.live.replace("https://", "")}
          </span>
        </div>
      </div>
      {/* Screenshot */}
      <div style={{ aspectRatio: "16/9", background: "#0A0A0A", overflow: "hidden", position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={screenshotSrc}
          alt={`${project.name} preview`}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
        />
        {/* Overlay with highlight */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end p-3"
          style={{ background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 100%)", height: "40%" }}>
          {project.highlight && (
            <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "#C9B89A" }}>
              {project.highlight}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ project, num }: { project: Project; num: string }) {
  return (
    <div>
      {/* Index + track */}
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "#C9B89A" }}>
          {num}
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "#666" }}>
          {project.track}
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "#444" }}>
          {project.year}
        </span>
      </div>

      {/* Name */}
      <h3
        className="font-condensed font-black leading-none mb-4"
        style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)", color: "#F5F5F2", letterSpacing: "-0.02em" }}
      >
        {project.name}
      </h3>

      {/* Tagline */}
      <p className="mb-6 leading-relaxed" style={{ fontSize: "0.95rem", color: "#888", maxWidth: "38ch" }}>
        {project.tagline}
      </p>

      {/* Description */}
      <p className="mb-8 leading-relaxed" style={{ fontSize: "0.8rem", color: "#666", maxWidth: "42ch" }}>
        {project.description}
      </p>

      {/* Status + links */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: STATUS_COLOR[project.status] }}
          />
          <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: STATUS_COLOR[project.status] }}>
            {STATUS_LABEL[project.status]}
          </span>
        </div>

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[9px] tracking-widest uppercase transition-colors"
            style={{ color: "#666", borderBottom: "1px solid #333" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F2")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
          >
            Live ↗
          </a>
        )}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[9px] tracking-widest uppercase transition-colors"
          style={{ color: "#666", borderBottom: "1px solid #333" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F2")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
        >
          GitHub ↗
        </a>
      </div>
    </div>
  );
}

function ExhibitRow({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative border-b"
      style={{ borderColor: "#141414", paddingTop: "6rem", paddingBottom: "6rem" }}
    >
      {/* Giant watermark number */}
      <span
        className="absolute font-condensed font-black select-none pointer-events-none leading-none"
        style={{
          fontSize: "28vw",
          color: "rgba(255,255,255,0.015)",
          top: "-0.05em",
          [isEven ? "left" : "right"]: "-0.02em",
          letterSpacing: "-0.05em",
        }}
      >
        {num}
      </span>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center ${!isEven ? "md:[direction:rtl]" : ""}`}>
        <div className={!isEven ? "md:[direction:ltr]" : ""}>
          <InfoBlock project={project} num={num} />
        </div>
        <div className={!isEven ? "md:[direction:ltr]" : ""}>
          <ProjectVisual project={project} />
        </div>
      </div>
    </motion.div>
  );
}

function RestList({ projects }: { projects: Project[] }) {
  return (
    <div className="mt-24">
      <div className="flex items-center gap-6 mb-8" style={{ borderBottom: "1px solid #141414", paddingBottom: "1.5rem" }}>
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: "#C9B89A" }}>Also Shipped</span>
        <div className="flex-1 h-px" style={{ background: "#141414" }} />
      </div>

      <div>
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="group flex items-baseline gap-6 py-5 transition-colors"
            style={{ borderBottom: "1px solid #0F0F0F" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = "#1E1E1E")}
            onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "#0F0F0F")}
          >
            <span className="font-mono text-[9px] shrink-0 w-6" style={{ color: "#444" }}>
              {String(featured.length + i + 1).padStart(2, "0")}
            </span>

            <span
              className="font-condensed font-bold transition-colors"
              style={{ fontSize: "1.25rem", color: "#666", letterSpacing: "-0.01em", minWidth: "200px" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F2")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
            >
              {project.name}
            </span>

            <span className="font-mono text-[9px] tracking-widest uppercase hidden md:block" style={{ color: "#444", minWidth: "100px" }}>
              {project.track}
            </span>

            <span className="flex-1 text-[0.8rem] hidden lg:block leading-snug" style={{ color: "#666" }}>
              {project.tagline}
            </span>

            <span className="font-mono text-[9px]" style={{ color: "#555" }}>{project.year}</span>

            <div className="flex items-center gap-4 shrink-0">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[9px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "#22C55E" }}>
                  Live ↗
                </a>
              )}
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="font-mono text-[9px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "#555" }}>
                Code ↗
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function WorkSection() {
  return (
    <section id="work" className="px-6 md:px-10" style={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="mb-20">
          <div className="flex items-end gap-8 mb-6">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: "#C9B89A" }}>
              02 — Selected Engineering
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-16">
            <h2
              className="font-condensed font-black leading-none"
              style={{ fontSize: "clamp(4.5rem, 10vw, 9rem)", color: "#F5F5F2", letterSpacing: "-0.03em" }}
            >
              Shipped
              <br />
              <span style={{ color: "#141414", WebkitTextStroke: "1px #2A2A2A" }}>Products</span>
            </h2>
            <p className="font-mono leading-relaxed max-w-xs" style={{ fontSize: "9px", color: "#666", paddingBottom: "0.5rem", letterSpacing: "0.1em" }}>
              Real deployments. Production contracts.
              <br />Tools built for actual use — not demos.
            </p>
          </div>
        </div>

        {/* Exhibition rows */}
        <div style={{ borderTop: "1px solid #141414" }}>
          {featured.map((p, i) => (
            <ExhibitRow key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* Editorial list */}
        <RestList projects={rest} />
      </div>
    </section>
  );
}
