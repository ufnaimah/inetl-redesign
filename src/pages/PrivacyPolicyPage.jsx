import React from "react";
import { BLUE_LIGHT, INK, SLATE } from "@/data/constants";
import PageHero from "@/components/PageHero";

const sections = [
  { title: "1. Introduction", body: "The Instituto Nacional de Estatística de Timor-Leste (INETL) is committed to protecting the privacy and confidentiality of all personal data collected through official statistical activities. This Privacy Policy outlines how we collect, use, store, and protect information obtained from users of this website and from respondents to our surveys and censuses." },
  { title: "2. Data Collection", body: "INETL collects two categories of data: (a) Statistical microdata gathered through censuses, household surveys, and administrative records, which are governed by the Statistics Act (Decree-Law No. 9/2004); and (b) Website usage data including anonymised analytics, session duration, and page views. We do not collect personally identifiable information through this website unless voluntarily submitted through the Contact form." },
  { title: "3. Purpose of Data Use", body: "All statistical data collected by INETL are used exclusively for the production of official statistics that inform government policy, support development planning, and fulfil international reporting obligations including the Sustainable Development Goals (SDGs). Website data are used solely to improve user experience and service delivery." },
  { title: "4. Data Protection & Security", body: "INETL implements technical and organisational measures to protect all data against unauthorised access, alteration, disclosure, or destruction. Microdata are stored in secure, access-controlled environments in accordance with the UN Fundamental Principles of Official Statistics and the IMF Special Data Dissemination Standard (SDDS)." },
  { title: "5. Data Sharing & Third Parties", body: "Anonymised and aggregated statistical data are published for public use. Individual-level microdata may be shared with authorised researchers under strict data use agreements that prohibit re-identification of respondents. INETL does not sell, trade, or otherwise transfer personal data to commercial third parties." },
  { title: "6. Your Rights", body: "As a data subject, you have the right to: request information about data held about you; request correction of inaccurate data; withdraw consent for non-mandatory data collection; and lodge a complaint with the relevant supervisory authority. For statistical surveys, participation may be mandatory under the Statistics Act." },
  { title: "7. Contact", body: "For questions regarding this Privacy Policy or data protection practices, please contact: Data Protection Officer, INETL, Rua Presidente Nicolau Lobato, Dili, Timor-Leste. Email: privacy@statistics.gov.tl" },
];

function PrivacyPolicyPage() {
  return (
    <div style={{ background: BLUE_LIGHT, minHeight: "100vh" }}>
      <PageHero eyebrow="Legal" title="Privacy Policy" sub="How INETL collects, uses, and protects your data."
        photo="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=80" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs mb-10" style={{ color: SLATE }}>Last updated: 1 January 2024</p>
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

export default PrivacyPolicyPage;
