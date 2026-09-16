import React from "react";
import { useTranslation } from "react-i18next";
import { Hero, CensusFeature, PubSection, DataChartSection, Infographics, NewsSection, SDGSection, QuickAccess } from "./HomePageSections";

function HomePage({ setPage }) {
  const { t } = useTranslation();
  return (
    <>
      <Hero setPage={setPage} />
      <CensusFeature setPage={setPage} />
      <PubSection setPage={setPage} />
      <DataChartSection />
      <Infographics />
      <NewsSection setPage={setPage} />
      <SDGSection setPage={setPage} />
      <QuickAccess setPage={setPage} />
    </>
  );
}

export default HomePage;
