"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const PRINCIPLES = [
  {
    num: "01",
    title: "Systems\nOver Features",
    body: "Architecture is decided before a single line of code. Features are a consequence of good design — not the other way around.",
  },
  {
    num: "02",
    title: "Explainability\nIs a Feature",
    body: "A model that can't explain its output isn't production-ready. Transparency is an engineering requirement, not a bonus.",
  },
  {
    num: "03",
    title: "Production\nor Nothing",
    body: "Two products live. Contracts deployed on Avalanche and Monad. Hackathons where the work actually ships. No demo-ware.",
  },
];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const STATS = [
  { display: "MS CS",  label: "Stevens Institute",       numeric: false },
  { display: "3",      label: "Blockchains shipped",     numeric: true,  to: 3  },
  { display: "NJ",     label: "Hoboken, New Jersey",     numeric: false },
  { display: "2027",   label: "Summer internship target", numeric: true,  to: 2027 },
];

export default function AboutSection() {
  return (
    <section id="about" style={{ borderTop: "1px solid #141414", paddingTop: "8rem", paddingBottom: "8rem" }} className="px-6 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <div className="mb-16">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: "#C9B89A" }}>
            03 — Engineering Philosophy
          </span>
        </div>

        {/* Manifesto heading */}
        <div className="mb-20 overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-condensed font-black leading-[0.88]"
            style={{
              fontSize: "clamp(4.5rem, 12vw, 11rem)",
              color: "#F5F5F2",
              letterSpacing: "-0.03em",
            }}
          >
            I don&apos;t<br />
            <span style={{ color: "#1E1E1E", WebkitTextStroke: "1px #2A2A2A" }}>prototype.</span>
            <br />I deploy.
          </motion.h2>
        </div>

        {/* Bio + stats */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 md:col-start-1 leading-relaxed"
            style={{ fontSize: "0.9rem", color: "#777" }}
          >
            Graduate student at Stevens Institute of Technology, finishing an MS in Computer Science.
            Building at the intersection of{" "}
            <span style={{ color: "#aaa" }}>AI, decentralized finance, and full-stack engineering</span>.
            Targeting Summer 2027 SWE, FinTech, AI, or Web3 roles where the team
            cares about what ships — not just what demos.
          </motion.p>

          {/* Stats */}
          <div className="md:col-span-6 md:col-start-7 grid grid-cols-4 gap-0" style={{ borderLeft: "1px solid #141414" }}>
            {STATS.map(({ display, label, numeric, to }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col justify-between px-4 py-5"
                style={{ borderRight: "1px solid #141414" }}
              >
                <span
                  className="font-condensed font-black leading-none block mb-3"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "#F5F5F2", letterSpacing: "-0.02em" }}
                >
                  {numeric && to ? <CountUp to={to} /> : display}
                </span>
                <span className="font-mono leading-tight block" style={{ fontSize: "8px", letterSpacing: "0.15em", color: "#555", textTransform: "uppercase" }}>
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Principles */}
        <div style={{ borderTop: "1px solid #141414" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ borderBottom: "1px solid #141414" }}>
            {PRINCIPLES.map(({ num, title, body }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="py-10 pr-8"
                style={{ borderRight: i < 2 ? "1px solid #141414" : "none", paddingLeft: i === 0 ? 0 : "2rem" }}
              >
                <span className="font-mono text-[9px] tracking-[0.3em] block mb-6" style={{ color: "#C9B89A" }}>
                  {num}
                </span>
                <h3
                  className="font-condensed font-black leading-tight mb-4 whitespace-pre-line"
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", color: "#F5F5F2", letterSpacing: "-0.02em" }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "#777", lineHeight: 1.7 }}>
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
