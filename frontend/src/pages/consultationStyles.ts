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
    title: "Thérapie individuelle",
    shortDescription:
      "Un accompagnement personnalisé pour traverser une période difficile et retrouver un équilibre.",
    intro:
      "La thérapie individuelle offre un espace de parole sécurisé, centré sur votre histoire, votre rythme et vos besoins.",
    points: [
      "Mieux comprendre ce que vous traversez.",
      "Apaiser l'anxiété, le stress ou les blocages répétitifs.",
      "Construire des repères concrets pour avancer au quotidien.",
    ],
  },
  {
    slug: "therapie-couple",
    title: "Thérapie de couple",
    shortDescription:
      "Un cadre neutre pour rétablir le dialogue et sortir des conflits répétitifs.",
    intro:
      "La thérapie de couple permet de clarifier les besoins de chacun et de retrouver une communication plus saine.",
    points: [
      "On peut avoir recours à l'aide d'un psy pour de nombreuses raisons. Les problèmes familiaux ou professionnels, le stress ou le manque de stabilité au travail, les divorces... peuvent provoquer des crises que seul un professionnel peut vous aider à dépasser.",
      "Une psychanalyste et thérapeute dotée d'une solide expérience, qualifiée dans des domaines tels que la psychologie des profondeurs, la psychanalyse, la thérapie individuelle et la philosophie.",
    ],
  },
];
