import React from "react";
import { Sparkles, MapPin, Phone, Mail } from "lucide-react";

export function Footer({ goto }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-mark"><Sparkles size={16} /></span>
          <div>
            <div className="brand-title">Al-Noor Grand Banquet</div>
            <div className="footer-tag">Where every celebration finds its light.</div>
          </div>
        </div>
        <div className="footer-cols">
          <div>
            <div className="footer-h">Explore</div>
            <button onClick={() => goto("gallery")}>Gallery</button>
            <button onClick={() => goto("pricing")}>Pricing</button>
            <button onClick={() => goto("availability")}>Availability</button>
            <button onClick={() => goto("reviews")}>Reviews</button>
          </div>
          <div>
            <div className="footer-h">Contact</div>
            <div className="footer-line"><MapPin size={14} /> Shahrah-e-Faisal, Karachi</div>
            <div className="footer-line"><Phone size={14} /> 021-111-266-667</div>
            <div className="footer-line"><Mail size={14} /> hello@alnoorbanquet.pk</div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Al-Noor Grand Banquet. All rights reserved.</div>
    </footer>
  );
}
