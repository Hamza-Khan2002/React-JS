import markDark from "@/assets/mark-dark.png";
import markLight from "@/assets/mark-light.png";
import { cn } from "@/lib/utils";

/**
 * The single source of truth for the 4See eye mark.
 * Never introduce a second, differently-styled eye graphic anywhere on the site.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-block shrink-0", className)}>
      <img
        src={markLight}
        alt=""
        aria-hidden="true"
        className="h-full w-full object-contain dark:hidden"
      />
      <img
        src={markDark}
        alt=""
        aria-hidden="true"
        className="hidden h-full w-full object-contain dark:block"
      />
    </span>
  );
}

export function Logo({ className, showTagline = false }: { className?: string; showTagline?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-8 w-8" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-tight">4See</span>
        {showTagline ? (
          <span className="mt-1 text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
            See beyond. Build better.
          </span>
        ) : null}
      </span>
    </span>
  );
}
