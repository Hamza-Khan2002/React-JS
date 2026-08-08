import React, { useState, useEffect, useRef } from "react";
import {
  Eye,
  Menu,
  X,
  Bot,
  Workflow,
  Globe,
  Smartphone,
  Cloud,
  GitBranch,
  ArrowUpRight,
  Code2,
  Link2,
  Mail,
  LayoutTemplate,
  Palette,
} from "lucide-react";

/* ------------------------------------------------------------------
   4SEE — team portfolio
   Palette   : void #060810, panel #0c1120, line #1b2338,
               ink #eef1f8, mute #8891a8,
               blue #3b6dff, violet #8b5cf6, iris #22d3ee
   Display   : Space Grotesk (angular, technical)
   Body      : Inter
   Signature : a watching "iris" — a scanning eye built from concentric
               rings + node lines that tracks the cursor in the hero,
               echoing "See Beyond. Build Better."
------------------------------------------------------------------- */

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');`;

const TEAM = [
  {
    name: "Sulaiman",
    role: "AI Developer",
    focus: "LLM pipelines, model tuning, scam & intent classification",
    tag: "AI",
  },
  {
    name: "Samaan",
    role: "UI/UX & Frontend Designer",
    focus: "Interface systems, motion, product design",
    tag: "UX",
  },
  {
    name: "Hanzalah",
    role: "Cloud Architect",
    focus: "Infra, deployment pipelines, scalable backends",
    tag: "OPS",
  },
  {
    name: "Hamza Khan",
    role: "Full-Stack Developer",
    focus: ".NET / React systems, APIs, data layers",
    tag: "DEV",
  },
];

const SERVICES = [
  {
    icon: Bot,
    title: "AI Agents",
    desc: "Autonomous agents that reason, call tools, and act on real workflows — not chat toys.",
  },
  {
    icon: Workflow,
    title: "Automation",
    desc: "Manual, repetitive processes rebuilt into pipelines that run themselves.",
  },
  {
    icon: Globe,
    title: "Web Development",
    desc: "Fast, accessible product sites and dashboards, built to actually ship.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    desc: "Cross-platform apps with native feel, from prototype to store.",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    desc: "Provisioned, monitored, and scaled — so growth doesn't break production.",
  },
  {
    icon: GitBranch,
    title: "Workflow Systems",
    desc: "Internal tools that connect your stack instead of fighting it.",
  },
];

/* ---- Examples: tabbed, functional ---- */
const EXAMPLE_TABS = [
  { key: "ai", label: "AI Agents", icon: Bot },
  { key: "web", label: "Web Development", icon: Globe },
  { key: "wp", label: "WordPress", icon: LayoutTemplate },
  { key: "cloud", label: "Cloud Architecture", icon: Cloud },
  { key: "uiux", label: "UI/UX Design", icon: Palette },
];

const EXAMPLES = {
  ai: [
    {
      title: "CallGuard Screening Agent",
      desc: "Real-time call agent that transcribes, classifies scam intent, and responds — built on an STT → LLM → TTS pipeline.",
      stack: ["Whisper", "Groq/Llama", "Edge TTS"],
    },
    {
      title: "Support Triage Bot",
      desc: "Reads incoming tickets, tags priority and category, and drafts a first response for review.",
      stack: ["LLM Tool Use", "Vector Search", "Python"],
    },
  ],
  web: [
    {
      title: "FinanceProject Ledger",
      desc: "Full-stack finance tracker with JWT auth, live market data, and a dark ledger-themed dashboard.",
      stack: ["ASP.NET Core", "EF Core", "React"],
    },
    {
      title: "Client Booking Portal",
      desc: "Booking and scheduling web app with role-based access and real-time availability.",
      stack: ["React", "Node", "PostgreSQL"],
    },
  ],
  wp: [
    {
      title: "Studio Landing Rebuild",
      desc: "Migrated a slow legacy site to a custom WordPress theme — faster loads, cleaner CMS for non-technical edits.",
      stack: ["WordPress", "ACF", "PHP"],
    },
    {
      title: "E-commerce Storefront",
      desc: "WooCommerce store with custom checkout flow and inventory sync.",
      stack: ["WooCommerce", "WordPress", "MySQL"],
    },
  ],
  cloud: [
    {
      title: "CI/CD for FinanceProject",
      desc: "Automated build, test, and deploy pipeline to a live production API with zero-downtime releases.",
      stack: ["Docker", "GitHub Actions", "Linux/WSL2"],
    },
    {
      title: "Redis-backed Task Queue",
      desc: "Background job processing for long-running tasks, decoupled from the main API.",
      stack: ["Redis", "Celery", "Cloud VM"],
    },
  ],
  uiux: [
    {
      title: "4See Brand System",
      desc: "Visual identity and component system built around the eye motif — this site included.",
      stack: ["Figma", "Design Tokens", "Prototyping"],
    },
    {
      title: "Ledger Dashboard UX",
      desc: "Information-dense finance dashboard redesigned for clarity without losing detail.",
      stack: ["Figma", "User Testing", "Design System"],
    },
  ],
};

