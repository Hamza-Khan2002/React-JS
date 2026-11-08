import { useEffect, useRef, useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

/**
 * Ambient smoke/fog backdrop — CSS-only transform animations (no JS per-frame
 * work). Animations pause via Intersection Observer when scrolled out of view,
 * and mobile falls back to a single static, lightly blurred wash.
 */
export function Smoke({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setVisible(entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("smoke-field", !visible && "smoke-paused", className)}
    >
      {isMobile ? (
        <span className="smoke-blob smoke-blob-static" />
      ) : (
        <>
          <span className="smoke-blob smoke-blob-1" />
          <span className="smoke-blob smoke-blob-2" />
        </>
      )}
    </div>
  );
}
