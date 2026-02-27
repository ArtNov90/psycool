import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { consultationStyles } from "./consultationStyles";
import "./ConsultationDetail.css";
import therapyImage from "../../photos/canva1.png";
import homeHeroImage from "../../photos/yumu-wIG0Hhre7Ms-unsplash.jpg";
import parcoursImage from "../../photos/chemin.png";
import { useScrollReveal } from "../hooks/useScrollReveal";

type FaqItem = {
  question: string;
  answer: string;
};

type PracticalInfo = {
  label: string;
  value: string;
};

const individualTherapyCards = [
  {
    image: homeHeroImage,
    alt: "Bac a sable symbolisant l'espace therapeutique",
    title: "Un espace personnel pour apaiser l'anxiete et retrouver de la clarte",
  },
  {
    image: therapyImage,
    alt: "Fauteuil de therapie dans un cabinet",
    title: "Un cadre d'ecoute bienveillant, a votre rythme, en toute confidentialite",
  },
  {
    image: parcoursImage,
    alt: "Illustration symbolique du cheminement interieur",
    title: "Un accompagnement concret pour avancer durablement dans votre vie",
  },
];

const individualAudience = [
  "Anxiete, stress, surcharge mentale ou fatigue emotionnelle.",
  "Periode de transition: separation, deuil, changement professionnel ou personnel.",
  "Perte de confiance, sentiment de blocage ou difficultes relationnelles.",
  "Besoin de mieux se comprendre et de retrouver un equilibre plus stable.",
];

const individualWork = [
  "Identifier les mecanismes repetitifs qui entretiennent la souffrance.",
  "Mettre des mots clairs sur ce que vous traversez et vos besoins.",
  "Developper des reperes concrets pour reguler les emotions au quotidien.",
  "Retrouver une capacite de choix et d'action dans votre vie personnelle.",
];

const individualSteps = [
  "Premier contact pour comprendre votre demande et verifier si ce cadre vous convient.",
  "Premiere seance d'exploration de votre situation, de vos attentes et de vos objectifs.",
  "Suivi regulier a un rythme adapte, avec un travail progressif et structure.",
  "Points d'etape pour evaluer les changements et ajuster l'accompagnement.",
];

const individualPractical: PracticalInfo[] = [
  { label: "Duree d'une seance", value: "Environ 50 minutes" },
  { label: "Rythme", value: "Hebdomadaire ou bimensuel selon le besoin" },
  { label: "Format", value: "Cabinet et visio" },
  { label: "Tarif", value: "Precise lors du premier echange" },
];

const individualFaq: FaqItem[] = [
  {
    question: "Combien de temps dure une therapie individuelle ?",
    answer:
      "La duree varie selon votre situation et vos objectifs. Certaines demandes se travaillent en quelques mois, d'autres necessitent un accompagnement plus long.",
  },
  {
    question: "Dois-je avoir un probleme grave pour consulter ?",
    answer:
      "Non. Beaucoup de personnes consultent pour mieux se comprendre, prevenir l'epuisement ou sortir d'un mal-etre installe.",
  },
  {
    question: "Puis-je alterner presentiel et visio ?",
    answer:
      "Oui, ce format hybride peut etre mis en place selon vos contraintes et ce qui soutient le mieux la continuite du travail.",
  },
];

const coupleAudience = [
  "Conflits repetitifs qui tournent en boucle.",
  "Communication difficile, distance emotionnelle, incomprehensions.",
  "Crise liee a une infidelite, un changement de vie ou une perte de confiance.",
  "Volonte de clarifier la relation avant une decision importante.",
];

const coupleWork = [
  "Retablir un dialogue plus securisant pour les deux partenaires.",
  "Comprendre les dynamiques qui alimentent les tensions.",
  "Exprimer les besoins sans accusation ni evitemment.",
  "Construire des accords concrets pour avancer, ensemble ou separement.",
];

const coupleSteps = [
  "Entretien initial pour cadrer la demande et les attentes de chacun.",
  "Seances centrees sur les interactions, avec mediations du dialogue.",
  "Travail sur les points de blocage et les ajustements relationnels.",
  "Bilan regulier pour mesurer l'evolution et definir la suite.",
];

