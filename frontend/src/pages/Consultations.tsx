import "./Consultations.css";

export default function Consultations() {
  return (
     <section className="consultations">
      <header className="consultationsHeader">
        <h1 className="consultationsTitle">Consultations</h1>
        <p className="consultationsLead">
          Prenez un moment pour découvrir les types de consultations disponibles
          et comment se déroule un premier rendez-vous.
        </p>
      </header>

      <section className="consultationsSection">
        <h2 className="consultationsSubtitle">Formats</h2>
        <ul className="consultationsList">
          <li>En cabinet</li>
          <li>En visioconsultation</li>
          <li>Suivi individuel</li>
        </ul>
      </section>

      <section className="consultationsSection">
        <h2 className="consultationsSubtitle">Prendre rendez-vous</h2>
        <p className="consultationsText">
          Contactez-moi pour fixer un créneau adapté à vos besoins.
        </p>
        <div className="consultationsActions">
          <a className="consultationsButton" href="mailto:contact@exemple.fr">
            Me contacter
          </a>
        </div>
      </section>
    </section>
  );
}
