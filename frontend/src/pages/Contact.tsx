import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Contact.css";

export default function Contact() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section className="contactPage" ref={revealRef}>
      <header className="contactHero">
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
            <div className="contactCardIcon" aria-hidden="true">📞</div>
            <h2 className="contactCardTitle">Téléphone</h2>
            <a className="contactCardValue" href="tel:+33687216605">
              06 87 21 66 05
            </a>
            <p className="contactCardNote">Du lundi au vendredi</p>
          </article>

          <article className="contactCard">
            <div className="contactCardIcon" aria-hidden="true">📍</div>
            <h2 className="contactCardTitle">Cabinet</h2>
            <address className="contactCardValue contactAddress">
           
              3 rue des genêts, 34970, Maurin
            </address>
          </article>
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
