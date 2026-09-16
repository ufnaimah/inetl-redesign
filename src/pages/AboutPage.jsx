import React from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle } from "lucide-react";
import { BLUE, BLUE_LIGHT, INK, SLATE, PH, LOCAL_HEROES } from "@/data/constants";
import PageHero from "@/components/PageHero";

function AboutPage() {
  const { t } = useTranslation();
  return (
    <div style={{ background:BLUE_LIGHT, minHeight:"100vh" }}>
      <PageHero eyebrow={t("aboutEye")} title={t("aboutTitle")} sub={t("aboutSub")} photo={LOCAL_HEROES.about} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {[{title:t("missionTitle"),body:t("missionBody")},{title:t("visionTitle"),body:t("visionBody")},{title:t("legalTitle"),body:t("legalBody")},{title:t("standardsTitle"),body:t("standardsBody")}].map(s => (
              <div key={s.title} className="bg-white rounded-lg p-6" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color:INK }}>{s.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color:SLATE }}>{s.body}</p>
              </div>
            ))}
            <div className="rounded-lg overflow-hidden" style={{ height:260 }}>
              <img src={PH.dili} alt="Aerial view of Dili" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-5">
            <div className="bg-white rounded-lg" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
              <div className="px-5 py-3.5 border-b" style={{ background:BLUE_LIGHT, borderColor:"rgba(0,87,184,0.08)" }}>
                <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color:BLUE }}>{t("quickFacts")}</h3>
              </div>
              {[["Founded","2004"],["Ministry","Ministry of Finance"],["Staff","~180 employees"],["HQ","Dili, Timor-Leste"],["Censuses","4 (2004–2022)"],["Annual pubs.","40+"]].map(([l,v]) => (
                <div key={l} className="px-5 py-3 flex justify-between border-t text-sm" style={{ borderColor:"rgba(0,87,184,0.05)" }}>
                  <span style={{ color:SLATE }}>{l}</span>
                  <span className="font-semibold" style={{ color:INK }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg p-6" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color:BLUE }}>{t("coreValues")}</h3>
              {[t("val1"),t("val2"),t("val3"),t("val4"),t("val5")].map(v => (
                <div key={v} className="flex items-center gap-3 mb-3.5 last:mb-0">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:BLUE }} />
                  <span className="text-sm" style={{ color:SLATE }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// NEWS

export default AboutPage;
