// ─── Color Palette (CSS custom property references for Tailwind) ───
// These are kept as JS constants for use in inline styles on charts/SVGs
// where Tailwind classes aren't practical (e.g., Recharts fill/stroke props)
export const BLUE       = "#1D65AF";
export const BLUE_LIGHT = "#F4F6F8";
export const BLUE_MID   = "#1D65AF";
export const BLUE_DARK  = "#14202B";
export const NAV_BG     = "#14202B";
export const INK        = "#14202B";
export const SLATE      = "#8593A1";
export const CREAM      = "#F4F6F8";
export const RED_ACCENT = "#D62828";
export const GOLD       = "#fbc312";
export const DARK_CARD  = "#14202B";

// ─── Local Timor-Leste hero images (Vite import) ──────────────
import heroTimles1 from "@/assets/foto1.jpg";
import heroTimles2 from "@/assets/foto2.jpg";
import heroTimles3 from "@/assets/foto3.jpg";
import heroTimles4 from "@/assets/foto4.jpg";
import heroTimles5 from "@/assets/foto5.jpg";

export const LOCAL_HEROES = {
  home:  heroTimles1,
  about: heroTimles2,
  news:  heroTimles3,
  alt1:  heroTimles4,
  alt2:  heroTimles5,
};

// ─── Photos (Unsplash fallbacks) ───────────────────────────────
export const PH = {
  flag:   "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=1600&h=1000&fit=crop&q=85",
  dili:   "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=1600&h=900&fit=crop&q=80",
  town:   "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=800&fit=crop&q=80",
  coast:  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=700&fit=crop&q=80",
  road:   "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=700&fit=crop&q=80",
  island: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1000&h=600&fit=crop&q=80",
  people: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop&q=80",
  market: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop&q=80",
  health: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop&q=80",
  school: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop&q=80",
  agri:   "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop&q=80",
  census: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80",
  trade:  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=500&fit=crop&q=80",
  data:   "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop&q=80",
  gov:    "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=500&fit=crop&q=80",
};

// ─── Helper ────────────────────────────────────────────────────
export const fmt = (n) => n.toLocaleString("en-US");
export const FLAGS      = { en:"🇺🇸", tet:"🇹🇱", pt:"🇵🇹" };
export const LANG_NAMES = { en:"English", tet:"Tetum", pt:"Português" };

// ─── Data ──────────────────────────────────────────────────────
export const municipalities = [
  { name:"Dili",      population:326514, area:368,  density:887, urban:78, male:163740, female:162774 },
  { name:"Ermera",    population:141567, area:746,  density:190, urban:15, male:71350,  female:70217  },
  { name:"Baucau",    population:134200, area:1507, density:89,  urban:22, male:66850,  female:67350  },
  { name:"Bobonaro",  population:107842, area:1374, density:78,  urban:18, male:54210,  female:53632  },
  { name:"Viqueque",  population:89201,  area:1877, density:48,  urban:12, male:44800,  female:44401  },
  { name:"Liquiçá",   population:86753,  area:543,  density:160, urban:20, male:43620,  female:43133  },
  { name:"Oe-Cusse",  population:76921,  area:815,  density:94,  urban:22, male:38450,  female:38471  },
  { name:"Covalima",  population:74832,  area:1220, density:61,  urban:19, male:37600,  female:37232  },
  { name:"Lautém",    population:67934,  area:1702, density:40,  urban:16, male:34100,  female:33834  },
  { name:"Ainaro",    population:65781,  area:869,  density:76,  urban:14, male:33000,  female:32781  },
  { name:"Aileu",     population:59643,  area:675,  density:88,  urban:20, male:29900,  female:29743  },
  { name:"Manufahi",  population:58492,  area:1329, density:44,  urban:18, male:29300,  female:29192  },
  { name:"Manatuto",  population:50833,  area:1783, density:29,  urban:15, male:25500,  female:25333  },
];

export const popTrendData = [
  { year:"1990", pop:747750  }, { year:"2004", pop:924642  },
  { year:"2010", pop:1066409 }, { year:"2015", pop:1183006 },
  { year:"2022", pop:1340513 },
];

export const ageData = [
  { g:"0–4",   v:147300 }, { g:"5–9",   v:161900 }, { g:"10–14", v:157900 },
  { g:"15–19", v:142600 }, { g:"20–24", v:125700 }, { g:"25–29", v:112100 },
  { g:"30–34", v:96000  }, { g:"35–44", v:147600 }, { g:"45–54", v:91800  },
  { g:"55–64", v:59000  }, { g:"65+",   v:43700  },
];

