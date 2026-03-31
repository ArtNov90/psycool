import { Link } from "react-router-dom";
import "./Consultations.css";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { consultationStyles } from "./consultationStyles";
import accompagnementImage from "../../photos/canva1.png";

const faqItems = [
  {
    question: "Quand consulter un psy ?",
    answer:
      "Consultez si vous traversez une periode difficile (deuil, separation, perte d'emploi), si une souffrance persiste (anxiete, tristesse, irritabilite), ou si des schemas repetitifs vous bloquent. Il n'est pas necessaire d'attendre une crise.",
  },
  {
    question: "Comment se deroule une premiere consultation ?",
    answer:
      "La premiere consultation sert a faire connaissance et a clarifier ce qui vous amene. Nous evaluons ensemble vos besoins et si ma methode vous convient. Il n'y a aucune obligation d'engagement.",
  },
  {
    question: "Les consultations en visio sont-elles efficaces ?",
    answer:
      "Oui. Les etudes et mon experience de plus de 10 ans en visioconference montrent une efficacite comparable au presentiel dans la majorite des situations, avec plus de flexibilite.",
  },
];

export default function Consultations() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section className="consultations" ref={revealRef}>
      <header className="consultationsHeader">
        <div className="consultationsHeaderInner">
          <p className="consultationsEyebrow" data-reveal data-reveal-delay="70ms">
            CONSULTATIONS
          </p>
          <h1 className="consultationsTitle" data-reveal data-reveal-delay="110ms">
            Deux facons de me consulter
          </h1>
          <p className="consultationsLead" data-reveal data-reveal-delay="160ms">
            Choisissez le type d&apos;accompagnement qui correspond a votre situation.
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
              <img src={accompagnementImage} alt="" loading="lazy" />
              <div className="consultationCardBody">
                <h2 className="consultationCardTitle">{style.title}</h2>
                <p className="consultationCardText">{style.shortDescription}</p>
                <Link className="consultationCardLink" to={`/consultations/${style.slug}`}>
                  Decouvrir <span aria-hidden="true">{"->"}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="consultationsFaq" data-reveal data-reveal-delay="120ms">
        <p className="consultationsFaqEyebrow">QUESTIONS FREQUENTES</p>
        <h2 className="consultationsFaqTitle">Avant de consulter</h2>
        <div className="consultationsFaqList">
          {faqItems.map((item) => (
            <article key={item.question} className="consultationsFaqItem">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="consultationsCta" data-reveal data-reveal-delay="140ms">
        <h2>Pret(e) a faire le premier pas ?</h2>
        <p>La premiere etape est souvent la plus difficile. Je vous accompagne avec bienveillance.</p>
        <a
          href="https://wa.me/33687216605"
          className="consultationsCtaButton"
          target="_blank"
          rel="noreferrer"
        >
          Prendre rendez-vous
        </a>
      </section>
    </section>
  );
}
