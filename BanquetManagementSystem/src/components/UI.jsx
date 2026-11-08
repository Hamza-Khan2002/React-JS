import React from "react";
import { Sun, Moon, AlertCircle, CheckCircle2 } from "lucide-react";
import { Reveal } from "../hooks/useUI.jsx";

export function ArchMotif({ className = "", opacity = 1 }) {
  return (
    <svg className={className} viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      <defs>
        <linearGradient id="archGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--c-gold-light)" />
          <stop offset="100%" stopColor="var(--c-gold)" />
        </linearGradient>
      </defs>
      <path d="M20 500 V220 C20 110 100 20 200 20 C300 20 380 110 380 220 V500" stroke="url(#archGold)" strokeWidth="3" />
      <path d="M60 500 V225 C60 130 122 60 200 60 C278 60 340 130 340 225 V500" stroke="url(#archGold)" strokeWidth="1.5" opacity="0.7" />
      <path d="M100 500 V230 C100 155 145 100 200 100 C255 100 300 155 300 230 V500" stroke="url(#archGold)" strokeWidth="1" opacity="0.5" />
      <circle cx="200" cy="150" r="4" fill="var(--c-gold)" opacity="0.8" />
      <path d="M170 150 L200 110 L230 150" stroke="var(--c-gold)" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

export function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="icon-btn theme-toggle"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      title="Toggle theme"
    >
      <span className={`theme-icon ${theme === "dark" ? "spin" : ""}`}>{theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}</span>
    </button>
  );
}

export function Field({ label, children, error, hint }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint && !error && <span className="field-hint">{hint}</span>}
      {error && <span className="field-error"><AlertCircle size={12} /> {error}</span>}
    </label>
  );
}

export function KpiCard({ icon: Icon, label, value, tone = "maroon" }) {
  return (
    <Reveal className={`kpi-card kpi-${tone}`}>
      <div className="kpi-icon"><Icon size={18} /></div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
    </Reveal>
  );
}

export function Toast({ toast }) {
  const Icon = toast.kind === "success" ? CheckCircle2 : AlertCircle;
  return (
    <div className={`toast toast-${toast.kind}`} key={toast.id}>
      <Icon size={16} /> <span>{toast.text}</span>
    </div>
  );
}

export function AccessDenied({ goto }) {
  return (
    <div className="page-narrow center-pad">
      <ArchMotif className="deny-arch" />
      <h2 className="h2">Admins only</h2>
      <p className="muted">This area is reserved for the Al-Noor staff console. Please log in with an admin account.</p>
      <button className="btn btn-primary" onClick={() => goto("login")}>Go to Login</button>
    </div>
  );
}
