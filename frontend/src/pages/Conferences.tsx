import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import "./Conferences.css";
import { useScrollReveal } from "../hooks/useScrollReveal";
import paperImage from "../../photos/papier.jpeg";

type EventItem = {
  id: string;
  title?: string;
  date?: string; // YYYY-MM-DD
  time?: string;
  city?: string;
  place?: string;
  description?: string;
  type?: ConferenceType;
  section?: 1 | 2 | 3 | 4;
  order?: number;
};

type ConferenceType = "cafepsy" | "masterclass";

type DescriptionBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

const BLOCKS: ConferenceType[] = ["cafepsy", "masterclass"];

const BLOCK_META: Record<ConferenceType, { title: string; subtitle: string }> = {
  cafepsy: {
    title: "CafePsy rigolo",
    subtitle: "Un format vivant pour aborder la psychologie avec legerete et echanges.",
  },
  masterclass: {
    title: "Masterclass",
    subtitle: "Des sessions plus approfondies pour explorer un theme en detail.",
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
          <p className="confEyebrow" data-reveal data-reveal-delay="60ms">Agenda psyCool</p>
          <h1 data-reveal data-reveal-delay="120ms">Ateliers et Masterclass</h1>
          <p className="confHeroLead" data-reveal data-reveal-delay="180ms">
            Retrouvez les prochaines dates, les lieux et les themes abordes pour choisir la session
            qui vous correspond.
          </p>
          <div className="confHeroActions" data-reveal data-reveal-delay="240ms">
            <a className="confHeroBtn confHeroBtnPrimary" href="tel:+33687216605">
              Reserver une place
            </a>
            <a className="confHeroBtn" href="tel:+33687216605">
              Appeler le cabinet
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
                        <p className="confBlockKicker">Type de conference</p>
                        <h2>{blockMeta.title}</h2>
                        <p>{blockMeta.subtitle}</p>
                      </header>

                      <div className="eventGrid">
                        {items.map((ev, index) => (
                          <article
                            key={ev.id}
                            className="eventCard"
                            data-reveal
                            data-reveal-delay={`${Math.min(300, 60 + index * 60)}ms`}
                            style={{
                              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${paperImage})`,
                            }}
                          >
                            <div className="eventCardTop">
                              <p className="eventDate">{formatDate(ev.date)}</p>
                              {ev.time ? <span className="eventTime">{ev.time}</span> : null}
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
                          </article>
                        ))}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
