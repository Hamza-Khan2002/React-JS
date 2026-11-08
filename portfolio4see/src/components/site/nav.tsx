import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "Team", href: "#team" },
  { label: "Work", href: "#work" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border bg-panel transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled && "bg-panel/95 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" aria-label="4See home" data-cursor="true" className="interactive hover:opacity-80">
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-cursor="true"
              className="interactive rounded-full px-3.5 py-2 text-sm text-muted-foreground hover:bg-panel hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Single site-wide CTA label */}
          <Button asChild variant="action" size="lg" className="hidden md:inline-flex">
            <a href="#contact" data-cursor="Let's talk">
              Start a Project
            </a>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="interactive flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background px-5 pb-5 pt-2 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="interactive rounded-lg px-2 py-3 text-base text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button asChild variant="action" size="xl" className="mt-3 w-full">
            <a href="#contact" onClick={() => setOpen(false)}>
              Start a Project
            </a>
          </Button>
        </div>
      ) : null}
    </header>
  );
}