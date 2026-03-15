"use client";

import { useMemo, useRef } from "react";

type Project = {
  title: string;
  subtitle: string;
  tags: string[];
  link: string;
  github: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handlers = useMemo(() => {
    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;  // 0..1
      const y = (e.clientY - r.top) / r.height;  // 0..1

      const rx = (0.5 - y) * 10;
      const ry = (x - 0.5) * 12;

      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    };

    const onLeave = () => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `rotateX(0deg) rotateY(0deg)`;
    };

    return { onMove, onLeave };
  }, []);

  return (
    <div className="w-[320px] sm:w-[420px] md:w-[520px] flex-shrink-0">
      <div
        ref={ref}
        onMouseMove={handlers.onMove}
        onMouseLeave={handlers.onLeave}
        className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-transform duration-200 [transform-style:preserve-3d]"
      >
        {/* Glow */}
        <div className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 blur-2xl transition group-hover:opacity-100"
             style={{ background: "radial-gradient(circle at 30% 30%, rgba(124,124,255,0.35), transparent 60%)" }} />

        <div className="relative z-10">
          <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
          <p className="mt-2 text-white/70">{project.subtitle}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/75"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 flex gap-3 opacity-0 translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
            <a
              href={project.link}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
            >
              Live
            </a>
            <a
              href={project.github}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
