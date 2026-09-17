"use client";

import { useEffect, useRef } from "react";

export function useMouse() {
  const ref = useRef({
    x: 0, // normalized -1..1
    y: 0, // normalized -1..1
    px: 0, // pixels
    py: 0, // pixels
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;

      ref.current.x = nx;
      ref.current.y = ny;
      ref.current.px = e.clientX;
      ref.current.py = e.clientY;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return ref;
}
