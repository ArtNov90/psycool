import "./Contact.css";

export default function Contact() {
  return (
    <div className="contactPage">
      <section className="contactHero">
        <div className="contactHeroOverlay" />
        <div className="contactHeroInner">
          <p className="contactEyebrow">Prendre rendez-vous</p>
          <h1>Contact du cabinet</h1>
          <p className="contactLead">
            Pour une premiere prise de contact, vous pouvez appeler, envoyer un email ou
            utiliser le formulaire ci-dessous.
          </p>
        </div>
      </section>

      <section className="contactQuick">
        <div className="contactQuickInner">
          <a className="quickCard" href="tel:+33687216605">
            <p className="quickLabel">Telephone</p>
            <p className="quickValue">+33 (0)6 87 21 66 05</p>
            <p className="quickHint">Du lundi au vendredi</p>
          </a>

          <a className="quickCard" href="mailto:chantalnovara@icloud.com">
            <p className="quickLabel">Email</p>
            <p className="quickValue">chantalnovara@icloud.com</p>
            <p className="quickHint">Reponse sous 24 a 48h</p>
          </a>

          <div className="quickCard">
            <p className="quickLabel">Consultation</p>
            <p className="quickValue">Cabinet ou visio</p>
            <p className="quickHint">Lattes et Brissac</p>
          </div>
        </div>
      </section>

      <section className="contactMain">
        <div className="contactMainInner">
          <article className="contactPanel contactFormPanel">
            <h2>Envoyer un message</h2>
            <p className="panelLead">
              Remplissez ce formulaire, puis envoyez-le: votre application email s'ouvrira
              automatiquement avec le contenu pre-rempli.
            </p>

            <form
              className="contactForm"
              action="mailto:chantalnovara@icloud.com"
              method="post"
              encType="text/plain"
            >
              <label className="field">
                <span>Nom et prenom</span>
                <input name="nom" type="text" required />
              </label>

              <label className="field">
                <span>Email</span>
                <input name="email" type="email" required />
              </label>

              <label className="field">
                <span>Telephone</span>
                <input name="telephone" type="tel" />
              </label>

              <label className="field">
                <span>Votre message</span>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Expliquez en quelques lignes votre besoin et vos disponibilites."
                  required
                />
              </label>

              <button type="submit" className="submitBtn">
                Envoyer le message
              </button>
            </form>
          </article>

          <aside className="contactPanel contactInfoPanel">
            <h2>Informations pratiques</h2>

            <div className="infoGroup">
              <h3>Adresses</h3>
              <p>Lattes (pres de Montpellier)</p>
              <p>Brissac (pres de Ganges)</p>
            </div>

            <div className="infoGroup">
              <h3>Modalites</h3>
              <p>Therapie individuelle et therapie de couple</p>
              <p>Seances en cabinet ou en visio</p>
            </div>

            <div className="infoGroup">
              <h3>Confidentialite</h3>
              <p>
                Chaque echange se fait dans un cadre d'ecoute, de respect et de confidentialite.
              </p>
            </div>

            <div className="infoActions">
              <a className="outlineBtn" href="tel:+33687216605">
                Appeler maintenant
              </a>
              <a className="outlineBtn" href="mailto:chantalnovara@icloud.com">
                Ecrire un email
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
