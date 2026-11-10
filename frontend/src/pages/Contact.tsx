import { useScrollReveal } from "../hooks/useScrollReveal";
import Seo from "../components/Seo";
import "./Contact.css";

const iconProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function Contact() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section className="contactPage" ref={revealRef}>
      <Seo
        title="Contact | Chantal Novara, Psychanalyste à Maurin (Montpellier)"
        description="Prenez rendez-vous avec Chantal Novara, psychanalyste. Cabinet au 3 rue des genêts, 34970 Maurin, agglomération de Montpellier. Par téléphone, WhatsApp ou en téléconsultation."
        keywords={[
          "contact psychanalyste Montpellier",
          "prendre rendez-vous psychologue Maurin",
          "cabinet psychologue Lattes",
          "adresse psychanalyste Montpellier",
          "téléphone psychologue Montpellier",
          "psychanalyste Maurin 34970",
        ]}
        path="/contact"
      />
      <header className="contactHero">
        <svg className="contactLeaf" viewBox="0 0 120 200" aria-hidden="true">
          <path d="M60 195 C 58 140, 52 80, 30 10" />
          <path d="M57 150 C 30 140, 18 120, 16 98 C 40 104, 54 124, 57 150 Z" />
          <path d="M55 115 C 80 104, 92 84, 94 62 C 70 70, 56 90, 55 115 Z" />
          <path d="M48 78 C 26 70, 16 50, 16 30 C 36 38, 46 56, 48 78 Z" />
        </svg>
        <div className="contactHeroInner">
          <p className="contactEyebrow" data-reveal data-reveal-delay="50ms">
            Contact
          </p>
          <h1 className="contactTitle" data-reveal data-reveal-delay="110ms">
            Me contacter
          </h1>
          <p className="contactLead" data-reveal data-reveal-delay="160ms">
            N'hésitez pas à me contacter pour toute question ou pour prendre rendez-vous.
            Je serai heureuse de vous répondre dans les meilleurs délais.
          </p>
        </div>
      </header>

      <div className="contactBody">
        <div className="contactCards" data-reveal data-reveal-delay="200ms">
          <article className="contactCard">
            <div className="contactCardIcon" style={{ background: "var(--color-peach)" }} aria-hidden="true">
              <svg {...iconProps}>
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
              </svg>
            </div>
            <h2 className="contactCardTitle">Téléphone</h2>
            <a className="contactCardValue" href="tel:+33687216605">
              06 87 21 66 05
            </a>
            <p className="contactCardNote">Du lundi au vendredi</p>
          </article>

          <article className="contactCard">
            <div className="contactCardIcon" style={{ background: "var(--color-sage)" }} aria-hidden="true">
              <svg {...iconProps}>
                <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
            </div>
            <h2 className="contactCardTitle">Cabinet</h2>
            <address className="contactCardValue contactAddress">
              3 rue des genêts, 34970, Maurin
            </address>
            <a
              className="contactCardLink"
              href="https://www.google.com/maps/search/?api=1&query=3+rue+des+gen%C3%AAts+34970+Lattes"
              target="_blank"
              rel="noreferrer"
            >
              Itinéraire <span aria-hidden="true">→</span>
            </a>
          </article>
        </div>

        <div className="contactMap" data-reveal data-reveal-delay="240ms">
          <iframe
            title="Plan d'accès au cabinet, 3 rue des genêts à Maurin (Lattes)"
            src="https://www.google.com/maps?q=3+rue+des+gen%C3%AAts,+34970+Lattes&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="contactCta" data-reveal data-reveal-delay="280ms">
          <p className="contactCtaText">
            Vous pouvez également me contacter directement via WhatsApp pour prendre rendez-vous.
          </p>
          <a
            className="contactCtaBtn"
            href="https://wa.me/33687216605"
            target="_blank"
            rel="noreferrer"
          >
            Prendre rendez-vous sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
