import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#fff',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
  fontSize: '0.875rem',
  padding: '4px 0',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
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
  fontSize: '0.875rem',
  padding: '4px 0',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
    marginBottom: '6px',
    padding: '6px 0',
  },
  '&:hover': {
    color: '#ff9800', // Orange color
    transform: 'translateX(4px)',
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
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: '#fff', 
                borderBottom: '2px solid #ff9800', 
                paddingBottom: '8px', 
                marginBottom: { xs: '12px', sm: '16px' }, 
                display: 'inline-block',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Tentang Kami
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                mb: { xs: 3, sm: 2 }, 
                lineHeight: 1.6,
                fontSize: { xs: '0.875rem', sm: '0.875rem' },
                textAlign: { xs: 'left', sm: 'left' }
              }}
            >
              PT Bayan Punca Digital adalah perusahaan teknologi digital yang menyediakan solusi website profesional dan transformasi digital untuk bisnis Anda.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: '#fff', 
                borderBottom: '2px solid #ff9800', 
                paddingBottom: '8px', 
                marginBottom: { xs: '12px', sm: '16px' }, 
                display: 'inline-block',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
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

          <Grid item xs={12} sm={12} md={4}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: '#fff', 
                borderBottom: '2px solid #ff9800', 
                paddingBottom: '8px', 
                marginBottom: { xs: '12px', sm: '16px' }, 
                display: 'inline-block',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Kontak
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              '& > *': {
                fontSize: { xs: '0.875rem', sm: '0.875rem' }
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
                  fontSize: { xs: '0.875rem', sm: '0.875rem' },
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