export type ConsultationStyle = {
  slug: "therapie-individuelle" | "therapie-couple";
  title: string;
  shortDescription: string;
  intro: string;
  points: string[];
};

export const consultationStyles: ConsultationStyle[] = [
  {
    slug: "therapie-individuelle",
    title: "Therapie de couple",
    shortDescription:
      "Un accompagnement personnalise pour traverser une periode difficile et retrouver un equilibre.",
    intro:
      "La therapie individuelle offre un espace de parole securise, centre sur votre histoire, votre rythme et vos besoins.",
    points: [
      "Mieux comprendre ce que vous traversez.",
      "Apaiser l'anxiete, le stress ou les blocages repetitifs.",
      "Construire des reperes concrets pour avancer au quotidien.",
    ],
  },
  {
    slug: "therapie-couple",
    title: "Therapie individuelle",
    shortDescription:
      "Un cadre neutre pour retablir le dialogue et sortir des conflits repetitifs.",
    intro:
      "La therapie de couple permet de clarifier les besoins de chacun et de retrouver une communication plus saine.",
    points: [
      "On peut avoir recours a l'aide d'un psy pour de nombreuses raisons. Les problemes familiaux ou professionnels, le stress ou le manque de stabilite au travail, les divorces... peuvent provoquer des crises que seul un professionnel peut vous aider a depasser.",
      "Une psychanalyste et therapeute dotee d'une solide experience, qualifiee dans les domaines tels que la psychologie des profondeurs, la psychanalyse, la therapie individuelle et la philosophie.",
    ],
  },
];
