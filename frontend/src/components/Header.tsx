import { Link, NavLink } from "react-router-dom";
import { navItems } from "./navItems";
import UkFlag from "./UkFlag";

export default function Header() {
  return (
    <header className="siteHeader">
      <div className="headerMain">
        <Link to="/" className="headerBrand" aria-label="Accueil - Chantal Novara">
          <span className="brandName">
            Chantal <span>NOVARA</span>
          </span>
          <span className="brandRole">PSYCHANALYSTE</span>
        </Link>

        <nav className="headerNav" aria-label="Navigation principale">
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

        <a
          className="headerContactCta"
          href="https://wa.me/33687216605"
          target="_blank"
          rel="noreferrer"
        >
          Prendre rendez-vous
        </a>
      </div>
    </header>
  );
}
