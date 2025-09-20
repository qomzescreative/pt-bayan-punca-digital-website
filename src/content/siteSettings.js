// Centralized site settings for SEO and meta management
export const siteSettings = {
  // Global site information
  siteName: "PT Bayan Punca Digital",
  siteUrl: "https://bayanpuncadigital.com",
  defaultImage: "https://bayanpuncadigital.com/logo.png",
  
  // Company information for JSON-LD
  company: {
    name: "PT Bayan Punca Digital",
    legalName: "PT Bayan Punca Digital",
    url: "https://bayanpuncadigital.com",
    logo: "https://bayanpuncadigital.com/logo.png",
    telephone: "+62-817-2707-3736",
    email: "bayanpuncadigital@gmail.com",
    address: {
      streetAddress: "Komp Perumahan Puri Sava Waringin Kurung Blok B2 No 2",
      addressLocality: "Cilegon",
      addressRegion: "Banten",
      addressCountry: "ID",
      postalCode: "42435"
    },
    sameAs: [
      "https://www.instagram.com/bayanpuncadigital",
      "https://www.tiktok.com/@bayanpuncadigital",
      "https://www.linkedin.com/company/bayanpuncadigital"
    ]
  },

  // Page-specific meta data
  pages: {
    home: {
      title: "PT Bayan Punca Digital - Solusi Digital Terpercaya untuk Bisnis Anda",
      description: "PT Bayan Punca Digital adalah perusahaan teknologi digital yang menyediakan solusi website profesional dan transformasi digital untuk bisnis Anda di Cilegon, Banten.",
      keywords: "PT Bayan Punca Digital, website development, digital transformation, Cilegon, Banten, solusi digital, teknologi",
      ogType: "website"
    },
    about: {
      title: "Tentang Kami - PT Bayan Punca Digital",
      description: "Kenali lebih dekat PT Bayan Punca Digital, perusahaan teknologi digital terpercaya yang berpengalaman dalam memberikan solusi digital inovatif untuk bisnis Anda.",
      keywords: "tentang PT Bayan Punca Digital, profil perusahaan, tim digital, pengalaman teknologi",
      ogType: "website"
    },
    portfolio: {
      title: "Portfolio - Karya Digital PT Bayan Punca Digital",
      description: "Lihat portfolio dan karya-karya digital terbaik dari PT Bayan Punca Digital. Berbagai proyek website, aplikasi, dan solusi digital yang telah kami kerjakan.",
      keywords: "portfolio PT Bayan Punca Digital, karya digital, proyek website, aplikasi, case study",
      ogType: "website"
    },
    blog: {
      title: "Blog - Tips & Insight Digital dari PT Bayan Punca Digital",
      description: "Baca artikel terbaru tentang teknologi digital, tips bisnis online, dan insight industri dari para ahli PT Bayan Punca Digital.",
      keywords: "blog PT Bayan Punca Digital, artikel teknologi, tips digital marketing, insight bisnis online",
      ogType: "website"
    },
    contact: {
      title: "Kontak - Hubungi PT Bayan Punca Digital",
      description: "Hubungi PT Bayan Punca Digital untuk konsultasi gratis tentang kebutuhan digital bisnis Anda. Kami siap membantu transformasi digital perusahaan Anda.",
      keywords: "kontak PT Bayan Punca Digital, konsultasi digital, hubungi kami, alamat kantor Cilegon",
      ogType: "website"
    }
  },

  // Social media links
  socialMedia: {
    whatsapp: "https://wa.me/6281727073736",
    instagram: "https://www.instagram.com/bayanpuncadigital",
    tiktok: "https://www.tiktok.com/@bayanpuncadigital",
    linkedin: "https://www.linkedin.com/company/bayanpuncadigital"
  },

  // Default meta tags
  defaultMeta: {
    robots: "index, follow",
    author: "PT Bayan Punca Digital",
    language: "id-ID",
    charset: "UTF-8"
  }
}

// Helper function to get page meta data
export const getPageMeta = (pageName) => {
  const page = siteSettings.pages[pageName]
  if (!page) {
    return siteSettings.pages.home // fallback to home
  }
  
  return {
    ...page,
    canonicalUrl: `${siteSettings.siteUrl}${pageName === 'home' ? '/' : `/${pageName === 'about' ? 'tentang-kami' : pageName}`}`,
    ogImage: siteSettings.defaultImage,
    ogUrl: `${siteSettings.siteUrl}${pageName === 'home' ? '/' : `/${pageName === 'about' ? 'tentang-kami' : pageName}`}`
  }
}