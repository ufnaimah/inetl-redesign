import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight, Calendar, Download, Search } from "lucide-react";
import {
  BLUE, BLUE_LIGHT, BLUE_DARK, INK, SLATE, CREAM, GOLD, DARK_CARD, PH, fmt,
} from "@/data/constants";
import { DownloadButtons } from "@/components/SharedComponents";
import PageHero from "@/components/PageHero";

/* ── static data ─────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "population",
    title: "Population & Housing Census",
    desc: "Complete enumeration of all persons, households, and dwellings throughout Timor-Leste. Two full population censuses have been conducted since independence.",
    surveys: [
      { title: "Population and Housing Census 2022", year: 2022, status: "completed", respondents: "1,340,513", coverage: "National — 13 Municipalities", thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
      { title: "Population and Housing Census 2010", year: 2010, status: "completed", respondents: "1,066,409", coverage: "National — 13 Districts", thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80" },
    ],
  },
  {
    id: "economic",
    title: "Economic Census & Surveys",
    desc: "Measurement of economic activity including business establishments, national accounts, and trade statistics.",
    surveys: [
      { title: "Business Activity Survey 2023",   year: 2023, status: "ongoing",   respondents: "12,400",  coverage: "Urban + Rural", thumb: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80" },
      { title: "National Accounts Statistics 2023", year: 2023, status: "completed", respondents: "–",       coverage: "National",     thumb: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80" },
      { title: "Consumer Price Index (CPI) 2023",   year: 2023, status: "completed", respondents: "–",       coverage: "13 Municipalities", thumb: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&q=80" },
    ],
  },
  {
    id: "social",
    title: "Demographic & Social Surveys",
    desc: "Surveys capturing living standards, poverty, health outcomes, and demographic indicators across Timor-Leste.",
    surveys: [
      { title: "Timor-Leste Living Standards Survey 2022", year: 2022, status: "completed", respondents: "6,800 HH",  coverage: "National",     thumb: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80" },
      { title: "Demographic and Health Survey 2016",       year: 2016, status: "completed", respondents: "12,607 HH", coverage: "National",     thumb: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=80" },
      { title: "Labour Force Survey 2023",                 year: 2023, status: "ongoing",   respondents: "5,200 HH",  coverage: "Urban + Rural", thumb: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&q=80" },
    ],
  },
  {
    id: "agriculture",
    title: "Agricultural Census & Surveys",
    desc: "Comprehensive data collection on agricultural holdings, crop production, livestock, and food security.",
    surveys: [
      { title: "Agricultural Census 2019",          year: 2019, status: "completed", respondents: "189,042 HH", coverage: "Rural",   thumb: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&q=80" },
      { title: "Food Security Survey 2022",         year: 2022, status: "completed", respondents: "4,600 HH",   coverage: "National", thumb: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80" },
    ],
  },
];

const STATUS_COLORS = {
  completed: { bg: "#dcfce7", text: "#166534" },
  ongoing:   { bg: "#fef3c7", text: "#92400e" },
  planned:   { bg: `${BLUE}14`, text: BLUE },
};

/* ── page component ──────────────────────────────────── */
function CensusSurveyPage() {
  const { t } = useTranslation();
  const [activeCat, setActiveCat] = useState("population");
  const [searchQ, setSearchQ] = useState("");

  const filtered = CATEGORIES.map(cat => ({
    ...cat,
    surveys: cat.surveys.filter(s =>
      !searchQ || s.title.toLowerCase().includes(searchQ.toLowerCase())
    ),
  })).filter(cat =>
    activeCat === "all" ? true : cat.id === activeCat
  ).filter(cat => cat.surveys.length > 0);

  return (
    <div style={{ background: BLUE_LIGHT, minHeight: "100vh" }}>
      <PageHero
        eyebrow={t("censusSectionLabel")}
        title="Census & Survey"
        sub="Complete catalogue of population censuses, economic surveys, and social data collection programmes conducted by INETL."
        photo={PH.census}
      />

      {/* Toolbar */}
      <div className="bg-white border-b sticky top-14 z-30" style={{ borderColor: "rgba(0,87,184,0.1)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 flex-wrap">
          {/* Category tabs */}
          <div className="flex gap-1 p-1 rounded-lg" style={{ background: BLUE_LIGHT }}>
            {[{ id: "all", label: "All" }, ...CATEGORIES.map(c => ({ id: c.id, label: c.title.split(" ")[0] }))].map(tab => (
              <button key={tab.id}
                onClick={() => setActiveCat(tab.id)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={activeCat === tab.id
                  ? { background: BLUE, color: "#fff" }
                  : { color: SLATE }}>
                {tab.label}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative flex-1 max-w-xs ml-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: SLATE }} />
            <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
              placeholder="Search surveys…"
              className="w-full pl-9 pr-3 py-2 rounded-lg text-sm focus:outline-none"
              style={{ background: BLUE_LIGHT, color: INK, border: "1px solid rgba(0,87,184,0.12)" }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm" style={{ color: SLATE }}>No surveys match your search.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {filtered.map(cat => (
              <section key={cat.id}>
                {/* Section header */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-1" style={{ color: INK }}>{cat.title}</h2>
                  <p className="text-sm" style={{ color: SLATE }}>{cat.desc}</p>
                </div>

                {/* Survey cards — same card style as publication cards */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cat.surveys.map(survey => {
                    const st = STATUS_COLORS[survey.status] || STATUS_COLORS.completed;
                    return (
                      <div key={survey.title} className="bg-white rounded-lg overflow-hidden flex flex-col"
                        style={{ border: "1px solid rgba(0,87,184,0.1)" }}>
                        {/* Thumbnail */}
                        <div className="relative h-40 overflow-hidden">
                          <img src={survey.thumb} alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${DARK_CARD} 5%, ${DARK_CARD}88 50%, transparent 100%)` }} />
                          <div className="absolute top-3 right-3">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: st.bg, color: st.text }}>
                              {survey.status}
                            </span>
                          </div>
                          <div className="absolute bottom-3 left-4 right-4">
                            <p className="text-white font-bold text-sm leading-snug"
                              style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                              {survey.title}
                            </p>
                          </div>
                        </div>

                        {/* Body */}
                        <div className="p-5 flex flex-col flex-1">
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            {[
                              ["Year", survey.year],
                              ["Respondents", survey.respondents],
                              ["Coverage", survey.coverage],
                            ].map(([label, val]) => (
                              <div key={label}>
                                <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: SLATE }}>{label}</div>
                                <div className="text-sm font-semibold" style={{ color: INK }}>{val}</div>
                              </div>
                            ))}
                          </div>

                          <div className="pt-3 mt-auto" style={{ borderTop: "1px solid rgba(0,87,184,0.07)" }}>
                            <DownloadButtons size="compact" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Summary stats bar */}
        <div className="mt-16 rounded-lg p-6" style={{ background: DARK_CARD }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              ["2", "Population Censuses"],
              ["12+", "Active Surveys"],
              ["1.34M", "Population Covered"],
              ["13", "Municipalities"],
            ].map(([val, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold text-white font-mono">{val}</div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CensusSurveyPage;
