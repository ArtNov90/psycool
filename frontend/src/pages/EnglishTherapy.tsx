import { useScrollReveal } from "../hooks/useScrollReveal";
import Seo from "../components/Seo";
import "./EnglishTherapy.css";

const englishFaqItems = [
  {
    question: "When should I consult a psychoanalyst?",
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
      "Yes. Research and my 10+ years of online practice show outcomes comparable to in-person sessions for most situations, with greater flexibility. Online sessions and contact can take place through WhatsApp or Google Meet.",
  },
];

const iconProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const englishServices = [
  {
    title: "Individual therapy",
    text: "A space to go through, understand and let go",
    color: "var(--color-sage)",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
      </svg>
    ),
  },
  {
    title: "Couples therapy",
    text: "Rebuild dialogue, ease conflicts, reinvent the relationship",
    color: "var(--color-peach)",
    icon: (
      <svg {...iconProps}>
        <circle cx="8.5" cy="8" r="3.2" />
        <circle cx="15.5" cy="8" r="3.2" />
        <path d="M2.5 20c0-3.6 2.7-6 6-6 1.4 0 2.6.4 3.5 1.1" />
        <path d="M21.5 20c0-3.6-2.7-6-6-6-1.4 0-2.6.4-3.5 1.1" />
      </svg>
    ),
  },
  {
    title: "In person or online",
    text: "Near Montpellier or online, wherever you are",
    color: "var(--color-sky)",
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="4.5" width="16" height="11" rx="1.5" />
        <path d="M2 19.5h20" />
      </svg>
    ),
  },
  {
    title: "Confidential",
    text: "A safe, private and caring setting",
    color: "var(--color-wheat)",
    icon: (
      <svg {...iconProps}>
        <rect x="5" y="10.5" width="14" height="10" rx="2" />
        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      </svg>
    ),
  },
];

const englishAudience = [
  {
    title: "Expats and international families",
    text: "Settling in a new country brings its share of changes, solitude and questions. Talking in your own language makes a real difference.",
    color: "var(--color-sky)",
    icon: (
      <svg {...iconProps}>
        <path d="M21 15.5 13.5 11V5.5a1.5 1.5 0 0 0-3 0V11L3 15.5v2l7.5-2.3V19l-2 1.5V22l3.5-1 3.5 1v-1.5l-2-1.5v-3.8l7.5 2.3z" />
      </svg>
    ),
  },
  {
    title: "International students",
    text: "Studying abroad can be exciting and overwhelming at the same time. A space to step back and find your balance.",
    color: "var(--color-sage)",
    icon: (
      <svg {...iconProps}>
        <path d="M3 9.5 12 5l9 4.5-9 4.5z" />
        <path d="M7 11.6V16c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.4" />
      </svg>
    ),
  },
  {
    title: "Bilingual couples",
    text: "When two cultures and two languages meet, misunderstandings can grow. English can become a shared ground to talk again.",
    color: "var(--color-peach)",
    icon: (
      <svg {...iconProps}>
        <path d="M4 5h9v7H8l-4 3z" />
        <path d="M11 15h5l4 3v-9h-4" />
      </svg>
    ),
  },
];

const englishCredentials = [
  "Professor at the University of Montpellier",
  "Psychoanalyst trained in the Jungian, Freudian and Lacanian traditions",
  "Master's degree in psychoanalysis and philosophy",
  "C.G. Jung Institute in Zurich",
  "Freudian Institute of Montpellier",
  "Trainer for psychotherapists and psychoanalysts",
];

