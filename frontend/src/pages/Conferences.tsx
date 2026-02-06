import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
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

const BLOCKS: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4];

type DescriptionBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

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

  // regrouper par section (avec défaut = 1 si section absente)
  const grouped = useMemo(() => {
    const map: Record<1 | 2 | 3 | 4, EventItem[]> = { 1: [], 2: [], 3: [], 4: [] };

    const sorted = [...events].sort((a, b) => {
      const orderA = typeof a.order === "number" ? a.order : Number.MAX_SAFE_INTEGER;
      const orderB = typeof b.order === "number" ? b.order : Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return (a.date || "").localeCompare(b.date || "");
    });

    for (const e of sorted) {
      const s = (e.section ?? 1) as 1 | 2 | 3 | 4;
      map[s].push(e);
    }
    return map;
  }, [events]);

  return (
    <div className="confPage">
      <section className="confIntro">
        <div className="confIntroInner">
          <h1>Conférences &amp; Ateliers</h1>
          <p className="confIntroText">
            Découvrez les prochains ateliers organisés, ainsi que les thèmes abordés.
          </p>
          <div className="confDivider" />
        </div>
      </section>

      <section className="confList">
        <div className="confInner" style={{ textAlign: "left" }}>
          {events.length === 0 ? null : (
            <div className="confBlocks">
              {BLOCKS.map((block) => {
                const items = grouped[block];
                if (items.length === 0) return null;

                return (
                  <div key={block} className={`confBlock confBlock-${block}`}>
                    <div className="confBlockEvents">
                      {items.map((ev) => (
                        <article key={ev.id} className="eventPoster">
                          <div className="eventPosterInner">
                            <h3 className="eventTitle">{ev.title || "Sans titre"}</h3>

                            <p className="eventMeta">
                              {ev.date || "—"}
                              {ev.time ? ` à ${ev.time}` : ""}
                            </p>

                            {(ev.city || ev.place) && (
                              <p className="eventPlace">
                                {ev.city ?? ""}
                                {ev.city && ev.place ? " — " : ""}
                                {ev.place ?? ""}
                              </p>
                            )}

                            {parseDescription(ev.description).map((blockItem, index) => {
                              if (blockItem.type === "ul") {
                                return (
                                  <ul
                                    key={`${ev.id}-d-${index}`}
                                    className="eventDescriptionList"
                                  >
                                    {blockItem.items.map((item, itemIndex) => (
                                      <li key={`${ev.id}-d-${index}-${itemIndex}`}>
                                        {item}
                                      </li>
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
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
