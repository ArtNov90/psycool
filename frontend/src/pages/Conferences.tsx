type EventType = "cafe" | "masterclass";

type EventItem = {
  id: number;
  type: EventType;
  title: string;
  subtitle?: string;
  dateLine?: string;
  timeLine?: string;
  metaLine?: string;
  themeTitle?: string;
  themeSubtitle?: string;
  description?: string;
  bullets?: string[];
  logoText?: string; // placeholder si tu n’as pas encore le logo
};

const EVENTS: EventItem[] = [
  {
    id: 1,
    type: "cafe",
    title: "CAFÉ PSY RIGOLO",
    dateLine: "samedi 16/8/2025 à 11h",
    metaLine: "Durée: 1H30",
    themeTitle: "Thème: LE CONSENTEMENT",
    logoText: "Rigolo",
  },
  {
    id: 2,
    type: "masterclass",
    title: "Master class",
    subtitle: "Samedi 23 août (complet) et 30 août 2025",
    timeLine: "de 14h30 à 17h30",
    metaLine: "10 personnes max par atelier",
    themeTitle: "Le consentement: apprendre à dire NON",
    themeSubtitle: "Dire NON sans se sentir coupable… et sans perdre ses amis",
    description:
      "Conçu pour que les participants soient en immersion dans un atelier incluant des outils pour accroître la bonne humeur et le positif. Très concret, toujours bienveillant dans le respect de chacun.",
    bullets: [
      "Atelier d’exercices: durée 3h environ.",
      "Ce que signifie réellement le consentement et pourquoi il est si souvent mal compris",
      "Vos freins personnels à dire NON",
    ],
  },
];

export default function Conferences() {
  return (
    <div className="confPage">
      {/* HERO */}
      <section className="confHero">
        <div className="confHeroOverlay" />
        <div className="confHeroInner">
          <h1 className="confHeroTitle">ATELIERS PSYCOOL</h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="confIntro">
        <div className="confIntroInner">
          <p className="confIntroText">
            Découvrez les prochains ateliers psycool organisés, ainsi que les thèmes abordés.
          </p>
          <div className="confDivider" />
        </div>
      </section>

      {/* EVENTS */}
      <section className="confList">
        {EVENTS.map((e) =>
          e.type === "cafe" ? (
            <article key={e.id} className="eventCard eventCafe">
              <div className="eventCafeInner">
                <div className="eventLogo" aria-hidden="true">
                  <span>{e.logoText ?? "Logo"}</span>
                </div>

                <div className="eventCafeText">
                  <h2 className="eventCafeTitle">{e.title}</h2>
                  <div className="eventCafeDate">{e.dateLine}</div>
                  {e.metaLine && <div className="eventCafeMeta">{e.metaLine}</div>}
                  {e.themeTitle && <div className="eventCafeTheme">{e.themeTitle}</div>}
                </div>
              </div>
            </article>
          ) : (
            <article key={e.id} className="eventCard eventMaster">
              <h2 className="eventMasterTitle">{e.title}</h2>

              {e.subtitle && <div className="eventMasterRed">{e.subtitle}</div>}
              {e.timeLine && <div className="eventMasterTime">{e.timeLine}</div>}
              {e.metaLine && <div className="eventMasterMeta">{e.metaLine}</div>}

              {e.themeTitle && <div className="eventMasterTheme">{e.themeTitle}</div>}
              {e.themeSubtitle && <div className="eventMasterTheme2">{e.themeSubtitle}</div>}

              {e.description && <p className="eventMasterDesc">{e.description}</p>}

              {e.bullets && e.bullets.length > 0 && (
                <div className="eventMasterBullets">
                  {e.bullets.map((b, idx) => (
                    <p key={idx}>{b}</p>
                  ))}
                </div>
              )}
            </article>
          )
        )}
      </section>
    </div>
  );
}
