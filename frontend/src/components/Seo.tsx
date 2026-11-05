const SITE_NAME = "Chantal Novara | Psychanalyste";
const SITE_URL = "https://psycool.info";

type SeoProps = {
  title: string;
  description: string;
  keywords: string[];
  path: string;
};

export default function Seo({ title, description, keywords, path }: SeoProps) {
  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
    </>
  );
}
