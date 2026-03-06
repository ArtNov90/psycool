import { useScrollReveal } from "../hooks/useScrollReveal";
import "./EnglishTherapy.css";

const englishFaqItems = [
  {
    question: "When should I consult a psychologist?",
    answer:
      "It is relevant to consult when you are going through a difficult period (grief, separation, job loss), when emotional suffering persists (anxiety, sadness, irritability), or when repetitive patterns keep you from moving forward. You do not need to wait for a crisis.",
  },
  {
    question: "How does a first consultation work?",
    answer:
      "The first consultation helps us get to know each other and clarify what brings you here. We assess your needs together and whether my approach fits you. There is no obligation to continue afterward.",
  },
  {
    question: "Are online sessions effective?",
    answer:
      "Yes. Research and my 10+ years of online practice show outcomes comparable to in-person sessions for most situations, with greater flexibility.",
  },
];

export default function EnglishTherapy() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section className="englishTherapyPage" ref={revealRef}>
      <header className="englishTherapyHero">
        <div className="englishTherapyHeroInner">
          <p className="englishTherapyEyebrow" data-reveal data-reveal-delay="60ms">
            English Speaking Therapy
          </p>
          <h1 className="englishTherapyTitle" data-reveal data-reveal-delay="120ms">
            Therapy in English
          </h1>
          <p className="englishTherapyLead" data-reveal data-reveal-delay="180ms">
            Don&apos;t feel lost in translation !
          </p>
        </div>
      </header>

      <section className="englishTherapyFaq" data-reveal data-reveal-delay="120ms">
        <p className="englishTherapyFaqEyebrow">FREQUENTLY ASKED QUESTIONS</p>
        <h2 className="englishTherapyFaqTitle">Before starting</h2>
        <div className="englishTherapyFaqList">
          {englishFaqItems.map((item) => (
            <article key={item.question} className="englishTherapyFaqItem">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="englishTherapyCta" data-reveal data-reveal-delay="140ms">
        <h2>Ready to take the first step?</h2>
        <p>The first step is often the hardest. I am here to support you with care.</p>
        <a href="tel:+33687216605" className="englishTherapyCtaButton">
          Book an appointment
        </a>
      </section>
    </section>
  );
}
