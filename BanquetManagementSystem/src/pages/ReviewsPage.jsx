import React, { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { Reveal } from "../hooks/useUI.jsx";
import { Field } from "../components/UI.jsx";
import { FUNCTION_TYPES } from "../data/constants.js";
import { fmtDate } from "../utils/helpers.js";

function StarPicker({ value, onChange }) {
  return (
    <div className="star-picker">
      {[1, 2, 3, 4, 5].map((n) => (
        <button type="button" key={n} className="star-btn" onClick={() => onChange(n)} aria-label={`${n} star`}>
          <Star size={22} fill={n <= value ? "var(--c-gold)" : "none"} stroke="var(--c-gold)" />
        </button>
      ))}
    </div>
  );
}

export function ReviewsPage({ reviews, auth, addReview, ctx }) {
  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "—";
  const [form, setForm] = useState({
    functionType: (ctx.fromBooking && ctx.fromBooking.functionType) || FUNCTION_TYPES[0],
    rating: 5,
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const sorted = useMemo(() => [...reviews].sort((a, b) => (a.date < b.date ? 1 : -1)), [reviews]);

  const submit = (e) => {
    e.preventDefault();
    if (!form.comment.trim()) return;
    addReview({
      name: auth.name,
      functionType: form.functionType,
      rating: form.rating,
      comment: form.comment.trim(),
    });
    setForm({ functionType: FUNCTION_TYPES[0], rating: 5, comment: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="page">
      <Reveal><span className="eyebrow">Kind words</span></Reveal>
      <Reveal delay={60}><h1 className="h1">Guest Reviews</h1></Reveal>
      <Reveal delay={100} className="review-summary">
        <div className="review-avg">{avg}<span>/5</span></div>
        <div>
          <div className="stars">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={15} fill={k < Math.round(avg) ? "var(--c-gold)" : "none"} stroke="var(--c-gold)" />)}</div>
          <div className="muted" style={{ fontSize: 13 }}>Based on {reviews.length} review{reviews.length === 1 ? "" : "s"}</div>
        </div>
      </Reveal>

      {auth ? (
        <Reveal delay={140} className="form-card review-form-card">
          <h3 className="h3">Share your experience</h3>
          {submitted && <div className="form-success">Thanks — your review is live!</div>}
          <form onSubmit={submit}>
            <Field label="Function type">
              <select className="input" value={form.functionType} onChange={(e) => set("functionType", e.target.value)}>
                {FUNCTION_TYPES.map((f) => <option key={f}>{f}</option>)}
              </select>
            </Field>
            <Field label="Rating">
              <StarPicker value={form.rating} onChange={(v) => set("rating", v)} />
            </Field>
            <Field label="Your review">
              <textarea className="input textarea" rows={3} placeholder="Tell future guests what stood out..." value={form.comment} onChange={(e) => set("comment", e.target.value)} />
            </Field>
            <button className="btn btn-primary" type="submit">Post Review</button>
          </form>
        </Reveal>
      ) : (
        <Reveal delay={140} className="review-login-hint">
          <p className="muted">Log in to leave your own review of Al-Noor Grand Banquet.</p>
        </Reveal>
      )}

      <div className="review-list">
        {sorted.map((r, i) => (
          <Reveal key={r.id} delay={(i % 6) * 60} className="testimonial-card">
            <div className="stars">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={13} fill={k < r.rating ? "var(--c-gold)" : "none"} stroke="var(--c-gold)" />)}</div>
            <p className="testimonial-q">"{r.comment}"</p>
            <div className="testimonial-n">{r.name} <span className="muted">· {r.functionType} · {fmtDate(r.date)}</span></div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
