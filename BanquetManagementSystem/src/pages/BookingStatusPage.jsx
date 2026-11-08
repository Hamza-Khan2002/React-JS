import React, { useState } from "react";
import { Search, AlertCircle, Check } from "lucide-react";
import { Reveal } from "../hooks/useUI.jsx";
import { STATUS_META } from "../data/constants.js";
import { fmtDate, fmtMoney } from "../utils/helpers.js";

const STEPS = ["Submitted", "Under Review", "Decision"];

export function BookingStatusPage({ bookings, ctx, goto }) {
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

          {found.status === "confirmed" && (
            <div className="row-gap" style={{ marginTop: 8 }}>
              <button className="btn btn-gold" onClick={() => goto("reviews", { fromBooking: found })}>Leave a review</button>
            </div>
          )}
        </Reveal>
      )}
    </div>
  );
}
