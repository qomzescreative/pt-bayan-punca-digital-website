import { Box, Container, Typography, Button, Grid } from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import WhatsAppButton from '../components/WhatsAppButton'
import AnimatedSection from '../components/AnimatedSection'
import LazyImage from '../components/LazyImage'
import SEOHead from '../components/SEOHead'
import { getPageMeta } from '../content/siteSettings'

const scrollAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
  padding: theme.spacing(12, 0, 8),
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(8, 0, 6),
    minHeight: '70vh',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 0, 4),
    minHeight: '60vh',
  },
}))

const ActionButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
  padding: theme.spacing(1.8, 4.5),
  borderRadius: '50px',
  fontWeight: 700,
  fontSize: '1.1rem',
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1.5, 3.5),
    fontSize: '1rem',
    marginRight: theme.spacing(1.5),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2, 3),
    fontSize: '0.95rem',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
    width: '100%',
    maxWidth: '280px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'left 0.6s',
  },
  '&:hover::before': {
    left: '100%',
  },
  '&.primary': {
    background: 'linear-gradient(135deg, #FF6B00 0%, #FF8533 50%, #FFA366 100%)',
    color: '#fff',
    border: '2px solid transparent',
    '&:hover': {
      background: 'linear-gradient(135deg, #E55A00 0%, #FF6B00 50%, #FF8533 100%)',
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 25px rgba(255, 107, 0, 0.4)',
    },
    '&:active': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
    },
  },
  '&.secondary': {
    background: 'transparent',
    border: '2px solid #FF6B00',
    color: '#FF6B00',
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.1) 0%, rgba(255, 133, 51, 0.15) 100%)',
      borderColor: '#E55A00',
      color: '#E55A00',
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 25px rgba(255, 107, 0, 0.2)',
    },
    '&:active': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 15px rgba(255, 107, 0, 0.15)',
    },
  },
}))

