import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Menu, X, Sun, Moon, Calendar as CalendarIcon, Users, ChevronLeft, ChevronRight,
  Check, XCircle, Search, Phone, Mail, Star, Award, Sparkles, LayoutDashboard,
  ClipboardList, UserCog, BarChart3, LogOut, Plus, Pencil, Trash2, Eye, ArrowRight,
  ShieldCheck, Clock, PartyPopper, Building2, TreePine, Image as ImageIcon,
  MapPin, ChevronDown, AlertCircle, CheckCircle2, RotateCcw
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from "recharts";

/* ======================================================================
   AL-NOOR GRAND BANQUET — full booking & management system
   Design tokens, guest-facing pages, auth (User/Admin), admin console.
   ====================================================================== */

/* ---------------------------- constants ------------------------------ */

const FUNCTION_TYPES = ["Wedding", "Walima", "Mehndi", "Engagement", "Corporate", "Birthday"];
const HALLS = [
  { name: "Grand Hall", capacity: 500, icon: "building" },
  { name: "Garden Lawn", capacity: 800, icon: "tree" },
  { name: "Rooftop Terrace", capacity: 250, icon: "building" },
];
const PACKAGES = [
  {
    id: "silver", name: "Silver", price: 150000, capacity: 200, popular: false,
    features: ["Standard hall decor", "Buffet catering (3 dishes)", "Basic sound system", "4-hour slot", "Standard seating"],
  },
  {
    id: "gold", name: "Gold", price: 250000, capacity: 350, popular: true,
    features: ["Premium stage decor", "Buffet + live counters (5 dishes)", "Full sound & lighting", "6-hour slot", "Themed seating", "Dedicated coordinator"],
  },
  {
    id: "platinum", name: "Platinum", price: 400000, capacity: 500, popular: false,
    features: ["Signature designer decor", "Multi-cuisine live counters (8 dishes)", "Premium AV + LED wall", "8-hour slot", "Luxury seating & lounge", "Dedicated coordinator", "Complimentary bridal suite"],
  },
];
const EMP_ROLES = ["Manager", "Chef", "Waiter", "Decorator", "Security", "Sound Engineer"];
const STATUS_META = {
  pending: { label: "Pending", cls: "badge-pending" },
  confirmed: { label: "Confirmed", cls: "badge-confirmed" },
  rejected: { label: "Rejected", cls: "badge-rejected" },
};
const PIE_COLORS = ["#8B1A2F", "#C4923A", "#5C7A5E", "#4C6E91"];

function pad(n) { return String(n).padStart(2, "0"); }
function toISO(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function offsetDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return toISO(d);
}
function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
function fmtMoney(n) {
  return "Rs. " + Number(n).toLocaleString("en-PK");
}
function genRef() {
  const y = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `ANB-${y}-${rand}`;
}
function uid() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36); }

function seedBookings() {
  const pkgFor = (n) => PACKAGES.find((p) => p.name === n);
  const rows = [
    { name: "Bilal & Sana", fn: "Wedding", hall: "Grand Hall", off: 3, guests: 420, pkg: "Platinum", status: "confirmed" },
    { name: "Farah Traders", fn: "Corporate", hall: "Rooftop Terrace", off: 6, guests: 90, pkg: "Silver", status: "confirmed" },
    { name: "Ahmed Family", fn: "Mehndi", hall: "Garden Lawn", off: 9, guests: 300, pkg: "Gold", status: "pending" },
    { name: "Zara & Omar", fn: "Walima", hall: "Grand Hall", off: 14, guests: 480, pkg: "Platinum", status: "pending" },
    { name: "Hina's Birthday", fn: "Birthday", hall: "Rooftop Terrace", off: 18, guests: 60, pkg: "Silver", status: "confirmed" },
    { name: "Rizvi Engagement", fn: "Engagement", hall: "Garden Lawn", off: -4, guests: 250, pkg: "Gold", status: "confirmed" },
    { name: "Malik & Iqra", fn: "Wedding", hall: "Grand Hall", off: -12, guests: 500, pkg: "Platinum", status: "confirmed" },
    { name: "Noor Enterprises", fn: "Corporate", hall: "Rooftop Terrace", off: -20, guests: 120, pkg: "Gold", status: "rejected" },
    { name: "Saad's Mehndi", fn: "Mehndi", hall: "Garden Lawn", off: 24, guests: 280, pkg: "Gold", status: "pending" },
    { name: "Ali & Mahnoor", fn: "Wedding", hall: "Grand Hall", off: -35, guests: 460, pkg: "Platinum", status: "confirmed" },
  ];
  return rows.map((r) => ({
    id: uid(),
    ref: genRef(),
    Name: r.name,
    phone: "0300-1234567",
    email: "guest@example.com",
    functionType: r.fn,
    hallType: r.hall,
    date: offsetDate(r.off),
    time: r.off % 2 === 0 ? "Evening" : "Day",
    guests: r.guests,
    pkg: r.pkg,
    price: pkgFor(r.pkg).price,
    status: r.status,
    notes: "",
    createdBy: "guest@example.com",
    createdAt: offsetDate(r.off - 5),
  }));
}
function seedEmployees() {
  const rows = [
    { name: "Waqas Ahmed", role: "Manager", salary: 95000, off: -600 },
    { name: "Chef Imran", role: "Chef", salary: 80000, off: -500 },
    { name: "Chef Nadia", role: "Chef", salary: 78000, off: -400 },
    { name: "Yousuf Raza", role: "Waiter", salary: 35000, off: -300 },
    { name: "Bilqees Fatima", role: "Decorator", salary: 55000, off: -250 },
    { name: "Sikandar Khan", role: "Security", salary: 40000, off: -200 },
    { name: "Danish Ali", role: "Sound Engineer", salary: 60000, off: -150 },
  ];
  return rows.map((r) => ({
    id: uid(), name: r.name, role: r.role,
    phone: "0321-9876543", email: r.name.toLowerCase().replace(/\s+/g, ".") + "@alnoor.com",
    salary: r.salary, joinDate: offsetDate(r.off),
  }));
}
function seedUsers() {
  return [
    { name: "Admin", email: "admin@alnoor.com", password: "admin123", role: "admin" },
    { name: "Ayesha Khan", email: "ayesha@example.com", password: "user123", role: "user" },
  ];
}

/* ------------------------- storage helpers ---------------------------- */

async function loadKey(key, fallback) {
  try {
    const res = await window.storage.get(key, true);
    if (res && res.value) return JSON.parse(res.value);
  } catch (e) { /* key absent or storage unavailable */ }
  return fallback;
}
async function saveKey(key, value) {
  try { await window.storage.set(key, JSON.stringify(value), true); } catch (e) { /* ignore */ }
}

