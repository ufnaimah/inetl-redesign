import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { ChevronDown, TrendingUp, TrendingDown, Minus, X } from "lucide-react";
import {
  BLUE, BLUE_LIGHT, BLUE_DARK, INK, SLATE, RED_ACCENT, GOLD,
  sdgGoals, sdgTrendData,
} from "@/data/constants";
import { DownloadButtons } from "@/components/SharedComponents";
import PageHero from "@/components/PageHero";

/* ── per-goal detail trend data (for selected SDG) ─── */
const GOAL_TRENDS = {
  1:  [{ yr:2015, v:49.3 },{ yr:2016, v:48.1 },{ yr:2017, v:47.0 },{ yr:2018, v:46.1 },{ yr:2019, v:44.8 },{ yr:2020, v:43.5 },{ yr:2021, v:42.9 },{ yr:2022, v:42.1 },{ yr:2023, v:41.8 }],
  2:  [{ yr:2015, v:30.1 },{ yr:2016, v:29.0 },{ yr:2017, v:28.2 },{ yr:2018, v:27.5 },{ yr:2019, v:26.8 },{ yr:2020, v:26.1 },{ yr:2021, v:25.5 },{ yr:2022, v:25.2 },{ yr:2023, v:24.9 }],
  3:  [{ yr:2015, v:46.8 },{ yr:2016, v:47.5 },{ yr:2017, v:48.2 },{ yr:2018, v:48.9 },{ yr:2019, v:49.5 },{ yr:2020, v:50.0 },{ yr:2021, v:50.4 },{ yr:2022, v:50.8 },{ yr:2023, v:51.2 }],
  4:  [{ yr:2015, v:56.2 },{ yr:2016, v:58.0 },{ yr:2017, v:59.8 },{ yr:2018, v:62.1 },{ yr:2019, v:64.3 },{ yr:2020, v:65.5 },{ yr:2021, v:66.7 },{ yr:2022, v:67.5 },{ yr:2023, v:68.3 }],
  6:  [{ yr:2015, v:58.4 },{ yr:2016, v:60.2 },{ yr:2017, v:62.8 },{ yr:2018, v:65.2 },{ yr:2019, v:67.4 },{ yr:2020, v:68.9 },{ yr:2021, v:70.1 },{ yr:2022, v:71.8 },{ yr:2023, v:72.4 }],
  7:  [{ yr:2015, v:42.0 },{ yr:2016, v:44.5 },{ yr:2017, v:47.8 },{ yr:2018, v:52.1 },{ yr:2019, v:54.8 },{ yr:2020, v:56.3 },{ yr:2021, v:58.7 },{ yr:2022, v:60.2 },{ yr:2023, v:61.2 }],
};

/* ── tooltip ────────────────────────────────────────── */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-lg px-3 py-2 text-xs shadow-lg"
      style={{ border: "1px solid rgba(0,87,184,0.1)" }}>
      <p className="font-semibold mb-1" style={{ color: INK }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || p.stroke }}>
          {p.name}: <strong>{p.value}{typeof p.value === "number" && p.value < 200 ? "%" : ""}</strong>
        </p>
      ))}
    </div>
  );
};

const axTick = { fontSize: 10, fill: "#9CA3AF" };
const gridProps = { strokeDasharray: "3 3", stroke: "rgba(0,0,0,0.06)" };

