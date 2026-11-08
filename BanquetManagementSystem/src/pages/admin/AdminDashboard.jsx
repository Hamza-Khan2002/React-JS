import React from "react";
import { ClipboardList, AlertCircle, CheckCircle2, BarChart3, Building2, Users, Clock, Calendar as CalendarIcon, UserCog } from "lucide-react";
import { Reveal } from "../../hooks/useUI.jsx";
import { KpiCard } from "../../components/UI.jsx";
import { STATUS_META } from "../../data/constants.js";
import { fmtMoney, toISO } from "../../utils/helpers.js";

export function AdminDashboard({ bookings, employees, goto, auth }) {
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
          <Reveal key={q.id} delay={i * 70} as="button" className="quick-tile">
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
