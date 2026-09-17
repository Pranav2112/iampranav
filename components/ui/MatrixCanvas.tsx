"use client";

import { useEffect, useRef } from "react";

/* Character pool — code symbols, math glyphs, script samples */
const POOL = [
  // Code
  "{", "}", "[", "]", "(", ")", "=>", "//", "/*", "*/", "|", "+", "=",
  // Hex / binary
  "0", "1", "A", "B", "C", "D", "E", "F",
  // Math
  "∑", "∫", "∂", "π", "λ", "∞", "≈", "∆", "Ω",
  // Script glyphs — Hindi, Japanese, Russian, Korean (individual chars, not full words)
  "प", "ण", "व", "औ", "ट", "ना",
  "プ", "ラ", "ナ", "ブ", "ア", "ウ", "テ",
  "П", "р", "А", "н", "В", "у",
  "프", "라", "나", "브",
  // Numbers
  "2", "3", "4", "5", "6", "7", "8", "9",
  // Misc
  "#", "@", "!", "?", "~", "%", "^", "&",
];

function rand(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface Stream {
  x: number;
  y: number;
  chars: string[];
  speed: number;
  sineAmp: number;    // horizontal sine amplitude (snake wiggle)
  sineFreq: number;
  sinePhase: number;
  headOpacity: number;
  tailOpacity: number;
}

const COL = 20;        // column width (px)
const TRAIL = 18;      // chars per stream
const FONT_SIZE = 11;  // px

export default function MatrixCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let t = 0;
    let streams: Stream[] = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildStreams();
    }

    function buildStreams() {
      streams = [];
      const cols = Math.ceil(canvas.width / COL);

      /* Vertical streams — ~35% density */
      for (let i = 0; i < cols; i++) {
        if (Math.random() > 0.35) continue;
        streams.push({
          x: i * COL,
          y: -Math.random() * canvas.height * 1.8,
          chars: Array.from({ length: TRAIL }, () => rand(POOL)),
          speed: 0.35 + Math.random() * 0.6,
          sineAmp: Math.random() * 6,         // subtle wiggle
          sineFreq: 0.3 + Math.random() * 0.5,
          sinePhase: Math.random() * Math.PI * 2,
          headOpacity: 0.055 + Math.random() * 0.025,
          tailOpacity: 0.018 + Math.random() * 0.012,
        });
      }

      /* Diagonal streams — ~15 extra, steeper angle */
      for (let i = 0; i < Math.ceil(cols * 0.15); i++) {
        streams.push({
          x: Math.random() * canvas.width * 1.2 - canvas.width * 0.1,
          y: -Math.random() * canvas.height,
          chars: Array.from({ length: 10 }, () => rand(POOL)),
          speed: 0.25 + Math.random() * 0.4,
          sineAmp: 3 + Math.random() * 8,     // more snaky
          sineFreq: 0.5 + Math.random() * 0.8,
          sinePhase: Math.random() * Math.PI * 2,
          headOpacity: 0.04,
          tailOpacity: 0.012,
        });
      }
    }

    function draw() {
      t += 0.012;

      /* Fade overlay — lower = longer trails, more visible characters */
      ctx.fillStyle = "rgba(10,10,10,0.055)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px "Courier New", monospace`;
      ctx.textAlign = "left";

      for (const s of streams) {
        s.y += s.speed;

        /* Sine-wave horizontal offset — this is the "snake" */
        const sineX = Math.sin(t * s.sineFreq + s.sinePhase) * s.sineAmp;

        /* Reset when fully off-screen */
        if (s.y - TRAIL * COL > canvas.height) {
          s.y = -TRAIL * COL;
          s.x = Math.floor(Math.random() * (canvas.width / COL)) * COL;
        }

        for (let j = 0; j < s.chars.length; j++) {
          const cy = s.y - j * COL;
          if (cy < -COL || cy > canvas.height + COL) continue;

          const isHead = j === 0;
          const fade = Math.pow(1 - j / s.chars.length, 1.6);

          if (isHead) {
            /* Stone head */
            ctx.fillStyle = `rgba(201,184,154,${s.headOpacity * 1.6})`;
          } else {
            /* White trail fading out */
            ctx.fillStyle = `rgba(245,245,242,${fade * s.tailOpacity * 1.5})`;
          }

          ctx.fillText(s.chars[j], s.x + sineX, cy);

          /* Slowly mutate characters */
          if (Math.random() < 0.004) {
            s.chars[j] = rand(POOL);
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 pointer-events-none select-none"
      aria-hidden
      style={{ zIndex: 0 }}
    />
  );
}
