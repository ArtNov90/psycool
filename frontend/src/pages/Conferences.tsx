import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import "./Conferences.css";
import { useScrollReveal } from "../hooks/useScrollReveal";
import paperImage from "../../photos/papier.jpeg";
import workshopImage from "../../photos/yumu-wIG0Hhre7Ms-unsplash.jpg";
import masterclassImage from "../../photos/chemin.png";
import cafePsyImage from "../../photos/psy-612x612.jpg";
import freudImage from "../../photos/freud-1920w.webp";
import abstractImage from "../../photos/canva1.png";

type EventItem = {
  id: string;
  title?: string;
  date?: string; // YYYY-MM-DD
  startTime?: string;
  endTime?: string;
  time?: string;
  city?: string;
  place?: string;
  description?: string;
  imageUrl?: string;
  imageKey?: EventImageKey;
  type?: ConferenceType;
  section?: 1 | 2 | 3 | 4;
  order?: number;
};

type ConferenceType = "cafepsy" | "masterclass";
type EventImageKey = "cafepsy" | "freud" | "workshop" | "masterclass" | "abstract";

type DescriptionBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

const BLOCKS: ConferenceType[] = ["cafepsy", "masterclass"];

const BLOCK_META: Record<ConferenceType, { title: string; subtitle: string }> = {
  cafepsy: {
    title: "Conférences",
    subtitle: "Un format vivant pour aborder la psychologie avec légèreté et profondeur.",
  },
  masterclass: {
    title: "Masterclass",
    subtitle: "Des sessions plus approfondies pour explorer un theme en detail.",
  },
};

const EVENT_IMAGES: Record<ConferenceType, { src: string; alt: string }[]> = {
  cafepsy: [
    {
      src: cafePsyImage,
      alt: "Illustration coloree autour de la psychologie",
    },
    {
      src: freudImage,
      alt: "Portrait graphique evoquant l'histoire de la psychanalyse",
    },
    {
      src: workshopImage,
      alt: "Matiere sensorielle utilisee en atelier therapeutique",
    },
  ],
  masterclass: [
    {
      src: masterclassImage,
      alt: "Illustration d'un cheminement personnel",
    },
    {
      src: abstractImage,
      alt: "Formes colorees evoquant les emotions et le dialogue",
    },
    {
      src: workshopImage,
      alt: "Texture douce associee aux ateliers de psychologie",
    },
  ],
};

const EVENT_IMAGE_BY_KEY: Record<EventImageKey, { src: string; alt: string }> = {
  cafepsy: {
    src: cafePsyImage,
    alt: "Illustration coloree autour de la psychologie",
  },
  freud: {
    src: freudImage,
    alt: "Portrait graphique evoquant l'histoire de la psychanalyse",
  },
  workshop: {
    src: workshopImage,
    alt: "Matiere sensorielle utilisee en atelier therapeutique",
  },
  masterclass: {
    src: masterclassImage,
    alt: "Illustration d'un cheminement personnel",
  },
  abstract: {
    src: abstractImage,
    alt: "Formes colorees evoquant les emotions et le dialogue",
  },
};

function normalizeConferenceType(event: EventItem): ConferenceType {
  if (event.type === "cafepsy" || event.type === "masterclass") {
    return event.type;
  }

  const legacySection = event.section ?? 1;
  return legacySection % 2 === 0 ? "masterclass" : "cafepsy";
}