const couplePractical: PracticalInfo[] = [
  { label: "Duree d'une seance", value: "60 a 75 minutes" },
  { label: "Rythme", value: "En general toutes les 2 semaines" },
  { label: "Participants", value: "Les deux partenaires, avec adaptation possible" },
  { label: "Tarif", value: "Precise lors du premier echange" },
];

const coupleFaq: FaqItem[] = [
  {
    question: "Faut-il etre maries pour consulter ?",
    answer:
      "Non. La therapie de couple concerne toute relation affective engagee, quel que soit le statut du couple.",
  },
  {
    question: "Peut-on venir si l'un des deux hesite ?",
    answer:
      "Oui, tant qu'il existe un minimum d'accord pour essayer un espace de dialogue accompagne.",
  },
  {
    question: "Peut-on consulter si une separation est envisagee ?",
    answer:
      "Oui. Le travail peut aider a clarifier la decision et, si besoin, a organiser une separation plus apaisee.",
  },
];

function TherapyBlocks({
  title,
  list,
  dataRevealDelay,
}: {
  title: string;
  list: string[];
  dataRevealDelay: string;
}) {
  return (
    <article className="therapyPanel" data-reveal data-reveal-delay={dataRevealDelay}>
      <h2 className="therapyPanelTitle">{title}</h2>
      <ul className="therapyPanelList">
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function PracticalGrid({
  title,
  items,
  dataRevealDelay,
}: {
  title: string;
  items: PracticalInfo[];
  dataRevealDelay: string;
}) {
  return (
    <article className="therapyPanel" data-reveal data-reveal-delay={dataRevealDelay}>
      <h2 className="therapyPanelTitle">{title}</h2>
      <div className="therapyPracticalGrid">
        {items.map((item) => (
          <div className="therapyPracticalItem" key={item.label}>
            <p className="therapyPracticalLabel">{item.label}</p>
            <p className="therapyPracticalValue">{item.value}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function FaqBlock({
  title,
  items,
  openIndex,
  onToggle,
}: {
  title: string;
  items: FaqItem[];
  openIndex: number | null;
  onToggle: (index: number) => void;
}) {
  return (
    <article className="therapyPanel" data-reveal data-reveal-delay="260ms">
      <h2 className="therapyPanelTitle">{title}</h2>
      <div className="therapyFaqWrap">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <section className="individualFaqItem" key={item.question}>
              <button
                type="button"
                className="individualFaqButton"
                onClick={() => onToggle(index)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span className="individualFaqSign">{isOpen ? "-" : "+"}</span>
              </button>
              {isOpen ? <p className="individualFaqAnswer">{item.answer}</p> : null}
            </section>
          );
        })}
      </div>
    </article>
  );
}

export default function ConsultationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const style = consultationStyles.find((item) => item.slug === slug);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const revealRef = useScrollReveal<HTMLElement>();

  if (!style) {
    return <Navigate to="/consultations" replace />;
  }

  if (slug === "therapie-individuelle") {
    return (
      <section className="consultationDetail consultationDetailNoBg individualTherapyPage" ref={revealRef}>
        <div className="individualTherapyShell">
          <header className="individualTherapyHeader">
            <h1 className="individualTherapyTitle" data-reveal data-reveal-delay="60ms">
              Therapie individuelle
            </h1>
            <p className="individualTherapyLead" data-reveal data-reveal-delay="120ms">
              Un accompagnement personnalise pour traverser une periode difficile et retrouver de la stabilite.
            </p>
          </header>

          <section className="individualTherapyGallery">
            {individualTherapyCards.map((card, index) => (
              <article
                className="individualTherapyCard"
                key={card.title}
                data-reveal
                data-reveal-delay={`${80 + index * 80}ms`}
              >
                <div className="individualTherapyMedia">
                  <img src={card.image} alt={card.alt} loading={index === 0 ? "eager" : "lazy"} />
                </div>
                <h2>{card.title}</h2>
              </article>
            ))}
          </section>

          <section className="therapyDetailStack">
            <TherapyBlocks title="Pour qui ?" list={individualAudience} dataRevealDelay="120ms" />
            <TherapyBlocks title="Ce que nous travaillons ensemble" list={individualWork} dataRevealDelay="170ms" />
            <TherapyBlocks title="Deroule de l'accompagnement" list={individualSteps} dataRevealDelay="220ms" />
            <PracticalGrid title="Infos pratiques" items={individualPractical} dataRevealDelay="240ms" />
            <FaqBlock
              title="Questions frequentes"
              items={individualFaq}
              openIndex={openIndex}
              onToggle={(index) => setOpenIndex(openIndex === index ? null : index)}
            />
          </section>

          <div className="consultationDetailActions individualTherapyActions" data-reveal data-reveal-delay="300ms">
            <a className="consultationDetailButton" href="mailto:contact@exemple.fr">
              Prendre rendez-vous
            </a>
            <Link className="consultationDetailGhost" to="/consultations">
              Retour aux consultations
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (slug === "therapie-couple") {
    return (
      <section className="consultationDetail consultationDetailAlt" ref={revealRef}>
        <section className="individualIntro">
          <div className="individualIntroInner">
            <div className="individualVisualCol">
              <h1 className="individualMainTitle" data-reveal data-reveal-delay="80ms">Therapie de couple</h1>
              <div
                className="individualRoundVisual"
                style={{ backgroundImage: `url(${therapyImage})` }}
                data-reveal
                data-reveal-delay="140ms"
              />
            </div>

            <div className="individualTextCol" data-reveal data-reveal-delay="200ms">
              <p>
                Un espace neutre pour retablir le dialogue, comprendre les tensions et retrouver une dynamique plus saine.
              </p>
              <p>
                L'objectif n'est pas de designer un responsable, mais d'aider chacun a reprendre sa place dans la relation.
              </p>
            </div>
          </div>
        </section>

        <section className="individualFaqWrap">
          <div className="individualFaqInner therapyDetailStack therapyDetailNarrow">
            <TherapyBlocks title="Quand consulter ?" list={coupleAudience} dataRevealDelay="110ms" />
            <TherapyBlocks title="Objectifs de la therapie" list={coupleWork} dataRevealDelay="160ms" />
            <TherapyBlocks title="Deroule des seances" list={coupleSteps} dataRevealDelay="210ms" />
            <PracticalGrid title="Infos pratiques" items={couplePractical} dataRevealDelay="240ms" />
            <FaqBlock
              title="Questions frequentes"
              items={coupleFaq}
              openIndex={openIndex}
              onToggle={(index) => setOpenIndex(openIndex === index ? null : index)}
            />

            <div className="consultationDetailActions" data-reveal data-reveal-delay="300ms">
              <a className="consultationDetailButton" href="mailto:contact@exemple.fr">
                Prendre rendez-vous
              </a>
              <Link className="consultationDetailGhost" to="/consultations">
                Retour aux consultations
              </Link>
            </div>
          </div>
        </section>
      </section>
    );
  }

  return (
    <section
      className={`consultationDetail${slug === "therapie-individuelle" ? " consultationDetailNoBg" : ""}`}
      ref={revealRef}
    >
      <header
        className="consultationDetailHero"
        style={{
          backgroundImage: `linear-gradient(108deg, rgba(19, 24, 36, 0.45) 0%, rgba(19, 24, 36, 0.18) 100%), url(${therapyImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="consultationDetailHeroInner">
          <p className="consultationDetailEyebrow" data-reveal data-reveal-delay="60ms">Style de therapie</p>
          <h1 className="consultationDetailTitle" data-reveal data-reveal-delay="120ms">{style.title}</h1>
          <p className="consultationDetailIntro" data-reveal data-reveal-delay="180ms">{style.intro}</p>
        </div>
      </header>

      <section className="consultationDetailBody">
        <div className="consultationDetailCard" data-reveal data-reveal-delay="100ms">
          <h2>Ce que nous travaillons ensemble</h2>
          <ul>
            {style.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="consultationDetailActions">
            <a className="consultationDetailButton" href="mailto:contact@exemple.fr">
              Prendre rendez-vous
            </a>
            <Link className="consultationDetailGhost" to="/consultations">
              Retour aux consultations
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
