import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Globe, Download, Search, ChevronRight, Users, MapPin,
  BarChart2, BookOpen, Target, ArrowRight, FileText,
  TrendingUp, Database, Activity, Calendar, ChevronDown,
  ExternalLink, Home, Phone, Mail, Building, Layers,
  CheckCircle, TrendingDown, Minus, X, Table2,
  Youtube, Instagram, Facebook,
} from "lucide-react";
import {
  BLUE, BLUE_LIGHT, BLUE_DARK, INK, SLATE, DARK_CARD, fmt, municipalities,
} from "@/data/constants";
import { DownloadButtons } from "@/components/SharedComponents";
import PageHero from "@/components/PageHero";
import { PH } from "@/data/constants";

function CensusPage() {
  const { t } = useTranslation();
  const [tab, setTab] = useState("overview");
  const tabs = [["overview",t("tabOverview")],["municipalities",t("tabMunicipalities")],["indicators",t("tabIndicators")],["downloads",t("tabDownloads")]];

  return (
    <div style={{ background:BLUE_LIGHT, minHeight:"100vh" }}>
      <PageHero eyebrow={t("censusSectionLabel")} title="Population & Housing Census 2022"
        sub="The fourth census of Timor-Leste, conducted October–November 2022." photo={PH.town} />
      <div className="bg-white border-b sticky top-14 z-20" style={{ borderColor:"rgba(0,87,184,0.1)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto">
          {tabs.map(([k,l]) => (
            <button key={k} onClick={() => setTab(k)}
              className="px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all"
              style={tab===k?{borderColor,color,fontWeight:700}:{borderColor:"transparent",color:SLATE}}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {tab==="overview" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg p-6" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
                <h2 className="text-2xl font-bold mb-4" style={{ color:INK }}>{t("aboutCensus")}</h2>
                <p className="text-sm leading-relaxed text-gray-600 mb-3">{t("aboutCensusBody1")}</p>
                <p className="text-sm leading-relaxed text-gray-600">{t("aboutCensusBody2")}</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="rounded-lg overflow-hidden" style={{ height:200 }}><img src={PH.people} alt="" className="w-full h-full object-cover" /></div>
                <div className="rounded-lg overflow-hidden" style={{ height:200 }}><img src={PH.coast}  alt="" className="w-full h-full object-cover" /></div>
              </div>
              <div className="bg-white rounded-lg p-6" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
                <h3 className="font-bold mb-6" style={{ color:INK }}>{t("censusHistory")}</h3>
                <div className="space-y-5 relative">
                  <div className="absolute left-4 top-0 bottom-0 w-px" style={{ background:"rgba(0,87,184,0.12)" }} />
                  {[["2022","1,340,513",t("censusMostRecent"),true],["2010","1,066,409",t("censusSecond"),false]].map(([yr,pop,note,isNew]) => (
                    <div key={yr} className="flex items-start gap-6 relative z-10">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background:isNew?BLUE:DARK_CARD }}>{(yr).slice(2)}</div>
                      <div>
                        <div className="text-sm font-semibold" style={{ color:INK }}>{yr} Census</div>
                        <div className="text-base font-bold" style={{ color:BLUE }}>{pop}</div>
                        <div className="text-xs" style={{ color:SLATE }}>{note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {([["Population","1,340,513"],[t("lblTotHouseholds"),"289,127"],[t("lblAvgHousehold"),"4.64 persons"],[t("munLabel"),"13"],[t("lblAdminPosts"),"452"],[t("lblSucos"),"2,228"],[t("lblPopDensity"),"90.2 / km²"],[t("lblSexRatio"),"100.4 (M/100F)"]]).map(([l,v]) => (
                <div key={l} className="bg-white rounded-lg p-4 " style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
                  <div>
                    <div className="text-xs" style={{ color:SLATE }}>{l}</div>
                    <div className="text-sm font-semibold" style={{ color:INK }}>{v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="municipalities" && (
          <div className="bg-white rounded-lg" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
            <div className="p-6 border-b flex items-center justify-between" style={{ borderColor:"rgba(0,87,184,0.07)" }}>
              <h3 className="font-bold text-sm" style={{ color:INK }}>{t("lblMunicipalityStats")}</h3>
              <DownloadButtons size="compact" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr style={{ background:BLUE_LIGHT }}>
                  {[t("lblMunicipality"),t("lblPopulation"),t("lblHouseholds"),t("lblAreaKm2"),t("lblDensityKm2"),t("lblUrbanPct")].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wide" style={{ color:SLATE }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {[...municipalities].sort((a,b)=>b.population-a.population).map(m => (
                    <tr key={m.name} className="border-t" style={{ borderColor:"rgba(0,87,184,0.05)" }}
                      onMouseEnter={e=>(e.currentTarget).style.background=BLUE_LIGHT}
                      onMouseLeave={e=>(e.currentTarget).style.background="transparent"}>
                      <td className="px-5 py-3.5 font-semibold" style={{ color:BLUE }}>{m.name}</td>
                      <td className="px-5 py-3.5 font-medium" style={{ color:INK }}>{fmt(m.population)}</td>
                      <td className="px-5 py-3.5" style={{ color:SLATE }}>{fmt(Math.round(m.population/4.64))}</td>
                      <td className="px-5 py-3.5" style={{ color:SLATE }}>{fmt(m.area)}</td>
                      <td className="px-5 py-3.5"><span className="font-medium" style={{ color:m.density>200?BLUE:INK }}>{m.density}</span></td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 rounded-full h-1.5" style={{ background:"rgba(0,87,184,0.1)" }}>
                            <div className="h-1.5 rounded-full" style={{ width:`${m.urban}%`, background:BLUE }} />
                          </div>
                          <span className="text-xs" style={{ color:SLATE }}>{m.urban}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab==="indicators" && (
          <div className="space-y-4">
            <div className="flex justify-end"><DownloadButtons /></div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[
                {cat:"Population", items:[["Total","1,340,513"],["Male","671,513 (50.1%)"],["Female","669,000 (49.9%)"],["Growth Rate","1.8%"],["Youth 0–24","60.8%"],["Median Age","18.4 yrs"]]},
                {cat:"Households", items:[["Total","289,127"],["Avg Size","4.64"],["Female-headed","21.3%"],["Electricity","61.2%"],["Piped Water","42.8%"],["Mobile Phone","72.4%"]]},
                {cat:"Housing",    items:[["Permanent","54.3%"],["Semi-permanent","28.9%"],["Temporary","16.8%"],["Sanitation","58.9%"],["Clean Fuel","12.1%"],["Internet","24.6%"]]},
                {cat:"Education",  items:[["Primary net","68.3%"],["Secondary","42.1%"],["Literacy 15+","68.1%"],["Higher Ed","8.4%"],["Mean Years","5.3 yrs"],["No Schooling","18.2%"]]},
                {cat:"Employment", items:[["LFP Rate","34.8%"],["Employment","28.9%"],["Youth Unemp","31.4%"],["Agriculture","64.2%"],["Services","24.1%"],["Industry","11.7%"]]},
                {cat:"Migration",  items:[["Urban Migration","3.1%/yr"],["Emigrants","142,000"],["Internal","8.9%"],["Net Rate","-2.1‰"],["Dili Inflow","12,400/yr"],["Returns","4,200"]]},
              ].map(s => (
                <div key={s.cat} className="bg-white rounded-lg" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
                  <div className="px-5 py-3 border-b" style={{ background:BLUE_LIGHT, borderColor:"rgba(0,87,184,0.08)" }}>
                    <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color:BLUE }}>{s.cat}</h3>
                  </div>
                  {s.items.map(([l,v]) => (
                    <div key={l} className="px-5 py-2.5 flex justify-between border-t text-xs" style={{ borderColor:"rgba(0,87,184,0.05)" }}>
                      <span style={{ color:SLATE }}>{l}</span>
                      <span className="font-semibold" style={{ color:INK }}>{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="downloads" && (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {[
              {title:t("censusDlTitle"),       desc:t("censusDlFinalDesc"),      type:"DOC", size:"18.4 MB", pages:412 },
              {title:t("censusDlSummary"),     desc:t("censusDlSummaryDesc"),    type:"DOC", size:"4.2 MB",  pages:96  },
              {title:t("censusDlAtlas"),       desc:t("censusDlAtlasDesc"),      type:"DOC", size:"42.1 MB", pages:156 },
              {title:t("censusDlProfiles"),    desc:t("censusDlProfilesDesc"),   type:"ZIP", size:"28.7 MB", pages:null},
              {title:t("censusDlQuestionnaire"),desc:t("censusDlQuestDesc"),     type:"DOC", size:"1.1 MB",  pages:24  },
              {title:t("censusDlMethodology"), desc:t("censusDlMethodDesc"),     type:"DOC", size:"3.8 MB",  pages:72  },
            ].map(doc => (
              <div key={doc.title} className="bg-white rounded-lg p-6 flex items-start gap-6" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
                <div className="w-11 px-2 py-3 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                  style={{ background:doc.type==="ZIP"?"#ea580c":BLUE }}>{doc.type}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1 leading-tight" style={{ color:INK }}>{doc.title}</div>
                  <div className="text-xs mb-3" style={{ color:SLATE }}>{doc.desc}</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs" style={{ color:SLATE }}>{doc.size}</span>
                    {doc.pages && <span className="text-xs" style={{ color:SLATE }}>{doc.pages}p</span>}
                    <div className="ml-auto"><DownloadButtons size="compact" /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PUBLICATIONS

export default CensusPage;
