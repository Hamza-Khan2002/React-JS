import { useEffect, useState } from "react";

import { LogoMark } from "./logo";
import { useReducedMotion } from "./motion";
import { cn } from "@/lib/utils";

/** Signature blink loader built from the actual logo mark. Under 1.5s total. */
export function EyeLoader() {
  const reduced = useReducedMotion();
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const hold = reduced ? 120 : 1000;
    const a = window.setTimeout(() => setFading(true), hold);
    const b = window.setTimeout(() => setDone(true), hold + 380);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [reduced]);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        fading ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <LogoMark
        className={cn("h-20 w-20 origin-center", !reduced && "animate-blink")}
      />
    </div>
  );
}