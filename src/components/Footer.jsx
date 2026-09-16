import React from "react";
import { useTranslation } from "react-i18next";
import { Globe, Youtube, Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { BLUE, NAV_BG, INK, SLATE } from "@/data/constants";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoInetl from "@/imports/Logo_INETL_7db89cf703.png";

const SOCIAL = [
  { Icon: Youtube,   label: "YouTube",   url: "https://www.youtube.com/@inetl-tl" },
  { Icon: Instagram, label: "Instagram", url: "https://www.instagram.com/inetl.tl" },
  { Icon: Facebook,  label: "Facebook",  url: "https://www.facebook.com/INETL.TL" },
];

function Footer({ setPage }) {
  const { t } = useTranslation();

  const linkCls = "text-sm hover:text-white transition-colors";
  const dimWhite = "rgba(255,255,255,0.42)";

  return (
    <footer style={{ background: NAV_BG }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-4 mb-5">
              <ImageWithFallback src={logoInetl} alt="INETL" className="object-contain flex-shrink-0"
                style={{ height: 56, width: "auto", maxWidth: 56 }} />
              <span className="text-sm font-semibold leading-snug text-white">
                Instituto Nacional de Estatística de Timor-Leste
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
              {t("footerTagline")}
            </p>
            <div className="flex gap-2">
              {SOCIAL.map(({ Icon, label, url }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" title={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                  style={{ background: "rgba(255,255,255,0.07)" }}>
                  <Icon size={15} style={{ color: "rgba(255,255,255,0.5)" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5 text-white">{t("footerNav")}</h4>
            <ul className="space-y-2.5">
              {([
                ["home", t("home")], ["census-survey", t("census")], ["dashboard", t("dashboard")],
                ["publications", t("publications")], ["indicators", t("dropIndicators")], ["sdg", t("sdg")],
              ]).map(([k, l]) => (
                <li key={k}><button onClick={() => setPage(k)} className={linkCls} style={{ color: dimWhite }}>{l}</button></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5 text-white">{t("footerResources")}</h4>
            <ul className="space-y-2.5">
              {[t("resDb"), t("resMicro"), t("resGIS"), t("resAPI"), t("resMethod"), t("resPress")].map(r => (
                <li key={r}><button onClick={() => setPage("under_construction")} className={linkCls} style={{ color: dimWhite }}>{r}</button></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5 text-white">{t("footerContact")}</h4>
            <div className="space-y-4">
              {/* Address → Google Maps */}
              <a href="https://www.google.com/maps/search/?api=1&query=Rua+Presidente+Nicolau+Lobato,+Dili,+Timor-Leste"
                target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 group">
                <MapPin size={13} className="mt-0.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
                <span className="text-sm group-hover:text-white transition-colors" style={{ color: dimWhite }}>
                  Rua Presidente Nicolau Lobato, Dili, Timor-Leste
                </span>
              </a>
              {/* Phone */}
              <a href="tel:+6703324654" className="flex items-start gap-3 group">
                <Phone size={13} className="mt-0.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
                <span className="text-sm group-hover:text-white transition-colors" style={{ color: dimWhite }}>+670 332 4654</span>
              </a>
              {/* Email → mailto */}
              <a href="mailto:info@statistics.gov.tl" className="flex items-start gap-3 group">
                <Mail size={13} className="mt-0.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
                <span className="text-sm group-hover:text-white transition-colors" style={{ color: dimWhite }}>info@statistics.gov.tl</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>{t("footerCopyright")}</p>
          <div className="flex gap-6">
            {[
              ["privacy-policy", t("footerPrivacy")],
              ["terms-of-use", t("footerTerms")],
              ["accessibility", t("footerAccess")],
            ].map(([k, l]) => (
              <button key={k} onClick={() => setPage(k)}
                className="text-xs hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.22)" }}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
