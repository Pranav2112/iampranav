// "use client";

// import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
// import { useEffect, useRef } from "react";
// import HeroCanvas from "@/components/HeroCanvas";
// import { useMouse } from "@/lib/useMouse";

// function MagneticButton({
//   children,
//   href,
//   variant = "primary",
// }: {
//   children: React.ReactNode;
//   href: string;
//   variant?: "primary" | "secondary";
// }) {
//   const ref = useRef<HTMLAnchorElement | null>(null);
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);

//   const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.6 });
//   const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.6 });

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const onMove = (e: MouseEvent) => {
//       const r = el.getBoundingClientRect();
//       const dx = e.clientX - (r.left + r.width / 2);
//       const dy = e.clientY - (r.top + r.height / 2);

//       x.set(dx * 0.18);
//       y.set(dy * 0.18);
//     };

//     const onLeave = () => {
//       x.set(0);
//       y.set(0);
//     };

//     el.addEventListener("mousemove", onMove);
//     el.addEventListener("mouseleave", onLeave);
//     return () => {
//       el.removeEventListener("mousemove", onMove);
//       el.removeEventListener("mouseleave", onLeave);
//     };
//   }, [x, y]);

//   const base =
//     "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition will-change-transform select-none";
//   const styles =
//     variant === "primary"
//       ? "bg-white text-black shadow-lg shadow-white/10 hover:scale-[1.02] active:scale-[0.98]"
//       : "border border-white/15 bg-white/5 text-white/90 backdrop-blur hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]";

//   return (
//     <motion.a
//       ref={ref}
//       href={href}
//       style={{ x: sx, y: sy }}
//       className={`${base} ${styles}`}
//     >
//       {children}
//     </motion.a>
//   );
// }

// export default function Hero() {
//   const mouse = useMouse();

//   // Motion values for parallax layers
//   const mx = useMotionValue(0);
//   const my = useMotionValue(0);

//   const pmx = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.7 });
//   const pmy = useSpring(my, { stiffness: 120, damping: 22, mass: 0.7 });

//   // Map normalized mouse to pixels (parallax)
//   const layer1X = useTransform(pmx, [-1, 1], [-18, 18]);
//   const layer1Y = useTransform(pmy, [-1, 1], [-12, 12]);

//   const layer2X = useTransform(pmx, [-1, 1], [-40, 40]);
//   const layer2Y = useTransform(pmy, [-1, 1], [-28, 28]);

//   // Typography morph on mouse
//   const titleSkew = useTransform(pmx, [-1, 1], [-10, 10]);
//   const titleScale = useTransform(pmy, [-1, 1], [1.06, 0.98]);
//   const subtitleOpacity = useTransform(pmy, [-1, 1], [0.92, 0.72]);

//   useEffect(() => {
//     let raf = 0;
//     const tick = () => {
//       mx.set(mouse.current.x);
//       my.set(mouse.current.y);
//       raf = requestAnimationFrame(tick);
//     };
//     raf = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(raf);
//   }, [mouse, mx, my]);

//   return (
//     <section className="relative h-screen w-full overflow-hidden">
//       {/* 3D background */}
//       <HeroCanvas />

//       {/* Parallax glow layers */}
//       <motion.div className="pointer-events-none absolute inset-0" style={{ x: layer2X, y: layer2Y }}>
//         <div
//           className="absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(124,124,255,0.22), transparent 60%)",
//           }}
//         />
//       </motion.div>

//       <motion.div className="pointer-events-none absolute inset-0" style={{ x: layer1X, y: layer1Y }}>
//         <div
//           className="absolute left-1/3 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(0,229,255,0.14), transparent 62%)",
//           }}
//         />
//       </motion.div>

//       {/* Film grain + vignette */}
//       <div className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22180%22 height=%22180%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22180%22 height=%22180%22 filter=%22url(%23n)%22 opacity=%22.35%22/%3E%3C/svg%3E')]" />
//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0b14]/25 via-transparent to-black/85" />

//       {/* Content */}
//       <div className="relative z-10 flex h-full items-center justify-center px-4">
//         <div className="max-w-4xl text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 14 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.9 }}
//             className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur"
//           >
//             <span className="h-2 w-2 rounded-full bg-white/60" />
//             Stevens Institute of Technology • Spring 2026
//           </motion.div>

//           {/* Kinetic title */}
//           <motion.h1
//             initial={{ opacity: 0, y: 36 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.0, delay: 0.08 }}
//             style={{ skewX: titleSkew, scale: titleScale }}
//             className="text-5xl md:text-8xl font-black tracking-tight leading-[0.95] will-change-transform"
//           >
//             <span
//               className="bg-clip-text text-transparent"
//               style={{
//                 backgroundImage:
//                   "linear-gradient(90deg, rgba(255,255,255,0.98), rgba(124,124,255,0.90), rgba(0,229,255,0.75))",
//               }}
//             >
//               Pranav
//             </span>{" "}
//             <span className="text-white/90">Auti</span>
//           </motion.h1>

//           {/* Subtitle that breathes with mouse */}
//           <motion.p
//             initial={{ opacity: 0, y: 18 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.0, delay: 0.22 }}
//             style={{ opacity: subtitleOpacity }}
//             className="mx-auto mt-6 max-w-2xl text-base md:text-xl text-white/75"
//           >
//             I build cinematic web experiences and intelligent systems — focused
//             on speed, clarity, and that “damn” factor.
//           </motion.p>

//           {/* CTA with magnetic effect */}
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.0, delay: 0.35 }}
//             className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
//           >
//             <MagneticButton href="#projects" variant="primary">
//               View Projects
//             </MagneticButton>