export default function EnglishTherapy() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section className="englishTherapyPage" ref={revealRef}>
      <Seo
        title="Therapy in English with a Psychoanalyst | Chantal Novara, Montpellier"
        description="English-speaking psychoanalyst based in Montpellier, France. Online and in-person sessions for expats and English speakers dealing with anxiety, grief, stress or relationship issues."
        keywords={[
          "therapy in English Montpellier",
          "English speaking psychologist France",
          "English speaking therapist Montpellier",
          "online therapy in English",
          "psychoanalyst for expats France",
          "anxiety therapy English",
          "couples therapy in English",
          "English speaking counsellor France",
        ]}
        path="/english-therapy"
      />
      <header className="englishTherapyHero">
        <svg className="englishTherapyLeaf" viewBox="0 0 120 200" aria-hidden="true">
          <path d="M60 195 C 58 140, 52 80, 30 10" />
          <path d="M57 150 C 30 140, 18 120, 16 98 C 40 104, 54 124, 57 150 Z" />
          <path d="M55 115 C 80 104, 92 84, 94 62 C 70 70, 56 90, 55 115 Z" />
          <path d="M48 78 C 26 70, 16 50, 16 30 C 36 38, 46 56, 48 78 Z" />
        </svg>
        <div className="englishTherapyHeroInner">
          <p className="englishTherapyEyebrow" data-reveal data-reveal-delay="60ms">
            English Speaking Therapy
          </p>
          <h1 className="englishTherapyTitle" data-reveal data-reveal-delay="120ms">
            Therapy in English
          </h1>
          <div className="englishTherapyRule" aria-hidden="true" />
          <p className="englishTherapyLead" data-reveal data-reveal-delay="180ms">
            Don&apos;t feel lost in translation !
          </p>
          <p className="englishTherapyIntro" data-reveal data-reveal-delay="220ms">
            Whether you are an expat, an international student or simply more at ease expressing
            yourself in English, I offer psychoanalytic therapy in English, in my office near
            Montpellier or online, wherever you are.
          </p>
          <a
            className="englishTherapyCtaButton"
            href="https://wa.me/33687216605"
            target="_blank"
            rel="noreferrer"
            data-reveal
            data-reveal-delay="260ms"
          >
            Book an appointment
          </a>
        </div>
      </header>

      <ul className="englishTherapyServices">
        {englishServices.map((service, index) => (
          <li key={service.title} data-reveal data-reveal-delay={`${80 + index * 60}ms`}>
            <span className="englishTherapyIcon" style={{ background: service.color }} aria-hidden="true">
              {service.icon}
            </span>
            <span className="englishTherapyServiceTitle">{service.title}</span>
            <span className="englishTherapyServiceText">{service.text}</span>
          </li>
        ))}
      </ul>

      <section className="englishTherapySection">
        <p className="englishTherapyFaqEyebrow" data-reveal>
          WHO IS IT FOR?
        </p>
        <h2 className="englishTherapySectionTitle" data-reveal data-reveal-delay="60ms">
          A space to speak freely
        </h2>
        <div className="englishTherapyAudience">
          {englishAudience.map((item, index) => (
            <article
              key={item.title}
              className="englishTherapyAudienceCard"
              data-reveal
              data-reveal-delay={`${100 + index * 70}ms`}
            >
              <span className="englishTherapyIcon" style={{ background: item.color }} aria-hidden="true">
                {item.icon}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="englishTherapySection englishTherapyAbout">
        <p className="englishTherapyFaqEyebrow" data-reveal>
          ABOUT ME
        </p>
        <h2 className="englishTherapySectionTitle" data-reveal data-reveal-delay="60ms">
          Chantal Novara, psychoanalyst
        </h2>
        <p className="englishTherapyScript" data-reveal data-reveal-delay="100ms">
          30 years of listening and teaching
        </p>
        <ul className="englishTherapyCredentials">
          {englishCredentials.map((item, index) => (
            <li key={item} data-reveal data-reveal-delay={`${120 + index * 40}ms`}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="englishTherapyFaq" data-reveal data-reveal-delay="120ms">
        <p className="englishTherapyFaqEyebrow">FREQUENTLY ASKED QUESTIONS</p>
        <h2 className="englishTherapyFaqTitle">Before starting</h2>
        <div className="englishTherapyFaqList">
          {englishFaqItems.map((item, index) => (
            <details key={item.question} className="englishTherapyFaqItem" open={index === 0}>
              <summary>
                <h3>{item.question}</h3>
                <span className="englishTherapyFaqToggle" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
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
