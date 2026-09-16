import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BLUE, INK, SLATE, CREAM, SEARCH_INDEX } from "@/data/constants";

function NavSearch({ navigate }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) { setOpen(false); setQ(""); }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const term = q.toLowerCase();
    return SEARCH_INDEX.filter(item =>
      item.label.toLowerCase().includes(term) || item.type.toLowerCase().includes(term)
    ).slice(0, 8);
  }, [q]);

  const quickLinks = [
    { label: t("dropCensus"),       page: "census-survey" },
    { label: t("dropPublications"), page: "publications" },
    { label: t("dropDashboard"),    page: "dashboard" },
    { label: t("dropIndicators"),   page: "indicators" },
    { label: t("sdg"),              page: "sdg" },
  ];

  const close = () => { setOpen(false); setQ(""); };
  const go = (pg) => { navigate(pg); close(); };

  return (
    <div ref={containerRef} className="relative flex-shrink-0"
      onMouseEnter={() => setOpen(true)}>

      {/* Collapsed = icon only / Expanded = input field */}
      <div className={`flex items-center rounded-lg h-9 transition-all duration-300 overflow-hidden ${open ? "px-3" : "px-0 justify-center w-9"}`}
        style={{
          background: open ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)",
          border: open ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.16)",
          width: open ? 280 : 36,
        }}>
        <Search size={14} className="flex-shrink-0" style={{ color: "rgba(255,255,255,0.6)" }} />
        {open && (
          <>
            <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)}
              onKeyDown={e => { if (e.key === "Escape") close(); }}
              placeholder={t("searchPlaceholderNav")}
              className="flex-1 bg-transparent outline-none text-sm ml-2 placeholder-white/40"
              style={{ color: "#fff" }} />
            <button onClick={() => { if (q) setQ(""); else close(); }} className="flex-shrink-0 ml-1"
              style={{ color: "rgba(255,255,255,0.5)" }}>
              <X size={13} />
            </button>
          </>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg overflow-hidden"
          style={{ width: 340, zIndex: 9999, border: "1px solid rgba(0,87,184,0.12)", boxShadow: "0 12px 40px rgba(0,87,184,0.14)" }}>

          {q.trim() === "" ? (
            <div className="p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest px-2 mb-2" style={{ color: SLATE }}>
                {t("searchQuickLinks")}
              </p>
              {quickLinks.map(link => (
                <button key={link.page + link.label} onClick={() => go(link.page)}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors hover:bg-gray-50"
                  style={{ color: INK }}>
                  <span>{link.label}</span>
                  <ArrowRight size={12} style={{ color: SLATE }} />
                </button>
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: `${BLUE}08` }}>
                <Search size={24} style={{ color: SLATE }} />
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: INK }}>{t("searchNoResult")}</p>
              <p className="text-xs mb-5" style={{ color: SLATE }}>{t("searchTryOther")}</p>
              <div className="flex justify-center gap-2">
                <button onClick={() => go("home")}
                  className="px-4 py-2 rounded-lg text-xs font-semibold transition-colors hover:brightness-95"
                  style={{ background: BLUE, color: "#fff" }}>
                  {t("home")}
                </button>
                <button onClick={() => go("indicators")}
                  className="px-4 py-2 rounded-lg text-xs font-semibold transition-colors hover:bg-gray-100"
                  style={{ border: `1px solid ${BLUE}`, color: BLUE }}>
                  {t("dropIndicators")}
                </button>
              </div>
            </div>
          ) : (
            <div className="py-1.5 max-h-80 overflow-y-auto">
              {results.map((item, i) => (
                <button key={i} onClick={() => go(item.page)}
                  className="w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors hover:bg-gray-50"
                  style={{ borderBottom: i < results.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium leading-tight truncate" style={{ color: INK }}>{item.label}</div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold flex-shrink-0"
                    style={{ background: `${BLUE}12`, color: BLUE }}>{item.type}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NavSearch;
