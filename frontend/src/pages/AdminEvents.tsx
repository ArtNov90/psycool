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
  startTime?: string;
  endTime?: string;
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

const TYPE_LABELS: Record<ConferenceType, string> = {
  cafepsy: "CafePsy rigolo",
  masterclass: "Masterclass",
};

function extractLegacyTimes(time?: string): { startTime: string; endTime: string } {
  if (!time) return { startTime: "", endTime: "" };
  const parts = time.split("-").map((item) => item.trim());
  if (parts.length >= 2) {
    return { startTime: parts[0] ?? "", endTime: parts[1] ?? "" };
  }
  return { startTime: time.trim(), endTime: "" };
}

function buildTimeRange(startTime?: string, endTime?: string): string {
  if (startTime && endTime) return `${startTime} - ${endTime}`;
  return startTime || endTime || "";
}

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
    startTime: "",
    endTime: "",
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
          const legacyTimes = extractLegacyTimes(ev.time);
          next[ev.id] = {
            title: ev.title ?? "",
            date: ev.date ?? "",
            description: ev.description ?? "",
            startTime: ev.startTime ?? legacyTimes.startTime,
            endTime: ev.endTime ?? legacyTimes.endTime,
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
    if (!draft.startTime?.trim()) errors.startTime = "L'heure de début est obligatoire.";
    if (!draft.endTime?.trim()) errors.endTime = "L'heure de fin est obligatoire.";
    if (draft.startTime?.trim() && draft.endTime?.trim() && draft.startTime >= draft.endTime) {
      errors.endTime = "L'heure de fin doit être après l'heure de début.";
    }
    if (!draft.city?.trim()) errors.city = "La ville est obligatoire.";
    if (!draft.place?.trim()) errors.place = "Le lieu est obligatoire.";
    if (!draft.type) errors.type = "Le type de conférence est obligatoire.";
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
        startTime: form.startTime || "",
        endTime: form.endTime || "",
        time: buildTimeRange(form.startTime, form.endTime),
        city: form.city || "",
        place: form.place || "",
        type: form.type ?? "cafepsy",
      });
      setForm({
        title: "",
        date: "",
        description: "",
        startTime: "",
        endTime: "",
        city: "",
        place: "",
        type: "cafepsy",
      });
      setFormErrors({});
    } catch {
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
    } catch {
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
        startTime: base.startTime ?? extractLegacyTimes(base.time).startTime,
        endTime: base.endTime ?? extractLegacyTimes(base.time).endTime,
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
        startTime: draft.startTime || "",
        endTime: draft.endTime || "",
        time: buildTimeRange(draft.startTime, draft.endTime),
        city: draft.city || "",
        place: draft.place || "",
      };
      if (draft.type) {
        payload.type = draft.type;
      }
      await updateDoc(doc(db, "events", id), payload);
    } catch {
      setError("Impossible de modifier l'événement. Réessaie.");
    } finally {
      setSaving((current) => ({ ...current, [id]: false }));
    }
  }

  function renderFieldError(message?: string) {
    return message ? <div style={fieldErrorStyle}>{message}</div> : null;
  }

  return (
    <div className="confPage adminEventsPage">
      <section className="confHero adminHero">
        <div className="confHeroOverlay" />
        <div className="confHeroInner adminHeroInner">
          <p className="confEyebrow">Espace admin</p>
          <h1>Gestion des conférences</h1>
          <p className="confHeroLead adminHeroLead">
            Ajoutez, modifiez et relisez les événements dans une interface plus claire, tout en
            gardant la main sur le titre, la date, les horaires, le lieu et le texte.
          </p>
          <div className="adminHeroStats">
            <article className="adminStatCard">
              <span className="adminStatValue">{events.length}</span>
              <span className="adminStatLabel">événement{events.length > 1 ? "s" : ""}</span>
            </article>
            <article className="adminStatCard">
              <span className="adminStatValue">{sortedEvents.filter((ev) => normalizeConferenceType(ev) === "cafepsy").length}</span>
              <span className="adminStatLabel">CafePsy</span>
            </article>
            <article className="adminStatCard">
              <span className="adminStatValue">{sortedEvents.filter((ev) => normalizeConferenceType(ev) === "masterclass").length}</span>
              <span className="adminStatLabel">Masterclass</span>
            </article>
          </div>
          <div className="confHeroActions adminHeroActions">
            <button className="confHeroBtn confHeroBtnPrimary adminActionButton" onClick={() => signOut(auth)}>
              Se déconnecter
            </button>
          </div>
        </div>
      </section>

      <section className="adminPanelWrap">
        {error ? (
          <div className="adminNotice adminNoticeError">
            <p>{error}</p>
          </div>
        ) : null}

        <article className="adminComposer">
          <div className="adminComposerHeader">
            <div>
              <p className="adminSectionEyebrow">Nouvel événement</p>
              <h2>Ajouter un nouvel événement</h2>
            </div>
            <p className="adminSectionText">
              Remplissez les informations principales. Le type choisi définira automatiquement le
              bon bloc visuel dans la liste.
            </p>
          </div>

          <form className="adminEventForm" onSubmit={addEvent}>
            <label className="adminField adminFieldWide">
              <span>Titre</span>
              <input
                className="adminInput"
                value={form.title}
                onChange={(e) => {
                  setForm({ ...form, title: e.target.value });
                  setFormErrors((current) => ({ ...current, title: undefined }));
                }}
                style={formErrors.title ? fieldErrorInputStyle : undefined}
                required
              />
              {renderFieldError(formErrors.title)}
            </label>

            <label className="adminField">
              <span>Date</span>
              <input
                className="adminInput"
                type="date"
                value={form.date}
                onChange={(e) => {
                  setForm({ ...form, date: e.target.value });
                  setFormErrors((current) => ({ ...current, date: undefined }));
                }}
                style={formErrors.date ? fieldErrorInputStyle : undefined}
                required
              />
              {renderFieldError(formErrors.date)}
            </label>

            <label className="adminField">
              <span>Heure de début</span>
              <input
                className="adminInput"
                type="time"
                value={form.startTime ?? ""}
                onChange={(e) => {
                  setForm({ ...form, startTime: e.target.value });
                  setFormErrors((current) => ({ ...current, startTime: undefined }));
                }}
                style={formErrors.startTime ? fieldErrorInputStyle : undefined}
                required
              />
              {renderFieldError(formErrors.startTime)}
            </label>

            <label className="adminField">
              <span>Heure de fin</span>
              <input
                className="adminInput"
                type="time"
                value={form.endTime ?? ""}
                onChange={(e) => {
                  setForm({ ...form, endTime: e.target.value });
                  setFormErrors((current) => ({ ...current, endTime: undefined }));
                }}
                style={formErrors.endTime ? fieldErrorInputStyle : undefined}
                required
              />
              {renderFieldError(formErrors.endTime)}
            </label>

            <label className="adminField">
              <span>Ville</span>
              <input
                className="adminInput"
                value={form.city ?? ""}
                onChange={(e) => {
                  setForm({ ...form, city: e.target.value });
                  setFormErrors((current) => ({ ...current, city: undefined }));
                }}
                style={formErrors.city ? fieldErrorInputStyle : undefined}
                required
              />
              {renderFieldError(formErrors.city)}
            </label>

            <label className="adminField">
              <span>Lieu</span>
              <input
                className="adminInput"
                value={form.place ?? ""}
                onChange={(e) => {
                  setForm({ ...form, place: e.target.value });
                  setFormErrors((current) => ({ ...current, place: undefined }));
                }}
                style={formErrors.place ? fieldErrorInputStyle : undefined}
                required
              />
              {renderFieldError(formErrors.place)}
            </label>

            <label className="adminField">
              <span>Type de conférence</span>
              <select
                className="adminInput"
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
              {renderFieldError(formErrors.type)}
            </label>

            <label className="adminField adminFieldWide">
              <span>Description</span>
              <textarea
                className="adminInput adminTextarea"
                rows={5}
                value={form.description ?? ""}
                onChange={(e) => {
                  setForm({ ...form, description: e.target.value });
                  setFormErrors((current) => ({ ...current, description: undefined }));
                }}
                style={formErrors.description ? fieldErrorInputStyle : undefined}
                required
              />
              {renderFieldError(formErrors.description)}
            </label>

            <div className="adminComposerActions">
              <button className="confHeroBtn confHeroBtnPrimary adminActionButton" type="submit" disabled={adding}>
                {adding ? "Ajout..." : "Ajouter l'événement"}
              </button>
            </div>
          </form>
        </article>
      </section>

      <section className="confList">
        <div className="confInner adminListWrap">
          <div className="adminListHeader">
            <div>
              <p className="adminSectionEyebrow">Événements existants</p>
              <h2>Modifier les cartes comme sur la page Atelier/Psycool</h2>
            </div>
          </div>
          <div className="confBlocks">
            {sortedEvents.map((ev) => {
              const legacyTimes = extractLegacyTimes(ev.time);
              const draft = drafts[ev.id] ?? {
                title: ev.title ?? "",
                date: ev.date ?? "",
                description: ev.description ?? "",
                startTime: ev.startTime ?? legacyTimes.startTime,
                endTime: ev.endTime ?? legacyTimes.endTime,
                city: ev.city ?? "",
                place: ev.place ?? "",
                type: normalizeConferenceType(ev),
              };
              const errors = draftErrors[ev.id] ?? {};
              const eventType = normalizeConferenceType(draft);
              return (
                <div key={ev.id} className={`confBlock confBlock-${eventType} adminEventBlock`}>
                  <div className="confBlockInner">
                    <article className="adminEventCard">
                      <div className="adminEventCardHeader">
                        <div className="adminEventMeta">
                          <span className="adminEventType">{TYPE_LABELS[eventType]}</span>
                          <p className="adminEventSchedule">
                            {draft.date || "Date à renseigner"}
                            {buildTimeRange(draft.startTime, draft.endTime)
                              ? ` - ${buildTimeRange(draft.startTime, draft.endTime)}`
                              : ""}
                          </p>
                        </div>
                        <p className="adminEventLocation">
                          {[draft.city, draft.place].filter(Boolean).join(" - ") || "Lieu à renseigner"}
                        </p>
                      </div>

                      <div className="adminEventForm">
                        <label className="adminField adminFieldWide">
                          <span>Titre</span>
                          <input
                            className="adminInput"
                            value={draft.title}
                            onChange={(e) => updateDraft(ev.id, { title: e.target.value })}
                            style={errors.title ? fieldErrorInputStyle : undefined}
                            required
                          />
                          {renderFieldError(errors.title)}
                        </label>

                        <label className="adminField">
                          <span>Date</span>
                          <input
                            className="adminInput"
                            type="date"
                            value={draft.date}
                            onChange={(e) => updateDraft(ev.id, { date: e.target.value })}
                            style={errors.date ? fieldErrorInputStyle : undefined}
                            required
                          />
                          {renderFieldError(errors.date)}
                        </label>

                        <label className="adminField">
                          <span>Heure de début</span>
                          <input
                            className="adminInput"
                            type="time"
                            value={draft.startTime ?? ""}
                            onChange={(e) => updateDraft(ev.id, { startTime: e.target.value })}
                            style={errors.startTime ? fieldErrorInputStyle : undefined}
                            required
                          />
                          {renderFieldError(errors.startTime)}
                        </label>

                        <label className="adminField">
                          <span>Heure de fin</span>
                          <input
                            className="adminInput"
                            type="time"
                            value={draft.endTime ?? ""}
                            onChange={(e) => updateDraft(ev.id, { endTime: e.target.value })}
                            style={errors.endTime ? fieldErrorInputStyle : undefined}
                            required
                          />
                          {renderFieldError(errors.endTime)}
                        </label>

                        <label className="adminField">
                          <span>Ville</span>
                          <input
                            className="adminInput"
                            value={draft.city ?? ""}
                            onChange={(e) => updateDraft(ev.id, { city: e.target.value })}
                            style={errors.city ? fieldErrorInputStyle : undefined}
                            required
                          />
                          {renderFieldError(errors.city)}
                        </label>

                        <label className="adminField">
                          <span>Lieu</span>
                          <input
                            className="adminInput"
                            value={draft.place ?? ""}
                            onChange={(e) => updateDraft(ev.id, { place: e.target.value })}
                            style={errors.place ? fieldErrorInputStyle : undefined}
                            required
                          />
                          {renderFieldError(errors.place)}
                        </label>

                        <label className="adminField">
                          <span>Type de conférence</span>
                          <select
                            className="adminInput"
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
                          {renderFieldError(errors.type)}
                        </label>

                        <label className="adminField adminFieldWide">
                          <span>Description</span>
                          <textarea
                            className="adminInput adminTextarea"
                            rows={6}
                            value={draft.description ?? ""}
                            onChange={(e) => updateDraft(ev.id, { description: e.target.value })}
                            style={errors.description ? fieldErrorInputStyle : undefined}
                            required
                          />
                          {renderFieldError(errors.description)}
                        </label>
                      </div>

                      <div className="adminCardActions">
                        <button
                          className="confHeroBtn confHeroBtnPrimary adminActionButton"
                          type="button"
                          onClick={() => saveEvent(ev.id)}
                          disabled={saving[ev.id]}
                        >
                          {saving[ev.id] ? "Enregistrement..." : "Enregistrer"}
                        </button>
                        <button
                          className="confHeroBtn adminActionButton"
                          type="button"
                          onClick={() => resetDraft(ev.id)}
                          disabled={saving[ev.id]}
                        >
                          Réinitialiser
                        </button>
                        <button
                          className="confHeroBtn adminActionButton adminDeleteButton"
                          type="button"
                          onClick={() => removeEvent(ev.id)}
                          disabled={deleting[ev.id]}
                        >
                          {deleting[ev.id] ? "Suppression..." : "Supprimer"}
                        </button>
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
