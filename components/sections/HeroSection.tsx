"use client";

import { motion } from "framer-motion";

const SCRIPTS = [
  { text: "प्रणव औटी",        lang: "Hindi",    color: "#C9B89A", size: "1.4rem",  weight: 700 },
  { text: "برانف أوتي",        lang: "Arabic",   color: "#A0A0A0", size: "1.15rem", weight: 400 },
  { text: "プラナブ・アウティ",  lang: "Japanese", color: "#888888", size: "1.0rem",  weight: 400 },
  { text: "Пранав Аути",       lang: "Russian",  color: "#737373", size: "0.9rem",  weight: 400 },
  { text: "프라나브 아우티",    lang: "Korean",   color: "#636363", size: "0.82rem", weight: 400 },
  { text: "Πράναβ Αούτι",      lang: "Greek",    color: "#565656", size: "0.75rem", weight: 400 },
];

function Portrait() {
  return (
    <div className="absolute inset-0" style={{ background: "#0A0A0A", overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/portfolio_portrait_crop.jpg"
        alt="Pranav Auti"
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          objectPosition: "center 15%",
          opacity: 0.92,
        }}
      />
      <div className="absolute bottom-0 left-0 right-0"
        style={{ height: "20%", background: "linear-gradient(to top, #0A0A0A 0%, transparent 100%)" }} />
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r" style={{ borderColor: "rgba(201,184,154,0.7)" }} />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l" style={{ borderColor: "rgba(201,184,154,0.7)" }} />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden"
      style={{ height: "100svh", minHeight: 600, background: "#0A0A0A" }}>

      {/* Portrait panel */}
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0"
        style={{ width: "42vw", bottom: 56, zIndex: 1 }}>
        <Portrait />
      </motion.div>

      {/* Vertical divider */}
      <motion.div
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.0, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="absolute origin-top hidden md:block"
        style={{ left: "42.5vw", top: "6vh", bottom: 70, width: 1, background: "#2A2A2A", zIndex: 2 }} />

      {/* Scripts column */}
      <div className="absolute hidden md:flex flex-col"
        style={{ left: "46vw", top: "13vh", gap: "1.4rem", zIndex: 2, paddingLeft: "2rem", borderLeft: "1px solid #222" }}>
        {SCRIPTS.map((s, i) => (
          <motion.div key={s.lang}
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <p className="font-display leading-none"
              style={{ fontSize: s.size, color: s.color, fontWeight: s.weight, direction: "ltr", unicodeBidi: "plaintext" }}>
              {s.text}
            </p>
            <p className="font-mono mt-[5px]"
              style={{ fontSize: "7px", letterSpacing: "0.22em", color: "#666", textTransform: "uppercase" }}>
              {s.lang}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Rotated label */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute hidden lg:flex items-center"
        style={{ right: 18, top: "50%", transform: "translateY(-50%) rotate(90deg)", zIndex: 2 }}>
        <span className="font-mono whitespace-nowrap"
          style={{ fontSize: "7px", letterSpacing: "0.4em", color: "#C9B89A", textTransform: "uppercase" }}>
          Engineer · Builder · Systems
        </span>
      </motion.div>

      {/* PRANAV */}
      <div className="absolute overflow-hidden" style={{ left: "28vw", bottom: "calc(15vh + 56px)", zIndex: 3 }}>
        <motion.h1
          initial={{ y: "108%" }} animate={{ y: "0%" }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
          className="font-condensed leading-none"
          style={{ fontSize: "clamp(4rem, 11.5vw, 13rem)", fontWeight: 900, color: "#F5F5F2", letterSpacing: "-0.015em" }}>
          PRANAV
        </motion.h1>
      </div>

      {/* AUTI */}
      <div className="absolute overflow-hidden" style={{ left: "51vw", bottom: "calc(7vh + 56px)", zIndex: 3 }}>
        <motion.span
          initial={{ y: "108%" }} animate={{ y: "0%" }}
          transition={{ delay: 0.54, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-condensed leading-none"
          style={{ fontSize: "clamp(2rem, 4.5vw, 5.5rem)", fontWeight: 300, color: "#606060", letterSpacing: "0.09em" }}>
          AUTI
        </motion.span>
      </div>

      {/* Status bar separator */}
      <div className="absolute left-0 right-0" style={{ bottom: 56, borderTop: "1px solid #222", zIndex: 2 }} />

      {/* Status bar */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.9 }}
        className="absolute left-0 right-0 bottom-0 flex items-center justify-between px-6 md:px-10"
        style={{ height: 56, zIndex: 4 }}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="dot-live" />
            <span className="font-mono" style={{ fontSize: "9px", letterSpacing: "0.15em", color: "#999", textTransform: "uppercase" }}>
              Available · Summer 2027
            </span>
          </div>
          <span className="font-mono hidden md:block"
            style={{ fontSize: "9px", letterSpacing: "0.15em", color: "#777", textTransform: "uppercase" }}>
            MS Computer Science
          </span>
          <span className="font-mono hidden lg:block"
            style={{ fontSize: "9px", letterSpacing: "0.15em", color: "#666", textTransform: "uppercase" }}>
            Stevens Institute · Hoboken NJ
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#work" className="btn-primary" style={{ fontSize: "9px" }}>View Work</a>
          <a href="https://github.com/Pranav2112" target="_blank" rel="noopener noreferrer"
            className="btn-secondary hidden md:inline-flex" style={{ fontSize: "9px" }}>
            GitHub ↗
          </a>
        </div>
      </motion.div>

      {/* Mobile scripts grid */}
      <div className="md:hidden absolute left-0 right-0 grid grid-cols-2 gap-x-6 gap-y-4 px-6"
        style={{ top: "46vw", zIndex: 2 }}>
        {SCRIPTS.slice(0, 4).map((s, i) => (
          <motion.div key={s.lang}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.08, duration: 0.7 }}>
            <p className="font-display leading-tight"
              style={{ fontSize: "0.95rem", color: s.color, unicodeBidi: "plaintext" as React.CSSProperties["unicodeBidi"] }}>
              {s.text}
            </p>
            <p className="font-mono mt-1"
              style={{ fontSize: "7px", letterSpacing: "0.2em", color: "#666", textTransform: "uppercase" }}>
              {s.lang}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
