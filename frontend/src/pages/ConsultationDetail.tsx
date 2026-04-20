import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { consultationStyles } from "./consultationStyles";
import "./ConsultationDetail.css";
import therapyImage from "../../photos/canva1.png";
import coupleTherapyImage from "../../photos/psicoterapia-psicopsycouple.jpg";
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
    alt: "Bac à sable symbolisant l'espace thérapeutique",
    title: "Un espace personnel pour apaiser l'anxiété et retrouver de la clarté",
  },
  {
    image: therapyImage,
    alt: "Fauteuil de thérapie dans un cabinet",
    title: "Un cadre d'écoute bienveillant, à votre rythme, en toute confidentialité",
  },
  {
    image: parcoursImage,
    alt: "Illustration symbolique du cheminement intérieur",
    title: "Un accompagnement concret pour avancer durablement dans votre vie",
  },
];

const individualAudience = [
  "Anxiété, stress, surcharge mentale ou fatigue émotionnelle.",
  "Période de transition: séparation, deuil, changement professionnel ou personnel.",
  "Perte de confiance, sentiment de blocage ou difficultés relationnelles.",
  "Besoin de mieux se comprendre et de retrouver un équilibre plus stable.",
];

const individualWork = [
  "Identifier les mécanismes répétitifs qui entretiennent la souffrance.",
  "Mettre des mots clairs sur ce que vous traversez et vos besoins.",
  "Développer des repères concrets pour réguler les émotions au quotidien.",
  "Retrouver une capacité de choix et d'action dans votre vie personnelle.",
];

const individualSteps = [
  "Premier contact pour comprendre votre demande et vérifier si ce cadre vous convient.",
  "Première séance d'exploration de votre situation, de vos attentes et de vos objectifs.",
  "Suivi régulier à un rythme adapté, avec un travail progressif et structuré.",
  "Points d'étape pour évaluer les changements et ajuster l'accompagnement.",
];

const individualPractical: PracticalInfo[] = [
  { label: "Durée d'une séance", value: "Environ 50 minutes" },
  { label: "Rythme", value: "Hebdomadaire ou bimensuel selon le besoin" },
  { label: "Format", value: "Cabinet et visio" },
  { label: "Tarif", value: "Précisé lors du premier échange" },
];

const individualFaq: FaqItem[] = [
  {
    question: "Combien de temps dure une thérapie individuelle ?",
    answer:
      "La durée varie selon votre situation et vos objectifs. Certaines demandes se travaillent en quelques mois, d'autres nécessitent un accompagnement plus long.",
  },
  {
    question: "Dois-je avoir un problème grave pour consulter ?",
    answer:
      "Non. Beaucoup de personnes consultent pour mieux se comprendre, prévenir l'épuisement ou sortir d'un mal-être installé.",
  },
  {
    question: "Puis-je alterner présentiel et visio ?",
    answer:
      "Oui, ce format hybride peut être mis en place selon vos contraintes et ce qui soutient le mieux la continuité du travail.",
  },
];

const coupleAudience = [
  "Conflits répétitifs qui tournent en boucle.",
  "Communication difficile, distance émotionnelle, incompréhensions.",
  "Crise liée à une infidélité, un changement de vie ou une perte de confiance.",
  "Volonté de clarifier la relation avant une décision importante.",
];

const coupleWork = [
  "Rétablir un dialogue plus sécurisant pour les deux partenaires.",
  "Comprendre les dynamiques qui alimentent les tensions.",
  "Exprimer les besoins sans accusation ni évitement.",
  "Construire des accords concrets pour avancer, ensemble ou séparément.",
];

const coupleSteps = [
  "Entretien initial pour cadrer la demande et les attentes de chacun.",
  "Séances centrées sur les interactions, avec médiation du dialogue.",
  "Travail sur les points de blocage et les ajustements relationnels.",
  "Bilan régulier pour mesurer l'évolution et définir la suite.",
];

