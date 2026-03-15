"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SkillGroup = {
  title: string;
  subtitle: string;
  skills: string[];
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const marquee = useMemo(
    () => [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind",
      "GSAP",
      "Framer Motion",
      "Three.js",
      "R3F",
      "drei",
      "Node.js",
      "SQL",
      "Python",
      "XGBoost",
      "Git/GitHub",
    ],
    []
  );

  const groups = useMemo<SkillGroup[]>(
    () => [
      {
        title: "Frontend",
        subtitle: "UI systems + motion",
        skills: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion", "GSAP"],
      },
      {
        title: "3D & Motion",
        subtitle: "Cinematic experiences",
        skills: ["Three.js", "React Three Fiber", "drei", "ScrollTrigger", "Parallax"],
      },
      {
        title: "Backend",
        subtitle: "APIs + systems",
        skills: ["Node.js", "REST APIs", "SQL", "Auth", "Git/GitHub"],
      },
      {
        title: "ML / Data",
        subtitle: "Models + evaluation",
        skills: ["Python", "XGBoost", "Feature Selection", "Pandas", "Cross-Validation"],
      },
    ],
    []
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      // Header subtle morph on scroll (NO pin; header is sticky via CSS)
      gsap.to(header.querySelector(".skills-title"), {
        letterSpacing: "0.06em",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 10%",
          scrub: true,
        },
      });

      // Cards reveal with depth
      gsap.fromTo(
        grid.querySelectorAll(".skill-card"),
        { opacity: 0, y: 50, rotateX: 14, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 78%",
          },
        }
      );

      // Background drift (subtle)
      gsap.to(section.querySelectorAll(".skills-bg"), {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black py-24 overflow-hidden">
      {/* Background glows (move slightly on scroll) */}
      <div className="skills-bg pointer-events-none absolute inset-0 opacity-70">
        <div
          className="absolute -left-24 top-10 h-[420px] w-[420px] rounded-full blur-3xl opacity-60"
          style={{
            background: "radial-gradient(circle, rgba(124,124,255,0.22), transparent 60%)",
          }}
        />
        <div
          className="absolute -right-28 bottom-0 h-[520px] w-[520px] rounded-full blur-3xl opacity-50"
          style={{
            background: "radial-gradient(circle, rgba(0,229,255,0.14), transparent 60%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* ✅ Sticky header (prevents overlap/pin bugs) */}
        <div
          ref={headerRef}
          className="sticky top-0 z-20 -mx-6 px-6 pt-6 pb-8 backdrop-blur-xl"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.88), rgba(0,0,0,0.55), rgba(0,0,0,0))",
          }}
        >
          <p className="text-sm text-white/60">Skills</p>

          <h2 className="skills-title mt-3 text-3xl md:text-6xl font-black tracking-tight">
            Stack that moves. Literally.
          </h2>

          <p className="mt-4 max-w-2xl text-white/70">
            Scroll-driven motion, interactive UI, and performance-first engineering.
            No template vibes.
          </p>

          {/* Marquee */}
          <div className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            <div className="marquee gap-3 py-4 px-4">
              {[...marquee, ...marquee].map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="whitespace-nowrap rounded-full border border-white/10 bg-black/25 px-4 py-1.5 text-xs text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {groups.map((g) => (
            <GroupCard key={g.title} group={g} />
          ))}
        </div>

        {/* Spacer so sticky header doesn’t feel cramped at end */}
        <div className="h-10" />
      </div>
    </section>
  );
}

function GroupCard({ group }: { group: SkillGroup }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;

    const rx = (0.5 - y) * 9;
    const ry = (x - 0.5) * 11;

    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div className="skill-card group relative">
      {/* hover border glow */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-3xl opacity-0 blur-xl transition duration-200 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from 180deg, rgba(124,124,255,0.45), rgba(0,229,255,0.35), rgba(255,255,255,0.10), rgba(124,124,255,0.45))",
        }}
      />

      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-transform duration-200 [transform-style:preserve-3d]"
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-200 group-hover:opacity-100"
          style={{
            background: "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.08), transparent 55%)",
          }}
        />

        <div className="relative">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold">{group.title}</h3>
              <p className="mt-1 text-sm text-white/60">{group.subtitle}</p>
            </div>

            <div className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-white/70">
              {group.skills.length} skills
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {group.skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-white/80 transition group-hover:border-white/20"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}