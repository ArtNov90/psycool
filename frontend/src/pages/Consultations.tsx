import { Link } from "react-router-dom";
import "./Consultations.css";
import { consultationStyles } from "./consultationStyles";

export default function Consultations() {
  return (
    <section className="consultations">
      <header className="consultationsHeader">
        <div className="consultationsHeaderInner">
          <h1 className="consultationsTitle">Consultations</h1>
          <p className="consultationsLead">
            Prenez un moment pour decouvrir les types de consultations disponibles
            et comment se deroule un premier rendez-vous.
          </p>
        </div>
      </header>

      <section className="consultationsCardsWrap">
        <div className="consultationsCardsGrid">
          {consultationStyles.map((style) => (
            <article key={style.slug} className="consultationCard">
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
