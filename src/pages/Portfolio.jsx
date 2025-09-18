import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState, useEffect } from 'react'
import WhatsAppButton from '../components/WhatsAppButton'
import { getImageFromStorage } from '../utils/imageUtils'

const ProjectCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}))

// Load portfolios from localStorage or use default data
const getPortfoliosFromStorage = () => {
  try {
    const stored = localStorage.getItem('portfolios')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading portfolios from localStorage:', error)
  }
  
  // Default data if localStorage is empty
  return [
    {
      id: 1,
      title: 'Corporate Website Development – PT Permata Gunung Putra',
      category: 'Web Development',
      description: '',
      image: '/assets/portfolio-images/Portfolio PT Permata Gunung Putra/Portfolio Permata Gunung Putra.png',
      technologies: ['Corporate Website', 'Company Profile', 'PDF Integration', 'Responsive Design'],
      tags: ['Corporate Website', 'Company Profile', 'PDF Integration', 'Responsive Design'],
      link: '#',
      featured: true,
      status: 'published',
      date: '2023-12-15'
    },
    {
      id: 2,
      title: 'Social Media Management & Website Update – PT Matra Engineering & Construction',
      category: 'Digital Marketing',
      description: '',
      image: '/assets/portfolio-images/Portfolio PT Matra Eng & Cons/MEC Website .png',
      technologies: ['Social Media Management', 'Website Update', 'Digital Presence', 'Content Management'],
      tags: ['Social Media Management', 'Website Update', 'Digital Presence', 'Content Management'],
      link: '#',
      featured: false,
      status: 'published',
      date: '2023-12-10'
    },
    {
      id: 3,
      title: 'PT Karsa Cipta Pancarona',
      category: 'Web Development',
      description: '',
      image: '/assets/portfolio-images/Portfolio PT Karsa Cipta Pancarona/Portfolio Karsa Cipta Pancarona .png',
      technologies: ['Web Development', 'Custom Solutions'],
      tags: ['Web Development', 'Custom Solutions'],
      link: '#',
      featured: true,
      status: 'published',
      date: '2023-12-08'
    },
    {
      id: 4,
      title: 'PT Mitra Tunas Harapan',
      category: 'Branding',
      description: '',
      image: '/assets/portfolio-images/Portfolio PT Mitra Tunas Harapan/Mitra Tunas Harapan .png',
      technologies: ['Website Development', 'Branding'],
      tags: ['Website Development', 'Branding'],
      link: '#',
      featured: false,
      status: 'published',
      date: '2023-12-05'
    },
    {
      id: 5,
      title: 'PT Delicia Karya Utama',
      category: 'Web Development',
      description: '',
      image: '/assets/portfolio-images/Portfolio PT Delicia Karya Utama/Portfolio PT Delicia Karya Utama.png',
      technologies: ['Website Development', 'Corporate Website'],
      tags: ['Website Development', 'Corporate Website'],
      link: '#',
      featured: true,
      status: 'published',
      date: '2023-12-03'
    },
    {
      id: 6,
      title: 'PT Sagara Bumi Tehnik',
      category: 'Web Design',
      description: '',
      image: '/assets/portfolio-images/Portfolio PT Sagara Bumi Tehnik/Portfolio PT Sagara Bumi Tehnik .png',
      technologies: ['Company Profile', 'Web Design'],
      tags: ['Company Profile', 'Web Design'],
      link: '#',
      featured: false,
      status: 'published',
      date: '2023-12-01'
    }
  ]
}

const Tag = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  padding: '4px 12px',
  margin: '2px',
  borderRadius: '16px',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  fontSize: '0.75rem',
  fontWeight: 500,
}))

function Portfolio() {
  const [projects, setProjects] = useState(getPortfoliosFromStorage())

  // Reload data when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setProjects(getPortfoliosFromStorage())
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(() => {
      setProjects(getPortfoliosFromStorage())
    }, 1000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg" className="responsive-section responsive-container">
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          className="responsive-text-4xl"
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Portfolio
        </Typography>

        <Typography
          variant="h6"
          align="center"
          className="responsive-text-lg"
          sx={{ mb: 6, color: 'text.secondary', maxWidth: '800px', mx: 'auto' }}
        >
          Kami bangga telah membantu berbagai perusahaan dari berbagai sektor untuk
          mencapai tujuan digital mereka. Berikut beberapa proyek unggulan kami:
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProjectCard className="responsive-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={getImageFromStorage(project.image) || project.image}
                  alt={project.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent className="responsive-card-content" sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3" className="responsive-text-lg">
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="responsive-text-sm"
                    sx={{ mb: 2 }}
                  >
                    {project.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {project.tags.map((tag, idx) => (
                      <Tag key={idx}>{tag}</Tag>
                    ))}
                  </Box>
                </CardContent>
              </ProjectCard>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: '30px',
              padding: '12px 32px',
              fontSize: '1.1rem',
            }}
          >
            Lihat Lebih Banyak Proyek
          </Button>
        </Box>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Mari Wujudkan Proyek Digital Anda
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '600px', mx: 'auto' }}>
            Setiap proyek adalah kesempatan baru untuk menciptakan solusi digital yang
            inovatif. Kami siap membantu mewujudkan visi digital Anda.
          </Typography>
        </Box>
      </Container>
      <WhatsAppButton />
    </Box>
  )
}

export default Portfolio