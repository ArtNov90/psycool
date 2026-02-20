import { Link } from "react-router-dom";
import "./Home.css";
import whatsappImage from "../../photos/whatsapp.png";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Home() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <div className="home" ref={revealRef}>
      <section className="heroBanner">
        <div className="heroOverlay" />
        <div className="heroContent">
          <p className="heroEyebrow" data-reveal data-reveal-delay="60ms">Psychanalyste diplomee</p>
          <h1 className="heroTitle" data-reveal data-reveal-delay="120ms">
            Consultations en <span className="accent">visio</span>, en{" "}
            <span className="accent">anglais</span>, à <span className="accent">Lattes</span>
            <br />
            <span className="small">en cabinet, en visio, en francais et en anglais</span>
          </h1>
          <p className="heroLead" data-reveal data-reveal-delay="180ms">
            Therapie individuelle et therapie de couple pour traverser les periodes de blocage,
            d'anxiete ou de conflits relationnels.
          </p>
          <p className="heroLead" data-reveal data-reveal-delay="240ms"><strong>Mieux se connaitre pour mieux vivre sa vie.</strong></p>
          <p className="heroMention" data-reveal data-reveal-delay="300ms">
            Psychanalyste – secteur non conventionné
          </p>
          <div className="heroActions" data-reveal data-reveal-delay="360ms">
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
        <div className="introInner" data-reveal>
          <img className="avatar" src="/photo-profil.webp" alt="Portrait de la psychanalyste" loading="lazy" />
        </div>
      </section>

      <section className="onlinePsySection">
        <div className="onlinePsyInner" data-reveal>
          <h2 className="onlinePsyTitle">Votre psy en ligne !</h2>
          <p className="onlinePsyPhone">+ 33 (0)6 87 21 66 05</p>

          <p className="onlinePsyText">
            Besoin d'aide psychologique, de soutien, de reponses a vos questions ?
          </p>

          <p className="onlinePsyText">
            La therapie en ligne offre facilite et flexibilite. De plus en plus de personnes demandent un conseil, une
            aide en ligne pour resoudre leurs problemes ponctuels ou chroniques. Ou que vous soyez, en France ou a
            l'etranger, un simple appel gratuit par WhatsApp, et vous serez en contact direct avec moi pendant 1h.
          </p>

          <p className="onlinePsyText">
            Si vous souhaitez le face a face, je vous accueillerai au cabinet avec plaisir.
          </p>

          <p className="onlinePsyText">Rdv possible dans des delais rapides.</p>

          <p className="onlinePsyText onlinePsyFormula">
            Une psy disponible
            <br />=<br />
            une solution pour aller mieux.
          </p>

          <p className="onlinePsyClosing">Donnez sens a votre vie!</p>

          <a
            className="whatsappCta"
            href="https://wa.me/33687216605"
            target="_blank"
            rel="noreferrer"
            aria-label="Contacter sur WhatsApp"
          >
            <img src={whatsappImage} alt="" loading="lazy" />
          </a>
        </div>
      </section>

      <section className="highlightsSection">
        <div className="highlightsInner">
          <h2 className="sectionTitle" data-reveal>Vous pouvez consulter pour</h2>
          <div className="highlightsGrid">
            <article className="highlightCard" data-reveal data-reveal-delay="60ms">
              <h3>Anxiete et stress</h3>
              <p>Quand les tensions deviennent envahissantes dans votre quotidien.</p>
            </article>
            <article className="highlightCard" data-reveal data-reveal-delay="120ms">
              <h3>Blocages repetitifs</h3>
              <p>Comprendre les schemas qui se repetent et retrouver de la clarte.</p>
            </article>
            <article className="highlightCard" data-reveal data-reveal-delay="180ms">
              <h3>Difficultes de couple</h3>
              <p>Retablir un dialogue plus apaise et clarifier les besoins de chacun.</p>
            </article>
            <article className="highlightCard" data-reveal data-reveal-delay="240ms">
              <h3>Transitions de vie</h3>
              <p>Separation, deuil, epuisement professionnel ou perte de reperes.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="processSection">
        <div className="processInner">
          <h2 className="sectionTitle" data-reveal>Comment se passe un premier rendez-vous</h2>
          <div className="processGrid">
            <article className="processStep" data-reveal data-reveal-delay="60ms">
              <span className="processIndex">1</span>
              <h3>Premier contact</h3>
              <p>Par telephone ou email pour poser votre demande et convenir d'un creneau.</p>
            </article>
            <article className="processStep" data-reveal data-reveal-delay="120ms">
              <span className="processIndex">2</span>
              <h3>Temps d'ecoute</h3>
              <p>Vous decrivez ce que vous traversez, a votre rythme, dans un cadre confidentiel.</p>
            </article>
            <article className="processStep" data-reveal data-reveal-delay="180ms">
              <span className="processIndex">3</span>
              <h3>Cadre de suivi</h3>
              <p>Nous definissons ensemble une frequence de seances adaptee a votre situation.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="practicalBand">
        <div className="practicalInner" data-reveal>
          <div className="practicalItem" data-reveal data-reveal-delay="60ms">
            <h3>Lieux</h3>
            <p>Lattes (pres de Montpellier) et Brissac (pres de Ganges)</p>
          </div>
          <div className="practicalItem" data-reveal data-reveal-delay="120ms">
            <h3>Modalites</h3>
            <p>Seances en cabinet et consultations en visio</p>
          </div>
          <div className="practicalItem" data-reveal data-reveal-delay="180ms">
            <h3>Tarif</h3>
            <p>Communique lors du premier echange</p>
          </div>
        </div>
      </section>

      <section className="parcoursPink">
        <div className="parcoursInner" data-reveal>
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




