import {
  ArrowRight,
  Bot,
  Cloud,
  Compass,
  Hammer,
  LayoutGrid,
  LifeBuoy,
  Rocket,
  Smartphone,
  Workflow,
  Zap,
} from "lucide-react";

import { HeroEye } from "./hero-eye";
import { LogoMark } from "./logo";
import { Marquee } from "./marquee";
import { Reveal } from "./motion";
import { Smoke } from "./smoke";
import { CountUp } from "./count-up";
import { WORK_TAB_EVENT, type WorkCategoryName } from "./work-shared";
import { Button } from "@/components/ui/button";
import { teamPhotos } from "@/lib/images";
import { cn } from "@/lib/utils";

const EMAIL = "connect4see@gmail.com";
const SUBJECT = "Inquiry from 4See Portfolio";
const BODY = "Hi 4See team,\n\nI'd like to talk about...";

export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-label",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-label" />
      {children}
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden px-5 pb-20 pt-32 md:pb-28 md:pt-40">
      {/* Ambient CSS smoke field — theme-aware, no images, no JS */}
      <Smoke className="-z-10" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <Eyebrow>AI agents · automation · products</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 text-5xl font-bold leading-[0.95] md:text-7xl">
              See beyond.
              <br />
              Build better.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              4See is a four-person studio shipping AI agents, automations and full-stack
              products for teams that need working software, not decks.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild variant="action" size="xl">
                <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`} data-cursor="Let's talk" target="_blank" rel="noopener noreferrer">
                  Start a Project
                </a>
              </Button>
              <Button asChild variant="outlineAction" size="xl">
                <a href="#work" data-cursor="View">
                  See our work
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="justify-self-center">
          {/* Hero illustration = animated tracking eye. Transparent — no panel. */}
          <HeroEye className="h-64 w-64 md:h-80 md:w-80" />
        </Reveal>
      </div>

      <Reveal delay={280} className="mx-auto mt-16 max-w-6xl">
        <p className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Stack we build on
        </p>
        <Marquee
          items={[
            ".Net",
            "React",
            "Node.js",
            "Html",
            "CSS",
            "Next.js",
            "C#",
            "Python",
          ]}
        />
      </Reveal>
    </section>
  );
}

/* [EDIT ME] Client-facing trust metrics — replace with real numbers before launch. */
const STATS = [
  { value: 40, suffix: "+", decimals: 0, label: "Projects delivered" },
  { value: 3, suffix: " wks", decimals: 0, label: "Average delivery time" },
  { value: 96, suffix: "%", decimals: 0, label: "Client retention" },
  { value: 99.9, suffix: "%", decimals: 1, label: "Uptime on hosted systems" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-panel px-5 py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        {STATS.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 90}>
            <p className="font-display text-4xl font-bold md:text-5xl">
              <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/*
 * TEAM PHOTOS: put each member's photo in src/assets/team/ using the `photo` name below
 * (sulaiman, hanzalah, hamza, samaan) with .jpg / .jpeg / .png / .webp — e.g. src/assets/team/hamza.jpg.
 * Square-ish, face in the upper half, ~800x800 is ideal. If a file is missing, the old demo photo shows.
 */
const TEAM = [
  { name: "Muhammad Sulaiman", role: "AI Agents Developer and Automation", photo: "sulaiman" },
  { name: "Hanzalah", role: "Cloud Data Engineer", photo: "hanzalah" },
  { name: "Muhammad Hamza Khan", role: ".Net Full-Stack Developer", photo: "hamza" },
  { name: "Samaan Osama", role: "UI/UX Designer and Project Manager", photo: "samaan" },
];

const localTeamPhotos = import.meta.glob("../../assets/team/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const localPhotoFor = (slug: string) =>
  Object.entries(localTeamPhotos).find(
    ([path]) => path.split("/").pop()?.replace(/\.[^.]+$/, "") === slug,
  )?.[1];

export function Team() {
  return (
    <section id="team" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>Who's watching</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-4xl font-bold md:text-5xl">
            Four people. No handoffs, no account managers.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((person, index) => (
            <Reveal key={person.name} delay={index * 90}>
              <article
                data-cursor="true"
                className="interactive group h-full overflow-hidden rounded-2xl border border-border bg-panel hover:-translate-y-1 hover:border-label"
              >
                {/* Real photo from src/assets/team/<photo>.jpg, else the demo Unsplash portrait */}
                <div className="aspect-square overflow-hidden border-b border-border bg-background">
                  <img
                    src={localPhotoFor(person.photo) ?? teamPhotos[index]?.src}
                    alt={person.name}
                    width={800}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="interactive h-full w-full object-cover object-top group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">{person.name}</h3>
                  <p className="mt-1 text-sm text-label">{person.role}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// [EDIT ME] `workCategory` must exactly match a key in CATEGORIES (work.tsx).
// Leave it undefined if there's no matching Examples tab yet — the card still
// links down to the Examples section, it just won't switch a specific tab.
const SERVICES: {
  icon: typeof Bot;
  title: string;
  copy: string;
  workCategory?: WorkCategoryName;
}[] = [
  {
    icon: Bot,
    title: "AI Agents",
    copy: "Voice and text agents with tool use, memory and real guardrails.",
    workCategory: "AI Agents",
  },
  {
    icon: Zap,
    title: "Automation",
    copy: "Manual processes turned into reliable pipelines that run themselves.",
  },
  {
    icon: LayoutGrid,
    title: "Web Development",
    copy: "Fast, accessible marketing sites and product frontends.",
    workCategory: "Web Development",
  },
  {
    icon: Smartphone,
    title: "App Development",
    copy: "Cross-platform apps with a shared, maintainable codebase.",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    copy: "Deploys, observability and cost-sane architecture on day one.",
    workCategory: "Cloud Architecture",
  },
  {
    icon: Workflow,
    title: "Workflow Systems",
    copy: "Internal tools and dashboards your team actually opens daily.",
  },
];

export function Services() {
  return (
    <section id="services" className="border-y border-border bg-panel px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>What we build</Eyebrow>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">Six ways we ship value</h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            One team across strategy, build and support — scoped in days, not quarters.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 70}>
              <a
                href="#work"
                data-cursor="View"
                onClick={() => {
                  if (service.workCategory) {
                    window.dispatchEvent(new CustomEvent(WORK_TAB_EVENT, { detail: service.workCategory }));
                  }
                }}
                className="interactive group block h-full rounded-2xl border border-border bg-background p-6 hover:-translate-y-1 hover:border-action"
              >
                <span className="interactive flex h-11 w-11 items-center justify-center rounded-xl border border-border text-label group-hover:border-label">
                  <service.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.copy}</p>
                <span className="interactive mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-action group-hover:gap-3">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROCESS = [
  { icon: Compass, title: "Discovery", copy: "One week to map the problem, the data and the fastest path to value." },
  { icon: Hammer, title: "Build", copy: "Weekly working demos — you steer while it's cheap to steer." },
  { icon: Rocket, title: "Ship", copy: "Production deploy with monitoring, docs and a handover walkthrough." },
  { icon: LifeBuoy, title: "Support", copy: "Ongoing iteration, tuning and on-call cover as usage grows." },
];

export function Process() {
  return (
    <section id="process" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-4xl font-bold md:text-5xl">
            A four-step loop, repeated until it's live.
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 90}>
              <div
                data-cursor="true"
                className="interactive h-full rounded-2xl border border-border bg-panel p-6 hover:-translate-y-1 hover:border-label"
              >
                <div className="flex items-center justify-between">
                  <span className="text-label">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-sm text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="contact" className="border-y border-border bg-panel px-5 py-24">
      <Reveal className="mx-auto max-w-3xl text-center">
        <LogoMark className="mx-auto h-14 w-14" />
        <h2 className="mt-8 text-4xl font-bold md:text-5xl">Got something that needs building?</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          Tell us the problem. We'll come back with scope, timeline and a fixed price within
          two working days.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild variant="action" size="xl">
            {/* [EDIT ME] real contact email */}
            <a href="mailto:hello@4see.dev" data-cursor="Let's talk">
              Start a Project
            </a>
          </Button>
          <Button asChild variant="outlineAction" size="xl">
            <a href="#work" data-cursor="View">
              Browse case studies
            </a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}