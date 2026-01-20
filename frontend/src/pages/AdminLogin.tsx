import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      await signInWithEmailAndPassword(auth, email, pwd);
      nav("/admin");
    } catch {
      setErr("Connexion impossible. Vérifie l’email et le mot de passe.");
    }
  }

  return (
    <div className="panel" style={{ maxWidth: 520, margin: "0 auto" }}>
      <h1>Admin</h1>
      <p className="muted">Accès réservé.</p>

      <form className="form" onSubmit={onSubmit}>
        <label>
          Email
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Mot de passe
          <input className="input" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
        </label>

        <button className="btn" type="submit">Se connecter</button>
        {err && <p style={{ marginTop: 10 }}>{err}</p>}
      </form>
    </div>
  );
}
