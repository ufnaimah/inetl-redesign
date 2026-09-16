import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";
import {
  Globe, Download, Search, ChevronRight, Users, MapPin,
  BarChart2, BookOpen, Target, ArrowRight, FileText,
  TrendingUp, Database, Activity, Calendar, ChevronDown,
  ExternalLink, Home, Phone, Mail, Building, Layers,
  CheckCircle, TrendingDown, Minus, X, Table2,
  Youtube, Instagram, Facebook,
} from "lucide-react";
import {
  BLUE, BLUE_LIGHT, BLUE_MID, BLUE_DARK, NAV_BG, INK, SLATE, CREAM,
  RED_ACCENT, GOLD, DARK_CARD, PH, fmt, LOCAL_HEROES,
  municipalities, popTrendData, ageData, sdgGoals, munBarData, infogTiles,
} from "@/data/constants";
import { BookCover, TLMap, DownloadButtons } from "@/components/SharedComponents";

function Hero({ setPage }) {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden" style={{ minHeight:640 }}>
      <img src={LOCAL_HEROES.home} alt="Timor-Leste" className="absolute inset-0 w-full h-full object-cover" style={{ filter:"brightness(1.18)" }} />
      <div className="absolute inset-0" style={{ background:"linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 100%)" }} />
      <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(8,16,36,0.72) 0%, transparent 60%)" }} />
      {/* NO yellow left bar */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-36 lg:pt-28">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-1 h-5 rounded-full" style={{ background:GOLD }} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color:"rgba(255,255,255,0.52)" }}>{t("heroEye")}</span>
          </div>
          <h1 style={{ marginBottom:28 }}>
            <span className="block text-white leading-none" style={{ fontSize:"clamp(2rem,4vw,3rem)" }}>{t("heroLine1")}</span>
            <span className="block leading-none" style={{ fontSize:"clamp(2rem,4vw,3rem)", color: GOLD }}>{t("heroLine2")}</span>
          </h1>
          <p className="text-base md:text-lg leading-relaxed mb-10 max-w-xl font-light" style={{ color:"rgba(255,255,255,0.62)" }}>{t("heroSub")}</p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setPage("dashboard")}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-semibold text-sm transition-all hover:brightness-110"
              style={{ background:GOLD, color: "#000000" }}>
              {t("cta1")} <ArrowRight size={16} />
            </button>
            <button onClick={() => setPage("publications")}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-semibold text-sm border transition-all hover:bg-white/10 text-white"
              style={{ borderColor:"rgba(255,255,255,0.28)" }}>
              {t("cta2")} <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="absolute bottom-0 left-0 right-0"
        style={{ background:"rgba(4,10,22,0.92)", backdropFilter:"blur(8px)", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {([
              [Users,    t("popLabel"), "1,340,513", "Census 2022"   ],
              [Home,     t("hhLabel"),  "289,127",   "Registered"    ],
              [MapPin,   t("munLabel"), "13",         "Districts"     ],
              [BarChart2,t("indLabel"), "200+",       "Across sectors"],
            ]).map(([Icon, label, value, sub]) => (
              <div key={label} className="px-5 py-4 border-r last:border-r-0 flex items-center gap-3" style={{ borderColor:"rgba(255,255,255,0.06)" }}>
                <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ background:"rgba(251, 195, 18, 0.1)" }}>
                  <Icon size={18} style={{ color: GOLD }} />
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color:"rgba(255,255,255,0.35)" }}>{label}</div>
                  <div className="text-xl font-semibold font-mono leading-none mb-0.5 text-white">{value}</div>
                  <div className="text-xs" style={{ color: GOLD }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CensusFeature({ setPage }) {
  const { t } = useTranslation();
  const highlights = [
    ["Avg Household","4.64 persons"],["Density","90.2 / km²"],
    ["Urban Pop","30.2%"],["Youth <25","60.8%"],
    ["Literacy","68.1%"],["Growth","1.8% /yr"],
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label — no gold line */}
        <div className="flex items-center gap-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color:BLUE }}>{t("censusSectionLabel")}</span>
          <div className="h-px flex-1 max-w-xs" style={{ background:"rgba(0,87,184,0.15)" }} />
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="relative">
            <div className="rounded-lg overflow-hidden" style={{ height:360 }}>
              <img src={PH.town} alt="Timor-Leste" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background:"rgba(8,16,36,0.25)" }} />
            </div>
            <div className="absolute -bottom-5 -right-4 lg:-right-7 rounded-lg overflow-hidden"
              style={{ width:175, height:108, background:BLUE_LIGHT, border:`2px solid rgba(0,87,184,0.3)` }}>
              <TLMap />
            </div>
            <div className="absolute top-5 -left-4 lg:-left-6 bg-white rounded-lg p-4"
              style={{ border:`1.5px solid rgba(0,87,184,0.15)` }}>
              <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color:BLUE }}>Population 2022</div>
              <div className="text-2xl font-bold font-mono leading-none mb-0.5" style={{ color:INK }}>1,340,513</div>
              <div className="flex items-center gap-1 mt-1.5 text-xs font-semibold" style={{ color:"#16a34a" }}>
                <TrendingUp size={12} /> +13.3% since 2015
              </div>
            </div>
          </div>

          <div className="pt-6 lg:pt-0">
            <h2 style={{ fontSize:"clamp(2rem,4vw,2.75rem)", lineHeight:1.15, color:INK, marginBottom:20 }}>
              <span className="block">{t("censusLine1")}</span>
              <span className="block">{t("censusLine2")}</span>
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color:SLATE }}>{t("censusSub")}</p>
            <div className="grid grid-cols-3 gap-3 mb-10">
              {highlights.map(([label,val]) => (
                <div key={label} className="rounded-lg p-4 text-center" style={{ background:BLUE_LIGHT, border:"1px solid rgba(0,87,184,0.1)" }}>
                  <div className="text-lg font-semibold leading-tight mb-1" style={{ color:INK }}>{val}</div>
                  <div className="text-xs leading-tight" style={{ color:SLATE }}>{label}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setPage("census")}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-semibold text-sm text-white transition-all hover:brightness-90"
              style={{ background:BLUE }}>
              {t("exploreCensus")} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PubSection({ setPage }) {
  const { t } = useTranslation();
  const accentMap = { catCensus:BLUE, catLiving:"#7c3aed", catPrices:"#ea580c", catNatAcc:"#0891b2", catAgri:"#16a34a", catHealth:"#0e7490", catPoverty:BLUE_DARK, catYearbook:"#854d0e", catGender:"#be185d" };
  return (
    <section className="py-24" style={{ background:BLUE_LIGHT }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <div>
            {/* No gold line */}
            <span className="text-xs font-bold uppercase tracking-[0.2em] block mb-4" style={{ color:BLUE }}>{t("pubSectionLabel")}</span>
            <h2 style={{ fontSize:"clamp(2rem,4vw,2.5rem)", color:INK, lineHeight:1.2 }}>{t("pubTitle")}</h2>
            <p className="text-base mt-2" style={{ color:SLATE }}>{t("pubSub")}</p>
          </div>
          <button onClick={() => setPage("publications")}
            className="hidden md:flex items-center gap-2 text-sm font-semibold" style={{ color:BLUE }}>
            {t("viewAll")} <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {t("pubItems", { returnObjects: true }).slice(0,3).map((pub) => (
              <div key={pub.id} className="bg-white rounded-lg flex flex-col overflow-hidden" style={{ border:"1px solid rgba(0,87,184,0.1)", minHeight: "440px" }}>
                <BookCover title={pub.title} year={pub.year} cat={t(pub.catKey)} pages={pub.pages} />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full"
                      style={{ background:`${accentMap[pub.catKey]??BLUE}12`, color:accentMap[pub.catKey]??BLUE }}>{t(pub.catKey)}</span>
                    <span className="text-[11px] font-medium" style={{ color:SLATE }}>{pub.year}</span>
                  </div>
                  <h3 className="font-semibold leading-snug mb-2" style={{ color:INK, fontSize:"0.95rem", lineHeight:1.4 }}>{pub.title}</h3>
                  <p className="text-[11px] leading-relaxed mb-4" style={{ color:SLATE }}>{pub.desc}</p>
                  <div className="pt-3 mt-auto" style={{ borderTop:"1px solid rgba(0,87,184,0.07)" }}>
                    <div className="flex gap-2 mb-2">
                      <button className="flex-1 py-2 rounded-lg text-[11px] font-semibold text-center hover:bg-blue-50 transition-colors"
                        style={{ border:`1.5px solid ${BLUE}25`, color:BLUE }}>{t("viewBtn")}</button>
                    </div>
                    <DownloadButtons size="compact" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Infographics panel */}
          <div className="rounded-lg overflow-hidden" style={{ border:"1px solid rgba(0,87,184,0.12)" }}>
            <div className="px-5 py-4 flex items-center justify-between" style={{ background:NAV_BG }}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest block mb-0.5" style={{ color:"rgba(255,255,255,0.4)" }}>{t("lblInfographics")}</span>
                <h3 className="text-sm font-semibold text-white">{t("infogTitle")}</h3>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full font-semibold"
                style={{ background:"rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.7)" }}>2022</span>
            </div>
            <div className="grid grid-cols-2 gap-px" style={{ background:"rgba(0,87,184,0.08)" }}>
              {infogTiles.map((tile,i) => (
                <div key={i} className="relative overflow-hidden group cursor-pointer transition-all hover:brightness-110"
                  style={{ background:tile.bg, minHeight:118 }}>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 118" aria-hidden>
                    {[0,1,2,3,4].map(r=>[0,1,2,3,4,5].map(c=>(
                      <circle key={`${r}-${c}`} cx={c*22+10} cy={r*22+10} r="1.2" fill="rgba(255,255,255,0.08)" />
                    )))}
                  </svg>
                  <div className="relative p-4">
                    <div className="text-[10px] font-semibold mb-2 opacity-60 text-white uppercase tracking-wider">{t(tile.labelKey)}</div>
                    <div className="text-2xl font-black text-white mb-1.5 leading-none">{tile.stat}</div>
                    <div className="text-[10px] opacity-50 text-white">{t(tile.subKey)}</div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background:"rgba(0,0,0,0.35)" }}>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white"
                      style={{ background:"rgba(255,255,255,0.2)" }}>
                      <Download size={11} /> {t("dlBtn")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 flex items-center justify-between bg-white" style={{ borderTop:"1px solid rgba(0,87,184,0.08)" }}>
              <span className="text-xs" style={{ color:SLATE }}>{t("infogCount")}</span>
              <button className="text-xs font-bold flex items-center gap-1" style={{ color:BLUE }}>{t("viewAll2")} <ArrowRight size={11}/></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DataChartSection() {
  const { t } = useTranslation();
const cpiData = [
  { mon:t("monthJan"),  all:7.9, food:9.2, housing:6.4, transport:5.8 },
  { mon:t("monthFeb"),  all:8.1, food:9.4, housing:6.7, transport:6.2 },
  { mon:t("monthMar"),  all:8.4, food:9.8, housing:7.0, transport:6.5 },
  { mon:t("monthApr"),  all:8.8, food:10.3,housing:7.3, transport:7.1 },
  { mon:t("monthMay"),  all:9.1, food:10.7,housing:7.6, transport:7.4 },
  { mon:t("monthJun"),  all:9.3, food:11.0,housing:7.8, transport:7.6 },
  { mon:t("monthJul"),  all:8.9, food:10.5,housing:7.5, transport:7.3 },
  { mon:t("monthAug"),  all:8.6, food:10.1,housing:7.2, transport:6.9 },
  { mon:t("monthSep"),  all:8.2, food:9.7, housing:6.9, transport:6.5 },
  { mon:t("monthOct"),  all:7.8, food:9.2, housing:6.5, transport:6.1 },
  { mon:t("monthNov"),  all:7.4, food:8.8, housing:6.2, transport:5.7 },
  { mon:t("monthDec"),  all:7.1, food:8.5, housing:5.9, transport:5.4 },
];
  const [tab, setTab] = useState("pop");
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* No gold line — blue label only */}
        <span className="text-xs font-bold uppercase tracking-[0.2em] block mb-3" style={{ color:BLUE }}>{t("infoGraphic")}</span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.5rem)", color:INK, lineHeight:1.2 }}>{t("dataExplorer")}</h2>
          <DownloadButtons />
        </div>

        <div className="rounded-lg overflow-hidden" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
          <div className="flex items-center gap-0 border-b px-2 pt-2" style={{ background:BLUE_LIGHT, borderColor:"rgba(0,87,184,0.1)" }}>
            {([["pop",t("tabPop")],["cpi",t("tabCpi")]]).map(([id,label]) => (
              <button key={id} onClick={() => setTab(id)}
                className="px-5 py-3 text-sm font-semibold rounded-t-xl transition-all"
                style={tab===id
                  ? { background:"#fff", color:INK, borderBottom:`2px solid ${BLUE}` }
                  : { color:SLATE }}>
                {label}
              </button>
            ))}
          </div>

          <div className="bg-white p-6">
            {tab==="pop" && (
              <>
                <p className="text-xs font-medium mb-6 text-center" style={{ color:SLATE }}>{t("censusChartSub")}</p>
                <ResponsiveContainer width="100%" height={340}>
                  <BarChart data={munBarData} margin={{ top:8,right:20,bottom:40,left:20 }} barGap={2} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="n" tick={{ fontSize:10,fill:INK,fontWeight:600 }} angle={-30} textAnchor="end" interval={0} />
                    <YAxis tick={{ fontSize:10,fill:"#9CA3AF" }} tickFormatter={v=>`${(v/1000).toFixed(0)}k`} width={36} />
                    <Tooltip contentStyle={{ fontSize:11,borderRadius:12,border:`1px solid rgba(0,87,184,0.1)` }} formatter={(v,name)=>[fmt(v),name]} />
                    <Legend wrapperStyle={{ fontSize:11,paddingTop:12 }} formatter={v=><span style={{ color:INK,fontWeight:600 }}>{v}</span>} />
                    <Bar dataKey="M" name={t("lblMale")}       fill="#60A5FA" radius={[4,4,0,0]} />
                    <Bar dataKey="F" name={t("lblFemale")}     fill={SLATE}    radius={[4,4,0,0]} />
                    <Bar dataKey="T" name={t("lblTotal")}      fill={BLUE}    radius={[4,4,0,0]} />
                    <Bar dataKey="H" name="Households" fill={INK}     radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </>
            )}
            {tab==="cpi" && (
              <>
                <p className="text-xs font-medium mb-6 text-center" style={{ color:SLATE }}>{t("cpiChartSub")}</p>
                <ResponsiveContainer width="100%" height={340}>
                  <LineChart data={cpiData} margin={{ top:8,right:24,bottom:8,left:4 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="mon" tick={{ fontSize:11,fill:INK }} />
                    <YAxis tick={{ fontSize:10,fill:"#9CA3AF" }} tickFormatter={v=>`${v}%`} domain={[4,12]} width={36} />
                    <Tooltip contentStyle={{ fontSize:11,borderRadius:12,border:`1px solid rgba(0,87,184,0.1)` }} formatter={(v,name)=>[`${v}%`,name]} />
                    <Legend wrapperStyle={{ fontSize:11,paddingTop:8 }} formatter={v=><span style={{ color:INK,fontWeight:600 }}>{v}</span>} />
                    <Line type="monotone" dataKey="all"       name={t("lblOverall")}   stroke={INK}     strokeWidth={2.5} dot={{ r:3,fill:INK }}     activeDot={{ r:5 }} />
                    <Line type="monotone" dataKey="food"      name={t("lblFood")}      stroke={BLUE}    strokeWidth={2.5} dot={{ r:3,fill:BLUE }}    activeDot={{ r:5 }} />
                    <Line type="monotone" dataKey="housing"   name={t("lblHousing")}   stroke={SLATE}    strokeWidth={2.5} dot={{ r:3,fill:GOLD }}    activeDot={{ r:5 }} />
                    <Line type="monotone" dataKey="transport" name={t("lblTransport")} stroke="#7c3aed" strokeWidth={2.5} dot={{ r:3,fill:"#7c3aed" }} activeDot={{ r:5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Infographics() {
  const { t } = useTranslation();
  return (
    <section className="py-24" style={{ background:BLUE_LIGHT }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* No gold line */}
        <span className="text-xs font-bold uppercase tracking-[0.2em] block mb-14" style={{ color:BLUE }}>{t("infoLabel")}</span>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:row-span-2 relative rounded-lg overflow-hidden" style={{ minHeight:380 }}>
            <img src={PH.coast} alt="Timor-Leste coastline" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background:"rgba(8,16,36,0.65)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:"rgba(255,255,255,0.5)" }}>Timor-Leste</div>
              <div className="text-3xl font-bold text-white mb-2">14,874 km²</div>
              <div className="text-sm" style={{ color:"rgba(255,255,255,0.55)" }}>Total land area</div>
            </div>
          </div>
          {[
            { v:"13.3%", l:t("lblPopGrowth"), s:t("lblFrom1522"),    bg:DARK_CARD },
            { v:"51.2y", l:t("lblLifeExp"),    s:t("lblAtBirth"), bg:BLUE      },
            { v:"68.1%", l:t("lblLitRate"),      s:t("lblAge15"),  bg:DARK_CARD },
            { v:"41.8%", l:t("lblPovertyRate"),       s:t("lblNat2022"), bg:BLUE_DARK },
            { v:"61.2%", l:t("lblElecAcc"), s:t("lblHH2023"),bg:DARK_CARD },
          ].map(item => (
            <div key={item.l} className="rounded-lg p-6 flex flex-col justify-between"
              style={{ background:item.bg, color:"#fff", minHeight:155 }}>
              <div className="text-sm font-medium opacity-60">{item.l}</div>
              <div>
                <div className="text-4xl font-bold mb-1">{item.v}</div>
                <div className="text-xs opacity-45">{item.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsSection({ setPage }) {
  const { t } = useTranslation();
  const newsItems = t("newsItems", { returnObjects: true });
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <div>
            {/* No gold line */}
            <span className="text-xs font-bold uppercase tracking-[0.2em] block mb-4" style={{ color:BLUE }}>{t("latestUpdates")}</span>
            <h2 style={{ fontSize:"clamp(2rem,4vw,2.5rem)", color:INK, lineHeight:1.2 }}>{t("recentNews")}</h2>
            <p className="text-base mt-2" style={{ color:SLATE }}>{t("recentNewsSub")}</p>
          </div>
          <button onClick={() => setPage("news")} className="hidden md:flex items-center gap-2 text-sm font-semibold flex-shrink-0" style={{ color:BLUE }}>
            {t("viewAllNews")} <ArrowRight size={15} />
          </button>
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
                  <div className="flex items-center gap-1.5 text-xs" style={{ color:SLATE }}><Calendar size={10} /><span>{news.date}</span></div>
                  <div className="flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color:news.catColor }}>{t("readMore")} <ChevronRight size={13} /></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SDGSection({ setPage }) {
  const { t } = useTranslation();
  return (
    <section className="py-24 relative overflow-hidden" style={{ background:NAV_BG }}>
      <img src={PH.island} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* No gold line */}
        <span className="text-xs font-bold uppercase tracking-[0.2em] block mb-6" style={{ color:"rgba(255,255,255,0.45)" }}>{t("sdgSectionLabel")}</span>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-white mb-3" style={{ fontSize:"clamp(2rem,4vw,2.75rem)", lineHeight:1.2 }}>{t("sdgTitle")}</h2>
            <p className="text-base" style={{ color:"rgba(255,255,255,0.48)" }}>{t("sdgSub")}</p>
          </div>
          <button onClick={() => setPage("sdg")}
            className="flex-shrink-0 flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-semibold text-sm text-white transition-all hover:brightness-110"
            style={{ background:BLUE }}>
            {t("exploreSDG")} <ArrowRight size={15} />
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2.5">
          {sdgGoals.map(g => (
            <div key={g.id} className="rounded-lg p-3 text-white cursor-pointer transition-all hover:scale-105" style={{ background:g.color }}>
              <div className="text-[10px] font-black opacity-70 mb-1.5">SDG {g.id}</div>
              <div className="text-[11px] font-semibold leading-tight mb-3" style={{ overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{g.name}</div>
              <div className="w-full h-1 rounded-full mb-1.5" style={{ background:"rgba(255,255,255,0.25)" }}>
                <div className="h-1 rounded-full" style={{ width:`${g.prog}%`, background:"rgba(255,255,255,0.88)" }} />
              </div>
              <div className="text-sm font-semibold">{g.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickAccess({ setPage }) {
  const { t } = useTranslation();
  const links = [
    { key:"census", icon:Database, label:t("census"),       sub:"Population & Housing Census 2022" },
    { key:"dashboard", icon:BarChart2, label:t("dashboard"),    sub:"Interactive demographic statistics" },
    { key:"publications", icon:FileText,  label:t("publications"), sub:"Reports, yearbooks & surveys" },
    { key:"sdg", icon:Globe,    label:t("sdg"),          sub:"Sustainable Development Goals" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* No gold line */}
        <span className="text-xs font-bold uppercase tracking-[0.2em] block mb-5" style={{ color:BLUE }}>{t("qaLabel")}</span>
        <h2 className="mb-16" style={{ fontSize:"clamp(2rem,4vw,2.5rem)", color:INK }}>{t("qaTitle")}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map(l => (
            <button key={l.key} onClick={() => setPage(l.key)}
              className="group bg-white rounded-lg p-7 text-left transition-all hover:shadow-md"
              style={{ border:"1px solid rgba(0,87,184,0.12)" }}>
              <div className="font-bold text-base mb-1.5" style={{ color:INK }}>{l.label}</div>
              <div className="text-sm leading-relaxed mb-5" style={{ color:SLATE }}>{l.sub}</div>
              <div className="flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all" style={{ color:BLUE }}>
                Access <ChevronRight size={14} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}


export { Hero, CensusFeature, PubSection, DataChartSection, Infographics, NewsSection, SDGSection, QuickAccess };
