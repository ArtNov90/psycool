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
            ACCUEIL
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
            to="/teleconsultation"
            className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
          >
            TELECONSULTATION
          </NavLink>

          <NavLink
            to="/english-therapy"
            className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
          >
            THERAPY IN ENGLISH
          </NavLink>
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
