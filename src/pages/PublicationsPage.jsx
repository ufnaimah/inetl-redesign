import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Search, ChevronDown, FileText, Calendar } from "lucide-react";
import {
  BLUE, BLUE_LIGHT, BLUE_DARK, INK, SLATE, DARK_CARD, PH, publications,
} from "@/data/constants";
import { BookCover, DownloadButtons } from "@/components/SharedComponents";
import PageHero from "@/components/PageHero";

function PublicationsPage() {
  const { t } = useTranslation();
  const [q, setQ]    = useState("");
  const [yr, setYr]  = useState(t("allYears"));
  const [cat, setCat]= useState(t("allCategories"));

  const filtered = useMemo(() => t("pubItems", { returnObjects: true }).filter((p) =>
    (q===""||p.title.toLowerCase().includes(q.toLowerCase())||p.desc.toLowerCase().includes(q.toLowerCase()))&&
    (yr===t("allYears")||p.year.toString()===yr)&&
    (cat===t("allCategories")||t(p.catKey)===cat)
  ), [q,yr,cat,t]);

  const accentMap = {
    catCensus:BLUE, catLiving:"#7c3aed", catPrices:"#ea580c", catNatAcc:"#0891b2",
    catAgri:"#16a34a", catHealth:"#0e7490", catPoverty:BLUE_DARK, catYearbook:"#854d0e", catGender:"#be185d",
  };

  return (
    <div style={{ background:BLUE_LIGHT, minHeight:"100vh" }}>
      <PageHero eyebrow={t("pubSectionLabel")} title={t("pubTitle")}
        sub="Official reports, surveys, yearbooks, and data compilations produced by INETL." photo={PH.coast} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg p-5 mb-6 flex flex-wrap gap-3 items-center" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color:SLATE }} />
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder={t("searchPlaceholder")}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none"
              style={{ background:BLUE_LIGHT, color:INK, border:"1px solid rgba(0,87,184,0.12)" }} />
          </div>
          {[
            { val:yr,  set:setYr,  opts:[t("allYears"),  ..."2024,2023,2022,2020,2017".split(",")] },
            { val:cat, set:setCat, opts:[t("allCategories"), t("catCensus"), t("catLiving"), t("catPrices"), t("catNatAcc"), t("catAgri"), t("catHealth"), t("catPoverty"), t("catYearbook"), t("catGender")] },
          ].map(({val,set,opts},i) => (
            <div key={i} className="relative">
              <select value={val} onChange={e=>set(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2.5 rounded-lg text-sm focus:outline-none"
                style={{ background:BLUE_LIGHT, color:INK, border:"1px solid rgba(0,87,184,0.12)" }}>
                {opts.map(o=><option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:SLATE }} />
            </div>
          ))}
        </div>
        <p className="text-xs mb-6" style={{ color:SLATE }}>
          {t("showingOf")} <strong style={{ color:BLUE }}>{filtered.length}</strong> / {publications.length} {t("ofPublications")}
        </p>
        {filtered.length===0 ? (
          <div className="text-center py-24" style={{ color:SLATE }}>
            <FileText size={48} className="mx-auto mb-4 opacity-20" />
            <p>{t("noPubMatch")}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map(pub => {
              const ac = accentMap[pub.catKey]??BLUE;
              return (
                <div key={pub.id} className="bg-white rounded-lg flex flex-col overflow-hidden" style={{ border:"1px solid rgba(0,87,184,0.1)", minHeight: "440px" }}>
                  <BookCover title={pub.title} year={pub.year} cat={t(pub.catKey)} pages={pub.pages} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background:`${ac}12`, color:ac }}>{t(pub.catKey)}</span>
                      <span className="text-[11px] font-medium flex items-center gap-1" style={{ color:SLATE }}><Calendar size={10}/> {pub.year}</span>
                    </div>
                    <h3 className="font-semibold leading-snug mb-3" style={{ color:INK, fontSize:"1.05rem", lineHeight:1.4 }}>{pub.title}</h3>
                    <p className="text-[11px] leading-relaxed mb-4" style={{ color:SLATE }}>{pub.desc}</p>
                    <div className="pt-4 mt-auto" style={{ borderTop:"1px solid rgba(0,87,184,0.07)" }}>
                      <button className="w-full mb-3 py-2.5 rounded-lg text-[11px] font-semibold text-center hover:bg-blue-50 transition-colors"
                        style={{ border:`1.5px solid ${BLUE}25`, color:BLUE }}>{t("viewBtn")}</button>
                      <DownloadButtons />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SDG

export default PublicationsPage;
