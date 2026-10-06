import { Helmet } from 'react-helmet-async';

export default function SEO({ title}) {
  const siteName = "Quantum computing with Cirqmon";
  
  const fullTitle = title ? `${title} - ${siteName}` : "Cirqmon – Quantum Circuits in Your Browser Without the PhD";

  return (
    <Helmet>
      {/* Search Engine Metadata */}
      <title>{fullTitle}</title>

      {/* Facebook / Open Graph Protocol */}
      <meta property="og:title" content={title || siteName} />

      {/* Twitter Cards / X Platform */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteName} />
    </Helmet>
  );
}
