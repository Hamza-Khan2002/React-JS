import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "../hooks/useUI.jsx";
import { Field, ArchMotif } from "../components/UI.jsx";
import { FUNCTION_TYPES, HALLS, PACKAGES } from "../data/constants.js";
import { fmtDate, fmtMoney, toISO } from "../utils/helpers.js";

export function BookingFormPage({ auth, ctx, goto, addBooking, bookings }) {
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
