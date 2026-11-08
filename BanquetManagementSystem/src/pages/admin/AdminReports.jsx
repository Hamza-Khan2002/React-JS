import React, { useMemo } from "react";
import { BarChart3, ClipboardList, Users, CheckCircle2, RotateCcw } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { Reveal } from "../../hooks/useUI.jsx";
import { KpiCard } from "../../components/UI.jsx";
import { FUNCTION_TYPES, HALLS, STATUS_META, PIE_COLORS } from "../../data/constants.js";
import { fmtDate, fmtMoney } from "../../utils/helpers.js";

export function AdminReports({ bookings, resetDemo }) {
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
