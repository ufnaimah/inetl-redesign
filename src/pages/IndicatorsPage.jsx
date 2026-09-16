import React from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { BLUE, BLUE_LIGHT, INK, SLATE } from "@/data/constants";
import PageHero from "@/components/PageHero";

const COLUMNS = [
  {
    title: "Population & Housing Census",
    subtitle: "Sensus Populasaun no Uma-Fatin",
    color: "#1D65AF",
    source: "Census 2010 & 2022",
    items: [
      { label: "Total Population by Municipality", desc: "Enumerated population across 13 municipalities, sex breakdown, and intercensal growth rate", page: "census" },
      { label: "Population Density & Distribution", desc: "Persons per km² by municipality, urban vs. rural distribution, and geographic concentration", page: "dashboard" },
      { label: "Age Structure & Dependency Ratio", desc: "Population pyramid, youth (0–14), working-age (15–64), elderly (65+), and dependency ratios", page: "dashboard" },
      { label: "Household Size & Composition", desc: "Average household size, number of households, female-headed households, and household type", page: "census" },
      { label: "Housing Conditions & Facilities", desc: "Dwelling type (permanent/semi/temporary), roof material, water source, sanitation, and electricity access", page: "census" },
      { label: "Education & Literacy", desc: "School attendance, highest education attained, literacy rate (age 15+), and mean years of schooling", page: "dashboard" },
      { label: "Fertility & Mortality", desc: "Total fertility rate, crude birth/death rate, infant mortality rate, and life expectancy at birth", page: "census" },
      { label: "Migration & Mobility", desc: "Internal migration flows, urban in-migration, international emigration, and place of birth data", page: "census" },
      { label: "Labour Force & Employment", desc: "Labour force participation, employment by sector (agriculture/industry/services), and unemployment rate", page: "dashboard" },
      { label: "Disability Prevalence", desc: "Disability rates by type (seeing, hearing, walking, cognitive), age, and sex from census questionnaire", page: "census" },
    ],
  },
  {
    title: "Agricultural Census",
    subtitle: "Sensus Agrikultura",
    color: "#16a34a",
    source: "Agricultural Census 2019",
    items: [
      { label: "Agricultural Holdings & Land Use", desc: "Number of agricultural households, total cultivated area, average holding size, and land tenure type", page: "census-survey" },
      { label: "Crop Production & Yield", desc: "Output and yield per hectare for rice, maize, cassava, sweet potato, and other staple crops", page: "data" },
      { label: "Coffee & Cash Crops", desc: "Coffee plantation area, production volume, export value, and other commercial crops (vanilla, candlenut)", page: "data" },
      { label: "Livestock Population", desc: "Heads of cattle, buffalo, pigs, goats, chickens, and horses by municipality", page: "data" },
      { label: "Farming Practices & Inputs", desc: "Use of fertiliser, pesticides, irrigation, improved seeds, and mechanisation rates", page: "census-survey" },
      { label: "Food Security & Nutrition", desc: "Household food consumption, food expenditure share, stunting prevalence, and hunger incidence", page: "sdg" },
      { label: "Fisheries & Aquaculture", desc: "Fish catch volume, fishing households, aquaculture production, and marine resource access", page: "data" },
      { label: "Forestry & Environment", desc: "Forest coverage, deforestation rate, firewood use, and protected area extent", page: "sdg" },
    ],
  },
  {
    title: "Thematic & Cross-Cutting Indicators",
    subtitle: "Indikatór Temátiku no Transversál",
    color: "#b45309",
    source: "Derived from census & survey data",
    items: [
      { label: "Poverty & Inequality", desc: "Poverty headcount ratio, poverty gap, Gini coefficient, and consumption quintile distribution", page: "sdg" },
      { label: "Gender & Inclusion", desc: "Gender parity in education, female LFP, women in leadership, and gender-based indicators", page: "sdg" },
      { label: "Water, Sanitation & Hygiene (WASH)", desc: "Access to safe drinking water, improved sanitation, handwashing facilities by urban/rural", page: "dashboard" },
      { label: "Energy Access & Infrastructure", desc: "Electricity connection rate, cooking fuel type, road accessibility, and mobile phone ownership", page: "dashboard" },
      { label: "Health Service Utilisation", desc: "Vaccination coverage, antenatal care, skilled birth attendance, and health facility distance", page: "data" },
      { label: "SDG Composite Indicators", desc: "Progress metrics for all 17 Sustainable Development Goals mapped to national census data", page: "sdg" },
    ],
  },
];

function IndicatorsPage({ setPage }) {
  const { t } = useTranslation();

  return (
    <div style={{ background: BLUE_LIGHT, minHeight: "100vh" }}>
      <PageHero
        eyebrow={t("dropIndicators")}
        title="Statistical Indicators"
        sub="Key indicators derived from the Population & Housing Census and Agricultural Census of Timor-Leste."
        photo="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Intro note */}
        <div className="bg-white rounded-lg p-5 mb-8 flex flex-col sm:flex-row sm:items-center gap-4" style={{ border: `1px solid ${BLUE}15` }}>
          <div className="flex-1">
            <p className="text-sm leading-relaxed" style={{ color: INK }}>
              Timor-Leste has conducted <strong>two Population & Housing Censuses</strong> (2010 and 2022) and
              one <strong>Agricultural Census</strong> (2019). The indicators below are organised by census source
              and thematic area.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <span className="text-[10px] font-bold px-3 py-1 rounded-full" style={{ background: `${BLUE}12`, color: BLUE }}>Census 2010</span>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full" style={{ background: `${BLUE}12`, color: BLUE }}>Census 2022</span>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full" style={{ background: "#16a34a14", color: "#16a34a" }}>Agri 2019</span>
          </div>
        </div>

        {/* Columns */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {COLUMNS.map(col => (
            <div key={col.title} className="bg-white rounded-lg overflow-hidden flex flex-col" style={{ border: "1px solid rgba(0,87,184,0.1)" }}>
              {/* Header */}
              <div className="px-6 py-4" style={{ borderBottom: `3px solid ${col.color}` }}>
                <h2 className="text-sm font-bold" style={{ color: INK }}>{col.title}</h2>
                <p className="text-[10px] italic mt-0.5" style={{ color: SLATE }}>{col.subtitle}</p>
                <span className="inline-block mt-2 text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${col.color}12`, color: col.color }}>
                  {col.source}
                </span>
              </div>

              {/* Items */}
              <div className="divide-y flex-1" style={{ borderColor: "rgba(0,87,184,0.06)" }}>
                {col.items.map(item => (
                  <button key={item.label}
                    onClick={() => setPage && setPage(item.page)}
                    className="w-full text-left px-6 py-4 flex items-start gap-3 group transition-colors hover:bg-gray-50">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold leading-tight mb-0.5 group-hover:text-blue-600 transition-colors" style={{ color: INK }}>
                        {item.label}
                      </div>
                      <div className="text-xs leading-relaxed" style={{ color: SLATE }}>{item.desc}</div>
                    </div>
                    <ChevronRight size={14} className="mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: col.color }} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-white rounded-lg p-6 flex flex-wrap items-center justify-between gap-4" style={{ border: "1px solid rgba(0,87,184,0.1)" }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: INK }}>Need microdata or custom tabulations?</p>
            <p className="text-xs mt-0.5" style={{ color: SLATE }}>Submit a data request to INETL for anonymised microdata access or bespoke statistical tables.</p>
          </div>
          <button onClick={() => setPage && setPage("contact")}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:brightness-110"
            style={{ background: BLUE }}>
            Request Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default IndicatorsPage;
