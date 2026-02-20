import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="siteHeader">
      <div className="headerMain">
        <div className="headerBrand">
          <div className="brandName">Chantal NOVARA</div>
        </div>

        <nav className="headerNav" aria-label="Navigation principale">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
          >
            ACCEUIL
          </NavLink>

          <NavLink
            to="/consultations"
            className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
          >
            THERAPIE
          </NavLink>

          <NavLink
            to="/conferences"
            className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
          >
            ATELIERS/PSYCOOL
          </NavLink>

          <NavLink
            to="/english-therapy"
            className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
          >
            THERAPY (EN)
          </NavLink>
        </nav>

        <a className="headerContactCta" href="tel:+33687216605">
          Nous contacter
        </a>
      </div>
    </header>
  );
}
