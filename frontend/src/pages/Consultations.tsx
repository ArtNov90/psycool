import { Link } from "react-router-dom";
import "./Consultations.css";
import Seo from "../components/Seo";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { consultationStyles } from "./consultationStyles";

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

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Habillage visuel de chaque accompagnement (les textes viennent de consultationStyles)
const offerVisuals = {
  "therapie-individuelle": {
    background: "var(--color-sage)",
    keywords: ["Traverser", "Comprendre", "Se libérer"],
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
      </svg>
    ),
  },
  "therapie-couple": {
    background: "var(--color-peach)",
    keywords: ["Retrouver le dialogue", "Apaiser les conflits", "Réinventer la relation"],
    icon: (
      <svg {...iconProps}>
        <circle cx="8.5" cy="8" r="3.2" />
        <circle cx="15.5" cy="8" r="3.2" />
        <path d="M2.5 20c0-3.6 2.7-6 6-6 1.4 0 2.6.4 3.5 1.1" />
        <path d="M21.5 20c0-3.6-2.7-6-6-6-1.4 0-2.6.4-3.5 1.1" />
      </svg>
    ),
  },
};

const steps = [
  {
    title: "Un premier échange",
    text: "Pour faire connaissance et clarifier ce qui vous amène, sans aucune obligation d'engagement.",
  },
  {
    title: "Au cabinet ou en visio",
    text: "À Maurin (Lattes), aux portes de Montpellier, ou en ligne par WhatsApp et Google Meet.",
  },
  {
    title: "À votre rythme",
    text: "Un espace de parole centré sur votre histoire, votre rythme et vos besoins.",
  },
];

export default function Consultations() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section className="consultations" ref={revealRef}>
      <Seo
        title="Consultations de psychanalyse à Montpellier | Cabinet & visio"
        description="Deux façons de consulter Chantal Novara, psychanalyste à Montpellier : en cabinet à Maurin (Lattes) ou en téléconsultation. Thérapie individuelle et thérapie de couple, premier échange sans engagement."
        keywords={[
          "consultation psychanalyste Montpellier",
          "thérapie individuelle",
          "thérapie de couple",
          "premier rendez-vous psychologue",
          "psychanalyste cabinet Montpellier",
          "consultation visio psychologue",
          "psy Maurin",
          "psychologue Lattes",
        ]}
        path="/consultations"
      />

      <header className="consultationsHeader">
        <svg className="consultationsLeaf" viewBox="0 0 120 200" aria-hidden="true">
          <path d="M60 195 C 58 140, 52 80, 30 10" />
          <path d="M57 150 C 30 140, 18 120, 16 98 C 40 104, 54 124, 57 150 Z" />
          <path d="M55 115 C 80 104, 92 84, 94 62 C 70 70, 56 90, 55 115 Z" />
          <path d="M48 78 C 26 70, 16 50, 16 30 C 36 38, 46 56, 48 78 Z" />
        </svg>
        <p className="consultationsEyebrow" data-reveal data-reveal-delay="70ms">
          THÉRAPIE
        </p>
        <h1 className="consultationsTitle" data-reveal data-reveal-delay="110ms">
          Deux façons de me consulter
        </h1>
        <div className="consultationsRule" aria-hidden="true" />
        <p className="consultationsLead" data-reveal data-reveal-delay="160ms">
          Choisissez l&apos;accompagnement qui vous correspond
        </p>
      </header>

      <div className="consultationsPanels">
        {consultationStyles.map((style, index) => {
          const visual = offerVisuals[style.slug];
          return (
            <article
              key={style.slug}
              className="consultationsPanel"
              style={{ background: visual.background }}
              data-reveal
              data-reveal-delay={`${100 + index * 100}ms`}
            >
              <span className="consultationsPanelIcon" aria-hidden="true">
                {visual.icon}
              </span>
              <h2 className="consultationsPanelTitle">{style.title}</h2>
              <div className="consultationsPanelRule" aria-hidden="true" />
              <p className="consultationsPanelText">{style.intro}</p>
              <ul className="consultationsPanelKeywords">
                {visual.keywords.map((word) => (
                  <li key={word}>{word}</li>
                ))}
              </ul>
              <Link className="consultationsPanelLink" to={`/consultations/${style.slug}`}>
                Découvrir <span aria-hidden="true">→</span>
              </Link>
            </article>
          );
        })}
      </div>

      <section className="consultationsSteps">
        <p className="consultationsEyebrow" data-reveal>
          COMMENT ÇA SE PASSE
        </p>
        <h2 className="consultationsSectionTitle" data-reveal data-reveal-delay="60ms">
          Un accompagnement en douceur
        </h2>
        <ol className="consultationsStepsList">
          {steps.map((step, index) => (
            <li key={step.title} data-reveal data-reveal-delay={`${100 + index * 80}ms`}>
              <span className="consultationsStepNumber">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="consultationsFaq" data-reveal>
        <p className="consultationsEyebrow">QUESTIONS FRÉQUENTES</p>
        <h2 className="consultationsSectionTitle">Avant de consulter</h2>
        <div className="consultationsFaqList">
          {faqItems.map((item, index) => (
            <details key={item.question} className="consultationsFaqItem" open={index === 0}>
              <summary>
                <h3>{item.question}</h3>
                <span className="consultationsFaqToggle" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="consultationsCta" data-reveal>
        <p className="consultationsCtaScript">La première étape est souvent la plus difficile</p>
        <h2>Prêt(e) à faire le premier pas ?</h2>
        <p>Je vous accompagne avec bienveillance, au cabinet ou en visio.</p>
        <div className="consultationsCtaActions">
          <a
            href="https://wa.me/33687216605"
            className="consultationsCtaButton"
            target="_blank"
            rel="noreferrer"
          >
            Prendre rendez-vous
          </a>
          <a href="tel:+33687216605" className="consultationsCtaPhone">
            06 87 21 66 05
          </a>
        </div>
      </section>
    </section>
  );
}
