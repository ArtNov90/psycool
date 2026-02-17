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
import { useEffect, useMemo, useState } from "react";
import { auth, db } from "../firebase";
import "./Conferences.css";

type EventItem = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  description?: string;
  time?: string;
  city?: string;
  place?: string;
  order?: number;
  type?: ConferenceType;
  section?: 1 | 2 | 3 | 4;
};

type ConferenceType = "cafepsy" | "masterclass";

type EventDraft = Omit<EventItem, "id">;
type FieldErrors = Partial<Record<keyof EventDraft, string>>;

const colRef = collection(db, "events");
const fieldErrorStyle = { color: "#ffb4b4", fontSize: 12, marginTop: 4 };
const fieldErrorInputStyle = {
  borderColor: "rgba(255, 80, 80, 0.8)",
  boxShadow: "0 0 0 1px rgba(255, 80, 80, 0.25)",
};

function getSortableDateValue(date?: string): number {
  if (!date) return Number.POSITIVE_INFINITY;
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return Number.POSITIVE_INFINITY;
  return parsed.getTime();
}

export default function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [form, setForm] = useState<EventDraft>({
    title: "",
    date: "",
    description: "",
    time: "",
    city: "",
    place: "",
    type: "cafepsy",
  });
  const [formErrors, setFormErrors] = useState<FieldErrors>({});
  const [drafts, setDrafts] = useState<Record<string, EventDraft>>({});
  const [draftErrors, setDraftErrors] = useState<Record<string, FieldErrors>>({});
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [deleting, setDeleting] = useState<Record<string, boolean>>({});
  const [adding, setAdding] = useState(false);

  const eventById = useMemo(() => {
    return new Map(events.map((ev) => [ev.id, ev]));
  }, [events]);

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const byDate = getSortableDateValue(a.date) - getSortableDateValue(b.date);
      if (byDate !== 0) return byDate;
      return (a.title || "").localeCompare(b.title || "");
    });
  }, [events]);

  useEffect(() => {
    const q = query(colRef, orderBy("date", "asc"));
    return onSnapshot(q, (snap) => {
      setEvents(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as EventDraft) }))
      );
    });
  }, []);

  useEffect(() => {
    setDrafts((current) => {
      const next = { ...current };
      events.forEach((ev) => {
        if (!next[ev.id]) {
          next[ev.id] = {
            title: ev.title ?? "",
            date: ev.date ?? "",
            description: ev.description ?? "",
            time: ev.time ?? "",
            city: ev.city ?? "",
            place: ev.place ?? "",
            type: normalizeConferenceType(ev),
          };
        }
      });
      return next;
    });
  }, [events]);

  function normalizeConferenceType(event: Pick<EventItem, "type" | "section">): ConferenceType {
    if (event.type === "cafepsy" || event.type === "masterclass") {
      return event.type;
    }

    const legacySection = event.section ?? 1;
    return legacySection % 2 === 0 ? "masterclass" : "cafepsy";
  }

  function validateDraft(draft: EventDraft): FieldErrors {
    const errors: FieldErrors = {};
    if (!draft.title?.trim()) errors.title = "Le titre est obligatoire.";
    if (!draft.date?.trim()) errors.date = "La date est obligatoire.";
    if (!draft.description?.trim()) errors.description = "La description est obligatoire.";
    if (!draft.time?.trim()) errors.time = "L'heure est obligatoire.";
    if (!draft.city?.trim()) errors.city = "La ville est obligatoire.";
    if (!draft.place?.trim()) errors.place = "Le lieu est obligatoire.";
    if (!draft.type) errors.type = "Le type de conference est obligatoire.";
    return errors;
  }

  async function addEvent(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setAdding(true);
    try {
      const errors = validateDraft(form);
      setFormErrors(errors);
      if (Object.keys(errors).length > 0) {
        return;
      }
      await addDoc(colRef, {
        title: form.title,
        date: form.date,
        description: form.description || "",
        time: form.time || "",
        city: form.city || "",
        place: form.place || "",
        type: form.type ?? "cafepsy",
      });
      setForm({ title: "", date: "", description: "", time: "", city: "", place: "", type: "cafepsy" });
      setFormErrors({});
    } catch (err) {
      setError("Impossible d'ajouter l'événement. Réessaie.");
    } finally {
      setAdding(false);
    }
  }

  async function removeEvent(id: string) {
    setError(null);
    setDeleting((current) => ({ ...current, [id]: true }));
    try {
      await deleteDoc(doc(db, "events", id));
      setDrafts((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
      setDraftErrors((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
    } catch (err) {
      setError("Impossible de supprimer l'événement. Réessaie.");
    } finally {
      setDeleting((current) => ({ ...current, [id]: false }));
    }
  }

  function updateDraft(id: string, patch: Partial<EventDraft>) {
    setDrafts((current) => ({
      ...current,
      [id]: { ...current[id], ...patch },
    }));
    setDraftErrors((current) => {
      const existing = current[id] ?? {};
      const next = { ...existing };
      (Object.keys(patch) as (keyof EventDraft)[]).forEach((key) => {
        delete next[key];
      });
      return { ...current, [id]: next };
    });
  }

  function resetDraft(id: string) {
    const base = eventById.get(id);
    if (!base) return;
    setDrafts((current) => ({
      ...current,
      [id]: {
        title: base.title ?? "",
        date: base.date ?? "",
        description: base.description ?? "",
        time: base.time ?? "",
        city: base.city ?? "",
        place: base.place ?? "",
        type: normalizeConferenceType(base),
      },
    }));
    setDraftErrors((current) => ({ ...current, [id]: {} }));
  }

  async function saveEvent(id: string) {
    const draft = drafts[id];
    if (!draft) return;
    setError(null);
    setSaving((current) => ({ ...current, [id]: true }));
    try {
      const errors = validateDraft(draft);
      setDraftErrors((current) => ({ ...current, [id]: errors }));
      if (Object.keys(errors).length > 0) {
        return;
      }
      const payload: Record<string, string | number> = {
        title: draft.title,
        date: draft.date,
        description: draft.description || "",
        time: draft.time || "",
        city: draft.city || "",
        place: draft.place || "",
      };
      if (draft.type) {
        payload.type = draft.type;
      }
      await updateDoc(doc(db, "events", id), payload);
    } catch (err) {
      setError("Impossible de modifier l'événement. Réessaie.");
    } finally {
      setSaving((current) => ({ ...current, [id]: false }));
    }
  }

  return (
    <div className="confPage">
      <section className="confIntro">
        <div className="confIntroInner">
          <h1>Gestion des conférences</h1>
          <p className="confIntroText">
            Ici, tu peux ajouter, modifier et réorganiser les événements.
          </p>
          <div className="confDivider" />
          <div style={{ marginTop: 18 }}>
            <button className="btn ghost" onClick={() => signOut(auth)}>
              Se déconnecter
            </button>
          </div>
        </div>
      </section>

      {error ? (
        <div className="panel" style={{ borderColor: "rgba(255,80,80,0.4)" }}>
          <p className="muted" style={{ color: "#ffb4b4" }}>
            {error}
          </p>
        </div>
      ) : null}

      <div className="panel">
        <h2>Ajouter un événement</h2>
        <form className="form" onSubmit={addEvent}>
          <label>
            Titre
            <input
              className="input"
              value={form.title}
              onChange={(e) => {
                setForm({ ...form, title: e.target.value });
                setFormErrors((current) => ({ ...current, title: undefined }));
              }}
              style={formErrors.title ? fieldErrorInputStyle : undefined}
              required
            />
            {formErrors.title ? <div style={fieldErrorStyle}>{formErrors.title}</div> : null}
          </label>

          <label>
            Date
            <input
              className="input"
              type="date"
              value={form.date}
              onChange={(e) => {
                setForm({ ...form, date: e.target.value });
                setFormErrors((current) => ({ ...current, date: undefined }));
              }}
              style={formErrors.date ? fieldErrorInputStyle : undefined}
              required
            />
            {formErrors.date ? <div style={fieldErrorStyle}>{formErrors.date}</div> : null}
          </label>

          <label>
            Description
            <textarea
              className="input"
              rows={3}
              value={form.description ?? ""}
              onChange={(e) => {
                setForm({ ...form, description: e.target.value });
                setFormErrors((current) => ({ ...current, description: undefined }));
              }}
              style={formErrors.description ? fieldErrorInputStyle : undefined}
              required
            />
            {formErrors.description ? (
              <div style={fieldErrorStyle}>{formErrors.description}</div>
            ) : null}
          </label>

          <label>
            Heure
            <input
              className="input"
              type="time"
              value={form.time ?? ""}
              onChange={(e) => {
                setForm({ ...form, time: e.target.value });
                setFormErrors((current) => ({ ...current, time: undefined }));
              }}
              style={formErrors.time ? fieldErrorInputStyle : undefined}
              required
            />
            {formErrors.time ? <div style={fieldErrorStyle}>{formErrors.time}</div> : null}
          </label>

          <label>
            Ville
            <input
              className="input"
              value={form.city ?? ""}
              onChange={(e) => {
                setForm({ ...form, city: e.target.value });
                setFormErrors((current) => ({ ...current, city: undefined }));
              }}
              style={formErrors.city ? fieldErrorInputStyle : undefined}
              required
            />
            {formErrors.city ? <div style={fieldErrorStyle}>{formErrors.city}</div> : null}
          </label>

          <label>
            Lieu
            <input
              className="input"
              value={form.place ?? ""}
              onChange={(e) => {
                setForm({ ...form, place: e.target.value });
                setFormErrors((current) => ({ ...current, place: undefined }));
              }}
              style={formErrors.place ? fieldErrorInputStyle : undefined}
              required
            />
            {formErrors.place ? <div style={fieldErrorStyle}>{formErrors.place}</div> : null}
          </label>

          <label>
            Type de conference
            <select
              className="input"
              value={form.type ?? "cafepsy"}
              onChange={(e) => {
                const value = e.target.value as ConferenceType;
                setForm({ ...form, type: value });
                setFormErrors((current) => ({ ...current, type: undefined }));
              }}
              style={formErrors.type ? fieldErrorInputStyle : undefined}
              required
            >
              <option value="cafepsy">CafePsy rigolo</option>
              <option value="masterclass">Masterclass</option>
            </select>
            {formErrors.type ? (
              <div style={fieldErrorStyle}>{formErrors.type}</div>
            ) : null}
          </label>

          <button className="btn" type="submit" disabled={adding}>
            {adding ? "Ajout..." : "Ajouter"}
          </button>
        </form>
      </div>

      <section className="confList">
        <div className="confInner" style={{ textAlign: "left" }}>
          <div className="confBlocks">
            {sortedEvents.map((ev) => {
              const draft = drafts[ev.id] ?? {
                title: ev.title ?? "",
                date: ev.date ?? "",
                description: ev.description ?? "",
                time: ev.time ?? "",
                city: ev.city ?? "",
                place: ev.place ?? "",
                type: normalizeConferenceType(ev),
              };
              const errors = draftErrors[ev.id] ?? {};
              return (
                <div key={ev.id} className={`confBlock confBlock-${normalizeConferenceType(draft)}`}>
                  <div className="confBlockEvents">
                    <article className="eventPoster">
                      <div className="eventPosterInner">
                        <div
                          className="muted"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 10,
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <span>
                            {ev.date}
                            {ev.time ? ` • ${ev.time}` : ""}
                          </span>
                        </div>

                        <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                          <label>
                            Titre
                            <input
                              className="input"
                              value={draft.title}
                              onChange={(e) =>
                                updateDraft(ev.id, { title: e.target.value })
                              }
                              style={errors.title ? fieldErrorInputStyle : undefined}
                              required
                            />
                            {errors.title ? <div style={fieldErrorStyle}>{errors.title}</div> : null}
                          </label>

                          <label>
                            Date
                            <input
                              className="input"
                              type="date"
                              value={draft.date}
                              onChange={(e) =>
                                updateDraft(ev.id, { date: e.target.value })
                              }
                              style={errors.date ? fieldErrorInputStyle : undefined}
                              required
                            />
                            {errors.date ? <div style={fieldErrorStyle}>{errors.date}</div> : null}
                          </label>

                          <label>
                            Description
                            <textarea
                              className="input"
                              rows={3}
                              value={draft.description ?? ""}
                              onChange={(e) =>
                                updateDraft(ev.id, { description: e.target.value })
                              }
                              style={errors.description ? fieldErrorInputStyle : undefined}
                              required
                            />
                            {errors.description ? (
                              <div style={fieldErrorStyle}>{errors.description}</div>
                            ) : null}
                          </label>

                          <label>
                            Heure
                            <input
                              className="input"
                              type="time"
                              value={draft.time ?? ""}
                              onChange={(e) =>
                                updateDraft(ev.id, { time: e.target.value })
                              }
                              style={errors.time ? fieldErrorInputStyle : undefined}
                              required
                            />
                            {errors.time ? <div style={fieldErrorStyle}>{errors.time}</div> : null}
                          </label>

                          <label>
                            Ville
                            <input
                              className="input"
                              value={draft.city ?? ""}
                              onChange={(e) =>
                                updateDraft(ev.id, { city: e.target.value })
                              }
                              style={errors.city ? fieldErrorInputStyle : undefined}
                              required
                            />
                            {errors.city ? <div style={fieldErrorStyle}>{errors.city}</div> : null}
                          </label>

                          <label>
                            Lieu
                            <input
                              className="input"
                              value={draft.place ?? ""}
                              onChange={(e) =>
                                updateDraft(ev.id, { place: e.target.value })
                              }
                              style={errors.place ? fieldErrorInputStyle : undefined}
                              required
                            />
                            {errors.place ? <div style={fieldErrorStyle}>{errors.place}</div> : null}
                          </label>

                          <label>
                            Type de conference
                            <select
                              className="input"
                              value={draft.type ?? "cafepsy"}
                              onChange={(e) => {
                                const value = e.target.value as ConferenceType;
                                updateDraft(ev.id, { type: value });
                              }}
                              style={errors.type ? fieldErrorInputStyle : undefined}
                              required
                            >
                              <option value="cafepsy">CafePsy rigolo</option>
                              <option value="masterclass">Masterclass</option>
                            </select>
                            {errors.type ? (
                              <div style={fieldErrorStyle}>{errors.type}</div>
                            ) : null}
                          </label>

                          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                            <button
                              className="btn"
                              type="button"
                              onClick={() => saveEvent(ev.id)}
                              disabled={saving[ev.id]}
                            >
                              {saving[ev.id] ? "Enregistrement..." : "Enregistrer"}
                            </button>
                            <button
                              className="btn ghost"
                              type="button"
                              onClick={() => resetDraft(ev.id)}
                              disabled={saving[ev.id]}
                            >
                              Réinitialiser
                            </button>
                            <button
                              className="btn ghost"
                              type="button"
                              onClick={() => removeEvent(ev.id)}
                              disabled={deleting[ev.id]}
                            >
                              {deleting[ev.id] ? "Suppression..." : "Supprimer"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

