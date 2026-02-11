import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import "./Conferences.css";

type EventItem = {
  id: string;
  title?: string;
  date?: string; // YYYY-MM-DD
  time?: string;
  city?: string;
  place?: string;
  description?: string;
  section?: 1 | 2 | 3 | 4;
  order?: number;
};

type DescriptionBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

const BLOCKS: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4];

const BLOCK_META: Record<1 | 2 | 3 | 4, { title: string; subtitle: string }> = {
  1: {
    title: "Ateliers decouverte",
    subtitle: "Formats accessibles pour explorer des themes du quotidien.",
  },
  2: {
    title: "Cycles thematiques",
    subtitle: "Rencontres approfondies autour d'un meme fil conducteur.",
  },
  3: {
    title: "Conferences",
    subtitle: "Interventions sur la psychanalyse, la relation et les transitions de vie.",
  },
  4: {
    title: "Sessions speciales",
    subtitle: "Formats ponctuels avec places limitees.",
  },
};

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

export default function Conferences() {
  const [events, setEvents] = useState<EventItem[]>([]);

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
    const map: Record<1 | 2 | 3 | 4, EventItem[]> = { 1: [], 2: [], 3: [], 4: [] };

    const sorted = [...events].sort((a, b) => {
      const orderA = typeof a.order === "number" ? a.order : Number.MAX_SAFE_INTEGER;
      const orderB = typeof b.order === "number" ? b.order : Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return (a.date || "").localeCompare(b.date || "");
    });

    for (const event of sorted) {
      const section = (event.section ?? 1) as 1 | 2 | 3 | 4;
      map[section].push(event);
    }

    return map;
  }, [events]);

  return (
    <div className="confPage">
      <section className="confHero">
        <div className="confHeroOverlay" />
        <div className="confHeroInner">
          <p className="confEyebrow">Agenda psyCool</p>
          <h1>Conferences et ateliers</h1>
          <p className="confHeroLead">
            Retrouvez les prochaines dates, les lieux et les themes abordes pour choisir la session
            qui vous correspond.
          </p>
          <div className="confHeroActions">
            <Link className="confHeroBtn confHeroBtnPrimary" to="/contact">
              Reserver une place
            </Link>
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
              <Link className="emptyStateBtn" to="/contact">
                Me tenir informe
              </Link>
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
                      <header className="confBlockHeader">
                        <p className="confBlockKicker">Section {block}</p>
                        <h2>{blockMeta.title}</h2>
                        <p>{blockMeta.subtitle}</p>
                      </header>

                      <div className="eventGrid">
                        {items.map((ev) => (
                          <article key={ev.id} className="eventCard">
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
