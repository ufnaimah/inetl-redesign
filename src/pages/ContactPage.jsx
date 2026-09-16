import React from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail } from "lucide-react";
import { BLUE, BLUE_LIGHT, INK, SLATE, PH } from "@/data/constants";
import PageHero from "@/components/PageHero";

function ContactPage() {
  const { t } = useTranslation();
  return (
    <div style={{ background:BLUE_LIGHT, minHeight:"100vh" }}>
      <PageHero eyebrow={t("contactEye")} title={t("contactTitle")} sub={t("contactSub")} photo={PH.dili} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-8" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
              <h2 className="text-xl font-semibold mb-6" style={{ color:INK }}>{t("contactInfo")}</h2>
              <div className="space-y-6">
                {([[MapPin,t("contactHQ"),"Rua Presidente Nicolau Lobato\nDili, Timor-Leste"],[Phone,t("contactPhone"),"+670 332 4654\n+670 331 0115"],[Mail,t("contactEmail"),"info@statistics.gov.tl\ndatarequest@statistics.gov.tl"]]).map(([Icon,label,text]) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:BLUE_LIGHT }}><Icon size={18} style={{ color:BLUE }} /></div>
                    <div>
                      <div className="font-bold text-sm mb-1" style={{ color:INK }}>{label}</div>
                      <div className="text-sm" style={{ color:SLATE }}>{text.split("\n").map((l,i)=><span key={i}>{l}<br/></span>)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden" style={{ height:300, border:"1px solid rgba(0,87,184,0.1)" }}>
              <img src={PH.market} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg p-8" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
              <h2 className="text-xl font-semibold mb-6" style={{ color:INK }}>{t("sendMessage")}</h2>
              <form className="space-y-4" onSubmit={e=>e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  {[[t("contactFirstName")],[t("contactLastName")]].map(([label]) => (
                    <div key={label}>
                      <label className="block text-xs font-semibold mb-1" style={{ color:INK }}>{label}</label>
                      <input type="text" className="w-full p-2.5 rounded-lg text-sm border focus:outline-none" style={{ borderColor:"rgba(0,87,184,0.15)", background:BLUE_LIGHT }} />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color:INK }}>{t("contactEmailLabel")}</label>
                  <input type="email" className="w-full p-2.5 rounded-lg text-sm border focus:outline-none" style={{ borderColor:"rgba(0,87,184,0.15)", background:BLUE_LIGHT }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color:INK }}>{t("contactSubject")}</label>
                  <select className="w-full p-2.5 rounded-lg text-sm border focus:outline-none" style={{ borderColor:"rgba(0,87,184,0.15)", background:BLUE_LIGHT }}>
                    <option>{t("subjectGeneral")}</option>
                    <option>{t("subjectData")}</option>
                    <option>{t("subjectMedia")}</option>
                    <option>{t("subjectTech")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color:INK }}>{t("contactMessage")}</label>
                  <textarea rows={5} className="w-full p-2.5 rounded-lg text-sm border focus:outline-none" style={{ borderColor:"rgba(0,87,184,0.15)", background:BLUE_LIGHT }}></textarea>
                </div>
                <button className="w-full py-3 rounded-lg font-semibold text-sm text-white transition-all hover:brightness-110" style={{ background:BLUE }}>{t("sendMessage")}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PROGRAMS

export default ContactPage;