function parseDescription(raw?: string): DescriptionBlock[] {
  if (!raw) return [];

  const lines = raw.split(/\r?\n/);
  const blocks: DescriptionBlock[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];

  function flushParagraph() {
    if (paragraph.length === 0) return;
    const text = paragraph.join(" ").trim();
    if (text) blocks.push({ type: "p", text });
    paragraph = [];
  }

  function flushList() {
    if (listItems.length === 0) return;
    blocks.push({ type: "ul", items: listItems });
    listItems = [];
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      listItems.push(trimmed.slice(2).trim());
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return blocks;
}

function formatDate(date?: string): string {
  if (!date) return "Date a confirmer";
  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

function getSortableDateValue(date?: string): number {
  if (!date) return Number.POSITIVE_INFINITY;
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return Number.POSITIVE_INFINITY;
  return parsed.getTime();
}

function formatTimeRange(event: Pick<EventItem, "startTime" | "endTime" | "time">): string {
  if (event.startTime && event.endTime) return `${event.startTime} - ${event.endTime}`;
  if (event.startTime) return event.startTime;
  return event.time || "";
}

function isEventImageKey(value?: string): value is EventImageKey {
  return Boolean(value && value in EVENT_IMAGE_BY_KEY);
}

function getEventImage(event: EventItem, type: ConferenceType, index: number) {
  if (event.imageUrl?.trim()) {
    return {
      src: event.imageUrl,
      alt: event.title ? `Image de ${event.title}` : "Image de la conference",
    };
  }

  if (isEventImageKey(event.imageKey)) {
    return EVENT_IMAGE_BY_KEY[event.imageKey];
  }

  const images = EVENT_IMAGES[type];
  return images[index % images.length];
}

export default function Conferences() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const revealRef = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("date", "asc"));

    return onSnapshot(q, (snap) => {
      setEvents(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<EventItem, "id">),
        }))
      );
    });
  }, []);

  const grouped = useMemo(() => {
    const map: Record<ConferenceType, EventItem[]> = { cafepsy: [], masterclass: [] };

    const sorted = [...events].sort((a, b) => {
      const byDate = getSortableDateValue(a.date) - getSortableDateValue(b.date);
      if (byDate !== 0) return byDate;
      return (a.title || "").localeCompare(b.title || "");
    });

    for (const event of sorted) {
      const type = normalizeConferenceType(event);
      map[type].push(event);
    }

    return map;
  }, [events]);

  return (
    <div className="confPage" ref={revealRef}>
      <section className="confHero">
        <div className="confHeroOverlay" />
        <div className="confHeroInner">
          <p className="confEyebrow" data-reveal data-reveal-delay="60ms">
            Agenda psyCool
          </p>
          <h1 data-reveal data-reveal-delay="120ms">Conférences et Masterclass</h1>
          <p className="confHeroLead" data-reveal data-reveal-delay="180ms">
            Retrouvez les prochaines dates, les lieux et les themes abordes pour choisir la session
            qui vous correspond.
          </p>
          <div className="confHeroActions" data-reveal data-reveal-delay="240ms">
            <p className="confHeroNotice">Inscription indispensable par SMS</p>
            <a
              className="confHeroBtn confHeroBtnPrimary"
              href="https://wa.me/33687216605"
              target="_blank"
              rel="noreferrer"
            >
              Reserver une place
            </a>
          </div>
        </div>
      </section>

      <section className="confList">
        <div className="confInner">
          {events.length === 0 ? (
            <article className="emptyState">
              <h2>Aucun evenement programme pour le moment</h2>
              <p>
                Contactez le cabinet pour connaitre les prochaines dates ou etre informe des nouvelles
                ouvertures.
              </p>
              <a className="emptyStateBtn" href="mailto:chantalnovara@icloud.com">
                Me tenir informe
              </a>
            </article>
          ) : (
            <div className="confBlocks">
              {BLOCKS.map((block) => {
                const items = grouped[block];
                if (items.length === 0) return null;

                const blockMeta = BLOCK_META[block];

                return (
                  <section key={block} className={`confBlock confBlock-${block}`}>
                    <div className="confBlockInner">
                      <header className="confBlockHeader" data-reveal>
                        <h2>{blockMeta.title}</h2>
                        <p>{blockMeta.subtitle}</p>
                      </header>

                      <div className="eventGrid">
                        {items.map((ev, index) => {
                          const eventImage = getEventImage(ev, block, index);

                          return (
                            <article
                              key={ev.id}
                              className="eventCard"
                              data-reveal
                              data-reveal-delay={`${Math.min(300, 60 + index * 60)}ms`}
                              style={{
                                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${paperImage})`,
                              }}
                            >
                              <div className="eventMedia">
                                <img src={eventImage.src} alt={eventImage.alt} loading={index === 0 ? "eager" : "lazy"} />
                              </div>

                              <div className="eventCardBody">
                                <div className="eventCardTop">
                                  <p className="eventDate">{formatDate(ev.date)}</p>
                                  {formatTimeRange(ev) ? (
                                    <span className="eventTime">{formatTimeRange(ev)}</span>
                                  ) : null}
                                </div>

                                <h3 className="eventTitle">{ev.title || "Sans titre"}</h3>

                                {(ev.city || ev.place) && (
                                  <p className="eventPlace">
                                    {ev.city ?? ""}
                                    {ev.city && ev.place ? " - " : ""}
                                    {ev.place ?? ""}
                                  </p>
                                )}

                                {parseDescription(ev.description).map((blockItem, index) => {
                                  if (blockItem.type === "ul") {
                                    return (
                                      <ul key={`${ev.id}-d-${index}`} className="eventDescriptionList">
                                        {blockItem.items.map((item, itemIndex) => (
                                          <li key={`${ev.id}-d-${index}-${itemIndex}`}>{item}</li>
                                        ))}
                                      </ul>
                                    );
                                  }

                                  return (
                                    <p key={`${ev.id}-d-${index}`} className="eventDescription">
                                      {blockItem.text}
                                    </p>
                                  );
                                })}
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="confBottomCta" data-reveal data-reveal-delay="120ms">
        <p className="confHeroNotice">Inscription indispensable par SMS</p>
        <a
          className="confHeroBtn confHeroBtnPrimary"
          href="https://wa.me/33687216605"
          target="_blank"
          rel="noreferrer"
        >
          Reserver une place
        </a>
      </section>
    </div>
  );
}
