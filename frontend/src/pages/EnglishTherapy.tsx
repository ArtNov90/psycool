import { useScrollReveal } from "../hooks/useScrollReveal";
import "./EnglishTherapy.css";

export default function EnglishTherapy() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section className="englishTherapyPage" ref={revealRef}>
      <header className="englishTherapyHero">
        <div className="englishTherapyHeroInner">
          <p className="englishTherapyEyebrow" data-reveal data-reveal-delay="60ms">
            English Speaking Therapy
          </p>
          <h1 className="englishTherapyTitle" data-reveal data-reveal-delay="120ms">
            Therapy in English
          </h1>
          <p className="englishTherapyLead" data-reveal data-reveal-delay="180ms">
            Individual and couple therapy sessions in English, online or in person near Montpellier.
          </p>
        </div>
      </header>

      <section className="englishTherapyBody">
        <article className="englishTherapyCard" data-reveal data-reveal-delay="80ms">
          <h2>What You Can Expect</h2>
          <ul>
            <li>Confidential and supportive sessions in fluent English.</li>
            <li>A calm space to work through anxiety, relationship issues, and life transitions.</li>
            <li>Online appointments available for people living abroad.</li>
            <li>Flexible follow-up rhythm adapted to your needs.</li>
          </ul>
        </article>

        <article className="englishTherapyCard" data-reveal data-reveal-delay="140ms">
          <h2>Booking</h2>
          <p>
            To schedule a first appointment, call directly or send an email. You can briefly explain your
            situation and preferred format (online or in-person).
          </p>
          <div className="englishTherapyActions">
            <a className="englishTherapyBtn" href="tel:+33687216605">
              Call now
            </a>
            <a className="englishTherapyBtn englishTherapyBtnGhost" href="mailto:chantalnovara@icloud.com">
              Send an email
            </a>
          </div>
        </article>
      </section>
    </section>
  );
}

