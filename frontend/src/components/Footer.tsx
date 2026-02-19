import { NavLink } from "react-router-dom";
import whatsappImage from "../../photos/whatsapp.png";

export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="footerInner">
        <div className="footerLeft">
          <div className="footerBrand">Psycool</div>
          <div className="footerMeta">© {new Date().getFullYear()} - Tous droits reserves</div>
        </div>

        <div className="footerLinks">
          <NavLink className="footerLink" to="/">
            Accueil
          </NavLink>
          <NavLink className="footerLink" to="/consultations">
            Consultations
          </NavLink>
          <NavLink className="footerLink" to="/conferences">
            Conferences
          </NavLink>
        </div>

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