export const publications = [
  { id:1, title:"Population and Housing Census 2022 – Final Report",  year:2023, cat:"Census",           desc:"Comprehensive results of the 2022 Population and Housing Census covering demographic characteristics, housing conditions, and key indicators.", pages:412 },
  { id:2, title:"Timor-Leste Living Standards Survey 2021",           year:2022, cat:"Living Standards", desc:"Survey results on household income, expenditure, poverty rates, and living conditions across all municipalities.", pages:286 },
  { id:3, title:"Consumer Price Index – Annual Report 2023",          year:2024, cat:"Prices",           desc:"Analysis of price movements and inflation trends in Timor-Leste for goods and services throughout 2023.", pages:124 },
  { id:4, title:"National Accounts Statistics 2023",                  year:2024, cat:"National Accounts",desc:"GDP estimates, economic growth rates, and national accounts data including sectoral contributions to the economy.", pages:198 },
  { id:5, title:"Agricultural Census 2019 – Key Findings",           year:2020, cat:"Agriculture",      desc:"Results of the national agricultural census covering crop production, livestock populations, and rural livelihoods.", pages:342 },
  { id:6, title:"Demographic and Health Survey 2016",                 year:2017, cat:"Health",           desc:"National survey on health outcomes, fertility rates, child mortality, nutrition status, and reproductive health indicators.", pages:521 },
  { id:7, title:"Timor-Leste Poverty Analysis 2022",                  year:2023, cat:"Poverty",          desc:"Analysis of poverty incidence, depth, and severity using 2022 TLSS data with full municipal disaggregation.", pages:167 },
  { id:8, title:"Statistical Yearbook 2023",                          year:2024, cat:"Yearbook",         desc:"Comprehensive annual compilation of key statistics covering all sectors of national development.", pages:683 },
  { id:9, title:"Women and Men in Timor-Leste 2022",                  year:2023, cat:"Gender",           desc:"Statistical analysis of gender equality indicators covering education, employment, health, and governance.", pages:148 },
];

export const sdgGoals = [
  { id:1,  name:"No Poverty",          color:"#E5243B", value:"41.8%", ind:"Poverty headcount",   prog:42, tr:-3.2 },
  { id:2,  name:"Zero Hunger",         color:"#DDA63A", value:"24.9%", ind:"Undernourishment",    prog:35, tr:-1.8 },
  { id:3,  name:"Good Health",         color:"#4C9F38", value:"51.2y", ind:"Life expectancy",     prog:58, tr: 1.4 },
  { id:4,  name:"Quality Education",   color:"#C5192D", value:"68.3%", ind:"Primary enrollment",  prog:68, tr: 2.1 },
  { id:5,  name:"Gender Equality",     color:"#FF3A21", value:"38.5%", ind:"Women in parliament", prog:39, tr: 1.2 },
  { id:6,  name:"Clean Water",         color:"#26BDE2", value:"72.4%", ind:"Water access",        prog:72, tr: 3.5 },
  { id:7,  name:"Clean Energy",        color:"#FCC30B", value:"61.2%", ind:"Electricity access",  prog:61, tr: 4.8 },
  { id:8,  name:"Economic Growth",     color:"#A21942", value:"3.8%",  ind:"GDP growth rate",     prog:45, tr: 0.9 },
  { id:9,  name:"Innovation",          color:"#FD6925", value:"1.2%",  ind:"R&D (% GDP)",         prog:22, tr: 0.3 },
  { id:10, name:"Reduced Inequality",  color:"#DD1367", value:"28.7",  ind:"Gini coefficient",    prog:55, tr:-0.8 },
  { id:11, name:"Sustainable Cities",  color:"#FD9D24", value:"30.2%", ind:"Urban population",    prog:30, tr: 1.1 },
  { id:12, name:"Consumption",         color:"#BF8B2E", value:"0.32t", ind:"CO₂ per capita",      prog:65, tr:-0.1 },
  { id:13, name:"Climate Action",      color:"#3F7E44", value:"High",  ind:"Vulnerability index", prog:30, tr: 0.0 },
  { id:14, name:"Life Below Water",    color:"#0A97D9", value:"14.2%", ind:"Marine protected",    prog:42, tr: 1.8 },
  { id:15, name:"Life on Land",        color:"#56C02B", value:"42.1%", ind:"Forest coverage",     prog:50, tr:-0.6 },
  { id:16, name:"Peace & Justice",     color:"#00689D", value:"62/100",ind:"Governance index",    prog:62, tr: 2.3 },
  { id:17, name:"Partnerships",        color:"#19486A", value:"62.4%", ind:"ODA (% GNI)",         prog:70, tr: 1.0 },
];

export const sdgTrendData = [
  { year:2018, poverty:46.1, water:65.2, energy:52.1, edu:62.1 },
  { year:2019, poverty:44.8, water:67.4, energy:54.8, edu:64.3 },
  { year:2020, poverty:43.5, water:68.9, energy:56.3, edu:65.5 },
  { year:2021, poverty:42.9, water:70.1, energy:58.7, edu:66.7 },
  { year:2022, poverty:42.1, water:71.8, energy:60.2, edu:67.5 },
  { year:2023, poverty:41.8, water:72.4, energy:61.2, edu:68.3 },
];

