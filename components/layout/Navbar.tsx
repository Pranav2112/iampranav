"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { label: "Work",    href: "#work"    },
  { label: "About",   href: "#about"   },
  { label: "Stack",   href: "#stack"   },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: scrolled ? "1px solid #1A1A1A" : "1px solid transparent",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          {/* Wordmark */}
          <a
            href="#"
            className="font-condensed font-bold tracking-tight transition-colors duration-200"
            style={{ fontSize: "1.15rem", color: "#F5F5F2" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#C9B89A")}
            onMouseLeave={e => (e.currentTarget.style.color = "#F5F5F2")}
          >
            PA<span style={{ color: "#C9B89A" }}>.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="font-mono text-[10px] tracking-[0.14em] uppercase hover-line"
                style={{ color: "#666666" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F5F5F2")}
                onMouseLeave={e => (e.currentTarget.style.color = "#666666")}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="mailto:pranavauti2003@gmail.com" className="btn-primary" style={{ fontSize: "9px" }}>
              Hire me
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden font-mono text-[10px] tracking-[0.14em] uppercase"
            style={{ color: "#666666" }}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col justify-center px-8 gap-10"
            style={{ background: "#0A0A0A" }}
          >
            {NAV.map(({ label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-condensed font-bold leading-none pb-8"
                style={{
                  fontSize: "clamp(3rem, 12vw, 5rem)",
                  color: "#F5F5F2",
                  borderBottom: "1px solid #1A1A1A",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#C9B89A")}
                onMouseLeave={e => (e.currentTarget.style.color = "#F5F5F2")}
              >
                {label}
              </motion.a>
            ))}
            <div className="flex gap-3 mt-4">
              <a href="mailto:pranavauti2003@gmail.com" className="btn-primary">Hire me</a>
              <a href="https://github.com/Pranav2112" target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub ↗</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
