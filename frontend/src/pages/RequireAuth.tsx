import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuthed(!!user);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <p>Chargement…</p>;
  if (!isAuthed) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
