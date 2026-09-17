"use client";

import { motion } from "framer-motion";

const LINKS = [
  { label: "Email",    value: "pranavauti2003@gmail.com",   href: "mailto:pranavauti2003@gmail.com"      },
  { label: "GitHub",   value: "github.com/Pranav2112",      href: "https://github.com/Pranav2112"        },
  { label: "LinkedIn", value: "linkedin.com/in/pranavauti", href: "https://linkedin.com/in/pranavauti"   },
];

export default function ContactSection() {
  return (
    <section id="contact" style={{ borderTop: "1px solid #141414", paddingTop: "8rem", paddingBottom: "8rem" }} className="px-6 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase block mb-16" style={{ color: "#C9B89A" }}>
          05 — Contact
        </span>

        {/* Oversized CTA heading */}
        <div className="overflow-hidden mb-12">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-condensed font-black leading-[0.88]"
            style={{ fontSize: "clamp(4.5rem, 12vw, 11rem)", color: "#F5F5F2", letterSpacing: "-0.03em" }}
          >
            Let&apos;s build<br />
            <span style={{ color: "transparent", WebkitTextStroke: "1.5px #404040" }}>something.</span>
          </motion.h2>
        </div>

        {/* Body + links grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0 items-start">

          {/* Left: copy */}
          <div className="md:col-span-4">
            <p className="leading-relaxed mb-10" style={{ fontSize: "0.9rem", color: "#777", maxWidth: "34ch" }}>
              Targeting Summer 2027 internships in SWE, FinTech, AI, or Web3.
              Open to research collaborations. Fast reply.
            </p>
            <a href="mailto:pranavauti2003@gmail.com" className="btn-primary" style={{ fontSize: "11px" }}>
              Send a message ↗
            </a>
          </div>

          {/* Right: link list */}
          <div className="md:col-span-7 md:col-start-6" style={{ borderTop: "1px solid #141414" }}>
            {LINKS.map(({ label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center justify-between py-6 transition-colors"
                style={{ borderBottom: "1px solid #141414" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = "#2A2A2A")}
                onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "#141414")}
              >
                <div className="flex items-center gap-8">
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase w-16" style={{ color: "#444" }}>
                    {label}
                  </span>
                  <span
                    className="transition-colors duration-200"
                    style={{ fontSize: "0.95rem", color: "#666", fontFamily: "var(--font-geist-mono)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F2")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                  >
                    {value}
                  </span>
                </div>
                <span
                  className="font-mono text-[12px] opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0"
                  style={{ color: "#C9B89A" }}
                >
                  ↗
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer strip */}
        <div className="flex items-center justify-between mt-24 pt-8" style={{ borderTop: "1px solid #141414" }}>
          <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: "#444" }}>
            Pranav Ramchandra Auti © 2026
          </span>
          <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: "#444" }}>
            Stevens Institute · Hoboken NJ
          </span>
        </div>

      </div>
    </section>
  );
}
