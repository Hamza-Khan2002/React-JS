import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Building2, PartyPopper, UserCog, Sparkles, Star } from "lucide-react";
import { Reveal, useCountUp } from "../hooks/useUI.jsx";
import { ArchMotif } from "../components/UI.jsx";

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

export function HomePage({ goto, bookings, reviews }) {
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
  const topReviews = [...reviews].sort((a, b) => b.rating - a.rating || (a.date < b.date ? 1 : -1)).slice(0, 3);

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
          {topReviews.map((t, i) => (
            <Reveal key={t.id} delay={i * 100} className="testimonial-card">
              <div className="stars">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={13} fill={k < t.rating ? "var(--c-gold)" : "none"} stroke="var(--c-gold)" />)}</div>
              <p className="testimonial-q">"{t.comment}"</p>
              <div className="testimonial-n">{t.name} <span className="muted">· {t.functionType}</span></div>
            </Reveal>
          ))}
          {topReviews.length === 0 && (
            <Reveal className="testimonial-card"><p className="muted">Be the first to leave a review after your function.</p></Reveal>
          )}
        </div>
        <Reveal delay={160} className="reviews-more">
          <button className="btn btn-outline" onClick={() => goto("reviews")}>Read all reviews</button>
        </Reveal>
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