export const PUB_YEARS = ["All Years","2024","2023","2022","2020","2017"];
export const PUB_CATS  = ["All Categories","Census","Living Standards","Prices","National Accounts","Agriculture","Health","Poverty","Yearbook","Gender"];

export const munBarData = [
  { n:"Aileu",    M:29900,  F:29743,  T:59643,  H:12853 },
  { n:"Ainaro",   M:33000,  F:32781,  T:65781,  H:14177 },
  { n:"Baucau",   M:66850,  F:67350,  T:134200, H:28922 },
  { n:"Bobonaro", M:54210,  F:53632,  T:107842, H:23242 },
  { n:"Covalima", M:37600,  F:37232,  T:74832,  H:16127 },
  { n:"Dili",     M:163740, F:162774, T:326514, H:70368 },
  { n:"Ermera",   M:71350,  F:70217,  T:141567, H:30510 },
  { n:"Lautém",   M:34100,  F:33834,  T:67934,  H:14641 },
  { n:"Liquiçá",  M:43620,  F:43133,  T:86753,  H:18697 },
  { n:"Manatuto", M:25500,  F:25333,  T:50833,  H:10956 },
  { n:"Manufahi", M:29300,  F:29192,  T:58492,  H:12607 },
  { n:"Oe-Cusse", M:38450,  F:38471,  T:76921,  H:16578 },
  { n:"Viqueque", M:44800,  F:44401,  T:89201,  H:19224 },
];

export const infogTiles = [
  { stat:"50.1%", labelKey:"lblMaleShare",   subKey:"lblOfTotPop",  bg:DARK_CARD },
  { stat:"30.2%", labelKey:"lblUrbanPop",    subKey:"lblNatUrb",    bg:BLUE      },
  { stat:"4.64",  labelKey:"lblHHSize",      subKey:"lblAvgPerHH",  bg:DARK_CARD },
  { stat:"68.1%", labelKey:"lblLitRate",     subKey:"lblPop15",     bg:BLUE_DARK },
  { stat:"72.4%", labelKey:"lblWaterAcc",    subKey:"lblSafeWater", bg:DARK_CARD },
  { stat:"61.2%", labelKey:"lblElecAcc",     subKey:"lblConnHH",    bg:BLUE      },
];

export const SEARCH_INDEX = [
  { label:"Home",                           type:"Page",       page:"home"         },
  { label:"About Us – INETL",               type:"Page",       page:"about"        },
  { label:"Census & Survey 2022",           type:"Page",       page:"census"       },
  { label:"Population Dashboard",           type:"Page",       page:"dashboard"    },
  { label:"Publications Library",           type:"Page",       page:"publications" },
  { label:"SDG Progress Tracker",           type:"Page",       page:"sdg"          },
  { label:"News & Activity",                type:"Page",       page:"news"         },
  { label:"Services",                       type:"Page",       page:"services"     },
  { label:"Contact INETL",                  type:"Page",       page:"contact"      },
  { label:"Our Programs",                   type:"Page",       page:"programs"     },
  { label:"Collaboration & Partnerships",   type:"Page",       page:"collaborators"},
  { label:"FAQ – Frequently Asked Questions",type:"Page",      page:"faq"          },
  ...publications.map(p => ({ label:p.title, type:p.cat,    page:"publications" })),
  ...sdgGoals.map(g    => ({ label:`SDG ${g.id}: ${g.name}`, type:"SDG", page:"sdg" })),
  { label:"Population 1,340,513",  type:"Statistics", page:"census"       },
  { label:"Poverty Rate 41.8%",    type:"Statistics", page:"sdg"          },
  { label:"Literacy Rate 68.1%",   type:"Statistics", page:"census"       },
  { label:"Water Access 72.4%",    type:"Statistics", page:"sdg"          },
  { label:"Electricity 61.2%",     type:"Statistics", page:"dashboard"    },
  { label:"GDP Growth Rate 3.8%",  type:"Statistics", page:"sdg"          },
  { label:"Consumer Price Index",  type:"Prices",     page:"publications" },
  { label:"Household Survey Data", type:"Survey",     page:"publications" },
  { label:"National Accounts GDP", type:"Economy",    page:"publications" },
  { label:"Microdata Catalogue",   type:"Data",       page:"contact"      },
];

export const CAT_BG = {
  catCensus:DARK_CARD, catLiving:DARK_CARD, catPrices:DARK_CARD, catNatAcc:DARK_CARD,
  catAgri:DARK_CARD, catHealth:DARK_CARD, catPoverty:BLUE_DARK, catYearbook:DARK_CARD, catGender:DARK_CARD,
  Census:DARK_CARD, "Living Standards":DARK_CARD, Prices:DARK_CARD,
  "National Accounts":DARK_CARD, Agriculture:DARK_CARD, Health:DARK_CARD,
  Poverty:BLUE_DARK, Yearbook:DARK_CARD, Gender:DARK_CARD,
};
