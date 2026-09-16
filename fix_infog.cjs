const fs = require('fs');

let code = fs.readFileSync('src/app/App.jsx', 'utf8');

const extraEn = `
    lblMaleShare: "Male Share", lblOfTotPop: "Of total population", lblUrbanPop: "Urban Population", lblNatUrb: "National urbanisation", lblHHSize: "Household Size", lblAvgPerHH: "Average persons/HH", lblLitRate: "Literacy Rate", lblPop15: "Population aged 15+", lblWaterAcc: "Water Access", lblSafeWater: "Safe drinking water", lblElecAcc: "Electricity Access", lblConnHH: "Connected households",
    lblInfographics: "Infographics", lblTL: "Timor-Leste", lblTotLand: "Total land area", lblPopGrowth: "Population Growth", lblLifeExp: "Life Expectancy", lblPovertyRate: "Poverty Rate", lblFrom1522: "2015 → 2022", lblAtBirth: "At birth, 2022", lblAge15: "Age 15+, 2022", lblNat2022: "National, 2022", lblHH2023: "Households 2023",
`;
const extraTet = `
    lblMaleShare: "Proporsaun Mane", lblOfTotPop: "Hosi populasaun totál", lblUrbanPop: "Populasaun Urbanu", lblNatUrb: "Urbanizasaun nasionál", lblHHSize: "Tamanhu Uma-kain", lblAvgPerHH: "Média ema/uma-kain", lblLitRate: "Taxa Alfabetizasaun", lblPop15: "Populasaun ho tinan 15+", lblWaterAcc: "Asesu ba Bee", lblSafeWater: "Bee moos ba hemu", lblElecAcc: "Asesu Eletrisidade", lblConnHH: "Uma-kain ne'ebé liga",
    lblInfographics: "Infográfiku sira", lblTL: "Timor-Leste", lblTotLand: "Área rai totál", lblPopGrowth: "Kresimentu Populasaun", lblLifeExp: "Esperansa Moris", lblPovertyRate: "Taxa Kiak", lblFrom1522: "2015 → 2022", lblAtBirth: "Bainhira moris, 2022", lblAge15: "Idade 15+, 2022", lblNat2022: "Nasionál, 2022", lblHH2023: "Uma-kain 2023",
`;
const extraPt = `
    lblMaleShare: "Proporção Masculina", lblOfTotPop: "Da população total", lblUrbanPop: "População Urbana", lblNatUrb: "Urbanização nacional", lblHHSize: "Tamanho do Agregado", lblAvgPerHH: "Média de pessoas/agregado", lblLitRate: "Taxa de Alfabetização", lblPop15: "População com 15+ anos", lblWaterAcc: "Acesso à Água", lblSafeWater: "Água potável segura", lblElecAcc: "Acesso à Eletricidade", lblConnHH: "Agregados ligados",
    lblInfographics: "Infográficos", lblTL: "Timor-Leste", lblTotLand: "Área total do país", lblPopGrowth: "Crescimento Pop.", lblLifeExp: "Esperança de Vida", lblPovertyRate: "Taxa de Pobreza", lblFrom1522: "2015 → 2022", lblAtBirth: "À nascença, 2022", lblAge15: "Idade 15+, 2022", lblNat2022: "Nacional, 2022", lblHH2023: "Agregados 2023",
`;

code = code.replace(/en: \{/, "en: {\n" + extraEn);
code = code.replace(/tet: \{/, "tet: {\n" + extraTet);
code = code.replace(/pt: \{/, "pt: {\n" + extraPt);

// Modify infogTiles
const infogTilesReplacement = `const infogTiles = [
  { stat:"50.1%", labelKey:"lblMaleShare",   subKey:"lblOfTotPop",  bg:DARK_CARD },
  { stat:"30.2%", labelKey:"lblUrbanPop",    subKey:"lblNatUrb",    bg:BLUE      },
  { stat:"4.64",  labelKey:"lblHHSize",      subKey:"lblAvgPerHH",  bg:DARK_CARD },
  { stat:"68.1%", labelKey:"lblLitRate",     subKey:"lblPop15",     bg:BLUE_DARK },
  { stat:"72.4%", labelKey:"lblWaterAcc",    subKey:"lblSafeWater", bg:DARK_CARD },
  { stat:"61.2%", labelKey:"lblElecAcc",     subKey:"lblConnHH",    bg:BLUE      },
];`;
code = code.replace(/const infogTiles = \[\s*\{ stat:"50\.1%",[^\]]+\];/g, infogTilesReplacement);
code = code.replace(/\{tile\.label\}/g, "{t[tile.labelKey]}");
code = code.replace(/\{tile\.sub\}/g, "{t[tile.subKey]}");

// Modify Infographics Component
code = code.replace(/>Infographics<\/span>/g, ">{t.lblInfographics}</span>");
code = code.replace(/>Timor-Leste<\/div>\s*<div className="text-3xl font-bold text-white mb-2">14,874 km²<\/div>\s*<div className="text-sm" style=\{\{ color:"rgba\\(255,255,255,0.55\\)" \}\}>Total land area<\/div>/g, 
  ">{t.lblTL}</div>\n              <div className=\"text-3xl font-bold text-white mb-2\">14,874 km²</div>\n              <div className=\"text-sm\" style={{ color:\"rgba(255,255,255,0.55)\" }}>{t.lblTotLand}</div>");

const infographicsListReplacement = `[
            { v:"13.3%", l:t.lblPopGrowth, s:t.lblFrom1522,    bg:DARK_CARD },
            { v:"51.2y", l:t.lblLifeExp,    s:t.lblAtBirth, bg:BLUE      },
            { v:"68.1%", l:t.lblLitRate,      s:t.lblAge15,  bg:DARK_CARD },
            { v:"41.8%", l:t.lblPovertyRate,       s:t.lblNat2022, bg:BLUE_DARK },
            { v:"61.2%", l:t.lblElecAcc, s:t.lblHH2023,bg:DARK_CARD },
          ]`;

code = code.replace(/\[\s*\{\s*v:"13\.3%", l:"Population Growth"[^\]]+\]/g, infographicsListReplacement);

fs.writeFileSync('src/app/App.jsx', code);
