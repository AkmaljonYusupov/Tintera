import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  author?: string;
}

function SEO({
  title = "Tintera Decor Center",
  description = "Tintera Decor Center - декоративные краски, штукатурки и интерьерные решения в Ташкенте. Широкий ассортимент, европейское качество, доставка по Узбекистану.",
  keywords = "декоративная штукатурка, краски, интерьер, Tintera, Ташкент, дизайн интерьера, декоративные покрытия",
  image = "https://tintera.uz/og-image.jpg",
  url = "https://tintera.uz",
  type = "website",
  publishedTime,
  author = "Tintera Decor Center",
}: SEOProps) {
  const siteTitle = "Tintera Decor Center";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* ── Standart meta teglar ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* ── Open Graph (Facebook, LinkedIn) ── */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="ru_RU" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* ── Additional ── */}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#b48a64" />

      {/* ── Favicon ── */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Helmet>
  );
}

export default SEO;