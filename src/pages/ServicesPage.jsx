import React from "react";
import { useTranslation } from "react-i18next";
import { Phone, Target, Users, BookOpen, ChevronRight } from "lucide-react";
import { BLUE, BLUE_LIGHT, INK, SLATE, PH } from "@/data/constants";
import PageHero from "@/components/PageHero";

function ServicesPage({ setPage }) {
  const { t } = useTranslation();
  const links = [
    { key:"contact", icon:Phone,    label:t("dropContact"),       sub:t("svcContactSub")  },
    { key:"programs", icon:Target,   label:t("dropPrograms"),      sub:t("svcProgramsSub") },
    { key:"collaborators", icon:Users,    label:t("dropCollaborators"), sub:t("svcCollabSub")   },
    { key:"faq", icon:BookOpen, label:t("dropFaq"),           sub:t("svcFaqSub")      },
  ];
  return (
    <div style={{ background:BLUE_LIGHT, minHeight:"100vh" }}>
      <PageHero eyebrow={t("servicesEye")} title={t("servicesTitle")} sub={t("servicesSub")} photo={PH.school} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid sm:grid-cols-2 gap-6">
          {links.map(l => (
            <button key={l.key} onClick={() => setPage(l.key)}
              className="group bg-white rounded-lg p-8 text-left transition-all hover:shadow-md"
              style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
              <div className="font-bold text-lg mb-2" style={{ color:INK }}>{l.label}</div>
              <div className="text-sm leading-relaxed mb-6" style={{ color:SLATE }}>{l.sub}</div>
              <div className="flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all" style={{ color:BLUE }}>{t("viewService")} <ChevronRight size={14} /></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// CONTACT

export default ServicesPage;
