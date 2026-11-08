import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "./motion";

/** Custom easing cursor, desktop/pointer-fine only. */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-none-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button",
      );
      const cursorLabel = target?.dataset["cursor"];
      if (target) {
        setActive(true);
        setLabel(cursorLabel && cursorLabel !== "true" ? cursorLabel : null);
      } else {
        setActive(false);
        setLabel(null);
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      frame = window.requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frame = window.requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(frame);
      document.documentElement.classList.remove("cursor-none-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-action transition-opacity duration-200"
        style={{ opacity: active ? 0 : 1 }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-action text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-action transition-[width,height,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          width: active ? (label ? 68 : 44) : 28,
          height: active ? (label ? 68 : 44) : 28,
          backgroundColor: active ? "color-mix(in oklab, var(--action) 14%, transparent)" : "transparent",
        }}
      >
        {label}
      </div>
    </div>
  );
}