/* ----------------------------- reveal hook ----------------------------- */

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { setShown(true); obs.disconnect(); } }); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${shown ? "reveal-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

function useCountUp(target, active, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

/* ------------------------------ arch motif ------------------------------ */

function ArchMotif({ className = "", opacity = 1 }) {
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

/* ================================ APP ================================ */

export default function App() {
  const [theme, setTheme] = useState("light");
  const [booted, setBooted] = useState(false);
  const [page, setPage] = useState("home");
  const [ctx, setCtx] = useState({}); // page context (e.g. prefill date/pkg, booking ref)
  const [auth, setAuth] = useState(null); // {name,email,role}
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [toast, setToast] = useState(null);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const [u, b, e] = await Promise.all([
        loadKey("alnoor:users", null),
        loadKey("alnoor:bookings", null),
        loadKey("alnoor:employees", null),
      ]);
      setUsers(u || seedUsers());
      setBookings(b || seedBookings());
      setEmployees(e || seedEmployees());
      setBooted(true);
    })();
  }, []);
  useEffect(() => { if (booted) saveKey("alnoor:users", users); }, [users, booted]);
  useEffect(() => { if (booted) saveKey("alnoor:bookings", bookings); }, [bookings, booted]);
  useEffect(() => { if (booted) saveKey("alnoor:employees", employees); }, [employees, booted]);

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const showToast = useCallback((text, kind = "success") => {
    setToast({ text, kind, id: uid() });
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const goto = useCallback((p, context = {}) => {
    setCtx(context);
    setPage(p);
    setNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const login = (email, password) => {
    const u = users.find((x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password);
    if (!u) return { ok: false, msg: "Invalid email or password." };
    setAuth({ name: u.name, email: u.email, role: u.role });
    showToast(`Welcome back, ${u.name.split(" ")[0]}!`);
    goto(u.role === "admin" ? "admin-dashboard" : "home");
    return { ok: true };
  };
  const register = (data) => {
    if (users.some((x) => x.email.toLowerCase() === data.email.toLowerCase())) {
      return { ok: false, msg: "An account with this email already exists." };
    }
    const nu = { name: data.name, email: data.email, password: data.password, role: data.role };
    setUsers((prev) => [...prev, nu]);
    setAuth({ name: nu.name, email: nu.email, role: nu.role });
    showToast("Account created — you're in!");
    goto(nu.role === "admin" ? "admin-dashboard" : "home");
    return { ok: true };
  };
  const logout = () => {
    setAuth(null);
    showToast("Signed out.", "info");
    goto("home");
  };

  const addBooking = (b) => {
    const rec = { ...b, id: uid(), ref: genRef(), status: "pending", createdAt: toISO(new Date()) };
    setBookings((prev) => [rec, ...prev]);
    return rec;
  };
  const setBookingStatus = (id, status) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    showToast(`Booking ${status}.`, status === "rejected" ? "info" : "success");
  };
  const upsertEmployee = (emp) => {
    setEmployees((prev) => {
      const exists = prev.some((e) => e.id === emp.id);
      if (exists) return prev.map((e) => (e.id === emp.id ? emp : e));
      return [{ ...emp, id: uid() }, ...prev];
    });
    showToast(emp.id ? "Employee updated." : "Employee added.");
  };
  const removeEmployee = (id) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    showToast("Employee removed.", "info");
  };
  const resetDemo = async () => {
    const u = seedUsers(), b = seedBookings(), e = seedEmployees();
    setUsers(u); setBookings(b); setEmployees(e);
    showToast("Demo data reset.", "info");
  };

  const isAdmin = auth && auth.role === "admin";
  const isUser = auth && auth.role === "user";

  const navGuest = [
    { id: "home", label: "Home" },
    { id: "gallery", label: "Gallery" },
    { id: "pricing", label: "Pricing" },
    { id: "availability", label: "Availability" },
  ];
  const navAdmin = [
    { id: "admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "admin-requests", label: "Requests", icon: ClipboardList },
    { id: "admin-calendar", label: "Calendar", icon: CalendarIcon },
    { id: "admin-employees", label: "Employees", icon: UserCog },
    { id: "admin-reports", label: "Reports", icon: BarChart3 },
  ];

  if (!booted) {
    return (
      <div className={theme === "dark" ? "dark" : ""}>
        <GlobalStyle />
        <div className="boot-screen">
          <ArchMotif className="boot-arch" />
          <div className="boot-text">Al-Noor Grand Banquet</div>
        </div>
      </div>
    );
  }

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <GlobalStyle />
      <div className="app-shell">
        {!isAdmin && (
          <Navbar
            theme={theme} setTheme={setTheme} auth={auth} logout={logout} goto={goto}
            items={navGuest} page={page} navOpen={navOpen} setNavOpen={setNavOpen}
          />
        )}
        {isAdmin && (
          <AdminNavbar theme={theme} setTheme={setTheme} auth={auth} logout={logout} goto={goto} items={navAdmin} page={page} navOpen={navOpen} setNavOpen={setNavOpen} />
        )}

        <main className="main">
          {page === "home" && <HomePage goto={goto} bookings={bookings} />}
          {page === "gallery" && <GalleryPage />}
          {page === "pricing" && <PricingPage goto={goto} />}
          {page === "availability" && <AvailabilityPage bookings={bookings} goto={goto} />}
          {page === "booking-form" && (
            <BookingFormPage auth={auth} ctx={ctx} goto={goto} addBooking={addBooking} bookings={bookings} />
          )}
          {page === "booking-status" && <BookingStatusPage bookings={bookings} ctx={ctx} />}
          {page === "login" && <LoginPage login={login} goto={goto} />}
          {page === "register" && <RegisterPage register={register} goto={goto} />}

          {page === "admin-dashboard" && isAdmin && <AdminDashboard bookings={bookings} employees={employees} goto={goto} auth={auth} />}
          {page === "admin-requests" && isAdmin && <AdminRequests bookings={bookings} setBookingStatus={setBookingStatus} />}
          {page === "admin-calendar" && isAdmin && <AdminCalendarPage bookings={bookings} />}
          {page === "admin-employees" && isAdmin && (
            <AdminEmployees employees={employees} upsertEmployee={upsertEmployee} removeEmployee={removeEmployee} />
          )}
          {page === "admin-reports" && isAdmin && <AdminReports bookings={bookings} resetDemo={resetDemo} />}

          {(page.startsWith("admin-") && !isAdmin) && <AccessDenied goto={goto} />}
        </main>

        {!isAdmin && <Footer goto={goto} />}
      </div>
      {toast && <Toast toast={toast} />}
    </div>
  );
}

/* ============================== NAVBARS ============================== */

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

function ThemeToggle({ theme, setTheme }) {
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

function Navbar({ theme, setTheme, auth, logout, goto, items, page, navOpen, setNavOpen }) {
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

function AdminNavbar({ theme, setTheme, auth, logout, goto, items, page, navOpen, setNavOpen }) {
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

function Footer({ goto }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-mark"><Sparkles size={16} /></span>
          <div>
            <div className="brand-title">Al-Noor Grand Banquet</div>
            <div className="footer-tag">Where every celebration finds its light.</div>
          </div>
        </div>
        <div className="footer-cols">
          <div>
            <div className="footer-h">Explore</div>
            <button onClick={() => goto("gallery")}>Gallery</button>
            <button onClick={() => goto("pricing")}>Pricing</button>
            <button onClick={() => goto("availability")}>Availability</button>
          </div>
          <div>
            <div className="footer-h">Contact</div>
            <div className="footer-line"><MapPin size={14} /> Shahrah-e-Faisal, Karachi</div>
            <div className="footer-line"><Phone size={14} /> 021-111-266-667</div>
            <div className="footer-line"><Mail size={14} /> hello@alnoorbanquet.pk</div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Al-Noor Grand Banquet. All rights reserved.</div>
    </footer>
  );
}

function Toast({ toast }) {
  const Icon = toast.kind === "success" ? CheckCircle2 : toast.kind === "info" ? AlertCircle : AlertCircle;
  return (
    <div className={`toast toast-${toast.kind}`} key={toast.id}>
      <Icon size={16} /> <span>{toast.text}</span>
    </div>
  );
}

function AccessDenied({ goto }) {
  return (
    <div className="page-narrow center-pad">
      <ArchMotif className="deny-arch" />
      <h2 className="h2">Admins only</h2>
      <p className="muted">This area is reserved for the Al-Noor staff console. Please log in with an admin account.</p>
      <button className="btn btn-primary" onClick={() => goto("login")}>Go to Login</button>
    </div>
  );
}

/* ============================== HOME PAGE ============================== */

function StatCounter({ value, label, suffix = "" }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) { setActive(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const n = useCountUp(value, active);
  return (
    <div className="stat" ref={ref}>
      <div className="stat-num">{n.toLocaleString()}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function HomePage({ goto, bookings }) {
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
  return (
    <div>
      <section className="hero">
        <ArchMotif className="hero-arch hero-arch-1" opacity={0.9} />
        <ArchMotif className="hero-arch hero-arch-2" opacity={0.35} />
        <div className="hero-inner">
          <Reveal className="hero-eyebrow" as="div">The light of every celebration</Reveal>
          <Reveal delay={80}><h1 className="hero-title">Al-Noor Grand Banquet</h1></Reveal>
          <Reveal delay={160}><p className="hero-sub">Three signature venues, chef-crafted menus, and a coordinator dedicated to your day — from mehndi to milestone corporate galas.</p></Reveal>
          <Reveal delay={240} className="hero-ctas">
            <button className="btn btn-gold btn-lg" onClick={() => goto("availability")}>Check Availability <ArrowRight size={16} /></button>
            <button className="btn btn-outline btn-lg" onClick={() => goto("pricing")}>View Packages</button>
          </Reveal>
        </div>
        <div className="hero-stats">
          <StatCounter value={1200} suffix="+" label="Functions Hosted" />
          <StatCounter value={2000} suffix="+" label="Guest Capacity" />
          <StatCounter value={15} label="Years of Legacy" />
          <StatCounter value={3} label="Signature Halls" />
        </div>
      </section>

      <section className="section">
        <Reveal><span className="eyebrow">Why Al-Noor</span></Reveal>
        <Reveal delay={60}><h2 className="h2">Every detail, held to one standard</h2></Reveal>
        <div className="feature-grid">
          {[
            { icon: Building2, title: "Three Grand Halls", text: "From an 800-guest garden lawn to an intimate rooftop terrace — a venue for every scale." },
            { icon: PartyPopper, title: "Chef-Crafted Catering", text: "Live counters, multi-cuisine buffets, and menus tailored to your guest list." },
            { icon: UserCog, title: "Dedicated Coordinator", text: "One point of contact from booking to the last dance, so nothing falls through." },
            { icon: Sparkles, title: "Elegant Décor", text: "In-house design team builds stage, seating and lighting around your palette." },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 80} className="feature-card">
              <div className="feature-icon"><f.icon size={20} /></div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-text">{f.text}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <Reveal><span className="eyebrow">Kind words</span></Reveal>
        <Reveal delay={60}><h2 className="h2">Hosted here, remembered always</h2></Reveal>
        <div className="testimonial-grid">
          {[
            { q: "Our walima felt like it was designed for exactly us — the gold-lit stage was beyond what we imagined.", n: "Zara & Omar", f: "Walima" },
            { q: "The coordinator handled three vendor changes on the day of and we never even noticed a hiccup.", n: "Farah Traders", f: "Corporate Gala" },
            { q: "Guests are still talking about the garden lawn setup — the fairy lights against the marquee were magic.", n: "Ahmed Family", f: "Mehndi" },
          ].map((t, i) => (
            <Reveal key={t.n} delay={i * 100} className="testimonial-card">
              <div className="stars">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={13} fill="var(--c-gold)" stroke="none" />)}</div>
              <p className="testimonial-q">"{t.q}"</p>
              <div className="testimonial-n">{t.n} <span className="muted">· {t.f}</span></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <Reveal className="cta-band-inner">
          <div>
            <h2 className="h2 light">Ready to host your celebration?</h2>
            <p className="cta-sub">{confirmedCount}+ functions already confirmed this season — reserve your date before it's gone.</p>
          </div>
          <button className="btn btn-gold btn-lg" onClick={() => goto("booking-form")}>Start Booking <ArrowRight size={16} /></button>
        </Reveal>
      </section>
    </div>
  );
}

/* ============================== GALLERY ============================== */

const GALLERY_ITEMS = [
  { id: 1, cat: "Halls", title: "Grand Hall — Stage View", tone: "maroon" },
  { id: 2, cat: "Halls", title: "Garden Lawn — Dusk", tone: "gold" },
  { id: 3, cat: "Halls", title: "Rooftop Terrace — Night", tone: "ink" },
  { id: 4, cat: "Décor", title: "Floral Mehndi Stage", tone: "gold" },
  { id: 5, cat: "Décor", title: "Walima Centerpiece", tone: "maroon" },
  { id: 6, cat: "Décor", title: "Corporate Backdrop", tone: "ink" },
  { id: 7, cat: "Seating", title: "Royal Banquet Rounds", tone: "maroon" },
  { id: 8, cat: "Seating", title: "Lounge Reception Set", tone: "gold" },
  { id: 9, cat: "Catering", title: "Live Grill Counter", tone: "ink" },
  { id: 10, cat: "Catering", title: "Dessert Table", tone: "gold" },
  { id: 11, cat: "Seating", title: "Garden Ceremony Chairs", tone: "maroon" },
  { id: 12, cat: "Catering", title: "Multi-Cuisine Buffet", tone: "ink" },
];
const CATS = ["All", "Halls", "Décor", "Seating", "Catering"];

function GalleryTile({ item, onOpen }) {
  return (
    <button className={`gallery-tile tone-${item.tone}`} onClick={() => onOpen(item)}>
      <div className="gallery-tile-pattern" />
      <div className="gallery-tile-cap">
        <ImageIcon size={16} />
        <span>{item.title}</span>
      </div>
    </button>
  );
}

function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const items = filter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.cat === filter);
  const idx = lightbox ? items.findIndex((i) => i.id === lightbox.id) : -1;

  const move = (dir) => {
    const next = (idx + dir + items.length) % items.length;
    setLightbox(items[next]);
  };

  return (
    <div className="page">
      <Reveal><span className="eyebrow">Visual gallery</span></Reveal>
      <Reveal delay={60}><h1 className="h1">A glimpse of every setup</h1></Reveal>
      <Reveal delay={100}><p className="muted page-lede">Art-directed placeholders standing in for our real event photography — colour and texture map to each category below.</p></Reveal>

      <div className="chip-row">
        {CATS.map((c) => (
          <button key={c} className={`chip ${filter === c ? "chip-active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>

      <div className="gallery-grid">
        {items.map((it, i) => (
          <Reveal key={it.id} delay={(i % 4) * 60}>
            <GalleryTile item={it} onOpen={setLightbox} />
          </Reveal>
        ))}
      </div>

      {lightbox && (
        <div className="lightbox-backdrop" onClick={() => setLightbox(null)}>
          <div className={`lightbox tone-${lightbox.tone}`} onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-pattern" />
            <button className="icon-btn lightbox-close" onClick={() => setLightbox(null)}><X size={18} /></button>
            <button className="icon-btn lightbox-nav lightbox-prev" onClick={() => move(-1)}><ChevronLeft size={20} /></button>
            <button className="icon-btn lightbox-nav lightbox-next" onClick={() => move(1)}><ChevronRight size={20} /></button>
            <div className="lightbox-cap">
              <div className="lightbox-cat">{lightbox.cat}</div>
              <div className="lightbox-title">{lightbox.title}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================== PRICING ============================== */

function PricingPage({ goto }) {
  return (
    <div className="page">
      <Reveal><span className="eyebrow">Packages</span></Reveal>
      <Reveal delay={60}><h1 className="h1">Simple pricing, fully catered</h1></Reveal>
      <Reveal delay={100}><p className="muted page-lede">Every package includes hall rental, décor, catering and sound — choose the tier that fits your guest list.</p></Reveal>

      <div className="pricing-grid">
        {PACKAGES.map((p, i) => (
          <Reveal key={p.id} delay={i * 100} className={`price-card ${p.popular ? "price-card-popular" : ""}`}>
            {p.popular && <div className="popular-badge">Most Popular</div>}
            <div className="price-name">{p.name}</div>
            <div className="price-amount">{fmtMoney(p.price)}<span className="price-suffix">/ function</span></div>
            <div className="price-cap">Up to {p.capacity} guests</div>
            <ul className="price-features">
              {p.features.map((f) => (
                <li key={f}><Check size={15} className="check-ico" /> {f}</li>
              ))}
            </ul>
            <button className={`btn ${p.popular ? "btn-gold" : "btn-outline"} btn-block`} onClick={() => goto("booking-form", { pkg: p.name })}>
              Select {p.name}
            </button>
          </Reveal>
        ))}
      </div>

      <Reveal className="rate-table-wrap">
        <h2 className="h2">Per-function rate guide</h2>
        <div className="table-scroll">
          <table className="rate-table">
            <thead>
              <tr><th>Function</th><th>Grand Hall</th><th>Garden Lawn</th><th>Rooftop Terrace</th></tr>
            </thead>
            <tbody>
              {FUNCTION_TYPES.map((f, i) => (
                <tr key={f}>
                  <td>{f}</td>
                  <td>{fmtMoney(150000 + i * 12000)}</td>
                  <td>{fmtMoney(140000 + i * 11000)}</td>
                  <td>{fmtMoney(110000 + i * 9000)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  );
}

/* ============================== AVAILABILITY / CALENDAR CORE ============================== */

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function useMonthGrid(viewDate) {
  return useMemo(() => {
    const year = viewDate.getFullYear(), month = viewDate.getMonth();
    const first = new Date(year, month, 1);
    const startDow = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startDow; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return cells;
  }, [viewDate]);
}

function AvailabilityPage({ bookings, goto }) {
  const [viewDate, setViewDate] = useState(new Date());
  const cells = useMonthGrid(viewDate);
  const todayISO = toISO(new Date());

  const byDate = useMemo(() => {
    const map = {};
    bookings.forEach((b) => {
      if (b.status === "rejected") return;
      map[b.date] = map[b.date] || [];
      map[b.date].push(b);
    });
    return map;
  }, [bookings]);

  const dayState = (iso) => {
    const list = byDate[iso] || [];
    if (list.some((b) => b.status === "confirmed")) return "booked";
    if (list.some((b) => b.status === "pending")) return "pending";
    return "available";
  };

  return (
    <div className="page">
      <Reveal><span className="eyebrow">Availability</span></Reveal>
      <Reveal delay={60}><h1 className="h1">Find your date</h1></Reveal>
      <Reveal delay={100}><p className="muted page-lede">Green dates are open. Tap one to start your booking — gold means a hold is pending, maroon is already confirmed.</p></Reveal>

      <Reveal className="calendar-card">
        <div className="calendar-head">
          <button className="icon-btn" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}><ChevronLeft size={18} /></button>
          <div className="calendar-title">{MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}</div>
          <button className="icon-btn" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}><ChevronRight size={18} /></button>
        </div>
        <div className="calendar-grid calendar-weekdays">
          {WEEKDAYS.map((w) => <div key={w} className="calendar-weekday">{w}</div>)}
        </div>
        <div className="calendar-grid">
          {cells.map((d, i) => {
            if (!d) return <div key={i} className="calendar-cell calendar-cell-empty" />;
            const iso = toISO(d);
            const past = iso < todayISO;
            const state = dayState(iso);
            const cls = past ? "cal-past" : state === "booked" ? "cal-booked" : state === "pending" ? "cal-pending" : "cal-available";
            return (
              <button
                key={i}
                className={`calendar-cell ${cls} ${iso === todayISO ? "cal-today" : ""}`}
                disabled={past || state === "booked"}
                onClick={() => state === "available" && !past && goto("booking-form", { date: iso })}
                title={iso}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
        <div className="calendar-legend">
          <span><i className="dot dot-available" /> Available</span>
          <span><i className="dot dot-pending" /> Pending hold</span>
          <span><i className="dot dot-booked" /> Confirmed</span>
        </div>
      </Reveal>
    </div>
  );
}

/* ============================== BOOKING FORM ============================== */

function Field({ label, children, error }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {error && <span className="field-error"><AlertCircle size={12} /> {error}</span>}
    </label>
  );
}

function BookingFormPage({ auth, ctx, goto, addBooking, bookings }) {
  const [form, setForm] = useState({
    guestName: auth ? auth.name : "",
    phone: "",
    email: auth ? auth.email : "",
    functionType: FUNCTION_TYPES[0],
    hallType: HALLS[0].name,
    date: ctx.date || "",
    time: "Evening",
    guests: "",
    pkg: ctx.pkg || "Gold",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  if (!auth) {
    return (
      <div className="page-narrow center-pad">
        <ArchMotif className="deny-arch" />
        <h2 className="h2">Log in to book</h2>
        <p className="muted">Create a free account or log in to reserve a date at Al-Noor Grand Banquet.</p>
        <div className="row-gap">
          <button className="btn btn-primary" onClick={() => goto("login")}>Log in</button>
          <button className="btn btn-outline" onClick={() => goto("register")}>Register</button>
        </div>
      </div>
    );
  }

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.guestName.trim()) e.guestName = "Name is required.";
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.date) e.date = "Select a date.";
    else if (form.date < toISO(new Date())) e.date = "Date cannot be in the past.";
    const g = Number(form.guests);
    if (!g || g < 10) e.guests = "Enter guest count (min 10).";
    const pkg = PACKAGES.find((p) => p.name === form.pkg);
    if (pkg && g > pkg.capacity) e.guests = `${form.pkg} package covers up to ${pkg.capacity} guests.`;
    const conflict = bookings.some((b) => b.date === form.date && b.hallType === form.hallType && b.status === "confirmed");
    if (conflict) e.date = "This hall is already confirmed for that date — pick another date or hall.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const pkg = PACKAGES.find((p) => p.name === form.pkg);
    const rec = addBooking({
      guestName: form.guestName, phone: form.phone, email: form.email,
      functionType: form.functionType, hallType: form.hallType, date: form.date,
      time: form.time, guests: Number(form.guests), pkg: form.pkg, price: pkg.price,
      notes: form.notes, createdBy: auth.email,
    });
    setResult(rec);
  };

  if (result) {
    return (
      <div className="page-narrow center-pad">
        <div className="confirm-icon"><CheckCircle2 size={40} /></div>
        <h2 className="h2">Request submitted</h2>
        <p className="muted">We've received your booking request. Our coordinator will confirm within 24 hours.</p>
        <div className="ref-pill">{result.ref}</div>
        <div className="summary-card">
          <div className="summary-row"><span>Function</span><b>{result.functionType}</b></div>
          <div className="summary-row"><span>Hall</span><b>{result.hallType}</b></div>
          <div className="summary-row"><span>Date</span><b>{fmtDate(result.date)} · {result.time}</b></div>
          <div className="summary-row"><span>Guests</span><b>{result.guests}</b></div>
          <div className="summary-row"><span>Package</span><b>{result.pkg} — {fmtMoney(result.price)}</b></div>
        </div>
        <div className="row-gap">
          <button className="btn btn-primary" onClick={() => goto("booking-status", { ref: result.ref })}>Track this booking</button>
          <button className="btn btn-outline" onClick={() => goto("home")}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-narrow">
      <Reveal><span className="eyebrow">Reserve your date</span></Reveal>
      <Reveal delay={60}><h1 className="h1">Booking Request</h1></Reveal>
      <Reveal delay={100}>
        <form className="form-card" onSubmit={submit} noValidate>
          <div className="form-grid">
            <Field label="Full name" error={errors.guestName}>
              <input className="input" value={form.guestName} onChange={(e) => set("guestName", e.target.value)} />
            </Field>
            <Field label="Phone" error={errors.phone}>
              <input className="input" placeholder="0300-1234567" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
            </Field>
            <Field label="Email" error={errors.email}>
              <input className="input" value={form.email} onChange={(e) => set("email", e.target.value)} />
            </Field>
            <Field label="Function type">
              <select className="input" value={form.functionType} onChange={(e) => set("functionType", e.target.value)}>
                {FUNCTION_TYPES.map((f) => <option key={f}>{f}</option>)}
              </select>
            </Field>
            <Field label="Hall">
              <select className="input" value={form.hallType} onChange={(e) => set("hallType", e.target.value)}>
                {HALLS.map((h) => <option key={h.name}>{h.name}</option>)}
              </select>
            </Field>
            <Field label="Date" error={errors.date}>
              <input type="date" className="input" value={form.date} onChange={(e) => set("date", e.target.value)} />
            </Field>
            <Field label="Time slot">
              <div className="radio-row">
                {["Day", "Evening"].map((t) => (
                  <button type="button" key={t} className={`radio-pill ${form.time === t ? "radio-pill-active" : ""}`} onClick={() => set("time", t)}>{t}</button>
                ))}
              </div>
            </Field>
            <Field label="Guest count" error={errors.guests}>
              <input type="number" className="input" value={form.guests} onChange={(e) => set("guests", e.target.value)} />
            </Field>
            <Field label="Package">
              <select className="input" value={form.pkg} onChange={(e) => set("pkg", e.target.value)}>
                {PACKAGES.map((p) => <option key={p.id}>{p.name}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Special notes (optional)">
            <textarea className="input textarea" rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} />
          </Field>
          <button className="btn btn-primary btn-lg btn-block" type="submit">Submit Booking Request</button>
        </form>
      </Reveal>
    </div>
  );
}

/* ============================== BOOKING STATUS ============================== */

const STEPS = ["Submitted", "Under Review", "Decision"];

function BookingStatusPage({ bookings, ctx }) {
  const [refInput, setRefInput] = useState(ctx.ref || "");
  const [searched, setSearched] = useState(!!ctx.ref);
  const found = bookings.find((b) => b.ref.toLowerCase() === refInput.trim().toLowerCase());

  const stepIndex = !found ? 0 : found.status === "pending" ? 1 : 2;

  return (
    <div className="page-narrow">
      <Reveal><span className="eyebrow">Track request</span></Reveal>
      <Reveal delay={60}><h1 className="h1">Booking Status</h1></Reveal>
      <Reveal delay={100} className="lookup-row">
        <input className="input" placeholder="Enter reference e.g. ANB-2026-1234" value={refInput} onChange={(e) => setRefInput(e.target.value)} />
        <button className="btn btn-primary" onClick={() => setSearched(true)}><Search size={16} /> Find</button>
      </Reveal>

      {searched && !found && (
        <Reveal className="empty-state">
          <AlertCircle size={28} />
          <p>No booking found for that reference. Double-check the code we emailed you.</p>
        </Reveal>
      )}

      {found && (
        <Reveal className="status-card">
          <div className="status-head">
            <div className="ref-pill">{found.ref}</div>
            <span className={`badge ${STATUS_META[found.status].cls}`}>{STATUS_META[found.status].label}</span>
          </div>

          <div className="stepper">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className={`step ${i <= stepIndex ? "step-done" : ""} ${found.status === "rejected" && i === 2 ? "step-rejected" : ""}`}>
                  <div className="step-dot">{i < stepIndex || (i === stepIndex && found.status !== "pending") ? <Check size={12} /> : i + 1}</div>
                  <div className="step-label">{i === 2 ? (found.status === "pending" ? "Decision" : STATUS_META[found.status].label) : s}</div>
                </div>
                {i < STEPS.length - 1 && <div className={`step-line ${i < stepIndex ? "step-line-done" : ""}`} />}
              </React.Fragment>
            ))}
          </div>

          <div className="summary-card">
            <div className="summary-row"><span>Guest</span><b>{found.guestName}</b></div>
            <div className="summary-row"><span>Function</span><b>{found.functionType}</b></div>
            <div className="summary-row"><span>Hall</span><b>{found.hallType}</b></div>
            <div className="summary-row"><span>Date</span><b>{fmtDate(found.date)} · {found.time}</b></div>
            <div className="summary-row"><span>Guests</span><b>{found.guests}</b></div>
            <div className="summary-row"><span>Package</span><b>{found.pkg} — {fmtMoney(found.price)}</b></div>
            {found.notes && <div className="summary-row"><span>Notes</span><b>{found.notes}</b></div>}
          </div>
        </Reveal>
      )}
    </div>
  );
}

/* ============================== AUTH PAGES ============================== */

function AuthShell({ title, sub, children }) {
  return (
    <div className="auth-wrap">
      <div className="auth-side">
        <ArchMotif className="auth-arch" />
        <div className="auth-side-text">
          <div className="brand-title light">Al-Noor</div>
          <div className="brand-sub light">Grand Banquet</div>
        </div>
      </div>
      <div className="auth-form-col">
        <Reveal className="auth-box">
          <h1 className="h2">{title}</h1>
          <p className="muted">{sub}</p>
          {children}
        </Reveal>
      </div>
    </div>
  );
}

function LoginPage({ login, goto }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const r = login(email, password);
    if (!r.ok) setErr(r.msg);
  };

  return (
    <AuthShell title="Welcome back" sub="Log in to manage your booking or the console.">
      <form className="form-card form-card-plain" onSubmit={submit} noValidate>
        <Field label="Email"><input className="input" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
        <Field label="Password"><input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} /></Field>
        {err && <div className="form-error"><AlertCircle size={14} /> {err}</div>}
        <button className="btn btn-primary btn-block" type="submit">Log In</button>
        <div className="demo-hint">
          Demo — Admin: <code>admin@alnoor.com / admin123</code><br />
          Demo — User: <code>ayesha@example.com / user123</code>
        </div>
        <div className="auth-switch">No account? <button type="button" onClick={() => goto("register")}>Register</button></div>
      </form>
    </AuthShell>
  );
}

function RegisterPage({ register, goto }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", role: "user" });
  const [errors, setErrors] = useState({});
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Name required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email.";
    if (form.password.length < 6) err.password = "Minimum 6 characters.";
    if (form.password !== form.confirm) err.confirm = "Passwords don't match.";
    setErrors(err);
    if (Object.keys(err).length) return;
    const r = register(form);
    if (!r.ok) setErrors({ email: r.msg });
  };

  return (
    <AuthShell title="Create your account" sub="Register as a guest to book, or as staff to manage the console.">
      <form className="form-card form-card-plain" onSubmit={submit} noValidate>
        <Field label="Full name" error={errors.name}><input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field label="Email" error={errors.email}><input className="input" value={form.email} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field label="Password" error={errors.password}><input type="password" className="input" value={form.password} onChange={(e) => set("password", e.target.value)} /></Field>
        <Field label="Confirm password" error={errors.confirm}><input type="password" className="input" value={form.confirm} onChange={(e) => set("confirm", e.target.value)} /></Field>
        <Field label="Account type">
          <div className="radio-row">
            <button type="button" className={`radio-pill ${form.role === "user" ? "radio-pill-active" : ""}`} onClick={() => set("role", "user")}>Guest / User</button>
            <button type="button" className={`radio-pill ${form.role === "admin" ? "radio-pill-active" : ""}`} onClick={() => set("role", "admin")}>Staff / Admin</button>
          </div>
          {form.role === "admin" && <span className="field-hint">Demo only — in production, admin accounts would be provisioned by an existing admin.</span>}
        </Field>
        <button className="btn btn-primary btn-block" type="submit">Create Account</button>
        <div className="auth-switch">Already registered? <button type="button" onClick={() => goto("login")}>Log in</button></div>
      </form>
    </AuthShell>
  );
}

/* ============================== ADMIN: DASHBOARD ============================== */

function KpiCard({ icon: Icon, label, value, tone = "maroon" }) {
  return (
    <Reveal className={`kpi-card kpi-${tone}`}>
      <div className="kpi-icon"><Icon size={18} /></div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
    </Reveal>
  );
}

function AdminDashboard({ bookings, employees, goto, auth }) {
  const todayISO = toISO(new Date());
  const today = bookings.find((b) => b.date === todayISO && b.status !== "rejected");
  const pending = bookings.filter((b) => b.status === "pending").length;
  const now = new Date();
  const confirmedThisMonth = bookings.filter((b) => {
    const d = new Date(b.date + "T00:00:00");
    return b.status === "confirmed" && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const revenue = bookings.filter((b) => b.status === "confirmed").reduce((s, b) => s + b.price, 0);

  return (
    <div className="page">
      <Reveal><span className="eyebrow">Welcome back, {auth.name.split(" ")[0]}</span></Reveal>
      <Reveal delay={60}><h1 className="h1">Console Dashboard</h1></Reveal>

      <Reveal delay={100} className="today-card">
        {today ? (
          <>
            <div className="today-eyebrow">Today's Function</div>
            <div className="today-title">{today.guestName} — {today.functionType}</div>
            <div className="today-meta">
              <span><Building2 size={14} /> {today.hallType}</span>
              <span><Users size={14} /> {today.guests} guests</span>
              <span><Clock size={14} /> {today.time}</span>
              <span className={`badge ${STATUS_META[today.status].cls}`}>{STATUS_META[today.status].label}</span>
            </div>
          </>
        ) : (
          <>
            <div className="today-eyebrow">Today's Function</div>
            <div className="today-title">No function scheduled today</div>
            <div className="today-meta muted">Enjoy the calm before the next event.</div>
          </>
        )}
      </Reveal>

      <div className="kpi-grid">
        <KpiCard icon={ClipboardList} label="Total Bookings" value={bookings.length} tone="maroon" />
        <KpiCard icon={AlertCircle} label="Pending Requests" value={pending} tone="gold" />
        <KpiCard icon={CheckCircle2} label="Confirmed This Month" value={confirmedThisMonth} tone="green" />
        <KpiCard icon={BarChart3} label="Revenue (Confirmed)" value={fmtMoney(revenue)} tone="blue" />
      </div>

      <h2 className="h2 section-gap">Quick actions</h2>
      <div className="quick-grid">
        {[
          { id: "admin-requests", icon: ClipboardList, label: "Booking Requests", sub: `${pending} awaiting review` },
          { id: "admin-calendar", icon: CalendarIcon, label: "Calendar", sub: "View by month" },
          { id: "admin-employees", icon: UserCog, label: "Employees", sub: `${employees.length} on staff` },
          { id: "admin-reports", icon: BarChart3, label: "Reports", sub: "Revenue & utilization" },
        ].map((q, i) => (
          <Reveal key={q.id} delay={i * 70} as="button" className="quick-tile" >
            <span onClick={() => goto(q.id)} className="quick-tile-inner">
              <q.icon size={20} />
              <span className="quick-label">{q.label}</span>
              <span className="quick-sub">{q.sub}</span>
            </span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ============================== ADMIN: REQUESTS ============================== */

function AdminRequests({ bookings, setBookingStatus }) {
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = bookings.filter((b) => {
    if (tab !== "all" && b.status !== tab) return false;
    if (query && !(`${b.guestName} ${b.ref}`.toLowerCase().includes(query.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="page">
      <Reveal><span className="eyebrow">Manage</span></Reveal>
      <Reveal delay={60}><h1 className="h1">Booking Requests</h1></Reveal>

      <Reveal delay={100} className="toolbar">
        <div className="tabs">
          {["all", "pending", "confirmed", "rejected"].map((t) => (
            <button key={t} className={`tab ${tab === t ? "tab-active" : ""}`} onClick={() => setTab(t)}>
              {t === "all" ? "All" : STATUS_META[t].label}
            </button>
          ))}
        </div>
        <div className="search-box">
          <Search size={15} />
          <input placeholder="Search name or reference" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </Reveal>

      <Reveal delay={140} className="table-scroll">
        <table className="data-table">
          <thead>
            <tr><th>Ref</th><th>Name</th><th>Function</th><th>Date</th><th>Hall</th><th>Guests</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="row-clickable" onClick={() => setSelected(b)}>
                <td className="mono">{b.ref}</td>
                <td>{b.guestName}</td>
                <td>{b.functionType}</td>
                <td>{fmtDate(b.date)}</td>
                <td>{b.hallType}</td>
                <td>{b.guests}</td>
                <td><span className={`badge ${STATUS_META[b.status].cls}`}>{STATUS_META[b.status].label}</span></td>
                <td><button className="icon-btn" onClick={(e) => { e.stopPropagation(); setSelected(b); }}><Eye size={15} /></button></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="empty-cell">No matching requests.</td></tr>
            )}
          </tbody>
        </table>
      </Reveal>

      {selected && (
        <div className="drawer-backdrop" onClick={() => setSelected(null)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <div className="ref-pill">{selected.ref}</div>
              <button className="icon-btn" onClick={() => setSelected(null)}><X size={18} /></button>
            </div>
            <span className={`badge ${STATUS_META[selected.status].cls}`}>{STATUS_META[selected.status].label}</span>
            <div className="summary-card">
              <div className="summary-row"><span>Booking By</span><b>{selected.Name}</b></div>
              <div className="summary-row"><span>Phone</span><b>{selected.phone}</b></div>
              <div className="summary-row"><span>Email</span><b>{selected.email}</b></div>
              <div className="summary-row"><span>Function</span><b>{selected.functionType}</b></div>
              <div className="summary-row"><span>Hall</span><b>{selected.hallType}</b></div>
              <div className="summary-row"><span>Date</span><b>{fmtDate(selected.date)} · {selected.time}</b></div>
              <div className="summary-row"><span>Guests</span><b>{selected.guests}</b></div>
              <div className="summary-row"><span>Package</span><b>{selected.pkg} — {fmtMoney(selected.price)}</b></div>
              {selected.notes && <div className="summary-row"><span>Notes</span><b>{selected.notes}</b></div>}
            </div>
            {selected.status === "pending" && (
              <div className="row-gap">
                <button className="btn btn-primary btn-block" onClick={() => { setBookingStatus(selected.id, "confirmed"); setSelected({ ...selected, status: "confirmed" }); }}>
                  <Check size={16} /> Confirm
                </button>
                <button className="btn btn-danger btn-block" onClick={() => { setBookingStatus(selected.id, "rejected"); setSelected({ ...selected, status: "rejected" }); }}>
                  <XCircle size={16} /> Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================== ADMIN: CALENDAR ============================== */

function AdminCalendarPage({ bookings }) {
  const [viewDate, setViewDate] = useState(new Date());
  const cells = useMonthGrid(viewDate);
  const [selectedDay, setSelectedDay] = useState(null);

  const byDate = useMemo(() => {
    const map = {};
    bookings.forEach((b) => { map[b.date] = map[b.date] || []; map[b.date].push(b); });
    return map;
  }, [bookings]);

  const dayList = selectedDay ? (byDate[selectedDay] || []) : [];

  return (
    <div className="page">
      <Reveal><span className="eyebrow">Schedule</span></Reveal>
      <Reveal delay={60}><h1 className="h1">Booking Calendar</h1></Reveal>

      <Reveal delay={100} className="calendar-card">
        <div className="calendar-head ">
          <button className="icon-btn" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}><ChevronLeft size={18} /></button>
          <div className="calendar-title">{MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}</div>
          <button className="icon-btn" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}><ChevronRight size={18} /></button>
        </div>
        <div className="calendar-grid calendar-weekdays">
          {WEEKDAYS.map((w) => <div key={w} className="calendar-weekday">{w}</div>)}
        </div>
        <div className="calendar-grid">
          {cells.map((d, i) => {
            if (!d) return <div key={i} className="calendar-cell calendar-cell-empty" />;
            const iso = toISO(d);
            const list = byDate[iso] || [];
            const hasConfirmed = list.some((b) => b.status === "confirmed");
            const hasPending = list.some((b) => b.status === "pending");
            return (
              <button key={i} className={`calendar-cell cal-admin ${selectedDay === iso ? "cal-selected" : ""}`} onClick={() => setSelectedDay(iso)}>
                {d.getDate()}
                <span className="cal-dots">
                  {hasConfirmed && <i className="dot dot-booked" />}
                  {hasPending && <i className="dot dot-pending" />}
                </span>
              </button>
            );
          })}
        </div>
        <div className="calendar-legend">
          <span><i className="dot dot-pending" /> Pending</span>
          <span><i className="dot dot-booked" /> Confirmed</span>
        </div>
      </Reveal>

      {selectedDay && (
        <Reveal className="day-list">
          <h3 className="h3">{fmtDate(selectedDay)}</h3>
          {dayList.length === 0 && <p className="muted">No bookings on this date.</p>}
          {dayList.map((b) => (
            <div key={b.id} className="day-list-row">
              <div>
                <b>{b.guestName}</b> <span className="muted">· {b.functionType} · {b.hallType}</span>
              </div>
              <span className={`badge ${STATUS_META[b.status].cls}`}>{STATUS_META[b.status].label}</span>
            </div>
          ))}
        </Reveal>
      )}
    </div>
  );
}

/* ============================== ADMIN: EMPLOYEES ============================== */

function EmployeeForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || { name: "", role: EMP_ROLES[0], phone: "", email: "", salary: "", joinDate: toISO(new Date()) });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.salary) return;
    onSave({ ...form, salary: Number(form.salary) });
  };
  return (
    <div className="drawer-backdrop" onClick={onCancel}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <h3 className="h3">{initial ? "Edit Employee" : "Add Employee"}</h3>
          <button className="icon-btn" onClick={onCancel}><X size={18} /></button>
        </div>
        <form className="form-card form-card-plain" onSubmit={submit}>
          <Field label="Full name"><input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} /></Field>
          <Field label="Role">
            <select className="input" value={form.role} onChange={(e) => set("role", e.target.value)}>
              {EMP_ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Phone"><input className="input" value={form.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
          <Field label="Email"><input className="input" value={form.email} onChange={(e) => set("email", e.target.value)} /></Field>
          <Field label="Monthly salary (PKR)"><input type="number" className="input" value={form.salary} onChange={(e) => set("salary", e.target.value)} /></Field>
          <Field label="Join date"><input type="date" className="input" value={form.joinDate} onChange={(e) => set("joinDate", e.target.value)} /></Field>
          <button className="btn btn-primary btn-block" type="submit">{initial ? "Save Changes" : "Add Employee"}</button>
        </form>
      </div>
    </div>
  );
}

function AdminEmployees({ employees, upsertEmployee, removeEmployee }) {
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [confirmDel, setConfirmDel] = useState(null);

  const totalPayroll = employees.reduce((s, e) => s + e.salary, 0);
  const byRole = EMP_ROLES.map((r) => ({ role: r, count: employees.filter((e) => e.role === r).length }));

  return (
    <div className="page">
      <Reveal><span className="eyebrow">Staff</span></Reveal>
      <div className="page-head-row">
        <Reveal delay={40}><h1 className="h1">Employees</h1></Reveal>
        <Reveal delay={80}><button className="btn btn-primary" onClick={() => setAdding(true)}><Plus size={16} /> Add Employee</button></Reveal>
      </div>

      <Reveal delay={100} className="payroll-card">
        <div className="payroll-total">
          <div className="kpi-label">Monthly Payroll</div>
          <div className="payroll-amount">{fmtMoney(totalPayroll)}</div>
        </div>
        <div className="payroll-breakdown">
          {byRole.filter((r) => r.count > 0).map((r) => (
            <div key={r.role} className="payroll-chip">{r.role} <b>{r.count}</b></div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={140} className="table-scroll">
        <table className="data-table">
          <thead><tr><th>Name</th><th>Role</th><th>Phone</th><th>Email</th><th>Salary</th><th>Joined</th><th></th></tr></thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td><span className="chip chip-static">{e.role}</span></td>
                <td>{e.phone}</td>
                <td className="mono">{e.email}</td>
                <td>{fmtMoney(e.salary)}</td>
                <td>{fmtDate(e.joinDate)}</td>
                <td className="table-actions">
                  <button className="icon-btn" onClick={() => setEditing(e)}><Pencil size={14} /></button>
                  <button className="icon-btn icon-btn-danger" onClick={() => setConfirmDel(e)}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      {(adding || editing) && (
        <EmployeeForm
          initial={editing}
          onCancel={() => { setAdding(false); setEditing(null); }}
          onSave={(data) => { upsertEmployee(editing ? { ...data, id: editing.id } : data); setAdding(false); setEditing(null); }}
        />
      )}

      {confirmDel && (
        <div className="drawer-backdrop" onClick={() => setConfirmDel(null)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="h3">Remove {confirmDel.name}?</h3>
            <p className="muted">This can't be undone.</p>
            <div className="row-gap">
              <button className="btn btn-outline btn-block" onClick={() => setConfirmDel(null)}>Cancel</button>
              <button className="btn btn-danger btn-block" onClick={() => { removeEmployee(confirmDel.id); setConfirmDel(null); }}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================== ADMIN: REPORTS ============================== */

function AdminReports({ bookings, resetDemo }) {
  const confirmed = bookings.filter((b) => b.status === "confirmed");
  const totalRevenue = confirmed.reduce((s, b) => s + b.price, 0);
  const avgGuests = bookings.length ? Math.round(bookings.reduce((s, b) => s + b.guests, 0) / bookings.length) : 0;
  const confirmationRate = bookings.length ? Math.round((confirmed.length / bookings.length) * 100) : 0;

  const byFunction = FUNCTION_TYPES.map((f) => ({ name: f, count: bookings.filter((b) => b.functionType === f).length }));
  const byHall = HALLS.map((h) => ({ name: h.name, value: bookings.filter((b) => b.hallType === h.name).length }));

  const monthly = useMemo(() => {
    const now = new Date();
    const out = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = d.toLocaleDateString("en-GB", { month: "short" });
      const rev = confirmed.filter((b) => {
        const bd = new Date(b.date + "T00:00:00");
        return bd.getMonth() === d.getMonth() && bd.getFullYear() === d.getFullYear();
      }).reduce((s, b) => s + b.price, 0);
      out.push({ month: label, revenue: rev });
    }
    return out;
  }, [confirmed]);

  return (
    <div className="page">
      <Reveal><span className="eyebrow">Insights</span></Reveal>
      <div className="page-head-row">
        <Reveal delay={40}><h1 className="h1">Reports</h1></Reveal>
        <Reveal delay={80}><button className="btn btn-outline btn-sm" onClick={resetDemo}><RotateCcw size={14} /> Reset demo data</button></Reveal>
      </div>

      <div className="kpi-grid">
        <KpiCard icon={BarChart3} label="Total Revenue" value={fmtMoney(totalRevenue)} tone="maroon" />
        <KpiCard icon={ClipboardList} label="Total Bookings" value={bookings.length} tone="gold" />
        <KpiCard icon={Users} label="Avg. Guests / Event" value={avgGuests} tone="green" />
        <KpiCard icon={CheckCircle2} label="Confirmation Rate" value={confirmationRate + "%"} tone="blue" />
      </div>

      <div className="chart-grid">
        <Reveal className="chart-card">
          <h3 className="h3">Bookings by Function Type</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={byFunction}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--c-border)" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--c-text-soft)" }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "var(--c-text-soft)" }} />
              <RTooltip contentStyle={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" fill="var(--c-maroon)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Reveal>

        <Reveal delay={80} className="chart-card">
          <h3 className="h3">Hall Utilization</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={byHall} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={(d) => d.name}>
                {byHall.map((entry, i) => <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <RTooltip contentStyle={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Reveal>

        <Reveal delay={140} className="chart-card chart-card-wide">
          <h3 className="h3">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--c-border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--c-text-soft)" }} />
              <YAxis tick={{ fontSize: 11, fill: "var(--c-text-soft)" }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <RTooltip formatter={(v) => fmtMoney(v)} contentStyle={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="revenue" stroke="var(--c-gold)" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Reveal>
      </div>

      <Reveal delay={180} className="table-scroll section-gap">
        <table className="data-table">
          <thead><tr><th>Ref</th><th>Guest</th><th>Function</th><th>Date</th><th>Guests</th><th>Revenue</th><th>Status</th></tr></thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td className="mono">{b.ref}</td>
                <td>{b.guestName}</td>
                <td>{b.functionType}</td>
                <td>{fmtDate(b.date)}</td>
                <td>{b.guests}</td>
                <td>{fmtMoney(b.price)}</td>
                <td><span className={`badge ${STATUS_META[b.status].cls}`}>{STATUS_META[b.status].label}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </div>
  );
}

/* ============================== GLOBAL STYLE ============================== */

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Outfit:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

      :root, .app-shell {
        --c-bg: #FAF7F2; --c-bg-alt: #F3ECE0; --c-surface: #FFFFFF;
        --c-maroon: #8B1A2F; --c-maroon-deep: #6B1322; --c-maroon-rgb: 139,26,47;
        --c-gold: #C4923A; --c-gold-light: #E4C489;
        --c-text: #2B2320; --c-text-soft: #6B5D54;
        --c-border: rgba(139,26,47,0.12);
        --c-success: #3F7D4F; --c-success-bg: #E4F2E6;
        --c-pending: #B8791A; --c-pending-bg: #FBEEDA;
        --c-reject: #B03A2E; --c-reject-bg: #FBE4E1;
        --shadow-sm: 0 1px 3px rgba(43,35,32,0.08);
        --shadow-md: 0 8px 24px rgba(43,35,32,0.10);
        --shadow-lg: 0 20px 50px rgba(43,35,32,0.16);
        --radius: 14px;
        color-scheme: light;
      }
      .dark, .dark .app-shell {
        --c-bg: #1C1714; --c-bg-alt: #241C18; --c-surface: #2A211C;
        --c-maroon: #C1596E; --c-maroon-deep: #8B3348; --c-maroon-rgb: 193,89,110;
        --c-gold: #C9A272; --c-gold-light: #DCC098;
        --c-text: #F3ECE3; --c-text-soft: #B8A99C;
        --c-border: rgba(196,146,58,0.20);
        --c-success: #7FCB8E; --c-success-bg: rgba(63,125,79,0.20);
        --c-pending: #E5B462; --c-pending-bg: rgba(184,121,26,0.20);
        --c-reject: #E48A7C; --c-reject-bg: rgba(176,58,46,0.22);
        --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
        --shadow-md: 0 8px 24px rgba(0,0,0,0.35);
        --shadow-lg: 0 20px 50px rgba(0,0,0,0.5);
        color-scheme: dark;
      }

      * { box-sizing: border-box; }
      .app-shell {
        font-family: 'Outfit', sans-serif;
        background: var(--c-bg);
        color: var(--c-text);
        min-height: 100vh;
        transition: background 0.4s ease, color 0.4s ease;
      }
      .mono { font-family: 'DM Mono', monospace; }
      h1, h2, h3 { font-family: 'Playfair Display', serif; margin: 0; }
      p { margin: 0; }
      button { font-family: inherit; cursor: pointer; }
      a { color: inherit; }
      input, select, textarea { font-family: inherit; }

      @media (prefers-reduced-motion: reduce) {
        * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
      }

      .boot-screen { min-height: 100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background: var(--c-bg); gap: 16px; }
      .boot-arch { width: 90px; height: 110px; animation: archPulse 1.6s ease-in-out infinite; }
      .boot-text { font-family:'Playfair Display', serif; font-size: 18px; color: var(--c-maroon); letter-spacing: 0.04em; }
      @keyframes archPulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }

      /* ---------- reveal ---------- */
      .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.7s cubic-bezier(.2,.7,.3,1), transform 0.7s cubic-bezier(.2,.7,.3,1); }
      .reveal-in { opacity: 1; transform: translateY(0); }

      /* ---------- navbar ---------- */
      .navbar { position: sticky; top: 0; z-index: 40; background: transparent; transition: background 0.35s ease, box-shadow 0.35s ease, padding 0.35s ease; padding: 18px 0; }
      .navbar-scrolled { background: var(--c-surface); box-shadow: var(--shadow-sm); padding: 10px 0; }
      .navbar-admin { background: var(--c-surface); box-shadow: var(--shadow-sm); }
      .navbar-inner { max-width: 1180px; margin: 0 auto; padding: 0 24px; display:flex; align-items:center; justify-content:space-between; gap: 20px; }
      .brand { display:flex; align-items:center; gap:10px; background:none; border:none; padding:0; }
      .brand-mark { width:34px; height:34px; border-radius:10px; background: linear-gradient(135deg, var(--c-maroon), var(--c-maroon-deep)); color: var(--c-gold-light); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
      .brand-text { display:flex; flex-direction:column; align-items:flex-start; line-height:1.1; }
      .brand-title { font-family:'Playfair Display',serif; font-weight:700; font-size:17px; color: var(--c-text); }
      .brand-title.light { color: #fff; }
      .brand-sub { font-size:10.5px; letter-spacing:0.12em; text-transform:uppercase; color: var(--c-gold); }
      .brand-sub.light { color: var(--c-gold-light); }
      .nav-links { display:flex; align-items:center; gap: 4px; }
      .nav-link { background:none; border:none; padding: 8px 14px; border-radius: 100px; font-size:14px; color: var(--c-text-soft); font-weight:500; transition: all 0.2s; }
      .nav-link:hover { color: var(--c-maroon); background: rgba(var(--c-maroon-rgb),0.06); }
      .nav-link-active { color: var(--c-maroon); background: rgba(var(--c-maroon-rgb),0.08); }
      .nav-link-icon { display:flex; align-items:center; gap:6px; }
      .nav-actions { display:flex; align-items:center; gap:10px; }
      .nav-auth { display:flex; align-items:center; gap:8px; }
      .admin-who { font-size: 13px; color: var(--c-text-soft); margin-right: 4px; }
      .icon-btn { width:36px; height:36px; border-radius:100px; border:1px solid var(--c-border); background: var(--c-surface); display:flex; align-items:center; justify-content:center; color: var(--c-text); transition: all 0.2s; }
      .icon-btn:hover { border-color: var(--c-maroon); color: var(--c-maroon); transform: translateY(-1px); }
      .icon-btn-danger:hover { border-color: var(--c-reject); color: var(--c-reject); }
      .theme-icon.spin { display:inline-flex; animation: spinIn 0.5s ease; }
      @keyframes spinIn { from { transform: rotate(-90deg) scale(0.6); opacity:0; } to { transform: rotate(0) scale(1); opacity:1; } }
      .desktop-only { display:flex; }
      .mobile-only { display:none; }
      .mobile-menu { display:flex; flex-direction:column; padding: 10px 24px 18px; gap:2px; background: var(--c-surface); animation: dropDown 0.25s ease; }
      @keyframes dropDown { from { opacity:0; transform: translateY(-8px); } to { opacity:1; transform:translateY(0);} }
      .mobile-link { text-align:left; background:none; border:none; padding: 12px 4px; font-size:15px; color: var(--c-text); border-bottom: 1px solid var(--c-border); }
      .mobile-divider { height:1px; }
      @media (max-width: 860px) { .desktop-only { display:none; } .mobile-only { display:flex; } }

      /* ---------- buttons ---------- */
      .btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; border-radius: 100px; border: none; padding: 11px 22px; font-size: 14px; font-weight: 600; transition: all 0.22s cubic-bezier(.2,.8,.3,1); white-space:nowrap; }
      .btn-lg { padding: 14px 28px; font-size:15px; }
      .btn-sm { padding: 8px 16px; font-size:13px; }
      .btn-block { width:100%; }
      .btn-primary { background: linear-gradient(135deg, var(--c-maroon), var(--c-maroon-deep)); color:#fff; box-shadow: 0 6px 18px rgba(var(--c-maroon-rgb),0.28); }
      .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(var(--c-maroon-rgb),0.36); }
      .btn-gold { background: linear-gradient(135deg, var(--c-gold-light), var(--c-gold)); color: #3a2a10; box-shadow: 0 6px 18px rgba(196,146,58,0.32); }
      .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(196,146,58,0.4); }
      .btn-outline { background: transparent; border: 1.5px solid var(--c-border); color: var(--c-text); }
      .btn-outline:hover { border-color: var(--c-maroon); color: var(--c-maroon); }
      .btn-ghost { background: transparent; color: var(--c-text-soft); }
      .btn-ghost:hover { color: var(--c-maroon); }
      .btn-danger { background: var(--c-reject-bg); color: var(--c-reject); }
      .btn-danger:hover { background: var(--c-reject); color: #fff; }

      /* ---------- hero ---------- */
      .hero { position:relative; overflow:hidden; padding: 70px 24px 40px; max-width: 1180px; margin: 0 auto; text-align:center; }
      .hero-arch { position:absolute; top: -20px; pointer-events:none; }
      .hero-arch-1 { left: 50%; transform: translateX(-50%); width: 480px; height: 600px; }
      .hero-arch-2 { left: 50%; transform: translateX(-50%) scale(1.4); width: 480px; height: 600px; opacity:0.3; }
      .hero-inner { position:relative; z-index:2; max-width: 720px; margin: 0 auto; }
      .hero-eyebrow { display:inline-block; font-size:12.5px; letter-spacing:0.14em; text-transform:uppercase; color: var(--c-gold); font-weight:600; margin-bottom: 14px; }
      .hero-title { font-size: clamp(38px, 6vw, 64px); font-weight:700; line-height:1.05; margin-bottom:18px; background: linear-gradient(135deg, var(--c-text), var(--c-maroon)); -webkit-background-clip:text; background-clip:text; color:transparent; }
      .hero-sub { font-size: 17px; color: var(--c-text-soft); line-height:1.6; max-width: 560px; margin: 0 auto 30px; }
      .hero-ctas { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
      .hero-stats { position:relative; z-index:2; display:flex; justify-content:center; gap: clamp(20px,6vw,64px); flex-wrap:wrap; margin-top: 56px; padding-top: 32px; border-top: 1px solid var(--c-border); }
      .stat-num { font-family:'Playfair Display',serif; font-size: 30px; font-weight:700; color: var(--c-maroon); }
      .stat-label { font-size: 12.5px; color: var(--c-text-soft); margin-top:2px; }

      /* ---------- sections ---------- */
      .section { max-width: 1180px; margin: 0 auto; padding: 64px 24px; }
      .section-alt { background: var(--c-bg-alt); max-width:none; padding-left:0; padding-right:0; }
      .section-alt > * { max-width: 1180px; margin-left:auto; margin-right:auto; padding-left:24px; padding-right:24px; }
      .eyebrow { font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color: var(--c-gold); font-weight:700; }
      .h1 { font-size: clamp(28px,4.5vw,42px); font-weight:700; margin: 10px 0 8px; }
      .h2 { font-size: clamp(22px,3vw,30px); font-weight:700; margin-bottom: 28px; }
      .h2.light { color:#fff; margin-bottom:8px; }
      .h3 { font-size: 18px; font-weight:600; margin-bottom: 14px; }
      .page-lede { max-width: 620px; margin-bottom: 32px; line-height:1.6; }
      .muted { color: var(--c-text-soft); }
      .section-gap { margin-top: 40px; }

      .feature-grid { display:grid; grid-template-columns: repeat(auto-fit,minmax(230px,1fr)); gap: 20px; }
      .feature-card { background: var(--c-surface); border:1px solid var(--c-border); border-radius: var(--radius); padding: 26px; transition: transform 0.25s ease, box-shadow 0.25s ease; }
      .feature-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
      .feature-icon { width:42px; height:42px; border-radius:12px; background: rgba(var(--c-maroon-rgb),0.1); color: var(--c-maroon); display:flex; align-items:center; justify-content:center; margin-bottom:14px; }
      .feature-title { font-weight:600; margin-bottom:6px; }
      .feature-text { font-size: 13.5px; color: var(--c-text-soft); line-height:1.55; }

      .testimonial-grid { display:grid; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); gap:20px; }
      .testimonial-card { background: var(--c-surface); border:1px solid var(--c-border); border-radius: var(--radius); padding:24px; }
      .stars { display:flex; gap:3px; margin-bottom:12px; }
      .testimonial-q { font-size:14.5px; line-height:1.6; font-style:italic; margin-bottom:14px; }
      .testimonial-n { font-size:13px; font-weight:600; }

      .cta-band { background: linear-gradient(120deg, var(--c-maroon), var(--c-maroon-deep)); padding: 56px 24px; }
      .cta-band-inner { max-width:1180px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap; }
      .cta-sub { color: rgba(255,255,255,0.8); margin-top:6px; }

      /* ---------- footer ---------- */
      .footer { background: var(--c-bg-alt); border-top:1px solid var(--c-border); padding: 44px 24px 20px; }
      .footer-inner { max-width:1180px; margin:0 auto; display:flex; justify-content:space-between; gap: 40px; flex-wrap:wrap; }
      .footer-brand { display:flex; gap:12px; align-items:flex-start; }
      .footer-tag { font-size:12.5px; color: var(--c-text-soft); margin-top:2px; }
      .footer-cols { display:flex; gap: 56px; flex-wrap:wrap; }
      .footer-h { font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color: var(--c-gold); font-weight:700; margin-bottom:10px; }
      .footer-cols button { display:block; background:none; border:none; padding:5px 0; color: var(--c-text-soft); font-size:13.5px; text-align:left; }
      .footer-cols button:hover { color: var(--c-maroon); }
      .footer-line { display:flex; align-items:center; gap:8px; font-size:13.5px; color: var(--c-text-soft); padding: 5px 0; }
      .footer-bottom { max-width:1180px; margin: 30px auto 0; padding-top:18px; border-top:1px solid var(--c-border); font-size:12px; color: var(--c-text-soft); text-align:center; }

      /* ---------- generic page ---------- */
      .page { max-width: 1180px; margin: 0 auto; padding: 44px 24px 80px; }
      .page-narrow { max-width: 640px; margin: 0 auto; padding: 44px 24px 80px; }
      .page-head-row { display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; }
      .center-pad { text-align:center; display:flex; flex-direction:column; align-items:center; gap:12px; padding-top: 80px; }
      .deny-arch, .auth-arch { width: 80px; height: 100px; margin-bottom: 4px; }
      .row-gap { display:flex; gap:12px; flex-wrap:wrap; justify-content:center; margin-top:6px; }

      /* ---------- chips / gallery ---------- */
      .chip-row { display:flex; gap:8px; flex-wrap:wrap; margin-bottom: 28px; }
      .chip { border:1px solid var(--c-border); background: var(--c-surface); padding:8px 16px; border-radius:100px; font-size:13px; color: var(--c-text-soft); transition: all 0.2s; }
      .chip:hover { border-color: var(--c-maroon); }
      .chip-active { background: var(--c-maroon); border-color: var(--c-maroon); color:#fff; }
      .chip-static { background: var(--c-bg-alt); color: var(--c-text); cursor:default; }

      .gallery-grid { display:grid; grid-template-columns: repeat(auto-fill,minmax(240px,1fr)); gap:18px; }
      .gallery-tile { position:relative; border:none; border-radius: var(--radius); overflow:hidden; height: 180px; text-align:left; transition: transform 0.3s ease, box-shadow 0.3s ease; }
      .gallery-tile:hover { transform: translateY(-4px) scale(1.01); box-shadow: var(--shadow-md); }
      .gallery-tile-pattern { position:absolute; inset:0; background-size: 220% 220%; animation: patternShift 12s ease infinite; }
      .tone-maroon .gallery-tile-pattern { background-image: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 45%), linear-gradient(135deg, var(--c-maroon), var(--c-maroon-deep)); }
      .tone-gold .gallery-tile-pattern { background-image: radial-gradient(circle at 80% 20%, rgba(255,255,255,0.28), transparent 45%), linear-gradient(135deg, var(--c-gold-light), var(--c-gold)); }
      .tone-ink .gallery-tile-pattern { background-image: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.14), transparent 45%), linear-gradient(135deg, #3a2f2a, #1c1714); }
      @keyframes patternShift { 0%,100% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } }
      .gallery-tile-cap { position:absolute; left:14px; right:14px; bottom:12px; display:flex; align-items:center; gap:8px; color:#fff; font-size:13px; font-weight:600; text-shadow: 0 2px 8px rgba(0,0,0,0.35); }

      .lightbox-backdrop { position:fixed; inset:0; background: rgba(20,14,10,0.72); backdrop-filter: blur(4px); z-index:100; display:flex; align-items:center; justify-content:center; padding:24px; animation: fadeIn 0.2s ease; }
      @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
      .lightbox { position:relative; width: min(640px,90vw); height: min(440px,60vh); border-radius: 18px; overflow:hidden; animation: popIn 0.25s cubic-bezier(.2,.8,.3,1); }
      @keyframes popIn { from { transform: scale(0.92); opacity:0; } to { transform:scale(1); opacity:1; } }
      .lightbox-pattern { position:absolute; inset:0; }
      .lightbox.tone-maroon .lightbox-pattern { background: linear-gradient(135deg, var(--c-maroon), var(--c-maroon-deep)); }
      .lightbox.tone-gold .lightbox-pattern { background: linear-gradient(135deg, var(--c-gold-light), var(--c-gold)); }
      .lightbox.tone-ink .lightbox-pattern { background: linear-gradient(135deg, #3a2f2a, #1c1714); }
      .lightbox-close { position:absolute; top:14px; right:14px; background: rgba(255,255,255,0.15); border-color: transparent; color:#fff; }
      .lightbox-nav { position:absolute; top:50%; transform:translateY(-50%); background: rgba(255,255,255,0.15); border-color:transparent; color:#fff; }
      .lightbox-prev { left:14px; } .lightbox-next { right:14px; }
      .lightbox-cap { position:absolute; left:20px; bottom:18px; color:#fff; }
      .lightbox-cat { font-size:11px; text-transform:uppercase; letter-spacing:0.1em; opacity:0.8; }
      .lightbox-title { font-family:'Playfair Display',serif; font-size:20px; font-weight:600; }

      /* ---------- pricing ---------- */
      .pricing-grid { display:grid; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); gap:22px; margin-bottom: 56px; }
      .price-card { position:relative; background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius); padding: 30px 26px; display:flex; flex-direction:column; transition: transform 0.25s ease, box-shadow 0.25s ease; }
      .price-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); }
      .price-card-popular { border-color: var(--c-gold); box-shadow: 0 0 0 2px rgba(196,146,58,0.2); }
      .popular-badge { position:absolute; top:-12px; left:26px; background: linear-gradient(135deg, var(--c-gold-light), var(--c-gold)); color:#3a2a10; font-size:11px; font-weight:700; padding:5px 14px; border-radius:100px; }
      .price-name { font-family:'Playfair Display',serif; font-size:22px; font-weight:700; }
      .price-amount { font-size: 28px; font-weight:700; color: var(--c-maroon); margin: 8px 0 2px; }
      .price-suffix { font-size:12px; font-weight:400; color: var(--c-text-soft); }
      .price-cap { font-size:12.5px; color: var(--c-text-soft); margin-bottom:18px; }
      .price-features { list-style:none; padding:0; margin:0 0 22px; display:flex; flex-direction:column; gap:10px; flex:1; }
      .price-features li { display:flex; align-items:flex-start; gap:8px; font-size:13.5px; }
      .check-ico { color: var(--c-success); flex-shrink:0; margin-top:2px; }

      .rate-table-wrap { margin-top: 20px; }
      .table-scroll { overflow-x:auto; border:1px solid var(--c-border); border-radius: var(--radius); }
      table { width:100%; border-collapse:collapse; font-size:13.5px; }
      .rate-table th, .rate-table td, .data-table th, .data-table td { padding: 12px 16px; text-align:left; white-space:nowrap; }
      .rate-table thead, .data-table thead { background: var(--c-bg-alt); }
      .rate-table th, .data-table th { font-size:11.5px; text-transform:uppercase; letter-spacing:0.06em; color: var(--c-text-soft); font-weight:600; }
      .rate-table tbody tr, .data-table tbody tr { border-top: 1px solid var(--c-border); }
      .row-clickable { cursor:pointer; transition: background 0.15s; }
      .row-clickable:hover { background: var(--c-bg-alt); }
      .empty-cell { text-align:center; padding: 30px; color: var(--c-text-soft); }

      /* ---------- calendar ---------- */
      .calendar-card { background: var(--c-surface); border:1px solid var(--c-border); border-radius: var(--radius); padding: 22px; max-width: 560px; }
      .calendar-head { display:flex; align-items:center; justify-content:space-between; margin-bottom: 14px; }
      .calendar-title { font-family:'Playfair Display',serif; font-weight:600; font-size:17px; }
      .calendar-grid { display:grid; grid-template-columns: repeat(7,1fr); gap:6px; }
      .calendar-weekdays { margin-bottom:6px; }
      .calendar-weekday { text-align:center; font-size:11px; color: var(--c-text-soft); font-weight:600; }
      .calendar-cell { position:relative; aspect-ratio:1; border-radius:10px; border:1px solid var(--c-border); background: var(--c-bg); font-size:13px; display:flex; align-items:center; justify-content:center; transition: all 0.18s; }
      .calendar-cell-empty { border:none; background:none; }
      .cal-available { border-color: var(--c-success); color: var(--c-success); font-weight:600; }
      .cal-available:hover { background: var(--c-success-bg); transform: scale(1.08); }
      .cal-pending { background: var(--c-pending-bg); color: var(--c-pending); border-color: var(--c-pending); }
      .cal-booked { background: var(--c-maroon); color:#fff; border-color: var(--c-maroon); cursor:not-allowed; opacity:0.85; }
      .cal-past { opacity:0.3; cursor:not-allowed; }
      .cal-today { box-shadow: 0 0 0 2px var(--c-gold); }
      .cal-admin { cursor:pointer; flex-direction:column; gap:2px; }
      .cal-selected { box-shadow: 0 0 0 2px var(--c-maroon); }
      .cal-dots { display:flex; gap:2px; position:absolute; bottom:4px; }
      .dot { width:5px; height:5px; border-radius:50%; display:inline-block; }
      .dot-available { background: var(--c-success); }
      .dot-pending { background: var(--c-pending); }
      .dot-booked { background: var(--c-maroon); }
      .calendar-legend { display:flex; gap:16px; flex-wrap:wrap; margin-top:16px; font-size:12px; color: var(--c-text-soft); }
      .calendar-legend span { display:flex; align-items:center; gap:6px; }

      .day-list { margin-top:20px; max-width:560px; background: var(--c-surface); border:1px solid var(--c-border); border-radius: var(--radius); padding:20px; }
      .day-list-row { display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-top:1px solid var(--c-border); font-size:13.5px; }
      .day-list-row:first-of-type { border-top:none; }

      /* ---------- forms ---------- */
      .form-card { background: var(--c-surface); border:1px solid var(--c-border); border-radius: var(--radius); padding: 28px; }
      .form-card-plain { border:none; padding:0; background:none; }
      .form-grid { display:grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap:16px; margin-bottom:16px; }
      .field { display:flex; flex-direction:column; gap:6px; margin-bottom: 16px; }
      .field-label { font-size:12.5px; font-weight:600; color: var(--c-text-soft); }
      .field-hint { font-size:11.5px; color: var(--c-text-soft); }
      .field-error { font-size:11.5px; color: var(--c-reject); display:flex; align-items:center; gap:4px; }
      .form-error { font-size:12.5px; color: var(--c-reject); background: var(--c-reject-bg); padding:8px 12px; border-radius:8px; margin-bottom:14px; display:flex; align-items:center; gap:6px; }
      .input { width:100%; border: 1.5px solid var(--c-border); background: var(--c-bg); color: var(--c-text); border-radius: 10px; padding: 11px 13px; font-size: 14px; transition: border-color 0.2s, box-shadow 0.2s; }
      .input:focus { outline:none; border-color: var(--c-gold); box-shadow: 0 0 0 3px rgba(196,146,58,0.15); }
      .textarea { resize: vertical; }
      .radio-row { display:flex; gap:8px; flex-wrap:wrap; }
      .radio-pill { border:1.5px solid var(--c-border); background: var(--c-bg); padding:9px 16px; border-radius:100px; font-size:13px; color: var(--c-text-soft); }
      .radio-pill-active { border-color: var(--c-maroon); background: rgba(var(--c-maroon-rgb),0.1); color: var(--c-maroon); font-weight:600; }

      .confirm-icon { color: var(--c-success); }
      .ref-pill { font-family:'DM Mono',monospace; background: var(--c-bg-alt); border:1px dashed var(--c-gold); padding:8px 16px; border-radius:10px; font-size:14px; letter-spacing:0.03em; }
      .summary-card { background: var(--c-bg-alt); border-radius: var(--radius); padding: 18px 20px; margin: 16px 0; width:100%; }
      .summary-row { display:flex; justify-content:space-between; padding:7px 0; font-size:13.5px; border-top:1px solid var(--c-border); }
      .summary-row:first-child { border-top:none; }

      .lookup-row { display:flex; gap:10px; margin-bottom: 30px; }
      .lookup-row .input { flex:1; }
      .empty-state { text-align:center; padding: 50px 20px; color: var(--c-text-soft); display:flex; flex-direction:column; align-items:center; gap:10px; }
      .status-card { background: var(--c-surface); border:1px solid var(--c-border); border-radius: var(--radius); padding: 26px; }
      .status-head { display:flex; align-items:center; justify-content:space-between; margin-bottom: 26px; flex-wrap:wrap; gap:10px; }
      .stepper { display:flex; align-items:center; margin-bottom: 10px; }
      .step { display:flex; flex-direction:column; align-items:center; gap:8px; flex-shrink:0; }
      .step-dot { width:30px; height:30px; border-radius:50%; background: var(--c-bg-alt); border:2px solid var(--c-border); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; color: var(--c-text-soft); transition: all 0.3s; }
      .step-done .step-dot { background: var(--c-maroon); border-color: var(--c-maroon); color:#fff; }
      .step-rejected .step-dot { background: var(--c-reject); border-color: var(--c-reject); }
      .step-label { font-size:11.5px; color: var(--c-text-soft); text-align:center; width:80px; }
      .step-line { flex:1; height:2px; background: var(--c-border); margin: 0 -4px 24px; }
      .step-line-done { background: var(--c-maroon); }

      /* ---------- auth ---------- */
      .auth-wrap { display:grid; grid-template-columns: 1fr 1fr; min-height: calc(100vh - 200px); }
      .auth-side { position:relative; background: linear-gradient(160deg, var(--c-maroon), var(--c-maroon-deep)); display:flex; flex-direction:column; align-items:center; justify-content:center; overflow:hidden; padding: 40px; }
      .auth-arch { width: 220px; height: 280px; position:absolute; top: 50%; left:50%; transform: translate(-50%,-50%); }
      .auth-side-text { position:relative; z-index:2; text-align:center; }
      .auth-side-text .brand-title { font-size: 30px; }
      .auth-side-text .brand-sub { font-size:13px; }
      .auth-form-col { display:flex; align-items:center; justify-content:center; padding: 50px 24px; }
      .auth-box { width:100%; max-width: 380px; }
      .auth-box .muted { margin: 8px 0 24px; font-size:13.5px; }
      .demo-hint { font-size:11.5px; color: var(--c-text-soft); background: var(--c-bg-alt); padding:10px 12px; border-radius:8px; margin: 14px 0; line-height:1.6; }
      .auth-switch { text-align:center; font-size:13px; color: var(--c-text-soft); margin-top: 14px; }
      .auth-switch button { background:none; border:none; color: var(--c-maroon); font-weight:600; padding:0 4px; }
      @media (max-width: 860px) { .auth-wrap { grid-template-columns: 1fr; } .auth-side { min-height: 180px; padding: 24px; } .auth-arch { width:120px; height:150px; } }

      /* ---------- toast ---------- */
      .toast { position:fixed; bottom: 24px; left:50%; transform: translateX(-50%); background: var(--c-surface); border:1px solid var(--c-border); box-shadow: var(--shadow-lg); padding: 12px 20px; border-radius: 100px; display:flex; align-items:center; gap:8px; font-size:13.5px; z-index:200; animation: toastIn 0.3s cubic-bezier(.2,.8,.3,1); }
      @keyframes toastIn { from { opacity:0; transform: translateX(-50%) translateY(12px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }
      .toast-success { color: var(--c-success); }
      .toast-info { color: var(--c-text); }

      /* ---------- badges ---------- */
      .badge { display:inline-flex; align-items:center; padding: 4px 12px; border-radius:100px; font-size:11.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.03em; }
      .badge-pending { background: var(--c-pending-bg); color: var(--c-pending); }
      .badge-confirmed { background: var(--c-success-bg); color: var(--c-success); }
      .badge-rejected { background: var(--c-reject-bg); color: var(--c-reject); }

      /* ---------- admin dashboard ---------- */
      .today-card { background: linear-gradient(120deg, var(--c-maroon), var(--c-maroon-deep)); color:#fff; border-radius: var(--radius); padding: 26px 28px; margin-bottom: 28px; border: 1px solid var(--c-gold); position:relative; overflow:hidden; }
      .today-eyebrow { font-size:11.5px; text-transform:uppercase; letter-spacing:0.1em; color: var(--c-gold-light); font-weight:700; margin-bottom:8px; }
      .today-title { font-family:'Playfair Display',serif; font-size:22px; font-weight:700; margin-bottom:12px; }
      .today-meta { display:flex; gap:18px; flex-wrap:wrap; font-size:13px; color: rgba(255,255,255,0.85); }
      .today-meta span { display:flex; align-items:center; gap:6px; }
      .today-meta.muted { color: rgba(255,255,255,0.6); }

      .kpi-grid { display:grid; grid-template-columns: repeat(auto-fit,minmax(200px,1fr)); gap:16px; margin-bottom: 8px; }
      .kpi-card { background: var(--c-surface); border:1px solid var(--c-border); border-radius: var(--radius); padding: 20px; transition: transform 0.2s; }
      .kpi-card:hover { transform: translateY(-3px); }
      .kpi-icon { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; margin-bottom:12px; }
      .kpi-maroon .kpi-icon { background: rgba(var(--c-maroon-rgb),0.12); color: var(--c-maroon); }
      .kpi-gold .kpi-icon { background: rgba(196,146,58,0.15); color: var(--c-gold); }
      .kpi-green .kpi-icon { background: var(--c-success-bg); color: var(--c-success); }
      .kpi-blue .kpi-icon { background: rgba(76,110,145,0.15); color: #4C6E91; }
      .kpi-value { font-family:'Playfair Display',serif; font-size: 22px; font-weight:700; }
      .kpi-label { font-size:12px; color: var(--c-text-soft); margin-top:2px; }

      .quick-grid { display:grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap:16px; }
      .quick-tile { background: var(--c-surface); border:1px solid var(--c-border); border-radius: var(--radius); padding:0; text-align:left; transition: all 0.22s; }
      .quick-tile:hover { border-color: var(--c-maroon); transform: translateY(-3px); box-shadow: var(--shadow-md); }
      .quick-tile-inner { display:flex; flex-direction:column; align-items:flex-start; gap:8px; padding: 20px; color: var(--c-maroon); width:100%; height:100%; cursor:pointer; }
      .quick-label { font-weight:600; color: var(--c-text); font-size:14px; }
      .quick-sub { font-size:12px; color: var(--c-text-soft); }

      /* ---------- toolbar / tabs ---------- */
      .toolbar { display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom: 20px; }
      .tabs { display:flex; gap:6px; background: var(--c-bg-alt); padding:4px; border-radius:100px; }
      .tab { background:none; border:none; padding: 8px 16px; border-radius:100px; font-size:13px; color: var(--c-text-soft); }
      .tab-active { background: var(--c-surface); color: var(--c-maroon); font-weight:600; box-shadow: var(--shadow-sm); }
      .search-box { display:flex; align-items:center; gap:8px; border:1.5px solid var(--c-border); border-radius:100px; padding: 8px 16px; background: var(--c-surface); color: var(--c-text-soft); }
      .search-box input { border:none; background:none; outline:none; font-size:13.5px; color: var(--c-text); width: 200px; }
      .table-actions { display:flex; gap:6px; }

      /* ---------- drawer ---------- */
      .drawer-backdrop { position:fixed; inset:0; background: rgba(20,14,10,0.5); z-index:100; display:flex; justify-content:flex-end; animation: fadeIn 0.2s ease; }
      .drawer { width: min(420px,92vw); background: var(--c-surface); height:100%; overflow-y:auto; padding: 26px; animation: slideIn 0.28s cubic-bezier(.2,.8,.3,1); }
      @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      .drawer-head { display:flex; align-items:center; justify-content:space-between; margin-bottom: 16px; }
      .confirm-modal { background: var(--c-surface); border-radius: var(--radius); padding: 26px; width: min(340px,90vw); margin: auto; animation: popIn 0.2s ease; }

      /* ---------- employees ---------- */
      .payroll-card { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; background: var(--c-surface); border:1px solid var(--c-border); border-radius: var(--radius); padding: 20px 24px; margin-bottom: 24px; }
      .payroll-amount { font-family:'Playfair Display',serif; font-size:26px; font-weight:700; color: var(--c-maroon); }
      .payroll-breakdown { display:flex; gap:8px; flex-wrap:wrap; }
      .payroll-chip { background: var(--c-bg-alt); padding:6px 14px; border-radius:100px; font-size:12.5px; display:flex; gap:6px; }

      /* ---------- reports ---------- */
      .chart-grid { display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top: 24px; }
      .chart-card { background: var(--c-surface); border:1px solid var(--c-border); border-radius: var(--radius); padding: 20px; }
      .chart-card-wide { grid-column: 1 / -1; }
      @media (max-width: 780px) { .chart-grid { grid-template-columns: 1fr; } }

      @media (max-width: 640px) {
        .hero { padding-top: 50px; }
        .hero-stats { gap: 24px; }
      }
    `}</style>
  );
}
