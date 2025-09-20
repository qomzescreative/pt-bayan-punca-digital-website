import { Box, Container, Grid, Typography, Link as MuiLink, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#fff',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
  fontSize: '0.8rem',
  padding: '4px 0',
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: '6px',
    padding: '6px 0',
  },
  '&:hover': {
    color: '#ff9800', // Orange color
    transform: 'translateX(4px)',
  },
}))

const ContactLink = styled(MuiLink)(({ theme }) => ({
  color: '#fff',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
  fontSize: '0.8rem',
  padding: '4px 0',
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: '6px',
    padding: '6px 0',
  },
  '&:hover': {
    color: '#ff9800', // Orange color
    transform: 'translateX(4px)',
  },
}))

const SocialMediaButton = styled(IconButton)(({ theme }) => ({
  color: '#fff',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  margin: '0 8px 8px 0',
  width: '40px',
  height: '40px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#ff9800',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(255, 152, 0, 0.3)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '36px',
    height: '36px',
    margin: '0 6px 6px 0',
  },
}))

const FooterSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#1a1a1a',
  color: '#fff',
  padding: theme.spacing(4, 0),
  marginTop: 'auto',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 0),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(6, 0),
  },
}))

function Footer() {
  return (
    <FooterSection>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, sm: 4, md: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: '#fff', 
                borderBottom: '2px solid #ff9800', 
                paddingBottom: '8px', 
                marginBottom: { xs: '12px', sm: '16px' }, 
                display: 'inline-block',
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' }
              }}
            >
              Tentang Kami
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                mb: { xs: 3, sm: 2 }, 
                lineHeight: 1.6,
                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                textAlign: { xs: 'left', sm: 'left' }
              }}
            >
              PT Bayan Punca Digital adalah perusahaan teknologi digital yang menyediakan solusi website profesional dan transformasi digital untuk bisnis Anda.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: '#fff', 
                borderBottom: '2px solid #ff9800', 
                paddingBottom: '8px', 
                marginBottom: { xs: '12px', sm: '16px' }, 
                display: 'inline-block',
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' }
              }}
            >
              Tautan Cepat
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              mb: { xs: 3, sm: 0 }
            }}>
              <FooterLink to="/tentang-kami">➤ Tentang</FooterLink>
              <FooterLink to="/blog">➤ Blog</FooterLink>
              <FooterLink to="/portfolio">➤ Proyek</FooterLink>
            </Box>
          </Grid>

          {/* Social Media Section - New Position */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: '#fff', 
                borderBottom: '2px solid #ff9800', 
                paddingBottom: '8px', 
                marginBottom: { xs: '12px', sm: '16px' }, 
                display: 'inline-block',
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' }
              }}
            >
              Ikuti Kami
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              mb: { xs: 3, sm: 0 }
            }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 2,
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                  lineHeight: 1.6
                }}
              >
                Terhubung dengan kami di media sosial untuk update terbaru
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <SocialMediaButton
                  component="a"
                  href="https://instagram.com/bayanpuncadigital"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </SocialMediaButton>
                
                <SocialMediaButton
                  component="a"
                  href="https://tiktok.com/@bayanpuncadigital"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </SocialMediaButton>
                
                <SocialMediaButton
                  component="a"
                  href="https://linkedin.com/company/bayanpuncadigital"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </SocialMediaButton>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: '#fff', 
                borderBottom: '2px solid #ff9800', 
                paddingBottom: '8px', 
                marginBottom: { xs: '12px', sm: '16px' }, 
                display: 'inline-block',
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' }
              }}
            >
              Kontak
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              '& > *': {
                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
              }
            }}>
              <ContactLink href="tel:+6287727073796">
                📞 +62 877-2707-3796
              </ContactLink>
              <ContactLink href="mailto:bayanpuncadigital@gmail.com">
                📧 bayanpuncadigital@gmail.com
              </ContactLink>
              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 1, 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                  lineHeight: 1.5
                }}
              >
                📍 Komp Perumaham Puri Sava Waringin Kurung Blok B 2 No 2
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} PT Bayan Punca Digital. All rights reserved.
            {' | '}
            <Link 
              to="/admin" 
              style={{ 
                color: 'rgba(255,255,255,0.3)', 
                textDecoration: 'none',
                fontSize: '0.75rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#ff9800'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.3)'}
            >
              Admin
            </Link>
          </Typography>
        </Box>
      </Container>
    </FooterSection>
  )
}

export default Footer