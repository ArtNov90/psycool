import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";

type EventItem = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  city?: string;
  place?: string;
};

const colRef = collection(db, "events");

export default function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [form, setForm] = useState<Omit<EventItem, "id">>({
    title: "",
    date: "",
    time: "",
    city: "",
    place: "",
  });

  useEffect(() => {
    const q = query(colRef, orderBy("date", "asc"));
    return onSnapshot(q, (snap) => {
      setEvents(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<EventItem, "id">) }))
      );
    });
  }, []);

  async function addEvent(e: React.FormEvent) {
    e.preventDefault();
    await addDoc(colRef, {
      title: form.title,
      date: form.date,
      time: form.time || "",
      city: form.city || "",
      place: form.place || "",
    });
    setForm({ title: "", date: "", time: "", city: "", place: "" });
  }

  async function removeEvent(id: string) {
    await deleteDoc(doc(db, "events", id));
  }

  async function quickEditTitle(id: string, title: string) {
    await updateDoc(doc(db, "events", id), { title });
  }

  return (
    <div className="stack">
      <div className="panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Gestion des conférences</h1>
          <p className="muted">Ici, ta mère peut ajouter/modifier/supprimer les événements.</p>
        </div>
        <button className="btn ghost" onClick={() => signOut(auth)}>Se déconnecter</button>
      </div>

      <div className="panel">
        <h2>Ajouter un événement</h2>
        <form className="form" onSubmit={addEvent}>
          <label>
            Titre
            <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </label>

          <label>
            Date (YYYY-MM-DD)
            <input className="input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          </label>

          <label>
            Heure (optionnel)
            <input className="input" value={form.time ?? ""} onChange={(e) => setForm({ ...form, time: e.target.value })} />
          </label>

          <label>
            Ville (optionnel)
            <input className="input" value={form.city ?? ""} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          </label>

          <label>
            Lieu (optionnel)
            <input className="input" value={form.place ?? ""} onChange={(e) => setForm({ ...form, place: e.target.value })} />
          </label>

          <button className="btn" type="submit">Ajouter</button>
        </form>
      </div>

      <div className="panel">
        <h2>Événements</h2>
        <div style={{ display: "grid", gap: 12 }}>
          {events.map((ev) => (
            <div key={ev.id} className="card" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="muted" style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <span>{ev.date}{ev.time ? ` • ${ev.time}` : ""}</span>
                <button className="btn ghost" onClick={() => removeEvent(ev.id)}>Supprimer</button>
              </div>

              <input
                className="input"
                value={ev.title}
                onChange={(e) => quickEditTitle(ev.id, e.target.value)}
                style={{ marginTop: 10 }}
              />

              <div className="muted" style={{ marginTop: 8 }}>
                {ev.city ? `${ev.city} — ` : ""}{ev.place ?? ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
