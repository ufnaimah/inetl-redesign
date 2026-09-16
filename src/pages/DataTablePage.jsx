import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Search, ChevronDown, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { BLUE, BLUE_LIGHT, INK, SLATE, GOLD, DARK_CARD, PH, LOCAL_HEROES } from "@/data/constants";
import PageHero from "@/components/PageHero";

/* ─── dummy dataset (BPS-style) ────────────────────── */
const RAW_DATA = [
  { id: 1,  cat: "Demography",   sub: "Population",          ind: "Total Population",                yr: 2022, val: "1,340,513",  unit: "persons" },
  { id: 2,  cat: "Demography",   sub: "Population",          ind: "Population Growth Rate",           yr: 2022, val: "1.79",       unit: "%" },
  { id: 3,  cat: "Demography",   sub: "Population",          ind: "Population Density",               yr: 2022, val: "90.2",       unit: "/km²" },
  { id: 4,  cat: "Demography",   sub: "Population",          ind: "Sex Ratio (M per 100 F)",          yr: 2022, val: "100.4",      unit: "ratio" },
  { id: 5,  cat: "Demography",   sub: "Population",          ind: "Urban Population Share",           yr: 2022, val: "30.2",       unit: "%" },
  { id: 6,  cat: "Demography",   sub: "Vital Statistics",    ind: "Life Expectancy at Birth",         yr: 2022, val: "51.2",       unit: "years" },
  { id: 7,  cat: "Demography",   sub: "Vital Statistics",    ind: "Total Fertility Rate (TFR)",       yr: 2022, val: "4.1",        unit: "births" },
  { id: 8,  cat: "Demography",   sub: "Vital Statistics",    ind: "Infant Mortality Rate",            yr: 2022, val: "30.6",       unit: "per 1000" },
  { id: 9,  cat: "Social",       sub: "Education",           ind: "Literacy Rate (15+)",              yr: 2022, val: "68.1",       unit: "%" },
  { id: 10, cat: "Social",       sub: "Education",           ind: "Primary Net Enrollment",           yr: 2022, val: "68.3",       unit: "%" },
  { id: 11, cat: "Social",       sub: "Education",           ind: "Mean Years of Schooling",          yr: 2022, val: "5.3",        unit: "years" },
  { id: 12, cat: "Social",       sub: "Health",              ind: "Stunting Prevalence (<5 yrs)",     yr: 2022, val: "46.7",       unit: "%" },
  { id: 13, cat: "Social",       sub: "Health",              ind: "Access to Safe Drinking Water",    yr: 2022, val: "72.4",       unit: "%" },
  { id: 14, cat: "Social",       sub: "Poverty",             ind: "Poverty Headcount Ratio",          yr: 2022, val: "41.8",       unit: "%" },
  { id: 15, cat: "Social",       sub: "Poverty",             ind: "Gini Coefficient",                 yr: 2022, val: "28.7",       unit: "index" },
  { id: 16, cat: "Social",       sub: "Labour",              ind: "Labour Force Participation Rate",  yr: 2022, val: "34.8",       unit: "%" },
  { id: 17, cat: "Social",       sub: "Labour",              ind: "Youth Unemployment Rate",          yr: 2022, val: "31.4",       unit: "%" },
  { id: 18, cat: "Economy",      sub: "National Accounts",   ind: "GDP (current USD)",                yr: 2023, val: "1,960",      unit: "million USD" },
  { id: 19, cat: "Economy",      sub: "National Accounts",   ind: "GDP Growth Rate",                  yr: 2023, val: "3.8",        unit: "%" },
  { id: 20, cat: "Economy",      sub: "National Accounts",   ind: "GDP per Capita",                   yr: 2023, val: "1,462",      unit: "USD" },
  { id: 21, cat: "Economy",      sub: "Prices",              ind: "CPI Inflation (annual avg.)",      yr: 2023, val: "8.4",        unit: "%" },
  { id: 22, cat: "Economy",      sub: "Prices",              ind: "Food Inflation",                   yr: 2023, val: "10.3",       unit: "%" },
  { id: 23, cat: "Economy",      sub: "Trade",               ind: "Total Exports",                    yr: 2023, val: "95.2",       unit: "million USD" },
  { id: 24, cat: "Economy",      sub: "Trade",               ind: "Total Imports",                    yr: 2023, val: "892.1",      unit: "million USD" },
  { id: 25, cat: "Economy",      sub: "Trade",               ind: "Trade Balance",                    yr: 2023, val: "-796.9",     unit: "million USD" },
  { id: 26, cat: "Economy",      sub: "Government Finance",  ind: "Government Revenue",               yr: 2023, val: "1,840",      unit: "million USD" },
  { id: 27, cat: "Economy",      sub: "Government Finance",  ind: "Petroleum Fund Balance",           yr: 2023, val: "17,200",     unit: "million USD" },
  { id: 28, cat: "Environment",  sub: "Agriculture",         ind: "Agricultural Employment Share",    yr: 2022, val: "64.2",       unit: "%" },
  { id: 29, cat: "Environment",  sub: "Agriculture",         ind: "Rice Production",                  yr: 2022, val: "62,400",     unit: "tonnes" },
  { id: 30, cat: "Environment",  sub: "Agriculture",         ind: "Coffee Exports",                   yr: 2023, val: "12.8",       unit: "million USD" },
  { id: 31, cat: "Environment",  sub: "Energy",              ind: "Electricity Access",               yr: 2022, val: "61.2",       unit: "%" },
  { id: 32, cat: "Environment",  sub: "Energy",              ind: "CO₂ Emissions per Capita",         yr: 2022, val: "0.32",       unit: "tonnes" },
  { id: 33, cat: "Environment",  sub: "Geography",           ind: "Total Land Area",                  yr: 2022, val: "14,874",     unit: "km²" },
  { id: 34, cat: "Environment",  sub: "Geography",           ind: "Forest Coverage",                  yr: 2022, val: "42.1",       unit: "%" },
  { id: 35, cat: "Environment",  sub: "Geography",           ind: "Number of Municipalities",         yr: 2022, val: "13",         unit: "" },
];

