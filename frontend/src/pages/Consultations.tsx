import { Link } from "react-router-dom";
import "./Consultations.css";
import { consultationStyles } from "./consultationStyles";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Consultations() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section className="consultations" ref={revealRef}>
      <header className="consultationsHeader">
        <div className="consultationsHeaderInner">
          <h1 className="consultationsTitle" data-reveal data-reveal-delay="80ms">Consultations</h1>
          <p className="consultationsLead" data-reveal data-reveal-delay="160ms">
            Prenez un moment pour decouvrir les types de consultations disponibles
            et comment se deroule un premier rendez-vous.
          </p>
        </div>
      </header>

      <section className="consultationsCardsWrap">
        <div className="consultationsCardsGrid">
          {consultationStyles.map((style, index) => (
            <article
              key={style.slug}
              className="consultationCard"
              data-reveal
              data-reveal-delay={`${Math.min(320, 80 + index * 80)}ms`}
            >
              <h2 className="consultationCardTitle">{style.title}</h2>
              <p className="consultationCardText">{style.shortDescription}</p>
              <Link className="consultationCardLink" to={`/consultations/${style.slug}`}>
                Voir plus
              </Link>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
