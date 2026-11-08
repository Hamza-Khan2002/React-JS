import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(true);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    return () => clearTimeout(transitionTimeout.current);
  }, []);

  const toggle = () => {
    const next = !dark;
    const root = document.documentElement;

    const applyTheme = () => {
      setDark(next);
      root.classList.toggle("dark", next);
      try {
        window.localStorage.setItem("foursee-theme", next ? "dark" : "light");
      } catch {
        /* storage unavailable */
      }
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Prefer the native View Transitions API: it cross-fades a single
    // snapshot of the whole page on the compositor, which is far smoother
    // than animating every element's colors individually.
    if (!reducedMotion && typeof document.startViewTransition === "function") {
      document.startViewTransition(applyTheme);
      return;
    }

    // Fallback: briefly fade colors across the whole page instead of an
    // instant cut.
    root.classList.add("theme-changing");
    clearTimeout(transitionTimeout.current);
    transitionTimeout.current = setTimeout(() => {
      root.classList.remove("theme-changing");
    }, 500);

    applyTheme();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      data-cursor="true"
      className="interactive flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-label hover:text-label"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
