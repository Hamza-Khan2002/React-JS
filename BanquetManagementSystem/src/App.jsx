import React, { useCallback, useEffect, useState } from "react";
import { LayoutDashboard, ClipboardList, Calendar as CalendarIcon, UserCog, BarChart3 } from "lucide-react";

import { Navbar, AdminNavbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";
import { Toast, AccessDenied } from "./components/UI.jsx";

import { HomePage } from "./pages/HomePage.jsx";
import { GalleryPage } from "./pages/GalleryPage.jsx";
import { PricingPage } from "./pages/PricingPage.jsx";
import { AvailabilityPage } from "./pages/AvailabilityPage.jsx";
import { BookingFormPage } from "./pages/BookingFormPage.jsx";
import { BookingStatusPage } from "./pages/BookingStatusPage.jsx";
import { ReviewsPage } from "./pages/ReviewsPage.jsx";
import { LoginPage, RegisterPage } from "./pages/auth/AuthPages.jsx";

import { AdminDashboard } from "./pages/admin/AdminDashboard.jsx";
import { AdminRequests } from "./pages/admin/AdminRequests.jsx";
import { AdminCalendarPage } from "./pages/admin/AdminCalendarPage.jsx";
import { AdminEmployees } from "./pages/admin/AdminEmployees.jsx";
import { AdminReports } from "./pages/admin/AdminReports.jsx";

import { seedBookings, seedEmployees, seedUsers, seedReviews } from "./data/seed.js";
import { loadKey, saveKey } from "./utils/storage.js";
import { genRef, toISO, uid } from "./utils/helpers.js";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("home");
  const [ctx, setCtx] = useState({});
  const [auth, setAuth] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const [users, setUsers] = useState(() => loadKey("users", null) || seedUsers());
  const [bookings, setBookings] = useState(() => loadKey("bookings", null) || seedBookings());
  const [employees, setEmployees] = useState(() => loadKey("employees", null) || seedEmployees());
  const [reviews, setReviews] = useState(() => loadKey("reviews", null) || seedReviews());

  useEffect(() => { saveKey("users", users); }, [users]);
  useEffect(() => { saveKey("bookings", bookings); }, [bookings]);
  useEffect(() => { saveKey("employees", employees); }, [employees]);
  useEffect(() => { saveKey("reviews", reviews); }, [reviews]);
  useEffect(() => { document.documentElement.style.colorScheme = theme; }, [theme]);

  const showToast = useCallback((text, kind = "success") => setToast({ text, kind, id: uid() }), []);
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

  const logout = () => { setAuth(null); showToast("Signed out.", "info"); goto("home"); };

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
  const addReview = (r) => {
    setReviews((prev) => [{ ...r, id: uid(), date: toISO(new Date()) }, ...prev]);
    showToast("Review posted — thank you!");
  };
  const resetDemo = () => {
    setUsers(seedUsers());
    setBookings(seedBookings());
    setEmployees(seedEmployees());
    setReviews(seedReviews());
    showToast("Demo data reset.", "info");
  };

  const isAdmin = auth && auth.role === "admin";

  const navGuest = [
    { id: "home", label: "Home" },
    { id: "gallery", label: "Gallery" },
    { id: "pricing", label: "Pricing" },
    { id: "availability", label: "Availability" },
    { id: "reviews", label: "Reviews" },
  ];
  const navAdmin = [
    { id: "admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "admin-requests", label: "Requests", icon: ClipboardList },
    { id: "admin-calendar", label: "Calendar", icon: CalendarIcon },
    { id: "admin-employees", label: "Employees", icon: UserCog },
    { id: "admin-reports", label: "Reports", icon: BarChart3 },
  ];

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="app-shell">
        {!isAdmin && (
          <Navbar theme={theme} setTheme={setTheme} auth={auth} logout={logout} goto={goto} items={navGuest} page={page} navOpen={navOpen} setNavOpen={setNavOpen} />
        )}
        {isAdmin && (
          <AdminNavbar theme={theme} setTheme={setTheme} auth={auth} logout={logout} goto={goto} items={navAdmin} page={page} navOpen={navOpen} setNavOpen={setNavOpen} />
        )}

        <main className="main">
          {page === "home" && <HomePage goto={goto} bookings={bookings} reviews={reviews} />}
          {page === "gallery" && <GalleryPage />}
          {page === "pricing" && <PricingPage goto={goto} />}
          {page === "availability" && <AvailabilityPage bookings={bookings} goto={goto} />}
          {page === "reviews" && <ReviewsPage reviews={reviews} auth={auth} addReview={addReview} ctx={ctx} />}
          {page === "booking-form" && <BookingFormPage auth={auth} ctx={ctx} goto={goto} addBooking={addBooking} bookings={bookings} />}
          {page === "booking-status" && <BookingStatusPage bookings={bookings} ctx={ctx} goto={goto} />}
          {page === "login" && <LoginPage login={login} goto={goto} />}
          {page === "register" && <RegisterPage register={register} goto={goto} />}

          {page === "admin-dashboard" && isAdmin && <AdminDashboard bookings={bookings} employees={employees} goto={goto} auth={auth} />}
          {page === "admin-requests" && isAdmin && <AdminRequests bookings={bookings} setBookingStatus={setBookingStatus} />}
          {page === "admin-calendar" && isAdmin && <AdminCalendarPage bookings={bookings} />}
          {page === "admin-employees" && isAdmin && <AdminEmployees employees={employees} upsertEmployee={upsertEmployee} removeEmployee={removeEmployee} />}
          {page === "admin-reports" && isAdmin && <AdminReports bookings={bookings} resetDemo={resetDemo} />}

          {page.startsWith("admin-") && !isAdmin && <AccessDenied goto={goto} />}
        </main>

        {!isAdmin && <Footer goto={goto} />}
      </div>
      {toast && <Toast toast={toast} />}
    </div>
  );
}
