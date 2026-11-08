import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, useMonthGrid } from "../hooks/useUI.jsx";
import { MONTH_NAMES, WEEKDAYS } from "../data/constants.js";
import { toISO } from "../utils/helpers.js";

export function AvailabilityPage({ bookings, goto }) {
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

      <Reveal className="calendar-card calendar-card-wide">
        <div className="calendar-head">
          <button className="icon-btn" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}><ChevronLeft size={18} /></button>
          <div className="calendar-title">{MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}</div>
          <button className="icon-btn" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}><ChevronRight size={18} /></button>
        </div>
        <div className="calendar-grid calendar-weekdays">
          {WEEKDAYS.map((w) => <div key={w} className="calendar-weekday">{w}</div>)}
        </div>
        <div className="calendar-grid calendar-grid-wide">
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
