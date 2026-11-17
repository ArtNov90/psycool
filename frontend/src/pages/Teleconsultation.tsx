import { useScrollReveal } from "../hooks/useScrollReveal";
import Seo from "../components/Seo";
import "./Teleconsultation.css";

const keyBenefits = [
  {
    title: "Partout dans le monde",
    text: "Expatriés, zones rurales, déplacements fréquents : la distance n'est plus un obstacle.",
  },
  {
    title: "Même qualité thérapeutique",
    text: "Le travail clinique, l'écoute et le lien thérapeutique se construisent aussi en visio.",
  },
  {
    title: "Souplesse d'organisation",
    text: "Des créneaux adaptés à votre emploi du temps, y compris en décalage horaire.",
  },
  {
    title: "Confidentialité totale",
    text: "Vous consultez depuis un lieu de confiance, en toute discrétion.",
  },
];

const audienceCards = [
  {
    title: "Expatriés et francophones à l'étranger",
    text: "Exprimer ses émotions dans sa langue maternelle facilite le travail thérapeutique, où que vous viviez.",
  },
  {
    title: "Personnes éloignées des grandes villes",
    text: "Quand l'offre locale est limitée, la téléconsultation permet un suivi stable sans contrainte géographique.",
  },
  {
    title: "Besoin de discrétion",
    text: "La visio offre un cadre intime pour consulter sans exposition sociale inutile.",
  },
];

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

// Pictogrammes et couleurs pastel, dans l'ordre des avantages
const benefitVisuals = [
  {
    color: "var(--color-sky)",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
      </svg>
    ),
  },
  {
    color: "var(--color-peach)",
    icon: (
      <svg {...iconProps}>
        <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z" />
      </svg>
    ),
  },
  {
    color: "var(--color-sage)",
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
      </svg>
    ),
  },
  {
    color: "var(--color-wheat)",
    icon: (
      <svg {...iconProps}>
        <rect x="5" y="10.5" width="14" height="10" rx="2" />
        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      </svg>
    ),
  },
];

const audienceVisuals = [
  {
    color: "var(--color-sky)",
    icon: (
      <svg {...iconProps}>
        <path d="M21 15.5 13.5 11V5.5a1.5 1.5 0 0 0-3 0V11L3 15.5v2l7.5-2.3V19l-2 1.5V22l3.5-1 3.5 1v-1.5l-2-1.5v-3.8l7.5 2.3z" />
      </svg>
    ),
  },
  {
    color: "var(--color-sage)",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3 6 11h3l-4 6h14l-4-6h3z" />
        <path d="M12 17v4" />
      </svg>
    ),
  },
  {
    color: "var(--color-peach)",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3 5 6v5c0 4.4 3 8.3 7 10 4-1.7 7-5.6 7-10V6z" />
      </svg>
    ),
  },
];

const qualityVisuals = [
  {
    color: "var(--color-peach)",
    icon: (
      <svg {...iconProps}>
        <path d="M7 10a5 5 0 0 1 10 0c0 3-3 3.6-3 6.5a2.5 2.5 0 0 1-5 0" />
        <path d="M10 10a2 2 0 0 1 4 0" />
      </svg>
    ),
  },
  {
    color: "var(--color-sky)",
    icon: (
      <svg {...iconProps}>
        <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
        <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
      </svg>
    ),
  },
];