const CATEGORIES = ["All", "Demography", "Social", "Economy", "Environment"];
const YEARS      = ["All", "2023", "2022"];
const PAGE_SIZE  = 12;

/* ─── component ────────────────────────────────────── */
function DataTablePage() {
  const { t } = useTranslation();
  const [searchQ, setSearchQ] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCol, setSortCol] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    let data = RAW_DATA;
    if (catFilter !== "All") data = data.filter(r => r.cat === catFilter);
    if (yearFilter !== "All") data = data.filter(r => r.yr.toString() === yearFilter);
    if (searchQ.trim()) {
      const q = searchQ.toLowerCase();
      data = data.filter(r =>
        r.ind.toLowerCase().includes(q) ||
        r.sub.toLowerCase().includes(q) ||
        r.cat.toLowerCase().includes(q)
      );
    }
    if (sortCol) {
      data = [...data].sort((a, b) => {
        const va = a[sortCol], vb = b[sortCol];
        const cmp = typeof va === "number" ? va - vb : String(va).localeCompare(String(vb));
        return sortAsc ? cmp : -cmp;
      });
    }
    return data;
  }, [searchQ, catFilter, yearFilter, sortCol, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safeCurrentPage - 1) * PAGE_SIZE, safeCurrentPage * PAGE_SIZE);

  // reset page when filter changes
  const applyFilter = (setter) => (val) => { setter(val); setCurrentPage(1); };

  const toggleSort = (col) => {
    if (sortCol === col) setSortAsc(!sortAsc);
    else { setSortCol(col); setSortAsc(true); }
  };

  const SortIcon = ({ col }) => {
    if (sortCol !== col) return <span className="text-gray-300 ml-1">↕</span>;
    return <span className="ml-1" style={{ color: BLUE }}>{sortAsc ? "↑" : "↓"}</span>;
  };

  return (
    <div style={{ background: BLUE_LIGHT, minHeight: "100vh" }}>
      <PageHero
        eyebrow="Statistical Data"
        title="Data Explorer"
        sub="Browse, search, and download Timor-Leste's key statistical indicators across all domains."
        photo={LOCAL_HEROES.alt1}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Toolbar ───────────────────────────── */}
        <div className="bg-white rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          style={{ border: "1px solid rgba(0,87,184,0.1)" }}>

          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: SLATE }} />
            <input value={searchQ} onChange={e => { setSearchQ(e.target.value); setCurrentPage(1); }}
              placeholder="Search indicator, subject, or category…"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm focus:outline-none"
              style={{ background: BLUE_LIGHT, color: INK, border: "1px solid rgba(0,87,184,0.12)" }} />
          </div>

          {/* Category filter */}
          <div className="relative">
            <select value={catFilter} onChange={e => applyFilter(setCatFilter)(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 rounded-lg text-sm font-medium focus:outline-none"
              style={{ background: BLUE_LIGHT, color: INK, border: "1px solid rgba(0,87,184,0.12)" }}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: SLATE }} />
          </div>

          {/* Year filter */}
          <div className="relative">
            <select value={yearFilter} onChange={e => applyFilter(setYearFilter)(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 rounded-lg text-sm font-medium focus:outline-none"
              style={{ background: BLUE_LIGHT, color: INK, border: "1px solid rgba(0,87,184,0.12)" }}>
              {YEARS.map(y => <option key={y} value={y}>{y === "All" ? "All Years" : y}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: SLATE }} />
          </div>
        </div>

        {/* ── Result count ──────────────────────── */}
        <p className="text-xs mb-4" style={{ color: SLATE }}>
          Showing <strong style={{ color: BLUE }}>{filtered.length}</strong> of {RAW_DATA.length} indicators
          {catFilter !== "All" && <span> in <strong>{catFilter}</strong></span>}
          {yearFilter !== "All" && <span> for <strong>{yearFilter}</strong></span>}
        </p>

        {/* ── Table ─────────────────────────────── */}
        <div className="bg-white rounded-lg overflow-hidden" style={{ border: "1px solid rgba(0,87,184,0.1)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: BLUE_LIGHT }}>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide w-10" style={{ color: SLATE }}>No</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide cursor-pointer select-none" style={{ color: SLATE }}
                    onClick={() => toggleSort("cat")}>
                    Category <SortIcon col="cat" />
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide cursor-pointer select-none" style={{ color: SLATE }}
                    onClick={() => toggleSort("sub")}>
                    Subject <SortIcon col="sub" />
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide cursor-pointer select-none" style={{ color: SLATE }}
                    onClick={() => toggleSort("ind")}>
                    Indicator <SortIcon col="ind" />
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wide w-20 cursor-pointer select-none" style={{ color: SLATE }}
                    onClick={() => toggleSort("yr")}>
                    Year <SortIcon col="yr" />
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wide w-28" style={{ color: SLATE }}>Value</th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wide w-24" style={{ color: SLATE }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: `${BLUE}08` }}>
                        <Search size={22} style={{ color: SLATE }} />
                      </div>
                      <p className="text-sm font-semibold mb-1" style={{ color: INK }}>No data found</p>
                      <p className="text-xs" style={{ color: SLATE }}>Try adjusting your search or filters.</p>
                    </td>
                  </tr>
                ) : paginated.map((row, idx) => (
                  <tr key={row.id}
                    className="transition-colors hover:bg-gray-50"
                    style={{ borderTop: "1px solid rgba(0,87,184,0.06)" }}>
                    <td className="px-4 py-3 text-xs" style={{ color: SLATE }}>{(safeCurrentPage - 1) * PAGE_SIZE + idx + 1}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
                        style={{
                          background: row.cat === "Demography" ? `${BLUE}12` :
                                      row.cat === "Social" ? "#7c3aed12" :
                                      row.cat === "Economy" ? "#b4530912" : "#16a34a12",
                          color:      row.cat === "Demography" ? BLUE :
                                      row.cat === "Social" ? "#7c3aed" :
                                      row.cat === "Economy" ? "#b45309" : "#16a34a",
                        }}>
                        {row.cat}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-medium" style={{ color: SLATE }}>{row.sub}</td>
                    <td className="px-4 py-3 font-medium" style={{ color: INK }}>{row.ind}</td>
                    <td className="px-4 py-3 text-center text-xs font-mono" style={{ color: SLATE }}>{row.yr}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold font-mono" style={{ color: INK }}>{row.val}</span>
                      {row.unit && <span className="text-[10px] ml-1" style={{ color: SLATE }}>{row.unit}</span>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="px-1.5 py-0.5 rounded text-[9px] font-bold hover:opacity-80 transition-opacity"
                          style={{ background: "#60ac31", color: "#fff" }} title="Download XLS">
                          XLS
                        </button>
                        <button className="px-1.5 py-0.5 rounded text-[9px] font-bold hover:opacity-80 transition-opacity"
                          style={{ background: BLUE, color: "#fff" }} title="Download CSV">
                          CSV
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ──────────────────────── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: "1px solid rgba(0,87,184,0.08)" }}>
              <p className="text-xs" style={{ color: SLATE }}>
                Page {safeCurrentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-1">
                <button onClick={() => setCurrentPage(Math.max(1, safeCurrentPage - 1))}
                  disabled={safeCurrentPage <= 1}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30 hover:bg-gray-100"
                  style={{ border: "1px solid rgba(0,87,184,0.12)" }}>
                  <ChevronLeft size={14} style={{ color: INK }} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - safeCurrentPage) <= 1)
                  .map((p, i, arr) => (
                    <React.Fragment key={p}>
                      {i > 0 && arr[i - 1] !== p - 1 && <span className="px-1 text-xs" style={{ color: SLATE }}>…</span>}
                      <button onClick={() => setCurrentPage(p)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-colors"
                        style={p === safeCurrentPage
                          ? { background: BLUE, color: "#fff" }
                          : { border: "1px solid rgba(0,87,184,0.12)", color: INK }}>
                        {p}
                      </button>
                    </React.Fragment>
                  ))}
                <button onClick={() => setCurrentPage(Math.min(totalPages, safeCurrentPage + 1))}
                  disabled={safeCurrentPage >= totalPages}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30 hover:bg-gray-100"
                  style={{ border: "1px solid rgba(0,87,184,0.12)" }}>
                  <ChevronRight size={14} style={{ color: INK }} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Summary cards ─────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            ["Demography", `${RAW_DATA.filter(r => r.cat === "Demography").length} indicators`, BLUE],
            ["Social", `${RAW_DATA.filter(r => r.cat === "Social").length} indicators`, "#7c3aed"],
            ["Economy", `${RAW_DATA.filter(r => r.cat === "Economy").length} indicators`, "#b45309"],
            ["Environment", `${RAW_DATA.filter(r => r.cat === "Environment").length} indicators`, "#16a34a"],
          ].map(([label, count, color]) => (
            <button key={label}
              onClick={() => { setCatFilter(label); setCurrentPage(1); }}
              className="bg-white rounded-lg p-4 text-left transition-all hover:shadow-sm"
              style={{ border: catFilter === label ? `2px solid ${color}` : "1px solid rgba(0,87,184,0.1)" }}>
              <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color }}>{label}</div>
              <div className="text-sm" style={{ color: SLATE }}>{count}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DataTablePage;
