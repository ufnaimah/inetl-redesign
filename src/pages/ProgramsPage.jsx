import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { BLUE, BLUE_LIGHT, INK, SLATE, PH } from "@/data/constants";
import PageHero from "@/components/PageHero";

function ProgramsPage() {
  const { t } = useTranslation();
  const programs = [
    { title:"National Census Program",   status:"Completed (2022)", desc:"The foundational decennial enumeration of population and housing across Timor-Leste, providing critical demographic baseline data.", c:BLUE       },
    { title:"Living Standards Survey",   status:"Active (2023-2024)",desc:"Comprehensive household survey measuring poverty, inequality, expenditure patterns, and social welfare indicators.", c:"#7c3aed"  },
    { title:"Agricultural Census",       status:"Planning Phase",    desc:"Upcoming national survey of agricultural holdings, production, livestock, and rural livelihoods.", c:"#16a34a" },
    { title:"Business Activity Survey",  status:"Ongoing",           desc:"Annual survey of formally registered businesses to estimate economic output, value added, and employment.", c:"#ea580c"  },
  ];
  return (
    <div style={{ background:BLUE_LIGHT, minHeight:"100vh" }}>
      <PageHero eyebrow={t("programsEye")} title={t("programsTitle")} sub={t("programsSub")} photo={PH.agri} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-lg p-8 mb-10" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color:INK }}>{t("strategicData")}</h2>
          <p className="text-sm leading-relaxed" style={{ color:SLATE }}>{t("strategicDataBody")}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {programs.map(p => (
            <div key={p.title} className="bg-white rounded-lg p-6 flex flex-col justify-between" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg" style={{ color:INK }}>{p.title}</h3>
                  <span className="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider text-white" style={{ background:p.c }}>{p.status}</span>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color:SLATE }}>{p.desc}</p>
              </div>
              <button className="self-start text-xs font-bold flex items-center gap-1.5 transition-opacity hover:opacity-70" style={{ color:p.c }}>{t("learnMore")} <ArrowRight size={12} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// COLLABORATION

export default ProgramsPage;
