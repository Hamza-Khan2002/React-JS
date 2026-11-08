import React from "react";
import { Menu, X, Sparkles, ShieldCheck, LogOut } from "lucide-react";
import { useScrolled } from "../hooks/useUI.jsx";
import { ThemeToggle } from "./UI.jsx";

export function Navbar({ theme, setTheme, auth, logout, goto, items, page, navOpen, setNavOpen }) {
  const scrolled = useScrolled();
  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-inner">
        <button className="brand" onClick={() => goto("home")}>
          <span className="brand-mark"><Sparkles size={16} /></span>
          <span className="brand-text">
            <span className="brand-title">Al-Noor</span>
            <span className="brand-sub">Grand Banquet</span>
          </span>
        </button>
        <nav className="nav-links desktop-only">
          {items.map((it) => (
            <button key={it.id} className={`nav-link ${page === it.id ? "nav-link-active" : ""}`} onClick={() => goto(it.id)}>
              {it.label}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          {!auth && (
            <div className="desktop-only nav-auth">
              <button className="btn btn-ghost btn-sm" onClick={() => goto("login")}>Log in</button>
              <button className="btn btn-primary btn-sm" onClick={() => goto("register")}>Register</button>
            </div>
          )}
          {auth && (
            <div className="desktop-only nav-auth">
              <button className="btn btn-gold btn-sm" onClick={() => goto("booking-form")}>Book Now</button>
              <button className="btn btn-ghost btn-sm" onClick={() => goto("booking-status")}>My Booking</button>
              <button className="icon-btn" onClick={logout} title="Log out"><LogOut size={17} /></button>
            </div>
          )}
          <button className="icon-btn mobile-only" onClick={() => setNavOpen((v) => !v)} aria-label="Menu">
            {navOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {navOpen && (
        <div className="mobile-menu">
          {items.map((it) => (
            <button key={it.id} className="mobile-link" onClick={() => goto(it.id)}>{it.label}</button>
          ))}
          <div className="mobile-divider" />
          {!auth ? (
            <>
              <button className="mobile-link" onClick={() => goto("login")}>Log in</button>
              <button className="mobile-link" onClick={() => goto("register")}>Register</button>
            </>
          ) : (
            <>
              <button className="mobile-link" onClick={() => goto("booking-form")}>Book Now</button>
              <button className="mobile-link" onClick={() => goto("booking-status")}>My Booking</button>
              <button className="mobile-link" onClick={logout}>Log out</button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export function AdminNavbar({ theme, setTheme, auth, logout, goto, items, page, navOpen, setNavOpen }) {
  return (
    <header className="navbar navbar-admin navbar-scrolled">
      <div className="navbar-inner">
        <button className="brand" onClick={() => goto("admin-dashboard")}>
          <span className="brand-mark"><ShieldCheck size={16} /></span>
          <span className="brand-text">
            <span className="brand-title">Al-Noor</span>
            <span className="brand-sub">Admin Console</span>
          </span>
        </button>
        <nav className="nav-links desktop-only">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <button key={it.id} className={`nav-link nav-link-icon ${page === it.id ? "nav-link-active" : ""}`} onClick={() => goto(it.id)}>
                <Icon size={15} /> {it.label}
              </button>
            );
          })}
        </nav>
        <div className="nav-actions">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <div className="desktop-only nav-auth">
            <span className="admin-who">{auth.name}</span>
            <button className="icon-btn" onClick={logout} title="Log out"><LogOut size={17} /></button>
          </div>
          <button className="icon-btn mobile-only" onClick={() => setNavOpen((v) => !v)} aria-label="Menu">
            {navOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {navOpen && (
        <div className="mobile-menu">
          {items.map((it) => (
            <button key={it.id} className="mobile-link" onClick={() => goto(it.id)}>{it.label}</button>
          ))}
          <div className="mobile-divider" />
          <button className="mobile-link" onClick={logout}>Log out</button>
        </div>
      )}
    </header>
  );
}
