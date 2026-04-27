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
      title: "Consultations rapides, en cabinet ou en téléconsultation",
      description: "Prenez rendez-vous rapidement selon vos disponibilités, en présentiel ou à distance.",
    },
    {
      src: accompagnementImage,
      alt: "Espace d'accompagnement thérapeutique",
      title: "Ateliers et conférences pour approfondir",
      description: "Participez à des ateliers et conférences autour de la psychologie et du mieux-être.",
    },
    {
      src: parcoursImage,
      alt: "Illustration du parcours thérapeutique",
      title: "English speaking therapy",
      description: "Don't feel lost in translation",
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
            Mieux se connaître pour mieux vivre sa vie
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
              Psychanalyste diplômée, 30 ans d'expérience, je vous accueille au sein de mon cabinet pour des consultations. Je pratique également la consultation par VISIO avec WhatsApp
            </p>
          </div>
        </header>

        <section className="homeNews">
          <div className="homeDivider" />
          <h2 className="homeSectionTitle" data-reveal>
            Mes accompagnements
          </h2>

          <div className="homeNewsGrid">
            <article className="homeNewsCard" data-reveal data-reveal-delay="60ms">
              <img src={accompagnementImage} alt="" loading="lazy" />
              <div className="homeNewsBody">
                <h3>Thérapie individuelle</h3>
                <p>Un espace d'écoute pour travailler les blocages, les doutes et les transitions de vie.</p>
                <Link to="/consultations">Voir les consultations</Link>
              </div>
            </article>

            <article className="homeNewsCard" data-reveal data-reveal-delay="120ms">
              <img src={accompagnementImage} alt="" loading="lazy" />
              <div className="homeNewsBody">
                <h3>Thérapie de couple</h3>
                <p>Retrouver un dialogue plus apaisé et clarifier les besoins de chacun.</p>
                <Link to="/consultations/therapie-couple">Découvrir</Link>
              </div>
            </article>

            <article className="homeNewsCard" data-reveal data-reveal-delay="180ms">
              <img src={accompagnementImage} alt="" loading="lazy" />
              <div className="homeNewsBody">
                <h3>Ateliers et conférences</h3>
                <p>Découvrez les prochaines sessions et thèmes proposés par Psycool.</p>
                <Link to="/conferences">Voir l'agenda</Link>
              </div>
            </article>
          </div>
        </section>

        <section className="homeParcours">
          <div className="homeDivider" />
          <h2 className="homeSectionTitle homeParcoursSectionTitle" data-reveal>
            Qui suis-je ?
          </h2>

          <div className="homeParcoursLayout">
            <div className="homeParcoursCard homeQuoteCard" data-reveal data-reveal-delay="100ms">
              <figure className="homeParcoursPhotoWrap">
                <img
                  className="homeParcoursPhoto"
                  src={parcoursImage}
                  alt="Portrait du psychologue"
                  loading="lazy"
                />
              </figure>

              <div className="homeParcoursContent homeQuoteText">
                <h3 className="homeQuoteTitle">Mon parcours professionnel</h3>
                <ul className="homeQuoteList">
                  <li>Professeur à l&apos;Université Montpellier UM</li>
                  <li>Psychanalyste (formation jungienne, freudienne, lacanienne)</li>
                  <li>Diplômée de l&apos;université (Master 2 de psychanalyse et philosophie)</li>
                  <li>Institut de formation des psychanalystes C.G. JUNG à Zurich</li>
                  <li>Institut Freudien de Montpellier</li>
                  <li>
                    Formée à l&apos;interprétation des rêves à l&apos;Académie des rêves de Montpellier,
                    formatrice pour les psychothérapeutes et psychanalystes
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
