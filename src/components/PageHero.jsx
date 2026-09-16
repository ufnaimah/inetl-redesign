import React from "react";
import { BLUE, BLUE_DARK, NAV_BG, GOLD, INK, SLATE } from "@/data/constants";

function PageHero({ eyebrow, title, sub, photo }) {
  return (
    <div className="relative overflow-hidden" style={{ minHeight:240 }}>
      {photo && <img src={photo} alt={title} className="absolute inset-0 w-full h-full object-cover" />}
      <div className="absolute inset-0" style={{ background:photo?"rgba(8,16,36,0.80)":NAV_BG }} />
      {/* NO left yellow bar */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <span className="text-xs font-bold uppercase tracking-[0.2em] block mb-4" style={{ color:"rgba(255,255,255,0.48)" }}>{eyebrow}</span>
        <h1 className="text-white mb-3" style={{ fontSize:"clamp(1.75rem,3vw,2.5rem)", lineHeight:1.2 }}>{title}</h1>
        {sub && <p className="text-base max-w-2xl" style={{ color:"rgba(255,255,255,0.52)" }}>{sub}</p>}
        <div className="mt-4 h-0.5 w-16 rounded-full" style={{ background:GOLD }} />
      </div>
    </div>
  );
}

export default PageHero;
