import { Link } from "react-router-dom";
import "./Home.css";
import { useScrollReveal } from "../hooks/useScrollReveal";
import homeHeroImage from "../../photos/yumu-wIG0Hhre7Ms-unsplash.jpg";
import accompagnementImage from "../../photos/canva1.png";

export default function Home() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section className="homePage" ref={revealRef}>
      <div className="homeShell">
        <header className="homeHero">
          <h1 className="homeTitle" data-reveal data-reveal-delay="80ms">
            Mieux se connaître pour mieux vivre sa vie
          </h1>

          <div className="homeHeroImageWrap" data-reveal data-reveal-delay="140ms">
            <img
              className="homeHeroImage"
              src={homeHeroImage}
              alt="Cabinet de consultation chaleureux"
              loading="eager"
            />
          </div>

          <p className="homeIntro" data-reveal data-reveal-delay="180ms">
            Psychanalyste diplômée, je vous accueille  au sein de mon cabinet pour des consultations. Je pratique également la  consultation  par  VISIO avec WhatsApp
          </p>
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
      </div>
    </section>
  );
}
