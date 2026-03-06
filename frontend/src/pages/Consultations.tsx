import { Link } from "react-router-dom";
import "./Consultations.css";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { consultationStyles } from "./consultationStyles";
import accompagnementImage from "../../photos/canva1.png";

const faqItems = [
  {
    question: "Quand consulter un psy ?",
    answer:
      "Consultez si vous traversez une période difficile (deuil, séparation, perte d'emploi), si une souffrance persiste (anxiété, tristesse, irritabilité), ou si des schémas répétitifs vous bloquent. Il n'est pas nécessaire d'attendre une crise.",
  },
  {
    question: "Comment se déroule une première consultation ?",
    answer:
      "La première consultation sert à faire connaissance et à clarifier ce qui vous amène. Nous évaluons ensemble vos besoins et si ma méthode vous convient. Il n'y a aucune obligation d'engagement.",
  },
  {
    question: "Les consultations en visio sont-elles efficaces ?",
    answer:
      "Oui. Les études et mon expérience de plus de 10 ans en visioconférence montrent une efficacité comparable au présentiel dans la majorité des situations, avec plus de flexibilité.",
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
            Deux façons de me consulter
          </h1>
          <p className="consultationsLead" data-reveal data-reveal-delay="160ms">
            Choisissez le type d&apos;accompagnement qui correspond à votre situation.
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
                  Découvrir <span aria-hidden="true">{"->"}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="consultationsFaq" data-reveal data-reveal-delay="120ms">
        <p className="consultationsFaqEyebrow">QUESTIONS FRÉQUENTES</p>
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
        <h2>Prêt(e) à faire le premier pas ?</h2>
        <p>La première étape est souvent la plus difficile. Je vous accompagne avec bienveillance.</p>
        <a href="tel:+33687216605" className="consultationsCtaButton">
          Prendre rendez-vous
        </a>
      </section>
    </section>
  );
}
