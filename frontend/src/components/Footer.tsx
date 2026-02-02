import { NavLink } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="footerInner">
        <div className="footerLeft">
          <div className="footerBrand">psyCool</div>
          <div className="footerMeta">© {new Date().getFullYear()} — Tous droits réservés</div>
        </div>

        <div className="footerLinks">
          <NavLink className="footerLink" to="/">Accueil</NavLink>
          <NavLink className="footerLink" to="/consultations">Consultations</NavLink>
          <NavLink className="footerLink" to="/conferences">Conférences</NavLink>
          <NavLink className="footerLink" to="/contact">Contact</NavLink>
        </div>

        <div className="footerRight">
          <a className="footerLink" href="tel:+33687216605">Téléphone</a>
          <a className="footerLink" href="mailto:chantalnovara@icloud.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
