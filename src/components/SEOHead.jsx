import { Helmet } from 'react-helmet-async'
import { siteSettings } from '../content/siteSettings'

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  ogType = 'website',
  ogImage,
  ogUrl,
  noIndex = false,
  customMeta = []
}) => {
  // Use site settings as fallback
  const finalTitle = title || siteSettings.pages.home.title
  const finalDescription = description || siteSettings.pages.home.description
  const finalOgImage = ogImage || siteSettings.defaultImage
  const finalCanonicalUrl = canonicalUrl || siteSettings.siteUrl
  const finalOgUrl = ogUrl || canonicalUrl || siteSettings.siteUrl

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={siteSettings.defaultMeta.author} />
      <meta name="language" content={siteSettings.defaultMeta.language} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : siteSettings.defaultMeta.robots} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:url" content={finalOgUrl} />
      <meta property="og:site_name" content={siteSettings.siteName} />
      <meta property="og:locale" content="id_ID" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1976d2" />
      <meta name="msapplication-TileColor" content="#1976d2" />
      
      {/* Custom Meta Tags */}
      {customMeta.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}
      
      {/* JSON-LD Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": siteSettings.company.name,
          "legalName": siteSettings.company.legalName,
          "url": siteSettings.company.url,
          "logo": siteSettings.company.logo,
          "telephone": siteSettings.company.telephone,
          "email": siteSettings.company.email,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": siteSettings.company.address.streetAddress,
            "addressLocality": siteSettings.company.address.addressLocality,
            "addressRegion": siteSettings.company.address.addressRegion,
            "addressCountry": siteSettings.company.address.addressCountry,
            "postalCode": siteSettings.company.address.postalCode
          },
          "sameAs": siteSettings.company.sameAs
        })}
      </script>
    </Helmet>
  )
}

export default SEOHead