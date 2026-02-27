import { Link } from "react-router-dom";
import "./Consultations.css";
import { consultationStyles } from "./consultationStyles";
import { useScrollReveal } from "../hooks/useScrollReveal";
import therapyCardImage from "../../photos/canva1.png";

const orientationTips = [
  "Therapie individuelle: quand vous souhaitez travailler sur votre vecu personnel, vos emotions ou un blocage recurrent.",
  "Therapie de couple: quand le dialogue est difficile, les tensions repetitives ou la relation en perte d'equilibre.",
  "En cas de doute, le premier rendez-vous permet de clarifier l'orientation la plus utile.",
];

export default function Consultations() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section className="consultations" ref={revealRef}>
      <header className="consultationsHeader">
        <div className="consultationsHeaderInner">
          <h1 className="consultationsTitle" data-reveal data-reveal-delay="80ms">Consultations</h1>
          <p className="consultationsLead" data-reveal data-reveal-delay="160ms">
            Choisissez le type d'accompagnement qui correspond a votre situation.
            Les details complets sont disponibles sur chaque page de therapie.
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
              style={
                style.slug === "therapie-individuelle" || style.slug === "therapie-couple"
                  ? {
                      backgroundImage: `linear-gradient(rgba(231, 231, 231, 0.86), rgba(231, 231, 231, 0.86)), url(${therapyCardImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
            >
              <h2 className="consultationCardTitle">{style.title}</h2>
              <p className="consultationCardText">{style.shortDescription}</p>
              <Link className="consultationCardLink" to={`/consultations/${style.slug}`}>
                Decouvrir
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="consultationsSection" data-reveal data-reveal-delay="220ms">
        <h2 className="consultationsSubtitle">Comment choisir ?</h2>
        <ul className="consultationsList">
          {orientationTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>
    </section>
  );
}
