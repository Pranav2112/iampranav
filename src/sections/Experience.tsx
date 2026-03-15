"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "@/lib/timeline";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const ctx = gsap.context(() => {
      // Animate the progress line fill
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );

      // Reveal each item
      gsap.fromTo(
        ".xp-item",
        { opacity: 0, y: 40, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );

      // Glow drift
      gsap.to(".xp-glow", {
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
    <section ref={sectionRef} className="relative bg-black py-28 overflow-hidden">
      {/* background glow */}
      <div
        className="xp-glow pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 30% 35%, rgba(124,124,255,0.12), transparent 55%)",
        }}
      />
      <div
        className="xp-glow pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 75% 65%, rgba(0,229,255,0.09), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <p className="text-sm text-white/60">Experience</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">
          Timeline of what I’ve built.
        </h2>
        <p className="mt-5 max-w-2xl text-white/70">
          A snapshot of education and projects — built with focus on systems,
          motion, and product-quality UI.
        </p>

        {/* Timeline */}
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-[80px_1fr]">
          {/* Left line */}
          <div className="relative hidden md:block">
            {/* base line */}
            <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-white/10" />
            {/* animated fill line */}
            <div
              ref={lineRef}
              className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-white/70 origin-top scale-y-0"
            />
          </div>

          {/* Items */}
          <div className="space-y-6">
            {timeline.map((item, idx) => (
              <TimelineCard key={idx} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  item,
}: {
  item: { title: string; meta: string; desc: string; tags: string[] };
}) {
  return (
    <div className="xp-item group relative rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
      {/* hover glow */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 blur-2xl transition duration-200 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 25% 20%, rgba(124,124,255,0.20), transparent 60%)",
        }}
      />

      <div className="relative">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h3 className="text-xl font-bold">{item.title}</h3>
          <p className="text-sm text-white/60">{item.meta}</p>
        </div>

        <p className="mt-4 text-white/75 leading-relaxed">{item.desc}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-white/80"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}