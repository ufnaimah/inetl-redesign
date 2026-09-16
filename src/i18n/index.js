import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import tet from "./tet.json";
import pt from "./pt.json";

i18n.use(initReactI18next).init({
  resources: {
    en:  { translation: en },
    tet: { translation: tet },
    pt:  { translation: pt },
  },
  lng: "en",
  fallbackLng: "en",          // ← Auto-fallback: if key missing/empty in tet/pt, use English
  interpolation: {
    escapeValue: false,        // React already escapes
  },
  returnNull: false,
  returnEmptyString: false,    // ← Treat empty string as missing → triggers fallback to "en"
  parseMissingKeyHandler: (key) => key, // Prevent blank UI: show key name as last resort
});

export default i18n;
