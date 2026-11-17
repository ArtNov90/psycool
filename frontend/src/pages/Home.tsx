import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";
import Seo from "../components/Seo";
import { useScrollReveal } from "../hooks/useScrollReveal";
import homeHeroImage from "../../photos/yumu-wIG0Hhre7Ms-unsplash.jpg";
import accompagnementImage from "../../photos/canva1.png";
import parcoursImage from "../../photos/chemin.png";
import chantalPhoto from "../../photos/chantal-portrait.jpeg";

const iconProps = {
  width: 34,
  height: 34,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const services = [
  {
    title: "Thérapie individuelle",
    text: "Un soutien pour traverser, comprendre et se libérer",
    to: "/consultations",
    color: "var(--color-sage)",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
      </svg>
    ),
  },
  {
    title: "Thérapie de couple",
    text: "Retrouver le dialogue, apaiser les conflits, réinventer la relation",
    to: "/consultations/therapie-couple",
    color: "var(--color-peach)",
    icon: (
      <svg {...iconProps}>
        <circle cx="8.5" cy="8" r="3.2" />
        <circle cx="15.5" cy="8" r="3.2" />
        <path d="M2.5 20c0-3.6 2.7-6 6-6 1.4 0 2.6.4 3.5 1.1" />
        <path d="M21.5 20c0-3.6-2.7-6-6-6-1.4 0-2.6.4-3.5 1.1" />
      </svg>
    ),
  },
  {
    title: "En présentiel ou en visio",
    text: "À Montpellier ou en ligne, où que vous soyez",
    to: "/teleconsultation",
    color: "var(--color-sky)",
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="4.5" width="16" height="11" rx="1.5" />
        <path d="M2 19.5h20" />
      </svg>
    ),
  },
  {
    title: "Ateliers / Conférences",
    text: "Découvrez les prochaines sessions et thèmes proposés",
    to: "/conferences",
    color: "var(--color-wheat)",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="6.5" r="2.8" />
        <circle cx="5.5" cy="10" r="2.2" />
        <circle cx="18.5" cy="10" r="2.2" />
        <path d="M7 20c0-3 2.2-5.5 5-5.5s5 2.5 5 5.5" />
        <path d="M1.8 19c0-2.4 1.6-4.3 3.7-4.3.6 0 1.1.1 1.6.4" />
        <path d="M22.2 19c0-2.4-1.6-4.3-3.7-4.3-.6 0-1.1.1-1.6.4" />
      </svg>
    ),
  },
];

const smallIcon = { ...iconProps, width: 27, height: 27, strokeWidth: 1.5 };

