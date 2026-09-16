import React from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { BLUE, BLUE_LIGHT, INK, SLATE, PH } from "@/data/constants";
import PageHero from "@/components/PageHero";

function CollaborationPage() {
  const { t } = useTranslation();
  return (
    <div style={{ background:BLUE_LIGHT, minHeight:"100vh" }}>
      <PageHero eyebrow={t("collabEye")} title={t("collabTitle")} sub={t("collabSub")} photo={PH.market} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-8" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
              <h2 className="text-xl font-semibold mb-4" style={{ color:INK }}>{t("partnerEco")}</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color:SLATE }}>{t("partnerEcoBody")}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[{title:t("partnerIntl"),desc:t("partnerIntlDesc")},{title:t("partnerGov"),desc:t("partnerGovDesc")},{title:t("partnerAcad"),desc:t("partnerAcadDesc")},{title:t("partnerNgo"),desc:t("partnerNgoDesc")}].map(c => (
                  <div key={c.title} className="p-4 rounded-lg" style={{ background:BLUE_LIGHT, border:"1px solid rgba(0,87,184,0.1)" }}>
                    <div className="font-bold text-sm mb-1" style={{ color:BLUE }}>{c.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color:SLATE }}>{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-8" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
              <h2 className="text-xl font-semibold mb-4" style={{ color:INK }}>{t("collabRequest")}</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color:SLATE }}>{t("collabRequestBody")}</p>
              <button className="px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all hover:brightness-110" style={{ background:BLUE }}>{t("submitInterest")}</button>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg p-6" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color:BLUE }}>{t("currentPartners")}</h3>
              <div className="space-y-4">
                {["UNFPA","World Bank","Asian Development Bank (ADB)","DFAT Australia","Statistics Korea (KOSTAT)"].map(p => (
                  <div key={p} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background:BLUE_LIGHT }}>
                      <Globe size={14} style={{ color:BLUE }}/>
                    </div>
                    <span className="text-sm font-medium" style={{ color:INK }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// FAQ

export default CollaborationPage;
