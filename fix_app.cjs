const fs = require('fs');

let code = fs.readFileSync('src/app/App.jsx', 'utf8');

// 1. Change T type from any to any
code = code.replace(/const T: Record<Lang, any> = \{/, 'const T= { = {');

// 2. We need to add translations for Publications and News, and remove them from global or add translation calls in components.
// First, categories translations
const extraEn = `
    catCensus: "Census", catLiving: "Living Standards", catPrices: "Prices", catNatAcc: "National Accounts", catAgri: "Agriculture", catHealth: "Health", catPoverty: "Poverty", catYearbook: "Yearbook", catGender: "Gender", catEconomy: "Economy", catSDG: "SDG",
    monthJan: "Jan", monthFeb: "Feb", monthMar: "Mar", monthApr: "Apr", monthMay: "May", monthJun: "Jun", monthJul: "Jul", monthAug: "Aug", monthSep: "Sep", monthOct: "Oct", monthNov: "Nov", monthDec: "Dec",
    lblMale: "Male", lblFemale: "Female", lblTotal: "Total", lblUrban: "Urban", lblRural: "Rural", lblOverall: "Overall", lblFood: "Food", lblHousing: "Housing", lblTransport: "Transport",
    // News specific
    newsItems: [
      { id:1, catKey:"catCensus", catColor:"#1D65AF", date:"15 January 2024", title:"Census 2022 Final Results: Total Population Reaches 1.34 Million", desc:"INETL officially releases the comprehensive final results from the 2022 Population and Housing Census, revealing Timor-Leste's population has grown 13.3% since 2015." },
      { id:2, catKey:"catEconomy", catColor:"#b45309", date:"8 February 2024", title:"GDP Growth Forecast at 3.8% for 2024 Amid Oil Revenue Recovery", desc:"National accounts data show steady economic expansion driven by the petroleum sector and growing non-oil GDP." },
      { id:3, catKey:"catPoverty", catColor:"#14202B", date:"22 March 2024", title:"Poverty Rate Declines to 41.8%: Living Standards Survey Key Findings", desc:"The Timor-Leste Living Standards Survey 2022 confirms a continued decline in poverty headcount ratio." },
      { id:4, catKey:"catHealth", catColor:"#0e7490", date:"10 April 2024", title:"National Health Statistics Show Improvement in Life Expectancy at Birth", desc:"Latest demographic data indicates life expectancy has risen to 51.2 years." },
      { id:5, catKey:"catAgri", catColor:"#16a34a", date:"5 May 2024", title:"Agricultural Sector Accounts for 64.2% of National Employment", desc:"Updated employment statistics confirm agriculture remains the dominant sector." },
      { id:6, catKey:"catSDG", catColor:"#7c3aed", date:"20 June 2024", title:"INETL Partners with UN Statistics Division on SDG Data Framework", desc:"A new MOU establishes a joint initiative to strengthen Timor-Leste's SDG data capacity." }
    ],
    pubItems: [
      { id:1, title:"Population and Housing Census 2022 – Final Report",  year:2023, catKey:"catCensus", pages:412, desc:"Comprehensive results of the 2022 Population and Housing Census covering demographic characteristics, housing conditions, and key indicators." },
      { id:2, title:"Timor-Leste Living Standards Survey 2021",           year:2022, catKey:"catLiving", pages:286, desc:"Survey results on household income, expenditure, poverty rates, and living conditions across all municipalities." },
      { id:3, title:"Consumer Price Index – Annual Report 2023",          year:2024, catKey:"catPrices", pages:124, desc:"Analysis of price movements and inflation trends in Timor-Leste for goods and services throughout 2023." },
      { id:4, title:"National Accounts Statistics 2023",                  year:2024, catKey:"catNatAcc", pages:198, desc:"GDP estimates, economic growth rates, and national accounts data including sectoral contributions to the economy." },
      { id:5, title:"Agricultural Census 2019 – Key Findings",            year:2020, catKey:"catAgri", pages:342, desc:"Results of the national agricultural census covering crop production, livestock populations, and rural livelihoods." },
      { id:6, title:"Demographic and Health Survey 2016",                 year:2017, catKey:"catHealth", pages:521, desc:"National survey on health outcomes, fertility rates, child mortality, nutrition status, and reproductive health indicators." },
      { id:7, title:"Timor-Leste Poverty Analysis 2022",                  year:2023, catKey:"catPoverty", pages:167, desc:"Analysis of poverty incidence, depth, and severity using 2022 TLSS data with full municipal disaggregation." },
      { id:8, title:"Statistical Yearbook 2023",                          year:2024, catKey:"catYearbook", pages:683, desc:"Comprehensive annual compilation of key statistics covering all sectors of national development." },
      { id:9, title:"Women and Men in Timor-Leste 2022",                  year:2023, catKey:"catGender", pages:148, desc:"Statistical analysis of gender equality indicators covering education, employment, health, and governance." }
    ],`;

const extraTet = `
    catCensus: "Sensus", catLiving: "Padrãu Moris", catPrices: "Presu", catNatAcc: "Konta Nasionál", catAgri: "Agrikultura", catHealth: "Saúde", catPoverty: "Kiak", catYearbook: "Anuáriu", catGender: "Jéneru", catEconomy: "Ekonomia", catSDG: "ODS",
    monthJan: "Jan", monthFeb: "Fev", monthMar: "Mar", monthApr: "Abr", monthMay: "Mai", monthJun: "Jun", monthJul: "Jul", monthAug: "Ago", monthSep: "Set", monthOct: "Out", monthNov: "Nov", monthDec: "Dez",
    lblMale: "Mane", lblFemale: "Feto", lblTotal: "Total", lblUrban: "Urbanu", lblRural: "Rural", lblOverall: "Jerál", lblFood: "Hahán", lblHousing: "Uma-fatin", lblTransport: "Transporte",
    newsItems: [
      { id:1, catKey:"catCensus", catColor:"#1D65AF", date:"15 Janeiru 2024", title:"Rezultadu Finál Sensus 2022: Populasaun Totál To'o Miliaun 1.34", desc:"INETL ofisialmente fó sai rezultadu finál komprehensivu husi Sensus Populasaun no Uma-Fatin 2022." },
      { id:2, catKey:"catEconomy", catColor:"#b45309", date:"8 Fevereiru 2024", title:"Previzaun Kresimentu PIB iha 3.8% ba 2024 ho Rekuperasaun Reseita Mina", desc:"Dadus konta nasionál hatudu espansaun ekonómiku ne'ebé estavel." },
      { id:3, catKey:"catPoverty", catColor:"#14202B", date:"22 Marsu 2024", title:"Taxa Kiak Tun ba 41.8%: Konkluzaun Prinsipál hosi Peskiza Padrãu Moris", desc:"Peskiza Padrãu Moris Timor-Leste 2022 konfirma declíniu kontinua ba proporsaun kiak." },
      { id:4, catKey:"catHealth", catColor:"#0e7490", date:"10 Abril 2024", title:"Estatístika Saúde Nasionál Hatudu Melloria iha Esperansa Moris", desc:"Dadus demográfiku foun hatudu esperansa moris sa'e ba tinan 51.2." },
      { id:5, catKey:"catAgri", catColor:"#16a34a", date:"5 Maiu 2024", title:"Setór Agrikultura Reprezenta 64.2% hosi Empregu Nasionál", desc:"Estatístika empregu atualizada konfirma katak agrikultura kontinua hanesan setór dominante." },
      { id:6, catKey:"catSDG", catColor:"#7c3aed", date:"20 Juñu 2024", title:"INETL Parseiru ho Divizaun Estatístika ONU kona-ba Kuadru Dadus ODS", desc:"MOU foun ida estabelese inisiativa konjunta atu hametin kapasidade dadus ODS Timor-Leste nian." }
    ],
    pubItems: [
      { id:1, title:"Sensus Populasaun no Uma-Fatin 2022 – Relatóriu Finál",  year:2023, catKey:"catCensus", pages:412, desc:"Rezultadu komprehensivu husi Sensus Populasaun no Uma-Fatin 2022." },
      { id:2, title:"Peskiza Padrãu Moris Timor-Leste 2021",           year:2022, catKey:"catLiving", pages:286, desc:"Rezultadu peskiza kona-ba rendimentu uma-kain, despeza, taxa kiak, no kondisaun moris." },
      { id:3, title:"Índise Presu Konsumidór – Relatóriu Anuál 2023",          year:2024, catKey:"catPrices", pages:124, desc:"Análize movimentu presu no tendénsia inflasaun iha Timor-Leste ba sasán no servisu iha tinan 2023." },
      { id:4, title:"Estatístika Konta Nasionál 2023",                  year:2024, catKey:"catNatAcc", pages:198, desc:"Estimativa PIB, taxa kresimentu ekonómiku, no dadus konta nasionál." },
      { id:5, title:"Sensus Agrikultura 2019 – Konkluzaun Prinsipál",            year:2020, catKey:"catAgri", pages:342, desc:"Rezultadu husi sensus agrikultura nasionál ne'ebé kobre produsaun ai-han, populasaun animál, no moris rurál." },
      { id:6, title:"Peskiza Demográfiku no Saúde 2016",                 year:2017, catKey:"catHealth", pages:521, desc:"Peskiza nasionál kona-ba rezultadu saúde, taxa fertilidade, mortalidade labarik, no estadu nutrisaun." },
      { id:7, title:"Análize Kiak Timor-Leste 2022",                  year:2023, catKey:"catPoverty", pages:167, desc:"Análize insidénsia, profundidade, no severidade kiak uzando dadus TLSS 2022." },
      { id:8, title:"Anuáriu Estatístiku 2023",                          year:2024, catKey:"catYearbook", pages:683, desc:"Kompilasaun anuál komprehensiva ba estatístika xave ne'ebé kobre setór hotu." },
      { id:9, title:"Feto no Mane iha Timor-Leste 2022",                  year:2023, catKey:"catGender", pages:148, desc:"Análize estatístiku kona-ba indikatór igualdade jéneru." }
    ],`;

const extraPt = `
    catCensus: "Censo", catLiving: "Padrões de Vida", catPrices: "Preços", catNatAcc: "Contas Nacionais", catAgri: "Agricultura", catHealth: "Saúde", catPoverty: "Pobreza", catYearbook: "Anuário", catGender: "Género", catEconomy: "Economia", catSDG: "ODS",
    monthJan: "Jan", monthFeb: "Fev", monthMar: "Mar", monthApr: "Abr", monthMay: "Mai", monthJun: "Jun", monthJul: "Jul", monthAug: "Ago", monthSep: "Set", monthOct: "Out", monthNov: "Nov", monthDec: "Dez",
    lblMale: "Masculino", lblFemale: "Feminino", lblTotal: "Total", lblUrban: "Urbano", lblRural: "Rural", lblOverall: "Geral", lblFood: "Alimentação", lblHousing: "Habitação", lblTransport: "Transporte",
    newsItems: [
      { id:1, catKey:"catCensus", catColor:"#1D65AF", date:"15 Janeiro 2024", title:"Resultados Finais do Censo 2022: População Total Atinge 1,34 Milhões", desc:"INETL divulga oficialmente os resultados finais abrangentes do Censo da População e Habitação de 2022." },
      { id:2, catKey:"catEconomy", catColor:"#b45309", date:"8 Fevereiro 2024", title:"Previsão de Crescimento do PIB de 3,8% para 2024 em meio à Recuperação das Receitas do Petróleo", desc:"Os dados das contas nacionais mostram uma expansão económica constante." },
      { id:3, catKey:"catPoverty", catColor:"#14202B", date:"22 Março 2024", title:"Taxa de Pobreza Cai para 41,8%: Principais Conclusões da Pesquisa sobre Padrões de Vida", desc:"A Pesquisa sobre Padrões de Vida em Timor-Leste 2022 confirma um declínio contínuo na proporção de pobres." },
      { id:4, catKey:"catHealth", catColor:"#0e7490", date:"10 Abril 2024", title:"Estatísticas Nacionais de Saúde Mostram Melhoria na Esperança de Vida à Nascença", desc:"Os dados demográficos mais recentes indicam que a esperança de vida subiu para 51,2 anos." },
      { id:5, catKey:"catAgri", catColor:"#16a34a", date:"5 Maio 2024", title:"Setor Agrícola Representa 64,2% do Emprego Nacional", desc:"As estatísticas de emprego atualizadas confirmam que a agricultura continua a ser o setor dominante." },
      { id:6, catKey:"catSDG", catColor:"#7c3aed", date:"20 Junho 2024", title:"INETL é Parceiro da Divisão de Estatística da ONU no Quadro de Dados dos ODS", desc:"Um novo memorando de entendimento estabelece uma iniciativa conjunta para reforçar a capacidade de dados dos ODS." }
    ],
    pubItems: [
      { id:1, title:"Censo de População e Habitação 2022 – Relatório Final",  year:2023, catKey:"catCensus", pages:412, desc:"Resultados abrangentes do Censo de População e Habitação de 2022." },
      { id:2, title:"Pesquisa de Padrões de Vida de Timor-Leste 2021",           year:2022, catKey:"catLiving", pages:286, desc:"Resultados da pesquisa sobre rendimento familiar, despesas, taxas de pobreza e condições de vida." },
      { id:3, title:"Índice de Preços no Consumidor – Relatório Anual 2023",          year:2024, catKey:"catPrices", pages:124, desc:"Análise dos movimentos de preços e tendências de inflação em Timor-Leste para bens e serviços ao longo de 2023." },
      { id:4, title:"Estatísticas das Contas Nacionais 2023",                  year:2024, catKey:"catNatAcc", pages:198, desc:"Estimativas do PIB, taxas de crescimento económico e dados das contas nacionais." },
      { id:5, title:"Censo Agrícola 2019 – Principais Conclusões",            year:2020, catKey:"catAgri", pages:342, desc:"Resultados do censo agrícola nacional abrangendo a produção agrícola, populações de gado e meios de subsistência rurais." },
      { id:6, title:"Pesquisa Demográfica e de Saúde 2016",                 year:2017, catKey:"catHealth", pages:521, desc:"Pesquisa nacional sobre resultados de saúde, taxas de fertilidade, mortalidade infantil e estado nutricional." },
      { id:7, title:"Análise da Pobreza em Timor-Leste 2022",                  year:2023, catKey:"catPoverty", pages:167, desc:"Análise da incidência, profundidade e gravidade da pobreza utilizando dados da TLSS 2022." },
      { id:8, title:"Anuário Estatístico 2023",                          year:2024, catKey:"catYearbook", pages:683, desc:"Compilação anual abrangente de estatísticas essenciais que abrangem todos os setores." },
      { id:9, title:"Mulheres e Homens em Timor-Leste 2022",                  year:2023, catKey:"catGender", pages:148, desc:"Análise estatística dos indicadores de igualdade de género." }
    ],`;

code = code.replace(/en:\s*\{/, "en: {\n" + extraEn);
code = code.replace(/tet:\s*\{/, "tet: {\n" + extraTet);
code = code.replace(/pt:\s*\{/, "pt: {\n" + extraPt);

// Replace hardcoded `publications` global const usage with `t.pubItems` where t is available.
// In PubSection
code = code.replace(/publications\.slice\(0,3\)\.map\(pub =>/g, "t.pubItems.slice(0,3).map(pub =>");
code = code.replace(/pub\.cat/g, "t[pub.catKey]");

// In BookCover definition, remove `cat` parameter assumption if we use `t[catKey]`. Actually just pass the translated cat into BookCover
// We will just let BookCover accept translated `cat` and use a new map or the english key for color.
// Wait, BookCover uses `cat` to determine color: `const bg = CAT_BG[cat] ?? DARK_CARD;`.
// If we pass translated `cat`, it won't match. 
// We should pass `catKey` to BookCover or modify `CAT_BG`.
code = code.replace(/function BookCover\(\{ title, year, cat, pages \}: \{ title:string; year:number; cat:string; pages:number \}\) \{/g,
  "function BookCover({ title, year, cat, pages, catKey }{ title, year, cat, pages, catKey }) {");
code = code.replace(/const bg = CAT_BG\[cat\] \?\? DARK_CARD;/g, "const bg = (catKey && CAT_BG[catKey]) ?? CAT_BG[cat] ?? DARK_CARD;");
code = code.replace(/const CAT_BG: any = \{/g, "const CAT_BG: any = { catCensus:DARK_CARD, catLiving:DARK_CARD, catPrices:DARK_CARD, catNatAcc:DARK_CARD, catAgri:DARK_CARD, catHealth:DARK_CARD, catPoverty:BLUE_DARK, catYearbook:DARK_CARD, catGender:DARK_CARD,");

code = code.replace(/<BookCover title=\{pub\.title\} year=\{pub\.year\} cat=\{pub\.cat\} pages=\{pub\.pages\} \/>/g,
  "<BookCover title={pub.title} year={pub.year} cat={t[pub.catKey]} pages={pub.pages} catKey={pub.catKey} />");

code = code.replace(/\{pub\.cat\}/g, "{t[pub.catKey]}");
code = code.replace(/accentMap\[pub\.cat\]/g, "accentMap[pub.catKey]");
code = code.replace(/const accentMap: any = \{[^}]+\};/, "const accentMap: any = { catCensus:BLUE, catLiving:\"#7c3aed\", catPrices:\"#ea580c\", catNatAcc:\"#0891b2\", catAgri:\"#16a34a\", catHealth:\"#0e7490\", catPoverty:BLUE_DARK, catYearbook:\"#854d0e\", catGender:\"#be185d\" };");

// Fix PublicationsPage publications usage
code = code.replace(/const filtered = useMemo\(\(\) => publications\.filter\(p =>/g, "const filtered = useMemo(() => t.pubItems.filter(p =>");
code = code.replace(/\(cat===t\.allCategories\|\|p\.cat===cat\)/g, "(cat===t.allCategories||t[p.catKey]===cat)");
code = code.replace(/\} \/ \{publications\.length\}/g, "} / {t.pubItems.length}");
// Fix PUB_CATS to use t items inside PublicationsPage
code = code.replace(/opts:\[t\.allCategories,\.\.\.PUB_CATS\.slice\(1\)\] \}/g, "opts:[t.allCategories, t.catCensus, t.catLiving, t.catPrices, t.catNatAcc, t.catAgri, t.catHealth, t.catPoverty, t.catYearbook, t.catGender] }");

// Replace hardcoded `newsItems` in NewsSection and NewsPage
code = code.replace(/const newsItems = \[\s*\{ id:1[^\]]+\];/g, "const newsItems = t.newsItems;");
code = code.replace(/news\.cat/g, "t[news.catKey]");
code = code.replace(/news\.photo/g, "PH[news.catKey === 'catCensus' ? 'census' : news.catKey === 'catEconomy' ? 'trade' : news.catKey === 'catPoverty' ? 'people' : news.catKey === 'catHealth' ? 'health' : news.catKey === 'catAgri' ? 'agri' : 'island']");

// Fix charts labels
code = code.replace(/name="Male"/g, 'name={t.lblMale}');
code = code.replace(/name="Female"/g, 'name={t.lblFemale}');
code = code.replace(/name="Total"/g, 'name={t.lblTotal}');
code = code.replace(/name="Overall"/g, 'name={t.lblOverall}');
code = code.replace(/name="Food"/g, 'name={t.lblFood}');
code = code.replace(/name="Housing"/g, 'name={t.lblHousing}');
code = code.replace(/name="Transport"/g, 'name={t.lblTransport}');
code = code.replace(/\{ name:"Male", value:totM, color:BLUE \},\{ name:"Female", value:totF, color:GOLD \}/g, '{ name:t.lblMale, value:totM, color:BLUE },{ name:t.lblFemale, value:totF, color:GOLD }');
code = code.replace(/\{ name:"Urban", value:avgU, color:BLUE \},\{ name:"Rural", value:100-avgU, color:SLATE \}/g, '{ name:t.lblUrban, value:avgU, color:BLUE },{ name:t.lblRural, value:100-avgU, color:SLATE }');

// Add DownloadButtons to missing places
// 1. Dashboard: Age Structure (around line 1723)
code = code.replace(/<h3 className="text-xs font-bold mb-3" style=\{\{ color:INK \}\}>\{t\.ageStr\}<\/h3>/g, 
  `<div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold" style={{ color:INK }}>{t.ageStr}</h3>
                <DownloadButtons t={t} size="compact" />
              </div>`);

// Replace month labels in cpiData using t.monthJan etc
code = code.replace(/\{ mon:"Jan"/g, '{ mon:t.monthJan');
code = code.replace(/\{ mon:"Feb"/g, '{ mon:t.monthFeb');
code = code.replace(/\{ mon:"Mar"/g, '{ mon:t.monthMar');
code = code.replace(/\{ mon:"Apr"/g, '{ mon:t.monthApr');
code = code.replace(/\{ mon:"May"/g, '{ mon:t.monthMay');
code = code.replace(/\{ mon:"Jun"/g, '{ mon:t.monthJun');
code = code.replace(/\{ mon:"Jul"/g, '{ mon:t.monthJul');
code = code.replace(/\{ mon:"Aug"/g, '{ mon:t.monthAug');
code = code.replace(/\{ mon:"Sep"/g, '{ mon:t.monthSep');
code = code.replace(/\{ mon:"Oct"/g, '{ mon:t.monthOct');
code = code.replace(/\{ mon:"Nov"/g, '{ mon:t.monthNov');
code = code.replace(/\{ mon:"Dec"/g, '{ mon:t.monthDec');

// The `cpiData` is outside any component, so `t` is not defined there.
// We must move `cpiData` inside the component or map it.
code = code.replace(/const cpiData = \[\s*\{ mon:t\.monthJan[^\]]+\];/g, "");
// Add it inside DataChartSection
const cpiDataLocal = `const cpiData = [
  { mon:t.monthJan,  all:7.9, food:9.2, housing:6.4, transport:5.8 },
  { mon:t.monthFeb,  all:8.1, food:9.4, housing:6.7, transport:6.2 },
  { mon:t.monthMar,  all:8.4, food:9.8, housing:7.0, transport:6.5 },
  { mon:t.monthApr,  all:8.8, food:10.3,housing:7.3, transport:7.1 },
  { mon:t.monthMay,  all:9.1, food:10.7,housing:7.6, transport:7.4 },
  { mon:t.monthJun,  all:9.3, food:11.0,housing:7.8, transport:7.6 },
  { mon:t.monthJul,  all:8.9, food:10.5,housing:7.5, transport:7.3 },
  { mon:t.monthAug,  all:8.6, food:10.1,housing:7.2, transport:6.9 },
  { mon:t.monthSep,  all:8.2, food:9.7, housing:6.9, transport:6.5 },
  { mon:t.monthOct,  all:7.8, food:9.2, housing:6.5, transport:6.1 },
  { mon:t.monthNov,  all:7.4, food:8.8, housing:6.2, transport:5.7 },
  { mon:t.monthDec,  all:7.1, food:8.5, housing:5.9, transport:5.4 },
];`;
code = code.replace(/function DataChartSection\(\{ t \}: \{ t:any \}\) \{/g, "function DataChartSection({ t }: { t:any }) {\n" + cpiDataLocal);

// Change `any` to `any` in component props to avoid TS errors
code = code.replace(/t:any/g, "t:any");

fs.writeFileSync('src/app/App.jsx', code);
