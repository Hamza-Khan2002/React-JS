import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { Reveal, useMonthGrid } from "../../hooks/useUI.jsx";
import { MONTH_NAMES, WEEKDAYS, STATUS_META } from "../../data/constants.js";
import { fmtDate, toISO } from "../../utils/helpers.js";

export function AdminCalendarPage({ bookings }) {
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

      {/* Calendar and the selected day's details sit side by side so the
          empty space next to a narrow month grid is put to use. */}
      <div className="admin-cal-layout">
        <Reveal delay={100} className="calendar-card">
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

        <Reveal delay={140} className="day-list day-list-side">
          {!selectedDay && (
            <div className="day-list-empty">
              <CalendarDays size={26} />
              <p className="muted">Select a date to see its bookings here.</p>
            </div>
          )}
          {selectedDay && (
            <>
              <h3 className="h3">{fmtDate(selectedDay)}</h3>
              {dayList.length === 0 && <p className="muted">No bookings on this date.</p>}
              {dayList.map((b) => (
                <div key={b.id} className="day-list-row">
                  <div>
                    <b>{b.guestName}</b>
                    <div className="muted" style={{ fontSize: 12.5 }}>{b.functionType} · {b.hallType} · {b.guests} guests</div>
                  </div>
                  <span className={`badge ${STATUS_META[b.status].cls}`}>{STATUS_META[b.status].label}</span>
                </div>
              ))}
            </>
          )}
        </Reveal>
      </div>
    </div>
  );
}
