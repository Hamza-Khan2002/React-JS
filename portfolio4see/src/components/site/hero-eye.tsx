import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Animated "4See" eye illustration for the hero.
 * The pupil gently tracks the cursor. Reduced-motion users get a static eye.
 */
export function HeroEye({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const max = 14; // max pupil travel in px (viewBox units)
      const k = Math.min(max, dist * 0.04);
      setOffset({ x: (dx / dist) * k, y: (dy / dist) * k });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <svg viewBox="0 0 400 400" className="w-full h-full" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="irisGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b6dff" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <radialGradient id="pupilGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#8df4ff" />
            <stop offset="55%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0c9fbf" />
          </radialGradient>
          <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* outer almond outline */}
        <path
          d="M20,200 C110,80 290,80 380,200 C290,320 110,320 20,200 Z"
          fill="none"
          stroke="url(#irisGrad)"
          strokeWidth="2.5"
          opacity="0.55"
        />

        {/* orbit ring */}
        <circle cx="200" cy="200" r="150" fill="none" stroke="#1b2338" strokeWidth="1" />
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="url(#irisGrad)"
          strokeWidth="1.4"
          strokeDasharray="4 10"
          opacity="0.5"
          style={reduced ? undefined : { transformOrigin: "200px 200px", animation: "spin 26s linear infinite" }}
        />

        {/* pupil group — tracks cursor */}
        <g style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, transition: "transform 120ms ease-out" }}>
          <circle cx="200" cy="200" r="86" fill="#0c1120" stroke="url(#irisGrad)" strokeWidth="2" />
          <circle cx="200" cy="200" r="60" fill="url(#irisGrad)" opacity="0.16" />
          <circle cx="200" cy="200" r="34" fill="url(#pupilGrad)" filter="url(#softGlow)" />
          <circle cx="188" cy="188" r="7" fill="#ffffff" opacity="0.85" />
        </g>

        {/* signal nodes */}
        {[
          [60, 90],
          [340, 100],
          [55, 320],
          [345, 310],
          [200, 40],
        ].map(([x, y], i) => (
          <g key={i} opacity="0.6">
            <line x1={x} y1={y} x2="200" y2="200" stroke="#243055" strokeWidth="1" />
            <circle cx={x} cy={y} r="4" fill="#22d3ee" />
          </g>
        ))}
      </svg>
    </div>
  );
}