function useCursorTrack(ref) {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      setPos({
        x: Math.min(1, Math.max(0, x)),
        y: Math.min(1, Math.max(0, y)),
      });
    };
    el.addEventListener("mousemove", handle);
    return () => el.removeEventListener("mousemove", handle);
  }, [ref]);
  return pos;
}

function Iris({ size = 340 }) {
  const wrapRef = useRef(null);
  const pos = useCursorTrack(wrapRef);
  const dx = (pos.x - 0.5) * 22;
  const dy = (pos.y - 0.5) * 22;

  return (
    <div
      ref={wrapRef}
      style={{ width: size, height: size }}
      className="relative mx-auto select-none"
    >
      <svg viewBox="0 0 400 400" className="w-full h-full" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="irisGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b6dff" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <radialGradient id="pupilGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#8df4ff" />
            <stop offset="55%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0c9fbf" />
          </radialGradient>
          <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M20,200 C110,80 290,80 380,200 C290,320 110,320 20,200 Z"
          fill="none"
          stroke="url(#irisGrad)"
          strokeWidth="2.5"
          opacity="0.55"
        />
        <circle cx="200" cy="200" r="150" fill="none" stroke="#1b2338" strokeWidth="1" />
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="url(#irisGrad)"
          strokeWidth="1.4"
          strokeDasharray="4 10"
          opacity="0.5"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 200 200"
            to="360 200 200"
            dur="26s"
            repeatCount="indefinite"
          />
        </circle>

        <g style={{ transform: `translate(${dx}px, ${dy}px)`, transition: "transform 120ms ease-out" }}>
          <circle cx="200" cy="200" r="86" fill="#0c1120" stroke="url(#irisGrad)" strokeWidth="2" />
          <circle cx="200" cy="200" r="60" fill="url(#irisGrad)" opacity="0.16" />
          <circle cx="200" cy="200" r="34" fill="url(#pupilGrad)" filter="url(#softGlow)" />
          <circle cx="188" cy="188" r="7" fill="#ffffff" opacity="0.85" />
        </g>

        {[
          [60, 90], [340, 100], [55, 320], [345, 310], [200, 40],
        ].map(([x, y], i) => (
          <g key={i} opacity="0.6">
            <line x1={x} y1={y} x2="200" y2="200" stroke="#243055" strokeWidth="1" />
            <circle cx={x} cy={y} r="4" fill="#22d3ee" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function NavBar({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", id: "home" },
    { label: "Team", id: "team" },
    { label: "Work", id: "work" },
    { label: "Contact", id: "contact" },
  ];

  const go = (id) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{ background: "rgba(6,8,16,0.75)", borderBottom: "1px solid #1b2338" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          className="flex items-center gap- bg-transparent border-0 cursor-pointer p-0"
          onClick={() => go("home")}
        >
          <img src="/logo2.png" alt="4See Logo" className="h-18 w-30" />
        </button>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-sm font-medium transition-colors bg-transparent border-0 cursor-pointer p-0"
              style={{ color: "#8891a8" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#eef1f8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8891a8")}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div className="hidden md:block">
          <button
            onClick={() => go("contact")}
            className="text-sm font-semibold px-4 py-2 rounded-full text-white cursor-pointer border-0"
            style={{ background: "linear-gradient(135deg,#3b6dff,#8b5cf6)" }}
          >
            Start a Project
          </button>
        </div>
        <button className="md:hidden text-white bg-transparent border-0 cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-5 flex flex-col gap-4" style={{ borderTop: "1px solid #1b2338" }}>
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-sm font-medium pt-3 text-left bg-transparent border-0 cursor-pointer"
              style={{ color: "#8891a8" }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => go("contact")}
            className="text-sm font-semibold px-4 py-2 rounded-full text-white mt-1 cursor-pointer border-0"
            style={{ background: "linear-gradient(135deg,#3b6dff,#8b5cf6)" }}
          >
            Start a Project
          </button>
        </div>
      )}
    </header>
  );
}

function Hero({ onNavigate }) {
  return (
    <section
      id="home"
      className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-14 items-center"
    >
      <div>
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
          style={{ border: "1px solid #243055", color: "#8fa2ff", letterSpacing: "0.06em" }}
        >
          AI AGENTS · AUTOMATION · WEB · APPS · WORKFLOWS
        </div>
        <h1
          style={{ fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.06 }}
          className="text-4xl md:text-5xl font-bold text-white tracking-tight"
        >
          See beyond.
          <br />
          <span
            style={{
              background: "linear-gradient(135deg,#3b6dff,#22d3ee)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Build better.
          </span>
        </h1>
        <p className="mt-6 text-base leading-relaxed max-w-md" style={{ color: "#8891a8" }}>
          4See is a four-person studio building AI agents, automations, and
          full-stack products for teams that want software which sees the
          whole problem — not just the ticket.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate("contact")}
            className="text-sm font-semibold px-5 py-3 rounded-full text-white cursor-pointer border-0"
            style={{ background: "linear-gradient(135deg,#3b6dff,#8b5cf6)" }}
          >
            Start a Project
          </button>
          <button
            onClick={() => onNavigate("work")}
            className="text-sm font-semibold px-5 py-3 rounded-full cursor-pointer bg-transparent"
            style={{ border: "1px solid #243055", color: "#eef1f8" }}
          >
            View Our Work
          </button>
        </div>
      </div>
      <Iris />
    </section>
  );
}

function TeamSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20" id="team">
      <Eyebrow label="Who's watching" />
      <h2
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        className="text-2xl md:text-3xl font-bold text-white mt-3 mb-10"
      >
        The four sets of eyes behind 4See
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {TEAM.map((m) => (
          <div
            key={m.name}
            className="rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1"
            style={{ background: "#0c1120", border: "1px solid #1b2338" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-5 text-sm font-bold"
              style={{
                background: "linear-gradient(135deg, rgba(59,109,255,0.18), rgba(139,92,246,0.18))",
                border: "1px solid #243055",
                color: "#22d3ee",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {m.tag}
            </div>
            <h3 className="text-white font-semibold text-base">{m.name}</h3>
            <p className="text-xs font-medium mt-1 mb-3" style={{ color: "#8fa2ff" }}>
              {m.role}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#8891a8" }}>
              {m.focus}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Eyebrow({ label }) {
  return (
    <div className="flex items-center gap-2">
      <Eye size={14} color="#22d3ee" />
      <span className="text-xs font-semibold uppercase" style={{ color: "#22d3ee", letterSpacing: "0.12em" }}>
        {label}
      </span>
    </div>
  );
}

function ServicesSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <Eyebrow label="What we build" />
      <h2
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        className="text-2xl md:text-3xl font-bold text-white mt-3 mb-10"
      >
        Engineered for the parts that actually break
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl p-6 group"
            style={{ background: "#0c1120", border: "1px solid #1b2338" }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              style={{ background: "rgba(34,211,238,0.1)" }}
            >
              <Icon size={18} color="#22d3ee" />
            </div>
            <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#8891a8" }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatsStrip() {
  const stats = [
    { value: "4", label: "Builders, one studio" },
    { value: "2", label: "Core stacks: .NET & AI/ML" },
    { value: "100%", label: "Shipped by the people who pitch it" },
  ];
  return (
    <section className="max-w-6xl mx-auto px-6 pb-4">
      <div
        className="rounded-2xl grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x"
        style={{ background: "#0c1120", border: "1px solid #1b2338" }}
      >
        {stats.map((s) => (
          <div key={s.label} className="p-8" style={{ borderColor: "#1b2338" }}>
            <div
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#eef1f8" }}
              className="text-3xl font-bold"
            >
              {s.value}
            </div>
            <div className="text-sm mt-1" style={{ color: "#8891a8" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---- Functional tabbed examples/work section ---- */
function ExamplesSection() {
  const [active, setActive] = useState(EXAMPLE_TABS[0].key);
  const items = EXAMPLES[active];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20" id="work">
      <Eyebrow label="Examples" />
      <h2
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        className="text-2xl md:text-3xl font-bold text-white mt-3 mb-8"
      >
        A look at how we work
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist">
        {EXAMPLE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.key)}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full cursor-pointer transition-colors"
              style={{
                border: isActive ? "1px solid transparent" : "1px solid #1b2338",
                background: isActive ? "linear-gradient(135deg,#3b6dff,#8b5cf6)" : "transparent",
                color: isActive ? "#ffffff" : "#8891a8",
              }}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div className="grid sm:grid-cols-2 gap-5">
        {items.map((ex) => (
          <div
            key={ex.title}
            className="rounded-2xl p-6"
            style={{ background: "#0c1120", border: "1px solid #1b2338" }}
          >
            <h3 className="text-white font-semibold text-base mb-2">{ex.title}</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#8891a8" }}>
              {ex.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {ex.stack.map((s) => (
                <span
                  key={s}
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(34,211,238,0.08)", color: "#22d3ee" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 text-center" id="contact">
      <h2
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        className="text-3xl md:text-4xl font-bold text-white max-w-xl mx-auto"
      >
        Got something that needs building?
      </h2>
      <p className="mt-4 max-w-md mx-auto" style={{ color: "#8891a8" }}>
        Tell us what's broken, slow, or missing. We'll tell you what it takes to fix it.
      </p>
      <a
        href="mailto:hello@4see.dev"
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full text-white cursor-pointer"
        style={{ background: "linear-gradient(135deg,#3b6dff,#8b5cf6)" }}
      >
        Get in touch <ArrowUpRight size={16} />
      </a>
    </section>
  );
}

function Footer({ onNavigate }) {
  const socials = [
    { Icon: Code2, href: "https://github.com" },
    { Icon: Link2, href: "https://linkedin.com" },
    { Icon: Mail, href: "mailto:hello@4see.dev" },
  ];
  return (
    <footer style={{ borderTop: "1px solid #1b2338" }}>
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row justify-between gap-8">
        <div>
          <button
            className="flex items-center gap-2 mb-3 bg-transparent border-0 cursor-pointer p-0"
            onClick={() => onNavigate("home")}
          >
            <Eye size={18} color="#22d3ee" />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-white font-bold">
              4See
            </span>
          </button>
          <p className="text-sm max-w-xs" style={{ color: "#8891a8" }}>
            See beyond. Build better. A four-person studio for AI agents, automation, and full-stack products.
          </p>
        </div>
        <div className="flex gap-4">
          {socials.map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
              style={{ border: "1px solid #1b2338", color: "#8891a8" }}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
      <div className="text-center text-xs pb-8" style={{ color: "#4b5468" }}>
        © {new Date().getFullYear()} 4See. All rights reserved.
      </div>
    </footer>
  );
}

export default function FourSeePortfolio() {
  const handleNavigate = (id) => scrollToId(id);

  return (
    <div style={{ background: "#060810", minHeight: "100vh", scrollBehavior: "smooth" }}>
      <style>{FONT_IMPORT}</style>
      <div style={{ fontFamily: "'Inter', sans-serif" }}>
        <NavBar onNavigate={handleNavigate} />
        <Hero onNavigate={handleNavigate} />
        <StatsStrip />
        <TeamSection />
        <ServicesSection />
        <ExamplesSection />
        <CTASection />
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
