import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, Menu, X } from "lucide-react";
import { BLUE, BLUE_LIGHT, NAV_BG, INK, SLATE, CREAM, GOLD } from "@/data/constants";
import logoInetl from "@/imports/Logo_INETL_7db89cf703.png";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import NavSearch from "./NavSearch";
import NavDropMenu from "./NavDropMenu";
import flagUS from "@/assets/flag-us.jpg";
import flagTL from "@/assets/flag-tl.jpg";
import flagPT from "@/assets/flag-pt.jpg";

const LANG_CODES = {
  en: "EN",
  tet: "TL",
  pt: "PT",
};

const LANG_LABELS = {
  en: "English",
  tet: "Tetum",
  pt: "Português",
};

const LANG_FLAGS = {
  en: flagUS,
  tet: flagTL,
  pt: flagPT,
};

function Navbar({ page, setPage }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const setLang = (l) => i18n.changeLanguage(l);
  const [langOpen, setLangOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // close mobile menu on page change
  useEffect(() => { setMobileOpen(false); }, [page]);

  const statsPages = ["census", "census-survey", "publications", "dashboard", "indicators", "data"];
  const isStatsActive = statsPages.includes(page);

  const statsItems = [
    { label: t("dropCensus"),       key: "census-survey", desc: t("descCensus") },
    { label: t("dropIndicators"),   key: "indicators",    desc: t("descIndicators") },
    { label: "Data Explorer",       key: "data",          desc: "Browse & download statistical tables" },
    { label: t("dropPublications"), key: "publications",  desc: t("descPublications") },
    { label: t("dropDashboard"),    key: "dashboard",     desc: t("descDashboard") },
  ];

  const svcItems = [
    { label: t("dropContact"),       key: "contact",       desc: t("descContact") },
    { label: t("dropPrograms"),      key: "programs",      desc: t("descPrograms") },
    { label: t("dropCollaborators"), key: "collaborators", desc: t("descCollaborators") },
    { label: t("dropFaq"),           key: "faq",           desc: t("descFaq") },
  ];

  const navCls = "relative flex items-center px-4 h-full text-sm font-medium whitespace-nowrap transition-colors duration-200";
  const navColor = (a) => a ? "#fff" : "rgba(255,255,255,0.6)";

  function NavItem({ k, label, active }) {
    return (
      <button onClick={() => setPage(k)} className={navCls}
        style={{ color: navColor(active), background: "transparent" }}
        onMouseEnter={e => e.currentTarget.style.color = GOLD}
        onMouseLeave={e => e.currentTarget.style.color = navColor(active)}>
        {label}
        {active && <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full" style={{ background: GOLD }} />}
      </button>
    );
  }

  // mobile nav item
  function MobileNavItem({ k, label }) {
    const active = page === k;
    return (
      <button onClick={() => setPage(k)}
        className="w-full text-left px-4 py-3 text-sm font-medium transition-colors"
        style={{ color: active ? GOLD : "rgba(255,255,255,0.7)", borderLeft: active ? `3px solid ${GOLD}` : "3px solid transparent" }}>
        {label}
      </button>
    );
  }

  return (
    <nav className="sticky top-0 z-50" style={{ background: NAV_BG }}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 gap-3">

          {/* Logo */}
          <button onClick={() => setPage("home")} className="flex items-center gap-3 flex-shrink-0 mr-1">
            <ImageWithFallback src={logoInetl} alt="INETL" className="object-contain flex-shrink-0"
              style={{ height: 40, width: "auto", maxWidth: 120 }} />
            <div className="hidden md:flex flex-col justify-center italic font-bold text-left"
              style={{ fontSize: "12px", lineHeight: "1.1", color: "#FFFFFF" }}>
              <span>INSTITUTO NACIONAL DE ESTATÍSTICA</span>
              <span>DE TIMOR-LESTE</span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center flex-1 h-14 ml-12 md:ml-16">
            {([["home", t("home")], ["about", t("about")]]).map(([k, l]) => (
              <NavItem key={k} k={k} label={l} active={page === k} />
            ))}

            <div className="relative h-full flex items-center"
              onMouseEnter={() => setOpenDrop("stats")} onMouseLeave={() => setOpenDrop(null)}>
              <button className={navCls + " gap-1.5"}
                style={{ color: navColor(isStatsActive || openDrop === "stats"), background: "transparent" }}
                onMouseEnter={e => e.currentTarget.style.color = GOLD}
                onMouseLeave={e => e.currentTarget.style.color = navColor(isStatsActive || openDrop === "stats")}>
                {t("navStats")}
                <ChevronDown size={12} style={{ transition: "transform 0.2s", transform: openDrop === "stats" ? "rotate(180deg)" : "none" }} />
                {isStatsActive && <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full" style={{ background: GOLD }} />}
              </button>

              <NavDropMenu
                items={statsItems}
                id="stats"
                open={openDrop}
                setOpen={setOpenDrop}
                navigate={setPage}
              />
            </div>

            <NavItem k="news" label={t("navNews")} active={page === "news"} />
            <NavItem k="sdg" label={t("sdg")} active={page === "sdg"} />

            <div className="relative h-full flex items-center"
              onMouseEnter={() => setOpenDrop("services")} onMouseLeave={() => setOpenDrop(null)}>
              <button onClick={() => setPage("services")} className={navCls + " gap-1.5"}
                style={{ color: navColor(page === "services" || openDrop === "services"), background: "transparent" }}
                onMouseEnter={e => e.currentTarget.style.color = GOLD}
                onMouseLeave={e => e.currentTarget.style.color = navColor(page === "services" || openDrop === "services")}>
                {t("navServices")}
                <ChevronDown size={12} style={{ transition: "transform 0.2s", transform: openDrop === "services" ? "rotate(180deg)" : "none" }} />
                {page === "services" && <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full" style={{ background: GOLD }} />}
              </button>

              <NavDropMenu
                items={svcItems}
                id="services"
                open={openDrop}
                setOpen={setOpenDrop}
                navigate={setPage}
              />
            </div>
          </div>

          <div className="flex-1 lg:hidden" />

          <NavSearch navigate={setPage} />

          {/* Language */}
          <div className="relative flex-shrink-0">
            <button onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.8)" }}>

              <img
                src={LANG_FLAGS[lang]}
                alt={LANG_LABELS[lang]}
                className="w-5 h-3.5 object-cover rounded-sm"
              />

              {LANG_CODES[lang]}

              <ChevronDown
                size={11}
                className={`transition-transform ${langOpen ? "rotate-180" : ""}`}
              />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden min-w-[160px]"
                style={{ zIndex: 9999, border: "1px solid rgba(0,87,184,0.12)" }}>

                {["en", "tet", "pt"].map(l => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors hover:bg-gray-50"
                    style={{ color: lang === l ? BLUE : INK, fontWeight: lang === l ? 700 : 400 }}
                  >

                    <img
                      src={LANG_FLAGS[l]}
                      alt={LANG_LABELS[l]}
                      className="w-5 h-3.5 object-cover rounded-sm"
                    />

                    <span className="flex-1">{LANG_LABELS[l]}</span>

                    {lang === l && (
                      <span style={{ color: BLUE, fontSize: 13 }}>✓</span>
                    )}

                  </button>
                ))}

              </div>
            )}
          </div>

          {/* Hamburger */}
          <button className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg"
            style={{ background: "rgba(255,255,255,0.08)" }}
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen
              ? <X size={18} style={{ color: "#fff" }} />
              : <Menu size={18} style={{ color: "#fff" }} />
            }
          </button>

        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t"
          style={{ background: NAV_BG, borderColor: "rgba(255,255,255,0.08)" }}>

          <div className="py-2">
            <MobileNavItem k="home" label={t("home")} />
            <MobileNavItem k="about" label={t("about")} />

            <p
              className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {t("navStats")}
            </p>

            {statsItems.map(i => (
              <MobileNavItem
                key={i.key + i.label}
                k={i.key}
                label={i.label}
              />
            ))}

            <MobileNavItem k="news" label={t("navNews")} />
            <MobileNavItem k="sdg" label={t("sdg")} />

            <p
              className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {t("navServices")}
            </p>

            {svcItems.map(i => (
              <MobileNavItem
                key={i.key + i.label}
                k={i.key}
                label={i.label}
              />
            ))}
          </div>

        </div>
      )}
    </nav>
  );
}

export default Navbar;