function Home() {
  const pageMeta = getPageMeta('home')
  
  return (
    <Box>
      <SEOHead 
        title={pageMeta.title}
        description={pageMeta.description}
        keywords={pageMeta.keywords}
        canonicalUrl={pageMeta.canonicalUrl}
        ogType={pageMeta.ogType}
        ogImage={pageMeta.ogImage}
        ogUrl={pageMeta.ogUrl}
      />
      <HeroSection>
        <Container maxWidth="lg" className="responsive-container">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <AnimatedSection animation="fadeInLeft">
                <Box sx={{ textAlign: 'justify' }}>
                  <Typography
                    variant="h1"
                    className="responsive-text-5xl responsive-text-center"
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: 'secondary.main',
                      textAlign: 'justify',
                      mb: 3,
                    }}
                  >
                    Digitalisasikan Bisnis Anda Bersama PT Bayan Punca Digital
                  </Typography>
                <Typography
                  variant="h6"
                  className="responsive-text-xl"
                  sx={{
                    color: 'text.secondary',
                    mb: 4,
                    lineHeight: 1.6,
                    textAlign: 'justify',
                  }}
                >
                  Kami adalah perusahaan teknologi yang berfokus pada pengembangan solusi digital inovatif untuk membantu bisnis Anda berkembang di era digital.
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2.5, 
                  flexWrap: 'wrap',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'center', sm: 'flex-start' },
                  mt: 1
                }}>
                  <ActionButton
                    component={Link}
                    to="/kontak"
                    variant="contained"
                    className="primary responsive-button"
                    aria-label="Hubungi kami untuk konsultasi gratis"
                  >
                    Hubungi Kami
                  </ActionButton>
                  <ActionButton
                    component={Link}
                    to="/tentang-kami#layanan"
                    variant="outlined"
                    className="secondary responsive-button"
                    aria-label="Jelajahi layanan digital kami"
                  >
                    Jelajahi Layanan
                  </ActionButton>
                </Box>
                </Box>
              </AnimatedSection>
            </Grid>
            <Grid item xs={12} md={6}>
              <AnimatedSection animation="fadeInRight">
                <Box sx={{ textAlign: 'center' }}>
                  <LazyImage
                    src="/assets/hero-image.svg"
                    alt="Digital Solutions"
                    sx={{
                      width: '100%',
                      maxWidth: 500,
                      height: 'auto',
                    }}
                  />
                </Box>
              </AnimatedSection>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Services Section */}
      <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg" className="responsive-section responsive-container">
          <Typography
            variant="h2"
            className="responsive-text-4xl responsive-text-center"
            sx={{
              fontWeight: 700,
              mb: 6,
              color: 'primary.main',
            }}
          >
            Layanan Kami
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ 
                textAlign: 'center', 
                p: 4, 
                backgroundColor: 'white',
                borderRadius: 3, 
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                border: '2px solid transparent',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 48px rgba(255, 107, 0, 0.2)',
                  border: '2px solid #FF6B00',
                  '& .service-icon': {
                    transform: 'scale(1.1) rotate(5deg)',
                    filter: 'drop-shadow(0 8px 16px rgba(255, 107, 0, 0.3))'
                  }
                }
              }}>
                <Box
                  component="img"
                  src="/assets/website-icon.svg"
                  alt="Website Development"
                  className="service-icon"
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mb: 3,
                    transition: 'all 0.3s ease',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                  }}
                />
                <Typography variant="h5" className="responsive-text-2xl" sx={{ fontWeight: 600, mb: 2, color: '#2B2B2B' }}>
                  Pengembangan Website
                </Typography>
                <Typography variant="body1" className="responsive-text-base" sx={{ color: 'text.secondary', lineHeight: 1.6, flexGrow: 1 }}>
                  Membangun website modern dan responsif yang sesuai dengan kebutuhan bisnis Anda dengan teknologi terdepan.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ 
                textAlign: 'center', 
                p: 4, 
                backgroundColor: 'white',
                borderRadius: 3, 
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                border: '2px solid transparent',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 48px rgba(255, 107, 0, 0.2)',
                  border: '2px solid #FF6B00',
                  '& .service-icon': {
                    transform: 'scale(1.1) rotate(-5deg)',
                    filter: 'drop-shadow(0 8px 16px rgba(255, 107, 0, 0.3))'
                  }
                }
              }}>
                <Box
                  component="img"
                  src="/assets/app-icon.svg"
                  alt="Mobile App Development"
                  className="service-icon"
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mb: 3,
                    transition: 'all 0.3s ease',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                  }}
                />
                <Typography variant="h5" className="responsive-text-2xl" sx={{ fontWeight: 600, mb: 2, color: '#2B2B2B' }}>
                  Aplikasi Mobile
                </Typography>
                <Typography variant="body1" className="responsive-text-base" sx={{ color: 'text.secondary', lineHeight: 1.6, flexGrow: 1 }}>
                  Mengembangkan aplikasi mobile yang user-friendly untuk iOS dan Android dengan performa optimal.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ 
                textAlign: 'center', 
                p: 4, 
                backgroundColor: 'white',
                borderRadius: 3, 
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                border: '2px solid transparent',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 48px rgba(255, 107, 0, 0.2)',
                  border: '2px solid #FF6B00',
                  '& .service-icon': {
                    transform: 'scale(1.1) rotate(5deg)',
                    filter: 'drop-shadow(0 8px 16px rgba(255, 107, 0, 0.3))'
                  }
                }
              }}>
                <Box
                  component="img"
                  src="/assets/digital-icon.svg"
                  alt="Digital Marketing"
                  className="service-icon"
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mb: 3,
                    transition: 'all 0.3s ease',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                  }}
                />
                <Typography variant="h5" className="responsive-text-2xl" sx={{ fontWeight: 600, mb: 2, color: '#2B2B2B' }}>
                  Digital Marketing
                </Typography>
                <Typography variant="body1" className="responsive-text-base" sx={{ color: 'text.secondary', lineHeight: 1.6, flexGrow: 1 }}>
                  Strategi pemasaran digital yang efektif untuk meningkatkan visibilitas online dan konversi bisnis.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Clients Section */}
      <Box sx={{ py: 8, backgroundColor: 'white' }}>
        <Container maxWidth="lg" className="responsive-section">
          <Typography
            variant="h2"
            className="responsive-text-4xl responsive-text-center"
            sx={{
              fontWeight: 700,
              mb: 6,
              color: 'primary.main',
            }}
          >
            Terimakasih Sudah Mempercayakan Kami
          </Typography>
          
          {/* First Row - Moving Right */}
          <Box sx={{ 
            overflow: 'hidden',
            width: '100%',
            mb: 4
          }}>
            <Box sx={{ 
              display: 'flex',
              gap: 4,
              animation: `${scrollAnimation} 30s linear infinite`,
              minWidth: 'calc(300px * 8)' // 4 items * 2 for seamless loop
            }}>
            {/* First Row - Original logos */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minWidth: '300px', 
              height: '120px',
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              }
            }}>
              <Box
                component="img"
                src="/assets/gambar-klien/1 MEC .png"
                alt="MEC - PT. MATRA ENGINEERING & CONSTRUCTION"
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '80px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minWidth: '300px', 
              height: '120px',
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              }
            }}>
              <Box
                component="img"
                src="/assets/gambar-klien/2. PGP (Permata Gunung Putra) .png"
                alt="PT. PERMATA GUNUNG PUTRA"
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '80px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minWidth: '300px', 
              height: '120px',
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              }
            }}>
              <Box
                component="img"
                src="/assets/gambar-klien/3. Mitra Tunas Klien .png"
                alt="PT MITRA TUNAS HARAPAN"
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '80px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minWidth: '300px', 
              height: '120px',
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              }
            }}>
              <Box
                component="img"
                src="/assets/gambar-klien/4. Delicia Klien .png"
                alt="PT. DELICIA KARYA UTAMA"
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '80px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            
            {/* First Row - Duplicate logos for seamless loop */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minWidth: '300px', 
              height: '120px',
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              }
            }}>
              <Box
                component="img"
                src="/assets/gambar-klien/1 MEC .png"
                alt="MEC - PT. MATRA ENGINEERING & CONSTRUCTION"
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '80px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minWidth: '300px', 
              height: '120px',
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              }
            }}>
              <Box
                component="img"
                src="/assets/gambar-klien/2. PGP (Permata Gunung Putra) .png"
                alt="PT. PERMATA GUNUNG PUTRA"
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '80px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minWidth: '300px', 
              height: '120px',
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              }
            }}>
              <Box
                component="img"
                src="/assets/gambar-klien/3. Mitra Tunas Klien .png"
                alt="PT MITRA TUNAS HARAPAN"
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '80px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minWidth: '300px', 
              height: '120px',
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              }
            }}>
              <Box
                component="img"
                src="/assets/gambar-klien/4. Delicia Klien .png"
                alt="PT. DELICIA KARYA UTAMA"
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '80px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            </Box>
          </Box>
          
          {/* Second Row - Moving Left */}
          <Box sx={{ 
            overflow: 'hidden',
            width: '100%',
            mb: 4
          }}>
            <Box sx={{ 
              display: 'flex',
              gap: 4,
              animation: `${scrollAnimation} 30s linear infinite reverse`,
              minWidth: 'calc(300px * 8)' // 4 items * 2 for seamless loop
            }}>
            {/* Second Row - Original logos */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minWidth: '300px', 
              height: '120px',
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              }
            }}>
              <Box
                component="img"
                src="/assets/gambar-klien/5. PT Sagara .png"
                alt="PT SAGARA"
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '80px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minWidth: '300px', 
              height: '120px',
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              }
            }}>
              <Box
                component="img"
                src="/assets/gambar-klien/6. Karsa Cipta P .png"
                alt="PT KARSA CIPTA PERSADA"
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '80px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minWidth: '300px', 
              height: '120px',
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              }
            }}>
              <Box
                component="img"
                src="/assets/gambar-klien/7. SBN Klien .jpeg"
                alt="PT SAKA BUANA NUSANTARA"
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '80px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minWidth: '300px', 
              height: '120px',
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              }
            }}>
              <Box
                component="img"
                src="/assets/gambar-klien/8. Satria Garuda Banten .png"
                alt="PT SATRIA GARUDA BANTEN"
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '80px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            
            {/* Second Row - Duplicate logos for seamless loop */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minWidth: '300px', 
              height: '120px',
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              }
            }}>
              <Box
                component="img"
                src="/assets/gambar-klien/5. PT Sagara .png"
                alt="PT SAGARA"
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '80px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minWidth: '300px', 
              height: '120px',
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              }
            }}>
              <Box
                component="img"
                src="/assets/gambar-klien/6. Karsa Cipta P .png"
                alt="PT KARSA CIPTA PERSADA"
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '80px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minWidth: '300px', 
              height: '120px',
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              }
            }}>
              <Box
                component="img"
                src="/assets/gambar-klien/7. SBN Klien .jpeg"
                alt="PT SAKA BUANA NUSANTARA"
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '80px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minWidth: '300px', 
              height: '120px',
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              }
            }}>
              <Box
                component="img"
                src="/assets/gambar-klien/8. Satria Garuda Banten .png"
                alt="PT SATRIA GARUDA BANTEN"
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '80px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      
      <WhatsAppButton />
    </Box>
  )
}

export default Home