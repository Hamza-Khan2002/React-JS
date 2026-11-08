import { cn } from "@/lib/utils";

/**
 * Seamless infinite marquee.
 *
 * Two identical groups sit side by side and the track slides by exactly one group (-50%).
 * Each group repeats `items` enough times to be wider than any screen; with only one short
 * copy, the right side went blank before the loop restarted (ends at "Python", then jumps).
 * The spacing is padding-right on each group (not flex gap) so -50% lands exactly on the seam.
 * Duration scales with the group length so the scroll speed stays the same.
 */
export function Marquee({
  items,
  className,
  repeat = 4,
  secondsPerItem = 4.75,
}: {
  items: string[];
  className?: string;
  repeat?: number;
  secondsPerItem?: number;
}) {
  const group = Array.from({ length: repeat }, () => items).flat();
  return (
    <div className={cn("group relative overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${group.length * secondsPerItem}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-3 pr-3">
            {group.map((item, index) => (
              <span
                key={`${copy}-${item}-${index}`}
                className="interactive rounded-full border border-border bg-panel px-4 py-2 text-sm text-muted-foreground hover:border-label hover:text-label"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
