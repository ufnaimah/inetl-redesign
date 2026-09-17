import React, { useState } from "react";
import "@/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Pages — lazy-safe: every import is a default export
import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/DashboardPage";
import CensusPage from "@/pages/CensusPage";
import CensusSurveyPage from "@/pages/CensusSurveyPage";
import IndicatorsPage from "@/pages/IndicatorsPage";
import PublicationsPage from "@/pages/PublicationsPage";
import SDGPage from "@/pages/SDGPage";
import AboutPage from "@/pages/AboutPage";
import NewsPage from "@/pages/NewsPage";
import ServicesPage from "@/pages/ServicesPage";
import ContactPage from "@/pages/ContactPage";
import ProgramsPage from "@/pages/ProgramsPage";
import CollaborationPage from "@/pages/CollaborationPage";
import FAQPage from "@/pages/FAQPage";
import UnderConstructionPage from "@/pages/UnderConstructionPage";
import DataTablePage from "@/pages/DataTablePage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfUsePage from "@/pages/TermsOfUsePage";
import AccessibilityPage from "@/pages/AccessibilityPage";

export default function App() {
  const [page, setPage] = useState("home");
  const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const render = () => {
    switch (page) {
      case "home":               return <HomePage             setPage={navigate} />;
      case "about":              return <AboutPage            />;
      case "census":             return <CensusPage           />;
      case "census-survey":      return <CensusSurveyPage     />;
      case "indicators":         return <IndicatorsPage       setPage={navigate} />;
      case "data":                return <DataTablePage        />;
      case "dashboard":          return <DashboardPage        />;
      case "publications":       return <PublicationsPage     />;
      case "sdg":                return <SDGPage              />;
      case "news":               return <NewsPage             />;
      case "services":           return <ServicesPage         setPage={navigate} />;
      case "contact":            return <ContactPage          />;
      case "programs":           return <ProgramsPage         />;
      case "collaborators":      return <CollaborationPage    />;
      case "faq":                return <FAQPage              />;
      case "privacy-policy":     return <PrivacyPolicyPage    />;
      case "terms-of-use":       return <TermsOfUsePage       />;
      case "accessibility":      return <AccessibilityPage    />;
      case "under_construction": return <UnderConstructionPage setPage={navigate} />;
      default:                   return <HomePage             setPage={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>
      <Navbar page={page} setPage={navigate} />
      <main className="flex-1">{render()}</main>
      <Footer setPage={navigate} />
    </div>
  );
}
