import React, { useState } from "react";
import { Search, Eye, X, Check, XCircle } from "lucide-react";
import { Reveal } from "../../hooks/useUI.jsx";
import { STATUS_META } from "../../data/constants.js";
import { fmtDate, fmtMoney } from "../../utils/helpers.js";

export function AdminRequests({ bookings, setBookingStatus }) {
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
            <tr><th>Ref</th><th>Guest</th><th>Function</th><th>Date</th><th>Hall</th><th>Guests</th><th>Status</th><th></th></tr>
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
              <div className="summary-row"><span>Guest</span><b>{selected.guestName}</b></div>
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
