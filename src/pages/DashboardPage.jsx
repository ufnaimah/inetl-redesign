import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";
import { ChevronDown, Download } from "lucide-react";
import {
  BLUE, BLUE_LIGHT, BLUE_DARK, BLUE_MID, NAV_BG, INK, SLATE, GOLD, DARK_CARD,
  PH, fmt, municipalities, popTrendData, ageData, munBarData,
} from "@/data/constants";
import { DownloadButtons, TLMap } from "@/components/SharedComponents";
import PageHero from "@/components/PageHero";

/* ── additional data ────────────────────────────────── */
const cpiMonthly = [
  { m: "Jan", all: 7.9, food: 9.2, housing: 6.4 },
  { m: "Feb", all: 8.1, food: 9.4, housing: 6.7 },
  { m: "Mar", all: 8.4, food: 9.8, housing: 7.0 },
  { m: "Apr", all: 8.8, food: 10.3, housing: 7.3 },
  { m: "May", all: 9.1, food: 10.7, housing: 7.6 },
  { m: "Jun", all: 9.3, food: 11.0, housing: 7.8 },
  { m: "Jul", all: 8.9, food: 10.5, housing: 7.5 },
  { m: "Aug", all: 8.6, food: 10.1, housing: 7.2 },
  { m: "Sep", all: 8.2, food: 9.7, housing: 6.9 },
  { m: "Oct", all: 7.8, food: 9.2, housing: 6.5 },
  { m: "Nov", all: 7.4, food: 8.8, housing: 6.2 },
  { m: "Dec", all: 7.1, food: 8.5, housing: 5.9 },
];

const gdpSectoral = [
  { sector: "Agriculture", pct: 17.4 },
  { sector: "Industry", pct: 18.2 },
  { sector: "Services", pct: 42.8 },
  { sector: "Oil & Gas", pct: 21.6 },
];

const PIE_COLORS = [BLUE, GOLD, SLATE, DARK_CARD];

const macroKPIs = [
  { label: "Population", value: "1,340,513", sub: "Census 2022" },
  { label: "GDP Growth", value: "3.8%", sub: "2023 est." },
  { label: "Inflation (CPI)", value: "7.1%", sub: "Dec 2023" },
  { label: "Poverty Rate", value: "41.8%", sub: "TLSS 2022" },
  { label: "Life Expectancy", value: "51.2 yr", sub: "At birth" },
  { label: "Literacy Rate", value: "68.1%", sub: "Age 15+" },
];

/* ── chart tooltip ──────────────────────────────────── */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-lg px-3 py-2 text-xs shadow-lg"
      style={{ border: "1px solid rgba(0,87,184,0.12)" }}>
      <p className="font-semibold mb-1" style={{ color: INK }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: <strong>{p.value}{typeof p.value === "number" && p.value < 100 ? "%" : ""}</strong></p>
      ))}
    </div>
  );
};

