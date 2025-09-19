import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SaveIcon from '@mui/icons-material/Save'
import SearchIcon from '@mui/icons-material/Search'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import TitleIcon from '@mui/icons-material/Title'

const SEOManager = () => {
  const [seoData, setSeoData] = useState({
    // Global SEO Settings
    siteName: 'PT Bayan Punca Digital',
    siteDescription: 'Solusi Digital Terpercaya untuk Bisnis Anda',
    siteKeywords: 'web development, digital marketing, SEO, website design',
    siteAuthor: 'PT Bayan Punca Digital',
    siteUrl: 'https://bayanpuncadigital.com',
    
    // Page-specific SEO
    pages: {
      home: {
        title: 'PT Bayan Punca Digital - Solusi Digital Terpercaya',
        description: 'Kami menyediakan layanan web development, digital marketing, dan SEO profesional untuk mengembangkan bisnis Anda di era digital.',
        keywords: 'web development, digital marketing, SEO, website profesional, jasa pembuatan website',
        ogTitle: 'PT Bayan Punca Digital - Solusi Digital Terpercaya',
        ogDescription: 'Layanan web development dan digital marketing profesional untuk bisnis Anda',
        ogImage: '/assets/logo-perusahaan/Logo-Bayan-Punca-Digital.png'
      },
      about: {
        title: 'Tentang Kami - PT Bayan Punca Digital',
        description: 'Pelajari lebih lanjut tentang PT Bayan Punca Digital, visi, misi, dan tim profesional kami dalam memberikan solusi digital terbaik.',
        keywords: 'tentang kami, profil perusahaan, visi misi, tim digital',
        ogTitle: 'Tentang PT Bayan Punca Digital',
        ogDescription: 'Mengenal lebih dekat PT Bayan Punca Digital dan komitmen kami dalam memberikan solusi digital terbaik',
        ogImage: '/assets/about/tentang-pt-bpd.png'
      },
      portfolio: {
        title: 'Portfolio - PT Bayan Punca Digital',
        description: 'Lihat portfolio dan proyek-proyek terbaik yang telah kami kerjakan untuk berbagai klien di berbagai industri.',
        keywords: 'portfolio, proyek website, case study, hasil kerja',
        ogTitle: 'Portfolio PT Bayan Punca Digital',
        ogDescription: 'Kumpulan proyek dan portfolio terbaik dari PT Bayan Punca Digital',
        ogImage: '/assets/portfolio-images/portfolio-showcase.jpg'
      },
      blog: {
        title: 'Blog - PT Bayan Punca Digital',
        description: 'Baca artikel terbaru tentang web development, digital marketing, SEO, dan tips bisnis digital dari para ahli.',
        keywords: 'blog, artikel, web development, digital marketing, SEO tips',
        ogTitle: 'Blog PT Bayan Punca Digital',
        ogDescription: 'Artikel dan tips terbaru seputar digital marketing dan web development',
        ogImage: '/assets/blog/blog-featured.jpg'
      },
      contact: {
        title: 'Kontak Kami - PT Bayan Punca Digital',
        description: 'Hubungi kami untuk konsultasi gratis tentang kebutuhan digital bisnis Anda. Tim profesional kami siap membantu.',
        keywords: 'kontak, hubungi kami, konsultasi, alamat, telepon',
        ogTitle: 'Hubungi PT Bayan Punca Digital',
        ogDescription: 'Konsultasi gratis untuk kebutuhan digital bisnis Anda',
        ogImage: '/assets/contact/contact-us.jpg'
      }
    },
    
    // Analytics & Tracking
    googleAnalyticsId: '',
    googleSearchConsoleId: '',
    metaPixelId: '',
    
    // Advanced SEO Settings
    robotsTxt: 'User-agent: *\nAllow: /',
    canonicalUrls: true,
    structuredData: true,
    sitemap: true
  })
  
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' })
  const [activeAccordion, setActiveAccordion] = useState('global')

  useEffect(() => {
    // Load SEO data from localStorage
    const savedSEOData = localStorage.getItem('seoSettings')
    if (savedSEOData) {
      setSeoData({ ...seoData, ...JSON.parse(savedSEOData) })
    }
  }, [])

  const handleSave = () => {
    try {
      localStorage.setItem('seoSettings', JSON.stringify(seoData))
      
      // Update document head for current page
      updateDocumentHead()
      
      setAlert({ 
        show: true, 
        message: 'Pengaturan SEO berhasil disimpan!', 
        type: 'success' 
      })
      
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000)
    } catch (error) {
      setAlert({ 
        show: true, 
        message: 'Gagal menyimpan pengaturan SEO', 
        type: 'error' 
      })
    }
  }

  const updateDocumentHead = () => {
    // Update page title
    const currentPage = getCurrentPage()
    if (seoData.pages[currentPage]) {
      document.title = seoData.pages[currentPage].title
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.name = 'description'
        document.head.appendChild(metaDescription)
      }
      metaDescription.content = seoData.pages[currentPage].description
      
      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.name = 'keywords'
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.content = seoData.pages[currentPage].keywords
    }
  }

  const getCurrentPage = () => {
    const path = window.location.pathname
    if (path === '/' || path === '/home') return 'home'
    if (path === '/about') return 'about'
    if (path === '/portfolio') return 'portfolio'
    if (path === '/blog') return 'blog'
    if (path === '/contact') return 'contact'
    return 'home'
  }

  const handlePageSEOChange = (page, field, value) => {
    setSeoData({
      ...seoData,
      pages: {
        ...seoData.pages,
        [page]: {
          ...seoData.pages[page],
          [field]: value
        }
      }
    })
  }

  const handleGlobalSEOChange = (field, value) => {
    setSeoData({
      ...seoData,
      [field]: value
    })
  }

  const generateSitemap = () => {
    const pages = Object.keys(seoData.pages)
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${seoData.siteUrl}${page === 'home' ? '' : '/' + page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === 'home' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`
    
    const blob = new Blob([sitemap], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sitemap.xml'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Box>
      {alert.show && (
        <Alert severity={alert.type} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="600">
          SEO Manager
        </Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Simpan Pengaturan
        </Button>
      </Box>

      {/* Global SEO Settings */}
      <Accordion 
        expanded={activeAccordion === 'global'} 
        onChange={() => setActiveAccordion(activeAccordion === 'global' ? '' : 'global')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box display="flex" alignItems="center" gap={1}>
            <SearchIcon color="primary" />
            <Typography variant="h6">Pengaturan SEO Global</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nama Situs"
                value={seoData.siteName}
                onChange={(e) => handleGlobalSEOChange('siteName', e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="URL Situs"
                value={seoData.siteUrl}
                onChange={(e) => handleGlobalSEOChange('siteUrl', e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Deskripsi Situs"
                value={seoData.siteDescription}
                onChange={(e) => handleGlobalSEOChange('siteDescription', e.target.value)}
                margin="normal"
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Keywords Global"
                value={seoData.siteKeywords}
                onChange={(e) => handleGlobalSEOChange('siteKeywords', e.target.value)}
                margin="normal"
                helperText="Pisahkan dengan koma"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Author"
                value={seoData.siteAuthor}
                onChange={(e) => handleGlobalSEOChange('siteAuthor', e.target.value)}
                margin="normal"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Page-specific SEO */}
      {Object.keys(seoData.pages).map((page) => (
        <Accordion key={page}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center" gap={1}>
              <TitleIcon color="primary" />
              <Typography variant="h6">
                SEO Halaman {page.charAt(0).toUpperCase() + page.slice(1)}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title Tag"
                  value={seoData.pages[page].title}
                  onChange={(e) => handlePageSEOChange(page, 'title', e.target.value)}
                  margin="normal"
                  helperText={`Panjang: ${seoData.pages[page].title.length}/60 karakter`}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Meta Description"
                  value={seoData.pages[page].description}
                  onChange={(e) => handlePageSEOChange(page, 'description', e.target.value)}
                  margin="normal"
                  multiline
                  rows={3}
                  helperText={`Panjang: ${seoData.pages[page].description.length}/160 karakter`}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Keywords"
                  value={seoData.pages[page].keywords}
                  onChange={(e) => handlePageSEOChange(page, 'keywords', e.target.value)}
                  margin="normal"
                  helperText="Pisahkan dengan koma"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Open Graph Title"
                  value={seoData.pages[page].ogTitle}
                  onChange={(e) => handlePageSEOChange(page, 'ogTitle', e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Open Graph Image"
                  value={seoData.pages[page].ogImage}
                  onChange={(e) => handlePageSEOChange(page, 'ogImage', e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Open Graph Description"
                  value={seoData.pages[page].ogDescription}
                  onChange={(e) => handlePageSEOChange(page, 'ogDescription', e.target.value)}
                  margin="normal"
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Analytics Integration */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box display="flex" alignItems="center" gap={1}>
            <AnalyticsIcon color="primary" />
            <Typography variant="h6">Integrasi Analytics & Tracking</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Google Analytics ID"
                value={seoData.googleAnalyticsId}
                onChange={(e) => handleGlobalSEOChange('googleAnalyticsId', e.target.value)}
                margin="normal"
                placeholder="G-XXXXXXXXXX"
                helperText="Masukkan Google Analytics 4 ID"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Google Search Console ID"
                value={seoData.googleSearchConsoleId}
                onChange={(e) => handleGlobalSEOChange('googleSearchConsoleId', e.target.value)}
                margin="normal"
                placeholder="google-site-verification=..."
                helperText="Kode verifikasi Search Console"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Meta Pixel ID"
                value={seoData.metaPixelId}
                onChange={(e) => handleGlobalSEOChange('metaPixelId', e.target.value)}
                margin="normal"
                placeholder="123456789012345"
                helperText="Facebook/Meta Pixel ID"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Advanced SEO Tools */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Tools & Utilitas SEO</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button
                  variant="outlined"
                  onClick={generateSitemap}
                >
                  Generate Sitemap
                </Button>
                <FormControlLabel
                  control={
                    <Switch
                      checked={seoData.canonicalUrls}
                      onChange={(e) => handleGlobalSEOChange('canonicalUrls', e.target.checked)}
                    />
                  }
                  label="Canonical URLs"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={seoData.structuredData}
                      onChange={(e) => handleGlobalSEOChange('structuredData', e.target.checked)}
                    />
                  }
                  label="Structured Data"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Robots.txt"
                value={seoData.robotsTxt}
                onChange={(e) => handleGlobalSEOChange('robotsTxt', e.target.value)}
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default SEOManager