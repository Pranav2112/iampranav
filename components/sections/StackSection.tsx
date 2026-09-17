"use client";

import { motion } from "framer-motion";

const STACK = [
  {
    id: "lang",
    category: "Languages",
    num: "01",
    items: ["TypeScript", "Python", "Solidity", "SQL", "JavaScript"],
    note: "Primary",
  },
  {
    id: "frontend",
    category: "Frontend",
    num: "02",
    items: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "wagmi"],
    note: "UI Layer",
  },
  {
    id: "backend",
    category: "Backend / API",
    num: "03",
    items: ["FastAPI", "Node.js", "Express", "Prisma", "REST"],
    note: "Server",
  },
  {
    id: "ml",
    category: "Data / ML",
    num: "04",
    items: ["Pandas", "XGBoost", "Scikit-learn", "SHAP", "yfinance"],
    note: "Intelligence",
  },
  {
    id: "chain",
    category: "Blockchain",
    num: "05",
    items: ["Hardhat", "Foundry", "ethers.js", "Avalanche", "Monad"],
    note: "On-chain",
  },
  {
    id: "infra",
    category: "Infra / DB",
    num: "06",
    items: ["PostgreSQL", "Supabase", "Vercel", "Docker", "Git"],
    note: "Foundation",
  },
];

export default function StackSection() {
  return (
    <section id="stack" style={{ borderTop: "1px solid #141414", paddingTop: "8rem", paddingBottom: "8rem" }} className="px-6 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase block mb-16" style={{ color: "#C9B89A" }}>
            04 — Stack
          </span>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-20">
            <h2
              className="font-condensed font-black leading-none"
              style={{ fontSize: "clamp(4.5rem, 10vw, 9rem)", color: "#F5F5F2", letterSpacing: "-0.03em" }}
            >
              Tools I<br />
              <span style={{ color: "transparent", WebkitTextStroke: "1.5px #404040" }}>Ship With</span>
            </h2>
            <p className="font-mono leading-relaxed" style={{ fontSize: "9px", color: "#666", maxWidth: "26ch", letterSpacing: "0.08em", paddingBottom: "1rem" }}>
              Proven in production,
              <br />not just tutorials.
            </p>
          </div>
        </div>

        {/* Blueprint grid — 3 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ border: "1px solid #141414" }}>
          {STACK.map(({ id, category, num, items, note }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative group p-8"
              style={{
                borderRight: (i + 1) % 3 !== 0 ? "1px solid #141414" : "none",
                borderBottom: i < STACK.length - 3 ? "1px solid #141414" : "none",
              }}
            >
              {/* Category number — large watermark */}
              <span
                className="absolute font-condensed font-black select-none pointer-events-none leading-none"
                style={{ fontSize: "6rem", color: "rgba(255,255,255,0.025)", top: "0.5rem", right: "1rem", letterSpacing: "-0.05em" }}
              >
                {num}
              </span>

              {/* Header row */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase block mb-1" style={{ color: "#C9B89A" }}>
                    {num}
                  </span>
                  <h3 className="font-condensed font-bold" style={{ fontSize: "1.1rem", color: "#F5F5F2", letterSpacing: "-0.01em" }}>
                    {category}
                  </h3>
                </div>
                <span className="font-mono text-[8px] tracking-widest uppercase" style={{ color: "#555" }}>
                  {note}
                </span>
              </div>

              {/* Items */}
              <div className="flex flex-col gap-2">
                {items.map((item, j) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="font-mono text-[8px]" style={{ color: "#444" }}>
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-mono text-[11px] tracking-wide transition-colors duration-200 group-hover:text-[#888]"
                      style={{ color: "#666" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom rule on hover */}
              <div
                className="absolute bottom-0 left-0 h-px transition-all duration-500 group-hover:w-full"
                style={{ width: 0, background: "#C9B89A", opacity: 0.4 }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