/* ── page ────────────────────────────────────────────── */
function DashboardPage() {
  const { t } = useTranslation();
  const [selMun, setSelMun] = useState("All");

  const muns = useMemo(() => selMun === "All" ? municipalities : municipalities.filter(m => m.name === selMun), [selMun]);
  const totPop = useMemo(() => muns.reduce((a, m) => a + m.population, 0), [muns]);
  const totM = useMemo(() => muns.reduce((a, m) => a + m.male, 0), [muns]);
  const totF = useMemo(() => muns.reduce((a, m) => a + m.female, 0), [muns]);
  const avgD = useMemo(() => Math.round(muns.reduce((a, m) => a + m.density, 0) / muns.length), [muns]);
  const avgU = useMemo(() => Math.round(muns.reduce((a, m) => a + m.urban, 0) / muns.length), [muns]);
  const gData = [{ name: t("lblMale"), value: totM, color: BLUE }, { name: t("lblFemale"), value: totF, color: GOLD }];
  const RL = Math.PI / 180;
  const pieLbl = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const r = innerRadius + (outerRadius - innerRadius) * 0.55;
    return <text x={cx + r * Math.cos(-midAngle * RL)} y={cy + r * Math.sin(-midAngle * RL)} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight="700">{`${(percent * 100).toFixed(0)}%`}</text>;
  };

  const barData = selMun === "All" ? munBarData : munBarData.filter(d => d.n === selMun);

  /* shared thin axis style */
  const axTick = { fontSize: 10, fill: "#9CA3AF" };
  const gridStyle = { strokeDasharray: "3 3", stroke: "rgba(0,0,0,0.06)" };

  return (
    <div style={{ background: BLUE_LIGHT, minHeight: "100vh" }}>
      <PageHero eyebrow={t("dashboardLabel")} title={t("dashTitle")} sub={t("dashSub")} photo={PH.dili} />

      {/* Toolbar */}
      <div className="bg-white border-b sticky top-14 z-20" style={{ borderColor: "rgba(0,87,184,0.1)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between flex-wrap gap-3">
          <span className="text-sm font-semibold" style={{ color: INK }}>{t("popByMun")}</span>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select value={selMun} onChange={e => setSelMun(e.target.value)}
                className="appearance-none pl-3 pr-7 py-1.5 rounded-lg text-xs font-semibold focus:outline-none"
                style={{ background: BLUE_LIGHT, color: INK, border: "1px solid rgba(0,87,184,0.12)" }}>
                <option value="All">{t("allMun")}</option>
                {municipalities.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
              </select>
              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: SLATE }} />
            </div>
            <DownloadButtons size="compact" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── KPI Strip ──────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {macroKPIs.map(k => (
            <div key={k.label} className="bg-white rounded-lg p-5"
              style={{ border: "1px solid rgba(0,87,184,0.1)" }}>
              <div className="text-xs font-medium mb-2" style={{ color: SLATE }}>{k.label}</div>
              <div className="text-xl font-bold font-mono" style={{ color: INK }}>{k.value}</div>
              <div className="text-[10px] mt-1" style={{ color: SLATE }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Row 1: Pop bar chart + Gender pie ────── */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Population bar chart */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6" style={{ border: "1px solid rgba(0,87,184,0.1)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: INK }}>{t("popByMun")}</h3>
              <DownloadButtons size="compact" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} margin={{ top: 8, right: 10, bottom: 30, left: 10 }} barGap={2}>
                <CartesianGrid vertical={false} {...gridStyle} />
                <XAxis dataKey="n" tick={{ ...axTick, fontWeight: 600 }} angle={-35} textAnchor="end" interval={0} />
                <YAxis tick={axTick} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} width={36} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                <Bar dataKey="M" name={t("lblMale")} fill={BLUE} radius={[3, 3, 0, 0]} />
                <Bar dataKey="F" name={t("lblFemale")} fill={GOLD} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gender + Urban/Rural pies */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6" style={{ border: "1px solid rgba(0,87,184,0.1)" }}>
              <h3 className="text-sm font-semibold mb-3" style={{ color: INK }}>{t("genderDist")}</h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={gData} dataKey="value" cx="50%" cy="50%" outerRadius={65} innerRadius={30} labelLine={false} label={pieLbl}>
                    {gData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Legend iconSize={8} formatter={v => <span style={{ fontSize: 10 }}>{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg p-6" style={{ border: "1px solid rgba(0,87,184,0.1)" }}>
              <h3 className="text-sm font-semibold mb-3" style={{ color: INK }}>{t("urLabel")}</h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={[{ name: t("lblUrban"), value: avgU }, { name: t("lblRural"), value: 100 - avgU }]}
                    dataKey="value" cx="50%" cy="50%" outerRadius={65} innerRadius={30} labelLine={false} label={pieLbl}>
                    <Cell fill={BLUE} />
                    <Cell fill={SLATE} />
                  </Pie>
                  <Legend iconSize={8} formatter={v => <span style={{ fontSize: 10 }}>{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── Row 2: Population trend + Age structure */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Population trend */}
          <div className="bg-white rounded-lg p-6" style={{ border: "1px solid rgba(0,87,184,0.1)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: INK }}>{t("popTrend")}</h3>
              <DownloadButtons size="compact" />
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={popTrendData} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
                <defs>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BLUE} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={BLUE} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...gridStyle} />
                <XAxis dataKey="year" tick={axTick} axisLine={false} tickLine={false} />
                <YAxis tick={axTick} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="pop" name="Population" stroke={BLUE} strokeWidth={2.5} fill="url(#blueGrad)" dot={{ fill: BLUE, r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Age structure */}
          <div className="bg-white rounded-lg p-6" style={{ border: "1px solid rgba(0,87,184,0.1)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: INK }}>{t("ageStr")}</h3>
              <DownloadButtons size="compact" />
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={ageData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
                <CartesianGrid horizontal={false} {...gridStyle} />
                <XAxis type="number" tick={axTick} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="g" tick={{ ...axTick, fontWeight: 500 }} width={45} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="v" name="Population" fill={BLUE} radius={[0, 4, 4, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Row 3: CPI + GDP sectoral ──────────── */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* CPI inflation trend */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6" style={{ border: "1px solid rgba(0,87,184,0.1)" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold" style={{ color: INK }}>Consumer Price Index — Monthly Inflation (%)</h3>
                <p className="text-[10px] mt-0.5" style={{ color: SLATE }}>2023 year-on-year change by category</p>
              </div>
              <DownloadButtons size="compact" />
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={cpiMonthly} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
                <CartesianGrid {...gridStyle} />
                <XAxis dataKey="m" tick={axTick} axisLine={false} tickLine={false} />
                <YAxis tick={axTick} domain={[4, 12]} tickFormatter={v => `${v}%`} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Legend iconSize={8} formatter={v => <span style={{ fontSize: 10, color: INK }}>{v}</span>} />
                <Line type="monotone" dataKey="all" name="Overall" stroke={INK} strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="food" name="Food" stroke={BLUE} strokeWidth={2} dot={false} strokeDasharray="" />
                <Line type="monotone" dataKey="housing" name="Housing" stroke={SLATE} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* GDP by sector */}
          <div className="bg-white rounded-lg p-6" style={{ border: "1px solid rgba(0,87,184,0.1)" }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: INK }}>GDP by Sector (%)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={gdpSectoral} dataKey="pct" nameKey="sector" cx="50%" cy="50%" outerRadius={75} innerRadius={35} labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
                    return <text x={cx + r * Math.cos(-midAngle * RL)} y={cy + r * Math.sin(-midAngle * RL)} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="10" fontWeight="700">{`${(percent * 100).toFixed(0)}%`}</text>;
                  }}>
                  {gdpSectoral.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Legend iconSize={8} formatter={v => <span style={{ fontSize: 10 }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Map + mini stats ───────────────────── */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg p-6" style={{ border: "1px solid rgba(0,87,184,0.1)" }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: INK }}>Timor-Leste Municipalities</h3>
            <div className="rounded-lg overflow-hidden" style={{ height: 180, background: NAV_BG }}>
              <TLMap />
            </div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {[
              ["Households", "289,127"],
              ["Avg HH Size", "4.64"],
              ["Density", `${avgD}/km²`],
              ["Sex Ratio", "100.4"],
              ["Urban %", `${avgU}%`],
              ["Municipalities", "13"],
            ].map(([l, v]) => (
              <div key={l} className="bg-white rounded-lg p-4" style={{ border: "1px solid rgba(0,87,184,0.1)" }}>
                <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: SLATE }}>{l}</div>
                <div className="text-lg font-bold font-mono mt-1" style={{ color: INK }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
