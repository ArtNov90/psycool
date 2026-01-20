import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

type EventItem = {
  id: string;
  title: string;
  date: string;
  time?: string;
  city?: string;
  place?: string;
};

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

  return (
    <div className="stack">
      <h1>Conférences & Ateliers</h1>

      {events.length === 0 && (
        <p className="muted">Aucun événement pour le moment.</p>
      )}

      {events.map((ev) => (
        <div key={ev.id} className="card">
          <h2>{ev.title}</h2>

          <p className="muted">
            {ev.date}
            {ev.time ? ` • ${ev.time}` : ""}
          </p>

          {(ev.city || ev.place) && (
            <p>
              {ev.city ? `${ev.city}` : ""}
              {ev.city && ev.place ? " — " : ""}
              {ev.place ? ev.place : ""}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
