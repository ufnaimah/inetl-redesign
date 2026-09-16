# INETL — Instituto Nacional de Estatística de Timor-Leste

> Redesign of the official statistics website for the Democratic Republic of Timor-Leste.

A modern, responsive single-page application built with **React + Vite**, featuring multilingual support (English, Tetum, Portuguese), interactive data dashboards, SDG tracking, and a comprehensive statistical data explorer — all styled with **Tailwind CSS**.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-Academic-blue)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Multilingual i18n** | English, Tetum, and Portuguese with automatic fallback to English for missing translations |
| **Interactive Dashboard** | Population charts, CPI trends, GDP breakdown, and municipality comparisons using Recharts |
| **SDG Tracker** | All 17 Sustainable Development Goals with official UN colors, trend charts, and progress indicators |
| **Census & Survey** | Catalogue of population censuses and statistical surveys with metadata cards |
| **Data Explorer** | Searchable, sortable, and filterable data table with 35+ statistical indicators |
| **Publications** | Library of statistical reports with category filters, thumbnails, and download buttons |
| **Responsive** | Mobile hamburger menu, stacking grids, horizontal-scroll tables |
| **Search** | Hover-to-expand search bar with Quick Links and filtered result dropdown |

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 18](https://react.dev/) | UI component library |
| [Vite 6](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework |
| [Recharts](https://recharts.org/) | Composable chart library (Bar, Line, Pie, Area) |
| [react-i18next](https://react.i18next.com/) | Internationalization with JSON translations |
| [Lucide React](https://lucide.dev/) | Icon library |
| [class-variance-authority](https://cva.style/) | Variant-based component styling |

---

## 📋 Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or pnpm / yarn)

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-org/inetl-redesign.git
cd inetl-redesign

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

### Production Build

```bash
npm run build     # Output → dist/
npx vite preview  # Preview the production build locally
```

---

## 📁 Project Structure

```
src/
├── app/
│   └── App.jsx                  # Root component & page router
│
├── assets/                      # Local images (Vite-imported)
│   ├── Timles.jpg               # Hero: Home page
│   ├── Timles2.jpg              # Hero: About page
│   ├── Timles3.jpg              # Hero: News page
│   ├── Timles4.jpg              # Hero: Data Explorer
│   └── Timles5.jpg              # Alternate hero
│
├── components/                  # Reusable UI components
│   ├── Navbar.jsx               # Top navigation (responsive + hamburger)
│   ├── NavSearch.jsx            # Hover-to-expand search + quick links
│   ├── NavDropMenu.jsx          # Dropdown menus for nav items
│   ├── Footer.jsx               # Footer with external links
│   ├── PageHero.jsx             # Reusable page hero banner
│   └── SharedComponents.jsx     # BookCover, TLMap, DownloadButtons
│
├── data/
│   └── constants.js             # Colors, photo URLs, data arrays,
│                                # municipality data, SDG goals, search index
│
├── i18n/                        # Internationalization
│   ├── index.js                 # i18next config (fallbackLng: "en")
│   ├── en.json                  # English (294 keys)
│   ├── tet.json                 # Tetum (294 keys)
│   └── pt.json                  # Portuguese (294 keys)
│
├── pages/                       # Route-level page components
│   ├── HomePage.jsx             # Landing page
│   ├── HomePageSections.jsx     # Hero, Census, Publications, News sections
│   ├── DashboardPage.jsx        # Interactive population dashboard
│   ├── CensusPage.jsx           # Census 2022 deep-dive
│   ├── CensusSurveyPage.jsx     # Full census & survey catalogue
│   ├── DataTablePage.jsx        # BPS-style data table with filters
│   ├── IndicatorsPage.jsx       # 3-column indicator directory
│   ├── PublicationsPage.jsx     # Publications library with search
│   ├── SDGPage.jsx              # SDG goals grid + trend charts
│   ├── AboutPage.jsx            # About INETL
│   ├── NewsPage.jsx             # News & Activity
│   ├── ServicesPage.jsx         # Services directory
│   ├── ContactPage.jsx          # Contact form + info
│   ├── ProgramsPage.jsx         # Statistical programs
│   ├── CollaborationPage.jsx    # Partnerships
│   ├── FAQPage.jsx              # FAQ accordion
│   ├── PrivacyPolicyPage.jsx    # Privacy policy (legal text)
│   ├── TermsOfUsePage.jsx       # Terms of use (legal text)
│   ├── AccessibilityPage.jsx    # WCAG accessibility statement
│   └── UnderConstructionPage.jsx# Placeholder page
│
├── styles/
│   ├── index.css                # Main entry (imports below)
│   ├── tailwind.css             # Tailwind directives
│   ├── theme.css                # CSS custom properties (colors, radius)
│   └── fonts.css                # Font imports
│
└── main.jsx                     # Vite entry point
```

---

## 🌐 Routing

This project uses a simple `useState`-based router in `App.jsx` (no react-router-dom).
Pages are switched via `setPage("key")`:

| Key | Page | Description |
|-----|------|-------------|
| `home` | HomePage | Landing page with all sections |
| `about` | AboutPage | About INETL |
| `census` | CensusPage | Census 2022 overview |
| `census-survey` | CensusSurveyPage | Full census & survey catalogue |
| `indicators` | IndicatorsPage | Statistical indicator directory |
| `data` | DataTablePage | Searchable data table |
| `dashboard` | DashboardPage | Interactive charts dashboard |
| `publications` | PublicationsPage | Publications library |
| `sdg` | SDGPage | SDG goals + trends |
| `news` | NewsPage | News & Activity |
| `services` | ServicesPage | Services directory |
| `contact` | ContactPage | Contact form |
| `programs` | ProgramsPage | Programs & initiatives |
| `collaborators` | CollaborationPage | Partnerships |
| `faq` | FAQPage | Frequently asked questions |
| `privacy-policy` | PrivacyPolicyPage | Privacy policy |
| `terms-of-use` | TermsOfUsePage | Terms of use |
| `accessibility` | AccessibilityPage | Accessibility statement |

---

## 🎨 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `BLUE` | `#1D65AF` | Primary brand / links / active states |
| `BLUE_LIGHT` | `#F4F6F8` | Page backgrounds / input backgrounds |
| `BLUE_DARK` / `NAV_BG` | `#14202B` | Navbar / footer / dark cards |
| `GOLD` | `#fbc312` | Accent / CTA buttons / active underlines |
| `INK` | `#14202B` | Body text |
| `SLATE` | `#8593A1` | Secondary text / labels |
| `RED_ACCENT` | `#D62828` | Alerts / SDG poverty indicator |

---

## 🌍 Internationalization

Translations are managed via `react-i18next` with JSON files in `src/i18n/`.

- **Fallback**: If a key is missing or empty in Tetum/Portuguese, English is shown automatically
- **Usage**: `const { t } = useTranslation(); t("keyName")`
- **Arrays**: `t("newsItems", { returnObjects: true })`

---

## 📊 Data Sources

All data displayed is based on publicly available statistics from:

- **INETL** — Instituto Nacional de Estatística de Timor-Leste
- **World Bank** — World Development Indicators
- **UNDP** — Human Development Reports
- **UN SDG** — Sustainable Development Goals indicators

> ⚠️ Note: Some values are approximations used for demonstration purposes.

---

## 👥 Team

Developed as part of the **STIS Semester 6** redesign project.

---

## 📄 License

This project is for academic and demonstration purposes. All statistical data belongs to their respective sources.
