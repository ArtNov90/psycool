import { NavLink } from "react-router-dom";


export default function Header() {
  return (
    <header className="siteHeader">
      <div className="headerTop">
        <div className="headerTopInner">
          <a className="headerTopLink" href="tel:+33687216605">
            +33 (0)6 87 21 66 05
          </a>
          <span className="headerSep">|</span>
          <a className="headerTopLink" href="mailto:chantalnovara@icloud.com">
            chantalnovara@icloud.com
          </a>
        </div>
      </div>

      <div className="headerBrand">
        <div className="headerBrandInner">
          <div className="brandName">Chantal NOVARA</div>
        </div>
      </div>

      <nav className="headerNav">
        <div className="headerNavInner">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
            Accueil
          </NavLink>

          <NavLink to="/consultations" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
            Consultations
          </NavLink>

          <NavLink to="/conferences" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
            Conférences
          </NavLink>

          <NavLink to="/contact" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
            Contact
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
