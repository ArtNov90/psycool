import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      {/* HERO avec image de fond */}
      <section className="heroBanner">
        <div className="heroOverlay" />
        <div className="heroContent">
          <h1 className="heroTitle">
            PSY à <span className="accent">Lattes</span>, <span className="small">près de Montpellier</span>
            <br />
            et à <span className="accent">Brissac</span>, <span className="small">près de Ganges</span>
          </h1>

          <Link className="heroBtn" to="/consultations">
            THÉRAPIE
          </Link>
        </div>
      </section>

      {/* Bloc blanc avec photo ronde + texte */}
      <section className="introWhite">
        <div className="introInner">
          <div className="avatar" aria-hidden="true" />
          <p className="introText">
            <strong>Psychanalyste diplômée</strong>, je vous accueille au sein de mon cabinet pour des consultations.
            <br />
            Je pratique également la <span className="accentText">consultation par visio</span> : Skype, WhatsApp, Google Meet…
          </p>
        </div>
      </section>

      {/* Section rose "Mon parcours" */}
      <section className="parcoursPink">
        <div className="parcoursInner">
          <div className="parcoursLeft">
            <h2 className="parcoursTitle">MON PARCOURS</h2>
            <div className="parcoursImage" aria-hidden="true" />
          </div>

          <div className="parcoursRight">
            <p className="parcoursP">
              Master 2 en psychanalyse (Université de Montpellier) et formation à l’Institut Jung de Zurich.
              Au fil de mon parcours, je me suis spécialisée dans les domaines suivants :
            </p>

            <ul className="parcoursList">
              <li>Psychanalyse</li>
              <li>Thérapie de couple</li>
              <li>Thérapie individuelle</li>
              <li>Psychologie des profondeurs</li>
              <li>Psychothérapie analytique</li>
              <li>Cinéma et psychanalyse</li>
              <li>Conférences</li>
            </ul>

            <div className="parcoursCtas">
              <Link className="ghostBtn" to="/consultations">Voir les consultations</Link>
              <Link className="ghostBtn" to="/conferences">Voir les conférences</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
 