const couplePractical: PracticalInfo[] = [
  { label: "Durée d'une séance", value: "60 à 75 minutes" },
  { label: "Rythme", value: "En général toutes les 2 semaines" },
  { label: "Participants", value: "Les deux partenaires, avec adaptation possible" },
  { label: "Tarif", value: "Précisé lors du premier échange" },
];

const coupleFaq: FaqItem[] = [
  {
    question: "Faut-il être mariés pour consulter ?",
    answer:
      "Non. La thérapie de couple concerne toute relation affective engagée, quel que soit le statut du couple.",
  },
  {
    question: "Peut-on venir si l'un des deux hésite ?",
    answer:
      "Oui, tant qu'il existe un minimum d'accord pour essayer un espace de dialogue accompagné.",
  },
  {
    question: "Peut-on consulter si une séparation est envisagée ?",
    answer:
      "Oui. Le travail peut aider à clarifier la décision et, si besoin, à organiser une séparation plus apaisée.",
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
              Thérapie individuelle
            </h1>
            <p className="individualTherapyLead" data-reveal data-reveal-delay="120ms">
              Un accompagnement personnalisé pour traverser une période difficile et retrouver de la stabilité.
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
            <TherapyBlocks title="Déroulé de l'accompagnement" list={individualSteps} dataRevealDelay="220ms" />
            <PracticalGrid title="Infos pratiques" items={individualPractical} dataRevealDelay="240ms" />
            <FaqBlock
              title="Questions fréquentes"
              items={individualFaq}
              openIndex={openIndex}
              onToggle={(index) => setOpenIndex(openIndex === index ? null : index)}
            />
          </section>

          <div className="consultationDetailActions individualTherapyActions" data-reveal data-reveal-delay="300ms">
            <a
              className="consultationDetailButton"
              href="https://wa.me/33687216605"
              target="_blank"
              rel="noreferrer"
            >
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
              <h1 className="individualMainTitle" data-reveal data-reveal-delay="80ms">Thérapie de couple</h1>
              <div
                className="individualRoundVisual"
                style={{ backgroundImage: `url(${coupleTherapyImage})` }}
                data-reveal
                data-reveal-delay="140ms"
              />
            </div>

            <div className="individualTextCol" data-reveal data-reveal-delay="200ms">
              <p>
                Un espace neutre pour rétablir le dialogue, comprendre les tensions et retrouver une dynamique plus saine.
              </p>
              <p>
                L'objectif n'est pas de désigner un responsable, mais d'aider chacun à reprendre sa place dans la relation.
              </p>
            </div>
          </div>
        </section>

        <section className="individualFaqWrap">
          <div className="individualFaqInner therapyDetailStack therapyDetailNarrow">
            <TherapyBlocks title="Quand consulter ?" list={coupleAudience} dataRevealDelay="110ms" />
            <TherapyBlocks title="Objectifs de la thérapie" list={coupleWork} dataRevealDelay="160ms" />
            <TherapyBlocks title="Déroulé des séances" list={coupleSteps} dataRevealDelay="210ms" />
            <PracticalGrid title="Infos pratiques" items={couplePractical} dataRevealDelay="240ms" />
            <FaqBlock
              title="Questions fréquentes"
              items={coupleFaq}
              openIndex={openIndex}
              onToggle={(index) => setOpenIndex(openIndex === index ? null : index)}
            />

            <div className="consultationDetailActions" data-reveal data-reveal-delay="300ms">
              <a
                className="consultationDetailButton"
                href="https://wa.me/33687216605"
                target="_blank"
                rel="noreferrer"
              >
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
          <p className="consultationDetailEyebrow" data-reveal data-reveal-delay="60ms">Style de thérapie</p>
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
            <a
              className="consultationDetailButton"
              href="https://wa.me/33687216605"
              target="_blank"
              rel="noreferrer"
            >
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
