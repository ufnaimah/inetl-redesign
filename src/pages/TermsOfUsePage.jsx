import React from "react";
import { BLUE_LIGHT, INK, SLATE } from "@/data/constants";
import PageHero from "@/components/PageHero";

const sections = [
  { title: "1. Acceptance of Terms", body: "By accessing and using the INETL website (www.statistics.gov.tl), you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this website. INETL reserves the right to modify these terms at any time without prior notice." },
  { title: "2. Use of Statistical Data", body: "All statistical data, publications, and datasets published on this website are official products of the Instituto Nacional de Estatística de Timor-Leste. Users are granted a non-exclusive, royalty-free licence to download, reproduce, and redistribute this data for non-commercial and research purposes, provided that INETL is cited as the source." },
  { title: "3. Citation Requirements", body: "When referencing INETL data in publications, reports, or presentations, please use the following format: 'Source: Instituto Nacional de Estatística de Timor-Leste (INETL), [Publication Title], [Year].' Failure to properly attribute data may constitute a violation of intellectual property standards." },
  { title: "4. Prohibited Uses", body: "Users may not: (a) use INETL data to attempt re-identification of individual respondents; (b) misrepresent or manipulate statistical data in a manner that distorts its meaning; (c) use data for discriminatory purposes; or (d) commercially resell raw datasets without written authorisation from INETL." },
  { title: "5. Microdata Access", body: "Access to anonymised microdata files requires a formal application and execution of a Microdata Use Agreement. Applications are reviewed by the INETL Data Access Committee. Approved researchers must comply with all conditions specified in the agreement, including secure data handling and result validation." },
  { title: "6. Limitation of Liability", body: "INETL makes every effort to ensure the accuracy and timeliness of data published on this website. However, INETL does not warrant that all information is error-free and accepts no liability for any loss or damage arising from the use of data obtained from this website." },
  { title: "7. Governing Law", body: "These Terms of Use are governed by the laws of the Democratic Republic of Timor-Leste. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts of Timor-Leste." },
];

function TermsOfUsePage() {
  return (
    <div style={{ background: BLUE_LIGHT, minHeight: "100vh" }}>
      <PageHero eyebrow="Legal" title="Terms of Use" sub="Conditions governing the use of INETL data and services."
        photo="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&q=80" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs mb-10" style={{ color: SLATE }}>Effective date: 1 January 2024</p>
        {sections.map(s => (
          <div key={s.title} className="mb-10">
            <h2 className="text-lg font-bold mb-3" style={{ color: INK }}>{s.title}</h2>
            <p className="text-sm leading-relaxed" style={{ color: SLATE }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TermsOfUsePage;
