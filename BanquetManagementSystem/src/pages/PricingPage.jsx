import React from "react";
import { Check } from "lucide-react";
import { Reveal } from "../hooks/useUI.jsx";
import { PACKAGES } from "../data/constants.js";
import { fmtMoney } from "../utils/helpers.js";

export function PricingPage({ goto }) {
  return (
    <div className="page">
      <Reveal><span className="eyebrow">Packages</span></Reveal>
      <Reveal delay={60}><h1 className="h1">Simple pricing, fully catered</h1></Reveal>
      <Reveal delay={100}><p className="muted page-lede">Every package includes hall rental, décor, catering and sound — choose the tier that fits your guest list.</p></Reveal>

      <div className="pricing-grid">
        {PACKAGES.map((p, i) => (
          <Reveal key={p.id} delay={i * 100} className={`price-card ${p.popular ? "price-card-popular" : ""}`}>
            {p.popular && <div className="popular-badge">Most Popular</div>}
            <div className="price-name">{p.name}</div>
            <div className="price-amount">{fmtMoney(p.price)}<span className="price-suffix">/ function</span></div>
            <div className="price-cap">Up to {p.capacity} guests</div>
            <ul className="price-features">
              {p.features.map((f) => (
                <li key={f}><Check size={15} className="check-ico" /> {f}</li>
              ))}
            </ul>
            <button className={`btn ${p.popular ? "btn-gold" : "btn-outline"} btn-block`} onClick={() => goto("booking-form", { pkg: p.name })}>
              Select {p.name}
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
