import React from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { BLUE, BLUE_LIGHT, INK, SLATE } from "@/data/constants";

function UnderConstructionPage({ setPage }) {
  const { t } = useTranslation();
  return (
    <div style={{ background:BLUE_LIGHT, minHeight:"100vh" }} className="flex items-center justify-center py-20 px-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-10 text-center flex flex-col items-center" style={{ border:"1px solid rgba(0,87,184,0.1)", boxShadow:"0 4px 20px rgba(0,0,0,0.03)" }}>
        <h2 className="text-2xl font-bold mb-3" style={{ color:INK }}>{t("ucTitle")}</h2>
        <p className="text-base leading-relaxed mb-8" style={{ color:SLATE }}>{t("ucDesc")}</p>
        <button onClick={() => setPage("home")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all hover:brightness-110"
          style={{ background:BLUE }}>
          <ChevronRight size={16} className="rotate-180" /> {t("ucBtn")}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// APP ROOT

export default UnderConstructionPage;