export default function Teleconsultation() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section className="telePage" ref={revealRef}>
      <Seo
        title="Téléconsultation avec une psychanalyste | Visio Chantal Novara"
        description="Consultations de psychanalyse en visioconférence, partout en France et à l'étranger. Idéal pour expatriés, zones rurales ou besoin de flexibilité, avec la même qualité thérapeutique qu'en cabinet."
        keywords={[
          "téléconsultation psychologue",
          "psy en ligne",
          "psychanalyste visio",
          "thérapie à distance",
          "consultation psy expatriés",
          "psychologue en ligne francophone",
          "séance psy WhatsApp",
          "thérapie visioconférence Montpellier",
        ]}
        path="/teleconsultation"
      />
      <header className="teleHero">
        <svg className="teleLeaf" viewBox="0 0 120 200" aria-hidden="true">
          <path d="M60 195 C 58 140, 52 80, 30 10" />
          <path d="M57 150 C 30 140, 18 120, 16 98 C 40 104, 54 124, 57 150 Z" />
          <path d="M55 115 C 80 104, 92 84, 94 62 C 70 70, 56 90, 55 115 Z" />
          <path d="M48 78 C 26 70, 16 50, 16 30 C 36 38, 46 56, 48 78 Z" />
        </svg>
        <div className="teleHeroInner">
          <p className="teleEyebrow" data-reveal data-reveal-delay="50ms">
            Consultation à distance
          </p>
          <h1 className="teleTitle" data-reveal data-reveal-delay="110ms">
            Téléconsultation avec une psy
          </h1>
          <div className="teleRule" aria-hidden="true" />
          <p className="teleLead" data-reveal data-reveal-delay="160ms">
            Bénéficiez d'un accompagnement thérapeutique de qualité, où que vous soyez, en
            visioconférence.
          </p>
          <a
            className="teleCta"
            href="https://wa.me/33687216605"
            target="_blank"
            rel="noreferrer"
            data-reveal
            data-reveal-delay="210ms"
          >
            Prendre rendez-vous
          </a>
        </div>
      </header>

      <section className="teleBenefits">
        <div className="teleBenefitsInner">
          {keyBenefits.map((item, index) => (
            <article
              className="teleBenefitCard"
              key={item.title}
              data-reveal
              data-reveal-delay={`${Math.min(280, 80 + index * 60)}ms`}
            >
              <span
                className="teleIcon"
                style={{ background: benefitVisuals[index % benefitVisuals.length].color }}
                aria-hidden="true"
              >
                {benefitVisuals[index % benefitVisuals.length].icon}
              </span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="teleAudience">
        <div className="teleContainer">
          <h2 className="teleSectionTitle teleSectionTitleCompact" data-reveal data-reveal-delay="80ms">
            À qui s'adresse la consultation en ligne ?
          </h2>
          <p className="teleSectionLead" data-reveal data-reveal-delay="130ms">
            À toute personne qui ressent le besoin d'une écoute thérapeutique : anxiété, épuisement,
            difficultés relationnelles, crises personnelles, troubles de l'humeur ou périodes de
            transition de vie.
          </p>

          <div className="teleAudienceList">
            {audienceCards.map((item, index) => (
              <article
                className="teleAudienceCard"
                key={item.title}
                data-reveal
                data-reveal-delay={`${Math.min(300, 140 + index * 70)}ms`}
              >
                <span
                  className="teleIcon teleIconSmall"
                  style={{ background: audienceVisuals[index % audienceVisuals.length].color }}
                  aria-hidden="true"
                >
                  {audienceVisuals[index % audienceVisuals.length].icon}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="teleQuality">
        <div className="teleQualityInner" data-reveal data-reveal-delay="80ms">
          <h2 className="teleSectionTitle teleSectionTitleCompact">La qualité d'une psychothérapie en ligne</h2>
          <p className="teleSectionLead">
            Le cadre change, mais l'essentiel reste le même : la qualité de présence, la régularité
            du suivi et la solidité de l'alliance thérapeutique.
          </p>
          <div className="teleQualityGrid">
            <article>
              <span className="teleIcon" style={{ background: qualityVisuals[0].color }} aria-hidden="true">
                {qualityVisuals[0].icon}
              </span>
              <h3>Une écoute renforcée</h3>
              <p>
                La visio favorise souvent une attention fine aux émotions, aux intonations et aux
                mots. Pour de nombreuses personnes, ce cadre facilite l'expression de soi.
              </p>
            </article>
            <article>
              <span className="teleIcon" style={{ background: qualityVisuals[1].color }} aria-hidden="true">
                {qualityVisuals[1].icon}
              </span>
              <h3>Le lien thérapeutique opère aussi à distance</h3>
              <p>
                L'accompagnement en ligne permet un travail en profondeur, comparable au présentiel,
                avec un cadre clair, confidentiel et continu dans le temps.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="teleBottomCta" data-reveal data-reveal-delay="120ms">
        <div className="teleBottomCtaInner">
          <h2>Prêt(e) à faire le premier pas ?</h2>
          <p>
            La première étape est souvent la plus difficile.
            <br />
            Je vous accompagne avec bienveillance.
          </p>
          <a
            href="https://wa.me/33687216605"
            className="teleBottomCtaButton"
            target="_blank"
            rel="noreferrer"
          >
            Prendre rendez-vous
          </a>
        </div>
      </section>
    </section>
  );
}
