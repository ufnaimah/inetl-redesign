import React from "react";
import { FileText, Download, Table2 } from "lucide-react";
import { BLUE, BLUE_MID, BLUE_DARK, DARK_CARD, CAT_BG } from "@/data/constants";
import { useTranslation } from "react-i18next";

// Thumbnail images for publication cards (by catKey)
const PUB_THUMBS = {
  catCensus:  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
  catLiving:  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
  catPrices:  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&q=80",
  catNatAcc:  "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=500&q=80",
  catAgri:    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&q=80",
  catHealth:  "https://images.unsplash.com/photo-1584515933487-779824d29309?w=500&q=80",
  catPoverty: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=500&q=80",
  catYearbook:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80",
  catGender:  "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=500&q=80",
  default:    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
};

function BookCover({ title, year, cat, pages, catKey }) {
  const bg = (catKey && CAT_BG[catKey]) ?? CAT_BG[cat] ?? DARK_CARD;
  const thumb = PUB_THUMBS[catKey] || PUB_THUMBS.default;
  return (
    <div className="relative overflow-hidden select-none" style={{ height:186 }}>
      {/* Thumbnail image */}
      <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover" />
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background:`linear-gradient(to top, ${bg} 20%, ${bg}cc 60%, ${bg}99 100%)` }} />
      {/* Blue accent stripe */}
      <div className="absolute top-0 left-0 right-0 flex" style={{ height:3 }}>
        <div style={{ flex:1, background:BLUE }} />
        <div style={{ flex:1, background:"rgba(255,255,255,0.12)" }} />
        <div style={{ flex:1, background:BLUE_MID }} />
      </div>
      {/* INETL badge */}
      <div className="absolute top-5 left-4 flex items-center gap-1.5">
        <div className="flex items-center justify-center rounded font-black text-[9px]"
          style={{ width:22, height:22, background:"rgba(255,255,255,0.18)", color:"#fff" }}>TL</div>
        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-white" style={{ opacity:0.7 }}>INETL</span>
      </div>
      {/* Year */}
      <div className="absolute top-5 right-4 rounded-full px-2 py-0.5 text-[9px] font-bold text-white"
        style={{ background:"rgba(255,255,255,0.18)" }}>{year}</div>
      {/* Title */}
      <div className="absolute left-4 right-4" style={{ bottom:38 }}>
        <p className="text-white font-bold leading-snug"
          style={{ fontSize:"0.82rem", display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          {title}
        </p>
      </div>
      {/* Footer bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center px-4 py-1.5" style={{ background:"rgba(0,0,0,0.4)" }}>
        <span className="text-[9px] font-bold uppercase tracking-widest text-white" style={{ opacity:0.65 }}>{cat}</span>
        <span className="ml-auto text-[9px] text-white" style={{ opacity:0.4 }}>{pages} pages</span>
      </div>
    </div>
  );
}

// ─── TL Map ───────────────────────────────────────────────────
function TLMap({ compact }) {
  const dots = [
    ["Dili",175,78,true],["Ermera",130,108,false],["Ainaro",165,135,false],
    ["Manufahi",210,140,false],["Aileu",185,115,false],["Liquiçá",105,80,false],
    ["Bobonaro",78,115,false],["Covalima",90,148,false],["Manatuto",240,100,false],
    ["Baucau",285,88,false],["Lautém",355,110,false],["Viqueque",310,140,false],["Oe-Cusse",40,60,false],
  ];
  return (
    <svg viewBox="0 0 420 210" className="w-full h-full">
      <rect width="420" height="210" fill="rgba(0,87,184,0.1)" rx="8" />
      <path d="M 60,100 C 75,78 110,62 155,58 C 195,54 245,52 290,58 C 330,63 370,78 395,100 C 405,115 395,135 370,148 C 340,162 300,168 255,170 C 210,172 165,170 120,162 C 85,156 58,140 58,120 Z" fill={BLUE} />
      <path d="M 18,56 C 24,44 38,40 54,46 C 64,50 66,62 56,68 C 44,74 22,68 18,58 Z" fill={BLUE} />
      {dots.map(([name,x,y,cap]) => (
        <g key={name}>
          <circle cx={x} cy={y} r={cap?5.5:3.5} fill={cap?"#fff":"rgba(255,255,255,0.7)"} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          {cap && !compact && <text x={x} y={y-9} textAnchor="middle" fontSize="7.5" fill="white" fontWeight="700" opacity="0.9">Dili ★</text>}
        </g>
      ))}
    </svg>
  );
}

// ─── Download Buttons (icons kept — functional, not decorative) ─
function DownloadButtons({ size="normal" }) {
  const { t } = useTranslation();
  const c = size === "compact";
  const cls = `flex items-center gap-1 font-bold hover:opacity-85 transition-opacity ${c?"px-2 py-1 text-[9px] rounded":"px-2.5 py-1.5 text-[10px] rounded-lg"}`;
  return (
    <div className={`flex flex-wrap ${c?"gap-1":"gap-1.5"}`}>
      <button className={cls} style={{ background:"rgba(229,57,53,0.12)", color:"#e53935", border:"1px solid rgba(229,57,53,0.2)" }} title="PDF">
        <FileText size={c?9:10} /> {t("dlPdf")}
      </button>
      <button className={cls} style={{ background:"#f1f3f5", color:"#4a5568" }} title="CSV">
        <Download size={c?9:10} /> {t("dlCsv")}
      </button>
      <button className={cls} style={{ background:"#60ac31", color:"#fff" }} title="Excel">
        <Table2 size={c?9:10} /> {t("dlExcel")}
      </button>
    </div>
  );
}

export { BookCover, TLMap, DownloadButtons };
