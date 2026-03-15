"use client";

import { useEffect, useRef } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export default function Projects() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onWheel = (e: WheelEvent) => {
      // Convert vertical scroll into horizontal movement
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      track.scrollLeft += e.deltaY * 1.2;
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel as any);
  }, []);

  return (
    <section id="projects" className="relative bg-black py-24">
      {/* background light */}
      <div className="pointer-events-none absolute inset-0 opacity-70"
           style={{ background: "radial-gradient(circle at 20% 30%, rgba(0,229,255,0.10), transparent 55%)" }} />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm text-white/60">Selected Work</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-black tracking-tight">
              Projects that hit different.
            </h2>
          </div>

          <p className="hidden md:block max-w-sm text-right text-white/60">
            Scroll to explore. Hover for tilt + actions.
          </p>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex gap-6 overflow-x-auto pb-6 [scrollbar-width:none] [-ms-overflow-style:none]"
        >
          <style jsx>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>

          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
