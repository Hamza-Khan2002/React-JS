import { useEffect, useState } from "react";

import { Eyebrow } from "./sections";
import { Reveal } from "./motion";
import { WORK_TAB_EVENT } from "./work-shared";
import { cn } from "@/lib/utils";

import { projects as aiAgentsProjects } from "@/data/ai-agents/data.js";
import { projects as webDevProjects } from "@/data/web-development/data.js";
import { projects as cloudProjects } from "@/data/cloud-architecture/data.js";
import { projects as uiUxProjects } from "@/data/ui-ux-design/data.js";

type Project = {
  image: string;
  name: string;
  description: string;
  link: string;
};

const CATEGORIES: Record<string, Project[]> = {
  "AI Agents": aiAgentsProjects,
  "Web Development": webDevProjects,
  "Cloud Architecture": cloudProjects,
  "UI/UX Design": uiUxProjects,
};

const TAB_NAMES = Object.keys(CATEGORIES);

export function Work() {
  const [active, setActive] = useState(TAB_NAMES[0] as string);
  const projects = CATEGORIES[active] ?? [];

  useEffect(() => {
    const handler = (event: Event) => {
      const category = (event as CustomEvent<string>).detail;
      if (category && CATEGORIES[category]) setActive(category);
    };
    window.addEventListener(WORK_TAB_EVENT, handler);
    return () => window.removeEventListener(WORK_TAB_EVENT, handler);
  }, []);

  return (
    <section id="work" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-4xl font-bold md:text-5xl">
            Problem, solution, measurable result.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div role="tablist" aria-label="Project categories" className="mt-10 flex flex-wrap gap-2">
            {TAB_NAMES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active === category}
                onClick={() => setActive(category)}
                data-cursor="true"
                className={cn(
                  "interactive rounded-full border px-4 py-2 text-sm font-medium",
                  active === category
                    ? "border-action bg-action text-action-foreground"
                    : "border-border bg-panel text-muted-foreground hover:border-label hover:text-label",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Yahan [scrollbar-width:thin] ko hata kar scrollbar-hide laga diya gaya hai */}
        <div className="mt-10 -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 scrollbar-hide">
          {projects.map((project, index) => (
            <Reveal
              key={`${active}-${project.name}`}
              delay={index * 90}
              className="w-[85vw] shrink-0 snap-start sm:w-[420px]"
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-panel hover:-translate-y-1 hover:border-action">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="View"
                  className="interactive block aspect-16/9 overflow-hidden border-b border-border bg-background"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform group-hover:scale-[1.03]"
                  />
                </a>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl font-bold">{project.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{project.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}