/* ── page ────────────────────────────────────────────── */
function SDGPage() {
  const { t } = useTranslation();
  const [sel, setSel] = useState(null);
  const [view, setView] = useState("goals");
  const [yr, setYr] = useState("2023");

  const selectedGoal = sel ? sdgGoals.find(g => g.id === sel) : null;

  /* radar data for overview */
  const radarData = useMemo(() =>
    sdgGoals.map(g => ({ name: `${g.id}`, progress: g.prog, full: 100 })),
  []);

  return (
    <div style={{ background: BLUE_LIGHT, minHeight: "100vh" }}>
      <PageHero eyebrow={t("sdgSectionLabel")} title="Sustainable Development Goals"
        sub="Tracking Timor-Leste's progress toward the United Nations 2030 Agenda."
        photo="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1400&q=80" />

      {/* ── Toolbar ──────────────────────────── */}
      <div className="bg-white border-b sticky top-14 z-20" style={{ borderColor: "rgba(0,87,184,0.1)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-1 p-1 rounded-lg" style={{ background: BLUE_LIGHT }}>
            {([["goals", t("viewAllGoals")], ["trends", t("viewTrends")]]).map(([v, l]) => (
              <button key={v} onClick={() => setView(v)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={view === v ? { background: BLUE, color: "#fff" } : { color: SLATE }}>
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {sel && (
              <button onClick={() => setSel(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                style={{ background: BLUE }}>
                <X size={11} /> {t("clearFilter")}
              </button>
            )}
            <div className="relative">
              <select value={yr} onChange={e => setYr(e.target.value)}
                className="appearance-none pl-3 pr-7 py-1.5 rounded-lg text-xs font-semibold focus:outline-none"
                style={{ background: BLUE_LIGHT, color: INK, border: "1px solid rgba(0,87,184,0.12)" }}>
                {["2023","2022","2021","2020","2019","2018"].map(y => <option key={y}>{y}</option>)}
              </select>
              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: SLATE }} />
            </div>
            <DownloadButtons size="compact" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ═══════ TRENDS VIEW ═══════ */}
        {view === "trends" ? (
          <div className="space-y-6">

            {/* 1. Horizontal bar — all SDGs progress */}
            <div className="bg-white rounded-lg p-6" style={{ border: "1px solid rgba(0,87,184,0.1)" }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold" style={{ color: INK }}>SDG Progress Overview — {yr}</h3>
                <DownloadButtons size="compact" />
              </div>
              <ResponsiveContainer width="100%" height={460}>
                <BarChart data={sdgGoals.map(g => ({ name: `SDG ${g.id}`, p: g.prog, color: g.color }))}
                  layout="vertical" margin={{ left: 10, right: 30 }}>
                  <CartesianGrid horizontal={false} {...gridProps} />
                  <XAxis type="number" domain={[0, 100]} tick={axTick} tickFormatter={v => `${v}%`} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: INK, fontWeight: 500 }} width={52} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="p" name="Progress" radius={[0, 6, 6, 0]} barSize={16}>
                    {sdgGoals.map((g, i) => <Cell key={i} fill={g.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 2. Multi-line trend — key indicators */}
            <div className="bg-white rounded-lg p-6" style={{ border: "1px solid rgba(0,87,184,0.1)" }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-semibold" style={{ color: INK }}>Key Indicator Trends 2018–2023</h3>
                  <p className="text-[10px] mt-0.5" style={{ color: SLATE }}>Selected SDG proxy indicators, year-on-year (%)</p>
                </div>
                <DownloadButtons size="compact" />
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={sdgTrendData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                  <defs>
                    <linearGradient id="gPov" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#E5243B" stopOpacity={0.12} /><stop offset="95%" stopColor="#E5243B" stopOpacity={0} /></linearGradient>
                    <linearGradient id="gWat" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#26BDE2" stopOpacity={0.12} /><stop offset="95%" stopColor="#26BDE2" stopOpacity={0} /></linearGradient>
                    <linearGradient id="gEng" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#FCC30B" stopOpacity={0.12} /><stop offset="95%" stopColor="#FCC30B" stopOpacity={0} /></linearGradient>
                    <linearGradient id="gEdu" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#C5192D" stopOpacity={0.12} /><stop offset="95%" stopColor="#C5192D" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="year" tick={axTick} axisLine={false} tickLine={false} />
                  <YAxis tick={axTick} domain={[30, 80]} tickFormatter={v => `${v}%`} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend iconSize={8} formatter={v => <span style={{ fontSize: 10, fontWeight: 600 }}>{v}</span>} />
                  <Area type="monotone" dataKey="poverty" name="SDG 1 — Poverty" stroke="#E5243B" strokeWidth={2.5} fill="url(#gPov)" dot={false} />
                  <Area type="monotone" dataKey="water"   name="SDG 6 — Water"   stroke="#26BDE2" strokeWidth={2.5} fill="url(#gWat)" dot={false} />
                  <Area type="monotone" dataKey="energy"  name="SDG 7 — Energy"  stroke="#FCC30B" strokeWidth={2.5} fill="url(#gEng)" dot={false} />
                  <Area type="monotone" dataKey="edu"     name="SDG 4 — Education" stroke="#C5192D" strokeWidth={2.5} fill="url(#gEdu)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* 3. Per-goal detail (if a goal is selected) */}
            {selectedGoal && GOAL_TRENDS[selectedGoal.id] && (
              <div className="bg-white rounded-lg p-6" style={{ border: `2px solid ${selectedGoal.color}20` }}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-black px-2 py-1 rounded text-white" style={{ background: selectedGoal.color }}>SDG {selectedGoal.id}</span>
                  <h3 className="text-sm font-semibold" style={{ color: INK }}>{selectedGoal.name} — {selectedGoal.ind} Trend</h3>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={GOAL_TRENDS[selectedGoal.id]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid {...gridProps} />
                    <XAxis dataKey="yr" tick={axTick} axisLine={false} tickLine={false} />
                    <YAxis tick={axTick} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                    <Tooltip content={<ChartTooltip />} />
                    <Line type="monotone" dataKey="v" name={selectedGoal.ind} stroke={selectedGoal.color} strokeWidth={3}
                      dot={{ fill: selectedGoal.color, r: 4, strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

        ) : (
          /* ═══════ GOALS GRID VIEW ═══════ */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {sdgGoals.map(g => {
              const isSelected = sel === g.id;
              const isDimmed = sel !== null && !isSelected;
              return (
                <button key={g.id} onClick={() => setSel(isSelected ? null : g.id)}
                  className="rounded-xl text-left transition-all hover:brightness-110 focus:outline-none"
                  style={{
                    background: g.color,
                    opacity: isDimmed ? 0.38 : 1,
                    outline: isSelected ? "3px solid rgba(255,255,255,0.85)" : "none",
                    outlineOffset: 3,
                    padding: "18px 16px 14px",
                  }}>
                  <div className="flex items-start justify-between mb-2.5">
                    <span className="text-[10px] font-black tracking-wider rounded px-1.5 py-0.5"
                      style={{ background: "rgba(0,0,0,0.28)", color: "rgba(255,255,255,0.95)" }}>
                      SDG {g.id}
                    </span>
                    <div className="flex items-center gap-0.5 text-[10px] font-bold"
                      style={{ color: g.tr > 0 ? "rgba(255,255,255,0.95)" : g.tr < 0 ? "rgba(255,220,220,0.9)" : "rgba(255,255,255,0.55)" }}>
                      {g.tr > 0 ? <TrendingUp size={10} /> : g.tr < 0 ? <TrendingDown size={10} /> : <Minus size={10} />}
                      <span>{g.tr !== 0 ? `${g.tr > 0 ? "+" : ""}${g.tr}` : "–"}</span>
                    </div>
                  </div>
                  <div className="text-xs font-semibold leading-snug mb-3"
                    style={{ color: "rgba(255,255,255,0.93)", minHeight: 32,
                      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {g.name}
                  </div>
                  <div className="text-2xl font-black leading-none text-white mb-0.5 font-mono">{g.value}</div>
                  <div className="text-[10px] mb-3 leading-tight"
                    style={{ color: "rgba(255,255,255,0.62)", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {g.ind}
                  </div>
                  <div className="w-full rounded-full" style={{ height: 3, background: "rgba(0,0,0,0.3)" }}>
                    <div className="rounded-full" style={{ height: 3, width: `${g.prog}%`, background: "rgba(255,255,255,0.82)" }} />
                  </div>
                  <div className="flex justify-between items-center mt-1.5">
                    <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.52)" }}>{t("lblProgressTarget")}</span>
                    <span className="text-[10px] font-bold text-white">{g.prog}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SDGPage;
