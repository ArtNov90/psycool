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
  section?: 1 | 2 | 3 | 4; // 👈 nouveau
};

const BLOCKS: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4];

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

    for (const e of events) {
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
    {events.length === 0 ? (
      <p className="muted">Aucun événement pour le moment.</p>
    ) : (
      <div className="confBlocks">
        {BLOCKS.map((block) => {
          const items = grouped[block];

          return (
            <div key={block} className="confBlock">
              <div className="confBlockEvents">
                {items.length === 0 ? (
                  <p className="muted">Aucun événement.</p>
                ) : (
                  items.map((ev) => (
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

                        {ev.description && (
                          <p className="eventDescription">
                            {ev.description}
                          </p>
                        )}
                      </div>
                    </article>
                  ))
                )}
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