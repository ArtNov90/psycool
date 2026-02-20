import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { consultationStyles } from "./consultationStyles";
import "./ConsultationDetail.css";
import therapyImage from "../../photos/canva1.png";
import { useScrollReveal } from "../hooks/useScrollReveal";

type FaqItem = {
  question: string;
  answer: string;
};

const individualFaq: FaqItem[] = [
  {
    question: "Pourquoi et quand faut-il consulter ?",
    answer:
      "Quand chacun reproche à l'autre d'être la cause de sa souffrance et se vit comme une victime. Dans un couple, on passe par des hauts et des bas. Or il peut arriver que les deux partenaires n'arrivent plus à sortir de ce système de ressentiment et d'accusations réciproques. Chacun ne voit plus que les problèmes que l'autre lui apporte, ne croit plus en ses capacités de changer. C'est le blocage. On sent qu'alors il ne s'agit plus d'une crise passagère. La seule façon de s'en sortir est d'introduire un tiers dans la relation, qui va permettre de rétablir la communication.",
  },
  {
    question: "L'infidélité n'est-elle pas aussi un motif fréquent de consultation ?",
    answer:
      "Il y a souvent des histoires d'infidélité quand un couple va mal. Mais elles sont plutôt le révélateur de la crise que sa cause. Quand on se sent abandonné, plus désirable, alors on se tourne vers une personne plus attentionnée. Parfois, des couples consultent avec l'intention de se séparer sans agressivité, de réfléchir au moyen de préserver au mieux l'équilibre des enfants.",
  },
  {
    question: "Pourquoi choisir une thérapie de couple plutôt qu'une sexothérapie ou une thérapie personnelle?",
    answer:
      "Il y a toujours des problèmes sexuels dans les couples qui viennent en thérapie, mais ce n'est pas le motif essentiel. Chacun a conscience que les relations sexuelles sont devenues insatisfaisantes, voire inexistantes. Tous deux sentent bien que c'est la conséquence de la mésentente et non sa cause. D'ailleurs, quand ça commence à aller mieux, le couple retrouve une libido plus harmonieuse.En revanche, s'il s'agit d'un problème purement physique, mieux vaut consulter un sexologue.Une thérapie de couple se justifie si on est dans un système d'accusations réciproques ; une thérapie individuelle quand la personne se sent mal, indépendamment de sa relation avec son partenaire.",
  },
  {
    question: "Quel est l'enjeu ?",
    answer:
      "Le but d'une thérapie n'est pas de déterminer qui a tort ou raison, mais plutôt de rétablir la communication. Le couple est une entité qui a ses règles, ses codes, ses habitudes, et il arrive que les deux partenaires ne s'y reconnaissent plus. Le thérapeute donne les moyens à chacun d'exprimer ses insatisfactions par rapport à la relation et non par rapport à l'autre. Ce changement de perspective permet d'entrer dans un processus de collaboration conjointe pour revoir le « contrat » sans viser à changer l'autre, car c'est impossible. On sort du règlement de comptes destructeur pour devenir constructif.",
  },
];

export default function ConsultationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const style = consultationStyles.find((item) => item.slug === slug);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const revealRef = useScrollReveal<HTMLElement>();

  if (!style) {
    return <Navigate to="/consultations" replace />;
  }

  if (slug === "therapie-couple") {
    return (
      <section className="consultationDetail consultationDetailAlt" ref={revealRef}>
        <section className="individualIntro">
          <div className="individualIntroInner">
            <div className="individualVisualCol">
              <h1 className="individualMainTitle" data-reveal data-reveal-delay="80ms">La therapie de couple, c'est quoi ?</h1>
              <div
                className="individualRoundVisual"
                style={{ backgroundImage: `url(${therapyImage})` }}
                data-reveal
                data-reveal-delay="140ms"
              />
            </div>

            <div className="individualTextCol" data-reveal data-reveal-delay="200ms">
              <p>
                Votre relation va mal au point que  vous songez à y mettre un terme?
              </p>
              <p>
                Avant de prendre cette décision radicale, pourquoi ne pas faire une thérapie de couple?
              </p>
            </div>
          </div>
        </section>

        <section className="individualFaqWrap">
          <div className="individualFaqInner">
            {individualFaq.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <article
                  key={item.question}
                  className="individualFaqItem"
                  data-reveal
                  data-reveal-delay={`${Math.min(320, 80 + index * 70)}ms`}
                >
                  <button
                    type="button"
                    className="individualFaqButton"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <span className="individualFaqSign">{isOpen ? "-" : "+"}</span>
                  </button>
                  {isOpen ? <p className="individualFaqAnswer">{item.answer}</p> : null}
                </article>
              );
            })}

            <div className="consultationDetailActions" data-reveal data-reveal-delay="280ms">
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
    <section className="consultationDetail" ref={revealRef}>
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
