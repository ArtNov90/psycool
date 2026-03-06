import { useScrollReveal } from "../hooks/useScrollReveal";
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

export default function Teleconsultation() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section className="telePage" ref={revealRef}>
      <header className="teleHero">
        <div className="teleHeroInner">
          <p className="teleEyebrow" data-reveal data-reveal-delay="50ms">
            Consultation à distance
          </p>
          <h1 className="teleTitle" data-reveal data-reveal-delay="110ms">
            Téléconsultation avec une psy
          </h1>
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
              <h3>Une écoute renforcée</h3>
              <p>
                La visio favorise souvent une attention fine aux émotions, aux intonations et aux
                mots. Pour de nombreuses personnes, ce cadre facilite l'expression de soi.
              </p>
            </article>
            <article>
              <h3>Le lien thérapeutique opère aussi à distance</h3>
              <p>
                L'accompagnement en ligne permet un travail en profondeur, comparable au présentiel,
                avec un cadre clair, confidentiel et continu dans le temps.
              </p>
            </article>
          </div>
        </div>
      </section>
    </section>
  );
}