const parcoursItems = [
  {
    text: "Professeur à l'Université Montpellier UM",
    color: "var(--color-sky)",
    icon: (
      <svg {...smallIcon}>
        <path d="M3 9.5 12 5l9 4.5-9 4.5z" />
        <path d="M7 11.6V16c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.4" />
      </svg>
    ),
  },
  {
    text: "Psychanalyste (formation jungienne, freudienne, lacanienne)",
    color: "var(--color-peach)",
    icon: (
      <svg {...smallIcon}>
        {/* Lettre grecque psi (Ψ), symbole de la psychanalyse */}
        <path d="M12 3.5v17" />
        <path d="M5.5 6.5v2.5a6.5 6.5 0 0 0 13 0V6.5" />
        <path d="M9 20.5h6" />
      </svg>
    ),
  },
  {
    text: "Diplômée de l'université (Master 2 de psychanalyse et philosophie)",
    color: "var(--color-wheat)",
    icon: (
      <svg {...smallIcon}>
        <rect x="4" y="4" width="16" height="12" rx="1.5" />
        <path d="M8 8.5h8M8 11.5h5" />
        <path d="m14.5 15 1 5 1.5-1 1.5 1 1-5" />
      </svg>
    ),
  },
  {
    text: "Institut de formation des psychanalystes C.G. JUNG à Zurich",
    color: "var(--color-sage)",
    icon: (
      <svg {...smallIcon}>
        <path d="M3 19 9.5 8l3.5 6 2-3 6 8z" />
      </svg>
    ),
  },
  {
    text: "Institut Freudien de Montpellier",
    color: "var(--color-sky)",
    icon: (
      <svg {...smallIcon}>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
        <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5" />
      </svg>
    ),
  },
  {
    text: "Formatrice pour les psychothérapeutes et psychanalystes",
    color: "var(--color-peach)",
    icon: (
      <svg {...smallIcon}>
        <circle cx="12" cy="7" r="3" />
        <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M2.5 11h3M18.5 11h3" />
      </svg>
    ),
  },
];

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
      <Seo
        title="Chantal Novara | Psychanalyste à Montpellier et téléconsultation"
        description="Chantal Novara, psychanalyste à Montpellier (Maurin, Lattes). Thérapie individuelle et de couple, en cabinet ou en téléconsultation, ateliers et conférences Psycool, accompagnement en français et en anglais."
        keywords={[
          "psychanalyste Montpellier",
          "psychologue Montpellier",
          "psychanalyste Lattes",
          "psychanalyste Maurin",
          "thérapie individuelle Montpellier",
          "thérapie de couple Montpellier",
          "téléconsultation psychologue",
          "psychanalyse jungienne",
          "psychanalyse freudienne",
          "psychanalyse lacanienne",
          "Chantal Novara psychanalyste",
          "psy en ligne",
          "consultation psychologique Hérault",
        ]}
        path="/"
      />
      <div className="homeShell">
        <header className="homeHero">
          <svg className="homeLeaf homeLeafLeft" viewBox="0 0 120 200" aria-hidden="true">
            <path d="M60 195 C 58 140, 52 80, 30 10" />
            <path d="M57 150 C 30 140, 18 120, 16 98 C 40 104, 54 124, 57 150 Z" />
            <path d="M55 115 C 80 104, 92 84, 94 62 C 70 70, 56 90, 55 115 Z" />
            <path d="M48 78 C 26 70, 16 50, 16 30 C 36 38, 46 56, 48 78 Z" />
          </svg>

          <div className="homeHeroGrid">
            <figure className="homeHeroPortrait" data-reveal data-reveal-delay="80ms">
              <span className="homeHeroBlob" aria-hidden="true" />
              <img src={chantalPhoto} alt="Portrait de Chantal Novara" loading="eager" />
            </figure>

            <div className="homeHeroText">
              <h1 className="homeHeroName" data-reveal data-reveal-delay="120ms">
                <span className="homeHeroFirst">Chantal</span>
                <span className="homeHeroLast">NOVARA</span>
              </h1>
              <div className="homeHeroRule" aria-hidden="true" />
              <p className="homeHeroRole" data-reveal data-reveal-delay="160ms">PSYCHANALYSTE</p>
              <p className="homeHeroScript" data-reveal data-reveal-delay="200ms">
                Un espace pour mieux se comprendre et avancer
              </p>
              <p className="homeIntro" data-reveal data-reveal-delay="240ms">
                Psychanalyste diplômée, 30 ans d'expérience, je vous accueille au sein de mon cabinet pour des consultations. Je pratique également la consultation par VISIO avec WhatsApp et Google&nbsp;Meet
              </p>
              <div className="homeHeroActions" data-reveal data-reveal-delay="280ms">
                <a className="homeBtn homeBtnPrimary" href="https://wa.me/33687216605" target="_blank" rel="noreferrer">
                  Prendre rendez-vous
                </a>
                <Link className="homeBtn homeBtnGhost" to="/consultations">
                  Découvrir les consultations
                </Link>
              </div>
            </div>
          </div>

          <ul className="homeServices">
            {services.map((service, index) => (
              <li key={service.title} data-reveal data-reveal-delay={`${80 + index * 60}ms`}>
                <Link className="homeService" to={service.to}>
                  <span className="homeServiceIcon" style={{ background: service.color }} aria-hidden="true">
                    {service.icon}
                  </span>
                  <span className="homeServiceTitle">{service.title}</span>
                  <span className="homeServiceText">{service.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </header>

        <section className="homeHighlights">
          <h2 className="homeTitle" data-reveal>
            Mieux se connaître pour mieux vivre sa vie
          </h2>

          <div className="homeHeroImageWrap" data-reveal data-reveal-delay="100ms">
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
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="homeHeroDots" aria-label="Choix de l'image">
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
        </section>


        <section className="homeParcours">
          <header className="homeParcoursHeader" data-reveal>
            <p className="homeParcoursEyebrow">QUI SUIS-JE ?</p>
            <h2 className="homeParcoursTitle">Mon parcours professionnel</h2>
            <div className="homeParcoursRule" aria-hidden="true" />
            <p className="homeParcoursScript">30 ans d&apos;écoute et de transmission</p>
          </header>

          <div className="homeParcoursLayout">
            <ul className="homeParcoursList">
              {parcoursItems.map((item, index) => (
                <li
                  key={item.text}
                  className="homeParcoursItem"
                  data-reveal
                  data-reveal-delay={`${100 + index * 50}ms`}
                >
                  <span className="homeParcoursIcon" style={{ background: item.color }} aria-hidden="true">
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}
