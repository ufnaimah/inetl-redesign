import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { BLUE, BLUE_LIGHT, INK, SLATE, PH } from "@/data/constants";
import PageHero from "@/components/PageHero";

function FAQPage() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(0);
  const faqs = [
    { q:"How can I access microdata from the 2022 Census?", a:"Anonymized microdata files are available for researchers upon formal request. Please submit a request via our Contact page specifying your research objectives." },
    { q:"When are inflation (CPI) figures published?", a:"The Consumer Price Index (CPI) report is published monthly, typically on the 15th day of the following month, in the Publications Library under 'Prices'." },
    { q:"Are INETL publications free to download?", a:"Yes, all official statistics reports, yearbooks, and methodological documents produced by INETL are available digital downloads (PDF/CSV/Excel) in our Publications Library." },
    { q:"Does INETL conduct tailored surveys for private organizations?", a:"INETL's primary mandate is the production of official national statistics. We occasionally collaborate on specific surveys if they align with national development priorities." },
    { q:"How is household poverty measured in Timor-Leste?", a:"Poverty is measured using data from the Timor-Leste Living Standards Survey (TLSS), using an absolute poverty line based on the cost of basic needs." },
  ];
  return (
    <div style={{ background:BLUE_LIGHT, minHeight:"100vh" }}>
      <PageHero eyebrow={t("faqEye")} title={t("faqTitle")} sub={t("faqSub")} photo={PH.school} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-3">
          {faqs.map((f,i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden" style={{ border:"1px solid rgba(0,87,184,0.1)" }}>
              <button onClick={() => setOpen(open===i?null:i)} className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none">
                <span className="font-semibold text-sm" style={{ color:INK }}>{f.q}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${open===i?"rotate-180":""}`} style={{ color:SLATE }} />
              </button>
              {open===i && (
                <div className="px-6 pb-5">
                  <div className="h-px w-full mb-4" style={{ background:"rgba(0,87,184,0.08)" }} />
                  <p className="text-sm leading-relaxed" style={{ color:SLATE }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-sm mb-4" style={{ color:SLATE }}>{t("cantFind")}</p>
          <button className="px-6 py-2.5 rounded-lg font-semibold text-sm text-white transition-all hover:brightness-110" style={{ background:BLUE }}>{t("contactSupport")}</button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// UNDER CONSTRUCTION

export default FAQPage;