//             <MagneticButton href="/resume.pdf" variant="secondary">
//               Download Resume
//             </MagneticButton>
//           </motion.div>

//           {/* Micro hint */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.0, duration: 0.8 }}
//             className="mt-10 text-xs text-white/45"
//           >
//             Move your mouse — everything reacts.
//           </motion.div>
//         </div>
//       </div>

//       <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
//     </section>
//   );
// }




"use client";

import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCanvas from "@/components/HeroCanvas";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const glow1Ref = useRef<HTMLDivElement | null>(null);
  const glow2Ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pin the whole hero while scrolling
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=160%",
        pin: true,
        scrub: true,
      });

      // Timeline for text + UI cinematic morph
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=160%",
          scrub: true,
        },
      });

      tl.to(badgeRef.current, { opacity: 0, y: -10 }, 0.05)
        .to(
          titleRef.current,
          {
            scale: 0.72,
            y: -90,
            letterSpacing: "0.06em",
            filter: "blur(0px)",
          },
          0.05
        )
        .to(
          subtitleRef.current,
          {
            opacity: 0,
            y: -10,
            filter: "blur(6px)",
          },
          0.10
        )
        .to(
          ctaRef.current,
          {
            opacity: 0,
            y: 18,
            filter: "blur(6px)",
          },
          0.12
        )
        .to(
          glow1Ref.current,
          { x: 120, y: -80, opacity: 0.85 },
          0
        )
        .to(
          glow2Ref.current,
          { x: -140, y: 110, opacity: 0.9 },
          0
        );

      // Parallax on scroll (extra depth)
      gsap.to(".hero-parallax", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=160%",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* 3D background */}
      <HeroCanvas />

      {/* Glows (move on scroll) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          ref={glow1Ref}
          className="hero-parallax absolute left-1/2 top-1/2 h-[780px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-80"
          style={{
            background:
              "radial-gradient(circle, rgba(124,124,255,0.24), transparent 60%)",
          }}
        />
        <div
          ref={glow2Ref}
          className="hero-parallax absolute left-1/3 top-1/3 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-80"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,255,0.14), transparent 62%)",
          }}
        />
      </div>

      {/* Grain + vignette */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22180%22 height=%22180%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22180%22 height=%22180%22 filter=%22url(%23n)%22 opacity=%22.35%22/%3E%3C/svg%3E')]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0b14]/20 via-transparent to-black/85" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-4xl text-center">
          <motion.div
            ref={badgeRef}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-white/60" />
            Stevens Institute of Technology • Spring 2026
          </motion.div>

          <h1
            ref={titleRef}
            className="text-5xl md:text-8xl font-black tracking-tight leading-[0.95] will-change-transform"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255,255,255,0.98), rgba(124,124,255,0.90), rgba(0,229,255,0.75))",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Pranav Auti
          </h1>

          <p
            ref={subtitleRef}
            className="mx-auto mt-6 max-w-2xl text-base md:text-xl text-white/75"
          >
            I build cinematic web experiences and intelligent systems — focused
            on speed, clarity, and that “damn” factor.
          </p>

          <div
            ref={ctaRef}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#projects"
              data-cursor="pointer"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:scale-[1.02] active:scale-[0.98]"
            >
              View Projects
            </a>

            <a
              href="/resume.pdf"
              data-cursor="pointer"
              className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              Download Resume
            </a>
          </div>

          <div className="mt-10 text-xs text-white/45">
            Scroll — hero transforms. Move mouse — orb reacts.
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
