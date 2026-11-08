import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

import { Eyebrow } from "./sections";
import { Reveal } from "./motion";
import { EMPTY_IMAGE, RANDOM_IMAGE, FEMALE_AVATAR, fallbackAvatar, testimonialAvatars } from "@/lib/images";
import { cn } from "@/lib/utils";

/* [ADD TESTIMONIAL] Replace with real, approved client quotes. */
const TESTIMONIALS = [
  {
    quote:
      "Working with 4See Agency was seamless from start to finish. The custom AI chatbot they built for our e-commerce platform cut our support ticket volume in half almost overnight. The web application performance is ridiculously fast now too. Highly recommended team!",
    name: "Muhammad Osama",
    role: "Operations Director, RetailFlow",
  },
  {
    quote:
      "We needed to scale our cloud infrastructure on a tight budget while automating continuous deployment pipelines. 4See Agency's engineering team executed everything with zero downtime. Their technical communication, weekly updates, and problem-solving skills are top-notch.",
    name: "Khalid Hasan",
    role: "Head of Product, Ghouri Brothers",
    avatar: EMPTY_IMAGE, // Khalid: Empty / Fallback image
  },
  {
    quote:
      "I'm usually skeptical of tech agencies because of delivery delays, but 4See Agency hit every deadline precisely. Their Customer Experience Management (CEM) setup and user-tracking integration have become the operational backbone of our business.",
    name: "Hallen",
    role: "Founder, All-In-One Cafe",
    avatar: FEMALE_AVATAR, // Hallen: Random female profile image
  },
  {
    quote:
      "The web UI is super clean, the backend is rock-solid scalable, and their AI integration just works effortlessly. The team is incredibly supportive and even provided solid post-launch maintenance. We’ll definitely be working with 4See Agency long-term!",
    name: "Zainab A",
    role: "Founder, TechVibe",
    avatar: RANDOM_IMAGE, // Zainab: Random image
  }
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const count = TESTIMONIALS.length;

  const go = (next: number) => setIndex(((next % count) + count) % count);

  return (
    <section id="testimonials" className="border-y border-border bg-panel px-5 py-24">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <Eyebrow>Testimonials</Eyebrow>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">What clients say after launch</h2>
        </Reveal>

        <Reveal delay={90} className="mt-12">
          <div
            className="overflow-hidden rounded-2xl border border-border bg-background"
            onTouchStart={(event) => {
              touchStart.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              const start = touchStart.current;
              const end = event.changedTouches[0]?.clientX;
              if (start == null || end == null) return;
              if (Math.abs(end - start) > 48) go(index + (end < start ? 1 : -1));
              touchStart.current = null;
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-brand"
              style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
            >
              {TESTIMONIALS.map((item) => {
                // Determine image source based on item or map lookup
                const avatarSrc = item.avatar || (testimonialAvatars[item.name] ?? fallbackAvatar).src;
                const avatarAlt = (testimonialAvatars[item.name] ?? fallbackAvatar).alt || item.name;

                return (
                  <figure key={item.name + item.quote} className="w-full shrink-0 p-8 md:p-12">
                    <blockquote className="font-display text-2xl font-semibold leading-snug md:text-3xl">
                      “{item.quote}”
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-4">
                      <img
                        src={avatarSrc}
                        alt={avatarAlt}
                        width={200}
                        height={200}
                        loading="lazy"
                        decoding="async"
                        className="h-11 w-11 shrink-0 rounded-full border border-border object-cover"
                      />
                      <span>
                        <span className="block text-sm font-semibold">{item.name}</span>
                        <span className="block text-sm text-muted-foreground">{item.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => go(index - 1)}
              className="interactive flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-action hover:text-action"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((item, dot) => (
                <button
                  key={item.name + dot}
                  type="button"
                  aria-label={`Go to testimonial ${dot + 1}`}
                  aria-current={dot === index}
                  onClick={() => go(dot)}
                  className={cn(
                    "interactive h-2.5 rounded-full",
                    dot === index ? "w-7 bg-action" : "w-2.5 bg-border hover:bg-label",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => go(index + 1)}
              className="interactive flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-action hover:text-action"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}