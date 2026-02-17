import { NavLink } from "react-router-dom";

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
            className="footerLink whatsappLink"
            href="https://wa.me/33687216605"
            target="_blank"
            rel="noreferrer"
            aria-label="Contacter sur WhatsApp"
          >
            <svg className="whatsappIcon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
              <path d="M19.11 17.36c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.85 1.05-.15.18-.31.2-.58.07-.27-.14-1.13-.41-2.16-1.31-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.6-1.45-.82-1.99-.22-.52-.44-.45-.6-.46h-.51c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27s.97 2.64 1.1 2.82c.14.18 1.91 2.92 4.63 4.09.65.28 1.15.45 1.54.58.65.2 1.25.17 1.72.1.53-.08 1.58-.65 1.8-1.28.22-.63.22-1.17.15-1.28-.06-.11-.24-.18-.51-.31zM16.03 4C9.4 4 4 9.34 4 15.92c0 2.1.56 4.14 1.62 5.93L4 28l6.34-1.66a12.08 12.08 0 0 0 5.69 1.42h.01c6.62 0 12.02-5.34 12.02-11.92C28.06 9.34 22.66 4 16.03 4zm0 21.73h-.01a9.93 9.93 0 0 1-5.04-1.37l-.36-.21-3.76.99 1-3.67-.23-.37a9.78 9.78 0 0 1-1.52-5.18c0-5.47 4.5-9.92 10.03-9.92 2.68 0 5.2 1.03 7.09 2.9a9.8 9.8 0 0 1 2.94 7.02c0 5.47-4.5 9.92-10.14 9.92z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
