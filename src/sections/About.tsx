"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { opacity: 0, y: 40, filter: "blur(10px)" },
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

      gsap.fromTo(
        ".about-card",
        { opacity: 0, y: 30, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        }
      );

      gsap.to(".about-glow", {
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
    <section ref={sectionRef} className="relative bg-black py-28">
      {/* ambient background */}
      <div
        className="about-glow pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(124,124,255,0.14), transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 20% 60%, rgba(0,229,255,0.10), transparent 55%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-2">
        {/* Left */}
        <div>
          <p className="about-reveal text-sm text-white/60">About</p>

          <h2 className="about-reveal mt-3 text-3xl md:text-5xl font-black tracking-tight">
            I design & build experiences that feel alive.
          </h2>

          <p className="about-reveal mt-6 text-white/70 leading-relaxed">
            I’m Pranav — a developer focused on modern web engineering, motion,
            and 3D. I care about performance, clean architecture, and visuals
            that don’t look like a template.
          </p>

          <p className="about-reveal mt-4 text-white/70 leading-relaxed">
            Currently: MS @ Stevens (Spring 2026). I’m building projects across
            web, UI systems, and ML — with a strong focus on high-quality
            design + motion.
          </p>

          {/* Chips */}
          <div className="about-reveal mt-7 flex flex-wrap gap-2">
            {[
              "Next.js",
              "TypeScript",
              "React",
              "Tailwind",
              "GSAP",
              "Framer Motion",
              "Three.js (R3F)",
              "Python / ML",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75 backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right Card */}
        <div className="about-card relative rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
          {/* inner glow */}
          <div
            className="pointer-events-none absolute -inset-1 rounded-3xl opacity-40 blur-2xl"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(124,124,255,0.25), transparent 60%)",
            }}
          />

          <div className="relative">
            <h3 className="text-xl font-bold">Quick Stats</h3>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Stat title="Focus" value="3D + Motion UI" />
              <Stat title="Stack" value="Next.js + R3F" />
              <Stat title="Strength" value="Clean Systems" />
              <Stat title="Goal" value="Internship / RA" />
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-sm text-white/75">
                Building right now:
              </p>
              <p className="mt-2 text-white/90 font-semibold">
                A cinematic 3D portfolio + scroll-driven storytelling sections.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href="#contact"
                className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02] active:scale-[0.98]"
              >
                Contact
              </a>
              <a
                href="https://www.linkedin.com"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <p className="text-xs text-white/60">{title}</p>
      <p className="mt-2 text-sm font-semibold text-white/90">{value}</p>
    </div>
  );
}
