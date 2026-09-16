import React from "react";
import { useTranslation } from "react-i18next";
import { Search, Calendar, ChevronRight } from "lucide-react";
import { BLUE, BLUE_LIGHT, INK, SLATE, PH, LOCAL_HEROES } from "@/data/constants";
import PageHero from "@/components/PageHero";

function NewsPage() {
  const { t } = useTranslation();
  const newsItems = t("newsItems", { returnObjects: true });
  return (
    <div style={{ background:BLUE_LIGHT, minHeight:"100vh" }}>
      <PageHero eyebrow={t("newsEye")} title={t("newsTitle")} sub={t("newsSub")} photo={LOCAL_HEROES.news} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg p-5 mb-8" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color:SLATE }} />
            <input placeholder={t("searchNewsPlaceholder")}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none"
              style={{ background:BLUE_LIGHT, color:INK, border:"1px solid rgba(0,87,184,0.12)" }} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {newsItems.map(news => (
            <article key={news.id} className="group bg-white rounded-lg" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
              <div className="relative overflow-hidden" style={{ height:196 }}>
                <img src={PH[news.catKey === 'catCensus' ? 'census' : news.catKey === 'catEconomy' ? 'trade' : news.catKey === 'catPoverty' ? 'people' : news.catKey === 'catHealth' ? 'health' : news.catKey === 'catAgri' ? 'agri' : 'island']} alt={news.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background:"rgba(8,16,36,0.52)" }} />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider text-white" style={{ background:news.catColor }}>{t(news.catKey)}</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"
                    style={{ background:"rgba(255,255,255,0.14)", backdropFilter:"blur(4px)", color:"rgba(255,255,255,0.9)" }}>
                    <Calendar size={9} /> {news.date}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold leading-snug mb-2.5" style={{ color:INK, fontSize:"1rem", lineHeight:1.45 }}>{news.title}</h3>
                <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color:SLATE }}>{news.desc}</p>
                <div className="flex items-center justify-between pt-3" style={{ borderTop:"1px solid rgba(0,87,184,0.07)" }}>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color:SLATE }}><Calendar size={10}/><span>{news.date}</span></div>
                  <div className="flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color:news.catColor }}>{t("readMore")} <ChevronRight size={13} /></div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <button className="px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all hover:brightness-110" style={{ background:BLUE }}>{t("loadMoreNews")}</button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SERVICES

export default NewsPage;
