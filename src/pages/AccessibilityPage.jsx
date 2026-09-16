import React from "react";
import { BLUE, BLUE_LIGHT, INK, SLATE } from "@/data/constants";
import PageHero from "@/components/PageHero";

const sections = [
  { title: "Our Commitment", body: "INETL is committed to ensuring that its website and digital services are accessible to all users, including people with disabilities. We strive to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA conformance and continuously work to improve the accessibility of our online platforms." },
  { title: "Accessibility Features", body: "This website includes the following accessibility features: semantic HTML structure for screen reader compatibility; keyboard navigation support throughout all interactive elements; sufficient colour contrast ratios (minimum 4.5:1 for normal text); responsive design that adapts to different screen sizes and zoom levels; descriptive alt text for informational images; and clearly labelled form fields and error messages." },
  { title: "Data Accessibility", body: "INETL statistical publications are available in multiple formats including PDF, CSV, and Excel to support diverse user needs. Summary data tables include proper header associations for screen readers. Interactive dashboards provide text-based alternatives for data visualisations." },
  { title: "Language Support", body: "This website provides content in three official languages: English, Tetum (Tetun), and Portuguese. The language selector in the navigation bar allows users to switch between languages at any time. Where a translation is not yet available, the English version is displayed as a fallback." },
  { title: "Known Limitations", body: "We acknowledge that some legacy PDF publications may not be fully accessible. We are progressively converting these documents to accessible formats. Some interactive chart visualisations may have limited screen reader support; we provide tabular data alternatives where possible." },
  { title: "Feedback & Contact", body: "If you encounter any accessibility barriers while using this website, or if you require information in an alternative format, please contact us: Email: accessibility@statistics.gov.tl | Phone: +670 332 4654 | Address: INETL, Rua Presidente Nicolau Lobato, Dili, Timor-Leste. We aim to respond to accessibility feedback within 5 working days." },
];

function AccessibilityPage() {
  return (
    <div style={{ background: BLUE_LIGHT, minHeight: "100vh" }}>
      <PageHero eyebrow="Legal" title="Accessibility Statement" sub="Our commitment to making statistical data accessible to everyone."
        photo="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1400&q=80" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg p-6 mb-10" style={{ border: `2px solid ${BLUE}20` }}>
          <p className="text-sm leading-relaxed" style={{ color: INK }}>
            <strong>Conformance status:</strong> This website is partially conformant with WCAG 2.1 Level AA.
            We are actively working toward full conformance.
          </p>
        </div>
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

export default AccessibilityPage;
