import { NavLink } from "react-router-dom";
import { navItems } from "./navItems";
import UkFlag from "./UkFlag";
import whatsappImage from "../../photos/whatsapp.png";

export default function Footer() {
  return (
    <footer className="siteFooter">
      <svg className="footerWave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40 C 240 0, 480 0, 720 26 S 1200 60, 1440 18 L1440 60 L0 60 Z" fill="currentColor" />
      </svg>

      <div className="footerPhone">
        <span className="footerPhoneIcon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
          </svg>
        </span>
        <a className="footerPhoneNumber" href="tel:+33687216605">
          06 87 21 66 05
        </a>

        <span className="footerPhoneSeparator" aria-hidden="true" />

        <span className="footerPhoneIcon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </svg>
        </span>
        <a
          className="footerAddress"
          href="https://www.google.com/maps/search/?api=1&query=3+rue+des+gen%C3%AAts+34970+Lattes"
          target="_blank"
          rel="noreferrer"
        >
          3, rue des genêts
          <span>Lattes (Maurin)</span>
        </a>
      </div>

      <div className="footerInner">
        <div className="footerLeft">
          <div className="footerBrand">Psycool</div>
          <div className="psyName">Chantal <span>NOVARA</span></div>
          <div className="nonconvention">Secteur non conventionné</div>
          <div className="footerMeta">© {new Date().getFullYear()} - Tous droits reserves</div>
        </div>

        <nav className="footerLinks headerNav" aria-label="Navigation du pied de page">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
            >
              {item.label}
              {item.flag === "uk" && <UkFlag />}
            </NavLink>
          ))}
        </nav>

        <div className="footerRight">
          <a
            className="footerWhatsappCta"
            href="https://wa.me/33687216605"
            target="_blank"
            rel="noreferrer"
            aria-label="Contacter sur WhatsApp"
          >
            <img src={whatsappImage} alt="" loading="lazy" />
          </a>
        </div>
      </div>
    </footer>
  );
}
