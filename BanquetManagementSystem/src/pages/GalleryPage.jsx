import React, { useState } from "react";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "../hooks/useUI.jsx";
import { GALLERY_ITEMS, GALLERY_CATS } from "../data/constants.js";

function GalleryTile({ item, onOpen }) {
  return (
    <button className={`gallery-tile tone-${item.tone}`} onClick={() => onOpen(item)}>
      <div className="gallery-tile-pattern" />
      <div className="gallery-tile-cap">
        <ImageIcon size={16} />
        <span>{item.title}</span>
      </div>
    </button>
  );
}

export function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const items = filter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.cat === filter);
  const idx = lightbox ? items.findIndex((i) => i.id === lightbox.id) : -1;

  const move = (dir) => {
    const next = (idx + dir + items.length) % items.length;
    setLightbox(items[next]);
  };

  return (
    <div className="page">
      <Reveal><span className="eyebrow">Visual gallery</span></Reveal>
      <Reveal delay={60}><h1 className="h1">A glimpse of every setup</h1></Reveal>
      <Reveal delay={100}><p className="muted page-lede">Art-directed placeholders standing in for our real event photography — colour and texture map to each category below.</p></Reveal>

      <div className="chip-row">
        {GALLERY_CATS.map((c) => (
          <button key={c} className={`chip ${filter === c ? "chip-active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>

      <div className="gallery-grid">
        {items.map((it, i) => (
          <Reveal key={it.id} delay={(i % 4) * 60}>
            <GalleryTile item={it} onOpen={setLightbox} />
          </Reveal>
        ))}
      </div>

      {lightbox && (
        <div className="lightbox-backdrop" onClick={() => setLightbox(null)}>
          <div className={`lightbox tone-${lightbox.tone}`} onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-pattern" />
            <button className="icon-btn lightbox-close" onClick={() => setLightbox(null)}><X size={18} /></button>
            <button className="icon-btn lightbox-nav lightbox-prev" onClick={() => move(-1)}><ChevronLeft size={20} /></button>
            <button className="icon-btn lightbox-nav lightbox-next" onClick={() => move(1)}><ChevronRight size={20} /></button>
            <div className="lightbox-cap">
              <div className="lightbox-cat">{lightbox.cat}</div>
              <div className="lightbox-title">{lightbox.title}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
