const fs = require('fs');
let code = fs.readFileSync('src/app/App.jsx', 'utf8');

const extraEn = `
    lblAvgHousehold: "Avg Household", lblPersons: "persons", lblDensity: "Density", lblYouth: "Youth <25", lblGrowth: "Growth", lblPerYr: " /yr",
    lbl2022Census: "2022 Census", lblPerKm2: "per km²", lblUrbanShare: "urban share",
    lblMunicipalityStats: "Municipality Statistics — 2022 Census", lblMunicipality: "Municipality", lblPopulation: "Population", lblHouseholds: "Households", lblAreaKm2: "Area km²", lblDensityKm2: "Density /km²", lblUrbanPct: "Urban %",
    lblProgressTarget: "Progress toward target", lblUpdated: "Updated:",
    lblTotHouseholds: "Total Households", lblAdminPosts: "Admin Posts", lblSucos: "Sucos (Villages)", lblPopDensity: "Pop. Density", lblSexRatio: "Sex Ratio",
`;
const extraTet = `
    lblAvgHousehold: "Média Uma-kain", lblPersons: "ema", lblDensity: "Densidade", lblYouth: "Foin-sa'e <25", lblGrowth: "Kresimentu", lblPerYr: " /tinan",
    lbl2022Census: "Sensus 2022", lblPerKm2: "ba km²", lblUrbanShare: "proporsaun urbanu",
    lblMunicipalityStats: "Estatístika Munisípiu — Sensus 2022", lblMunicipality: "Munisípiu", lblPopulation: "Populasaun", lblHouseholds: "Uma-kain", lblAreaKm2: "Área km²", lblDensityKm2: "Densidade /km²", lblUrbanPct: "Urbanu %",
    lblProgressTarget: "Progresu ba tarjetu", lblUpdated: "Atualizadu:",
    lblTotHouseholds: "Totál Uma-kain", lblAdminPosts: "Postu Admin", lblSucos: "Suku", lblPopDensity: "Densidade Pop.", lblSexRatio: "Propor. Seksu",
`;
const extraPt = `
    lblAvgHousehold: "Média Agregado", lblPersons: "pessoas", lblDensity: "Densidade", lblYouth: "Jovens <25", lblGrowth: "Crescimento", lblPerYr: " /ano",
    lbl2022Census: "Censo 2022", lblPerKm2: "por km²", lblUrbanShare: "proporção urbana",
    lblMunicipalityStats: "Estatísticas Municipais — Censo 2022", lblMunicipality: "Município", lblPopulation: "População", lblHouseholds: "Agregados", lblAreaKm2: "Área km²", lblDensityKm2: "Densidade /km²", lblUrbanPct: "Urbano %",
    lblProgressTarget: "Progresso para o alvo", lblUpdated: "Atualizado:",
    lblTotHouseholds: "Total Agregados", lblAdminPosts: "Postos Admin", lblSucos: "Sucos (Aldeias)", lblPopDensity: "Densidade Pop.", lblSexRatio: "Rácio Sexo",
`;

code = code.replace(/en: \{/, "en: {\n" + extraEn);
code = code.replace(/tet: \{/, "tet: {\n" + extraTet);
code = code.replace(/pt: \{/, "pt: {\n" + extraPt);

// Replace hardcoded strings
// CensusFeature
code = code.replace(/const highlights = \[[^\]]+\];/g, 
  `const highlights = [[t.lblAvgHousehold,"4.64 "+t.lblPersons],[t.lblDensity,"90.2 / km²"],[t.lblUrbanPop,"30.2%"],[t.lblYouth,"60.8%"],[t.lblLitRate,"68.1%"],[t.lblGrowth,"1.8%"+t.lblPerYr],];`);

// Dashboard KPIs
code = code.replace(/const kpis = \[[^\]]+\];/g, 
  `const kpis = [
    { l:t.popLabel, v:fmt(totPop), s:t.lbl2022Census,                          c:BLUE,  icon:Users    },
    { l:t.lblMale,     v:fmt(totM),   s:\`\${((totM/totPop)*100).toFixed(1)}%\`,   c:BLUE,  icon:Users    },
    { l:t.lblFemale,   v:fmt(totF),   s:\`\${((totF/totPop)*100).toFixed(1)}%\`,   c:BLUE,  icon:Users    },
    { l:t.lblDensity,  v:\`\${avgD}/km²\`, s:t.lblPerKm2,                            c:BLUE,  icon:MapPin   },
    { l:t.lblUrban,    v:\`\${avgU}%\`,  s:t.lblUrbanShare,                          c:BLUE,  icon:Building },
  ];`);

// CensusPage Overview
code = code.replace(/Total Population/g, "{t.popLabel}");
code = code.replace(/"Total Households"/g, "t.lblTotHouseholds");
code = code.replace(/"Avg Household Size"/g, "t.lblAvgHousehold");
code = code.replace(/"Municipalities"/g, "t.munLabel");
code = code.replace(/"Admin Posts"/g, "t.lblAdminPosts");
code = code.replace(/"Sucos \(Villages\)"/g, "t.lblSucos");
code = code.replace(/"Pop. Density"/g, "t.lblPopDensity");
code = code.replace(/"Sex Ratio"/g, "t.lblSexRatio");

// CensusPage Municipalities Header
code = code.replace(/Municipality Statistics — 2022 Census/g, "{t.lblMunicipalityStats}");
code = code.replace(/\["Municipality","Population","Households","Area km²","Density \/km²","Urban %"\]/g, 
  "[t.lblMunicipality,t.lblPopulation,t.lblHouseholds,t.lblAreaKm2,t.lblDensityKm2,t.lblUrbanPct]");

// SDGPage Texts
code = code.replace(/Progress toward target/g, "{t.lblProgressTarget}");
code = code.replace(/Updated:/g, "{t.lblUpdated}");

fs.writeFileSync('src/app/App.jsx', code);
