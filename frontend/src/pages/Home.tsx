import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";
import { useScrollReveal } from "../hooks/useScrollReveal";
import homeHeroImage from "../../photos/yumu-wIG0Hhre7Ms-unsplash.jpg";
import accompagnementImage from "../../photos/canva1.png";
import parcoursImage from "../../photos/chemin.png";
import chantalPhoto from "../../photos/chantal.webp";

export default function Home() {
  const revealRef = useScrollReveal<HTMLElement>();
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  const heroSlides = [
    {
      src: homeHeroImage,
      alt: "Cabinet de consultation chaleureux",
      title: "Rendez-vous rapides, en cabinet ou en teleconsultation",
      description: "Prenez rendez-vous rapidement selon vos disponibilites, en presentiel ou a distance.",
    },
    {
      src: accompagnementImage,
      alt: "Espace d'accompagnement therapeutique",
      title: "Ateliers et conferences pour approfondir",
      description: "Participez a des ateliers et conferences autour de la psychologie et du mieux-etre.",
    },
    {
      src: parcoursImage,
      alt: "Illustration du parcours therapeutique",
      title: "Consultations possibles en anglais",
      description: "Un accompagnement therapeutique accessible egalement en langue anglaise.",
    },
  ];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveHeroSlide((previous) => (previous + 1) % heroSlides.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [heroSlides.length]);

  return (
    <section className="homePage" ref={revealRef}>
      <div className="homeShell">
        <header className="homeHero">
          <h1 className="homeTitle" data-reveal data-reveal-delay="80ms">
            Mieux se connaitre pour mieux vivre sa vie
          </h1>

          <div className="homeHeroImageWrap" data-reveal data-reveal-delay="140ms">
            <div
              className="homeHeroTrack"
              style={{ transform: `translateX(-${activeHeroSlide * 100}%)` }}
            >
              {heroSlides.map((slide, index) => (
                <figure className="homeHeroSlide" key={slide.alt}>
                  <img
                    className="homeHeroImage"
                    src={slide.src}
                    alt={slide.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <figcaption className="homeHeroOverlay">
                    <h2>{slide.title}</h2>
                    <p>{slide.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="homeHeroDots" aria-label="Choix de l'image du hero">
              {heroSlides.map((slide, index) => (
                <button
                  key={`dot-${slide.alt}`}
                  type="button"
                  className={`homeHeroDot ${activeHeroSlide === index ? "is-active" : ""}`}
                  onClick={() => setActiveHeroSlide(index)}
                  aria-label={`Afficher l'image ${index + 1}`}
                  aria-pressed={activeHeroSlide === index}
                />
              ))}
            </div>
          </div>
          <div className="homeIntroDivider" data-reveal data-reveal-delay="170ms" />

          <div className="homeIntroRow">
            <div className="homeIntroPortrait" data-reveal data-reveal-delay="180ms">
              <img src={chantalPhoto} alt="Portrait de Chantal" loading="eager" />
            </div>
            <p className="homeIntro" data-reveal data-reveal-delay="220ms">
              Psychanalyste diplomee, je vous accueille au sein de mon cabinet pour des consultations. Je pratique egalement la consultation par VISIO avec WhatsApp
            </p>
          </div>
        </header>

        <section className="homeQuote" data-reveal data-reveal-delay="120ms">
          <p className="homeQuoteText">
            Je propose un regard humaniste a travers des conceptes bases sur la psychologie moderne.
            Ma mission : offrir un espace securise ou chaque personne peut explorer ses
            emotions, comprendre ses schemas et construire des strategies concretes pour un
            mieux-etre durable.
          </p>
        </section>

        <section className="homeNews">
          <div className="homeDivider" />
          <h2 className="homeSectionTitle" data-reveal>
            Mes accompagnements
          </h2>

          <div className="homeNewsGrid">
            <article className="homeNewsCard" data-reveal data-reveal-delay="60ms">
              <img src={accompagnementImage} alt="" loading="lazy" />
              <div className="homeNewsBody">
                <h3>Therapie individuelle</h3>
                <p>Un espace d'ecoute pour travailler les blocages, les doutes et les transitions de vie.</p>
                <Link to="/consultations">Voir les consultations</Link>
              </div>
            </article>

            <article className="homeNewsCard" data-reveal data-reveal-delay="120ms">
              <img src={accompagnementImage} alt="" loading="lazy" />
              <div className="homeNewsBody">
                <h3>Therapie de couple</h3>
                <p>Retrouver un dialogue plus apaise et clarifier les besoins de chacun.</p>
                <Link to="/consultations/therapie-couple">Decouvrir</Link>
              </div>
            </article>

            <article className="homeNewsCard" data-reveal data-reveal-delay="180ms">
              <img src={accompagnementImage} alt="" loading="lazy" />
              <div className="homeNewsBody">
                <h3>Ateliers et conferences</h3>
                <p>Decouvrez les prochaines sessions et themes proposes par Psycool.</p>
                <Link to="/conferences">Voir l'agenda</Link>
              </div>
            </article>
          </div>
        </section>

        <section className="homeParcours">
          <div className="homeDivider" />
          <h2 className="homeSectionTitle" data-reveal>
            Mon parcours
          </h2>

          <div className="homeParcoursGrid">
            <div className="homeParcoursMedia" data-reveal data-reveal-delay="80ms">
              <img src={parcoursImage} alt="Illustration du parcours" loading="lazy" />
            </div>

            <div className="homeParcoursContent" data-reveal data-reveal-delay="140ms">
              <h2 className="homeParcoursTitle">Une pratique ancree dans la psychanalyse</h2>
              <p className="homeParcoursLead">
                Master 2 en psychanalyse (Universite de Montpellier) et formation a l'Institut
                Jung de Zurich. J'accompagne en therapie individuelle et de couple, avec une
                approche clinique attentive a l'histoire singuliere de chacun.
              </p>

              <ul className="homeParcoursList">
                <li>Psychanalyse</li>
                <li>Therapie individuelle</li>
                <li>Therapie de couple</li>
                <li>Psychologie des profondeurs</li>
                <li>Psychotherapie analytique</li>
                <li>Cinema et psychanalyse</li>
              </ul>

              <div className="homeParcoursActions">
                <Link to="/consultations">Voir les consultations</Link>
                <Link to="/conferences">Voir les ateliers et masterclass</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
