import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <section className="heroBanner">
        <div className="heroOverlay" />
        <div className="heroContent">
          <p className="heroEyebrow">Psychanalyste diplomee</p>
          <h1 className="heroTitle">
            Un espace de parole securise a <span className="accent">Lattes</span> et{" "}
            <span className="accent">Brissac</span>
            <br />
            <span className="small">en cabinet ou en visio</span>
          </h1>
          <p className="heroLead">
            Therapie individuelle et therapie de couple pour traverser les periodes de blocage,
            d'anxiete ou de conflits relationnels.
          </p>
          <div className="heroActions">
            <a className="heroBtn primary" href="tel:+33687216605">
              Prendre rendez-vous
            </a>
            <Link className="heroBtn" to="/consultations">
              Voir les consultations
            </Link>
          </div>
        </div>
      </section>

      <section className="introWhite">
        <div className="introInner">
          <img className="avatar" src="/photo-profil.webp" alt="Portrait de la psychanalyste" loading="lazy" />
          <p className="introText">
            <strong>Psychanalyste diplomee</strong>, je vous accueille au sein de mon cabinet pour des consultations.
            <br />
            Je pratique egalement la <span className="accentText">consultation par visio</span> : Skype, WhatsApp, Google Meet...
          </p>
        </div>
      </section>

      <section className="highlightsSection">
        <div className="highlightsInner">
          <h2 className="sectionTitle">Vous pouvez consulter pour</h2>
          <div className="highlightsGrid">
            <article className="highlightCard">
              <h3>Anxiete et stress</h3>
              <p>Quand les tensions deviennent envahissantes dans votre quotidien.</p>
            </article>
            <article className="highlightCard">
              <h3>Blocages repetitifs</h3>
              <p>Comprendre les schemas qui se repetent et retrouver de la clarte.</p>
            </article>
            <article className="highlightCard">
              <h3>Difficultes de couple</h3>
              <p>Retablir un dialogue plus apaise et clarifier les besoins de chacun.</p>
            </article>
            <article className="highlightCard">
              <h3>Transitions de vie</h3>
              <p>Separation, deuil, epuisement professionnel ou perte de reperes.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="processSection">
        <div className="processInner">
          <h2 className="sectionTitle">Comment se passe un premier rendez-vous</h2>
          <div className="processGrid">
            <article className="processStep">
              <span className="processIndex">1</span>
              <h3>Premier contact</h3>
              <p>Par telephone ou email pour poser votre demande et convenir d'un creneau.</p>
            </article>
            <article className="processStep">
              <span className="processIndex">2</span>
              <h3>Temps d'ecoute</h3>
              <p>Vous decrivez ce que vous traversez, a votre rythme, dans un cadre confidentiel.</p>
            </article>
            <article className="processStep">
              <span className="processIndex">3</span>
              <h3>Cadre de suivi</h3>
              <p>Nous definissons ensemble une frequence de seances adaptee a votre situation.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="practicalBand">
        <div className="practicalInner">
          <div className="practicalItem">
            <h3>Lieux</h3>
            <p>Lattes (pres de Montpellier) et Brissac (pres de Ganges)</p>
          </div>
          <div className="practicalItem">
            <h3>Modalites</h3>
            <p>Seances en cabinet et consultations en visio</p>
          </div>
          <div className="practicalItem">
            <h3>Tarif</h3>
            <p>Communique lors du premier echange</p>
          </div>
        </div>
      </section>

      <section className="parcoursPink">
        <div className="parcoursInner">
          <div className="parcoursLeft">
            <h2 className="parcoursTitle">MON PARCOURS</h2>
            <div className="parcoursImage" aria-hidden="true">
              <img className="parcoursImageImg" src="/freud-1920w.webp" alt="" loading="lazy" />
            </div>
          </div>

          <div className="parcoursRight">
            <p className="parcoursP">
              Master 2 en psychanalyse (Universite de Montpellier) et formation a l'Institut Jung de Zurich.
              Au fil de mon parcours, je me suis specialisee dans les domaines suivants :
            </p>

            <ul className="parcoursList">
              <li>Psychanalyse</li>
              <li>Therapie de couple</li>
              <li>Therapie individuelle</li>
              <li>Psychologie des profondeurs</li>
              <li>Psychotherapie analytique</li>
              <li>Cinema et psychanalyse</li>
              <li>Conferences</li>
            </ul>

            <div className="parcoursCtas">
              <Link className="ghostBtn" to="/consultations">Voir les consultations</Link>
              <Link className="ghostBtn" to="/conferences">Voir les conferences</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
