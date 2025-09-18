import React from "react";
import { Box, Container, Typography, Grid, Paper, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import WhatsAppButton from '../components/WhatsAppButton'

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  position: 'relative',
  marginBottom: theme.spacing(4),
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: 0,
    width: '70px',
    height: '4px',
    backgroundColor: theme.palette.primary.main,
  },
}))

const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}))

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(6),
  borderRadius: theme.spacing(0, 0, 4, 4),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "linear-gradient(60deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
    backgroundSize: "100px 100px",
    opacity: 0.2,
  },
}))

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(6, 0),
  "&::before, &::after": {
    borderColor: theme.palette.primary.main,
  },
}))

const About = () => {
  return (
    <>
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={10} textAlign="center">
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" className="responsive-text-4xl">
                PT Bayan Punca Digital
              </Typography>
              <Typography variant="h5" gutterBottom className="responsive-text-lg">
                Mitra Digital Terpercaya Anda
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" className="responsive-section responsive-container">
        <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Box sx={{ pr: { md: 2 } }}>
              <Typography variant="body1" paragraph className="responsive-text-base" sx={{ mb: 3, textAlign: "justify" }}>
                PT Bayan Punca Digital merupakan perusahaan berbasis teknologi digital yang berawal dari CV Media Solusi Abadi. Dengan semakin tingginya permintaan pasar dan kebutuhan akan profesionalisme, perusahaan melakukan transformasi menjadi Perseroan Terbatas (PT).
              </Typography>
              <Typography variant="body1" paragraph className="responsive-text-base" sx={{ mb: 3, textAlign: "justify" }}>
                Dengan pendekatan berbasis teknologi terkini, PT Bayan Punca Digital berkomitmen mendukung bisnis agar mampu bersaing di era digital yang semakin kompetitif. Kami meyakini bahwa "Website Profesional Sebagai Wajah Resmi Bisnis Anda" bukan hanya sekadar slogan, melainkan filosofi utama yang mendorong setiap layanan kami.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <Box
              component="img"
              src="/tentang-pt-bpd.png"
              alt="Tentang PT Bayan Punca Digital"
              sx={{ 
                width: '100%', 
                height: 'auto', 
                maxHeight: 400, 
                objectFit: 'cover', 
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Grid>
        </Grid>

        <StyledDivider>
          <Typography variant="h6" color="primary.main">
            Visi & Misi
          </Typography>
        </StyledDivider>
        
        <Grid container spacing={3} className="responsive-grid responsive-grid-cols-2" sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <InfoCard elevation={2}>
              <Typography variant="h5" gutterBottom color="primary.main">
                Filosofi Kami
              </Typography>
              <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                "Website Profesional adalah Wajah Resmi Bisnis Anda"
              </Typography>
              <Typography variant="body1">
                Komitmen kami dalam setiap proyek yang kami kerjakan.
              </Typography>
            </InfoCard>
          </Grid>
        </Grid>

        <StyledDivider textAlign="center">
          <Typography variant="h4" color="primary.main" fontWeight="bold" className="responsive-text-3xl">
            Visi & Misi
          </Typography>
        </StyledDivider>

        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} md={5}>
            <InfoCard elevation={3}>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography variant="h4" gutterBottom color="primary.main" fontWeight="bold">
                  Visi
                </Typography>
                <Divider sx={{ width: "60px", mx: "auto", mb: 3, borderColor: "primary.main", borderWidth: 2 }} />
              </Box>
              <Typography variant="body1" sx={{ fontSize: "1.1rem", textAlign: "center" }}>
                Menjadi mitra utama dalam transformasi digital bisnis di Indonesia dengan
                solusi yang mudah diakses dan efektif.
              </Typography>
            </InfoCard>
          </Grid>

          <Grid item xs={12} md={5}>
            <InfoCard elevation={3}>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography variant="h4" gutterBottom color="primary.main" fontWeight="bold">
                  Misi
                </Typography>
                <Divider sx={{ width: "60px", mx: "auto", mb: 3, borderColor: "primary.main", borderWidth: 2 }} />
              </Box>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" variant="body1" paragraph sx={{ fontSize: "1.05rem" }}>
                  Memberikan layanan digital praktis dan cepat
                </Typography>
                <Typography component="li" variant="body1" paragraph sx={{ fontSize: "1.05rem" }}>
                  Meningkatkan kepercayaan bisnis melalui website profesional
                </Typography>
                <Typography component="li" variant="body1" sx={{ fontSize: "1.05rem" }}>
                  Menyediakan solusi teknologi fleksibel untuk semua skala usaha
                </Typography>
              </Box>
            </InfoCard>
          </Grid>
        </Grid>

        <StyledDivider textAlign="center" sx={{ mt: 8 }}>
          <Typography variant="h4" color="primary.main" fontWeight="bold" className="responsive-text-3xl">
            KEUNGGULAN KOMPETITIF
          </Typography>
        </StyledDivider>

        <Box sx={{ py: 4, backgroundColor: "rgba(255, 165, 0, 0.05)", borderRadius: 2, mb: 4 }}>
          <Container>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4}>
                <InfoCard elevation={3}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ 
                      width: 70, 
                      height: 70, 
                      borderRadius: '50%', 
                      backgroundColor: 'primary.main',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: 2
                    }}>
                      <Typography variant="h4" color="white">1</Typography>
                    </Box>
                    <Typography variant="h5" gutterBottom color="primary.main" textAlign="center" fontWeight="bold">
                      Solusi yang Disesuaikan
                    </Typography>
                  </Box>
                  <Typography variant="body1" textAlign="center">
                    Setiap proyek dirancang khusus sesuai visi, misi, dan tujuan bisnis klien.
                  </Typography>
                </InfoCard>
              </Grid>

              <Grid item xs={12} md={4}>
                <InfoCard elevation={3}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ 
                      width: 70, 
                      height: 70, 
                      borderRadius: '50%', 
                      backgroundColor: 'primary.main',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: 2
                    }}>
                      <Typography variant="h4" color="white">2</Typography>
                    </Box>
                    <Typography variant="h5" gutterBottom color="primary.main" textAlign="center" fontWeight="bold">
                      Tim Profesional
                    </Typography>
                  </Box>
                  <Typography variant="body1" textAlign="center">
                    Tenaga ahli di bidang desain, pengembangan web, dan digital marketing dengan 
                    standar kualitas tinggi.
                  </Typography>
                </InfoCard>
              </Grid>

              <Grid item xs={12} md={4}>
                <InfoCard elevation={3}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ 
                      width: 70, 
                      height: 70, 
                      borderRadius: '50%', 
                      backgroundColor: 'primary.main',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: 2
                    }}>
                      <Typography variant="h4" color="white">3</Typography>
                    </Box>
                    <Typography variant="h5" gutterBottom color="primary.main" textAlign="center" fontWeight="bold">
                      Komunikasi Transparan
                    </Typography>
                  </Box>
                  <Typography variant="body1" textAlign="center">
                    Proses kerja terbuka dengan pembaruan rutin untuk memastikan hasil yang 
                    optimal.
                  </Typography>
                </InfoCard>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <StyledDivider textAlign="center">
          <Typography variant="h4" color="primary.main" fontWeight="bold" className="responsive-text-3xl">
            MENGAPA MEMILIH KAMI?
          </Typography>
        </StyledDivider>

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h5" gutterBottom color="primary.main" fontWeight="bold">
            PT Bayan Punca Digital
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: "700px", mx: "auto", mb: 4 }}>
            Kami hadir untuk menjadi mitra terpercaya dalam mengembangkan bisnis Anda di era digital
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <InfoCard elevation={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  minWidth: 50, 
                  height: 50, 
                  borderRadius: '50%', 
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mr: 2
                }}>
                  <Typography variant="h5" color="white">💡</Typography>
                </Box>
                <Typography variant="h5" gutterBottom color="primary.main" fontWeight="bold">
                  Custom & Tailored Solutions
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ pl: 8 }}>
                Kami merancang setiap proyek secara khusus, disesuaikan dengan karakter dan 
                kebutuhan bisnis klien agar menghasilkan solusi digital yang efektif dan berdampak 
                nyata.
              </Typography>
            </InfoCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoCard elevation={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  minWidth: 50, 
                  height: 50, 
                  borderRadius: '50%', 
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mr: 2
                }}>
                  <Typography variant="h5" color="white">👨‍💻</Typography>
                </Box>
                <Typography variant="h5" gutterBottom color="primary.main" fontWeight="bold">
                  Professional & Experienced Team
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ pl: 8 }}>
                Didukung tim berpengalaman di bidang pengembangan web, desain, dan strategi 
                digital yang siap memberikan hasil berkualitas tinggi sesuai standar industri.
              </Typography>
            </InfoCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoCard elevation={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  minWidth: 50, 
                  height: 50, 
                  borderRadius: '50%', 
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mr: 2
                }}>
                  <Typography variant="h5" color="white">📈</Typography>
                </Box>
                <Typography variant="h5" gutterBottom color="primary.main" fontWeight="bold">
                  Strategic Digital Approach
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ pl: 8 }}>
                Kami tidak hanya membuat website, tetapi juga merancang strategi digital untuk 
                meningkatkan citra dan daya saing perusahaan.
              </Typography>
            </InfoCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoCard elevation={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  minWidth: 50, 
                  height: 50, 
                  borderRadius: '50%', 
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mr: 2
                }}>
                  <Typography variant="h5" color="white">🔒</Typography>
                </Box>
                <Typography variant="h5" gutterBottom color="primary.main" fontWeight="bold">
                  Quality & Security Focus
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ pl: 8 }}>
                Kami mengutamakan keamanan, stabilitas, dan kualitas dalam setiap solusi digital 
                untuk memastikan kenyamanan dan kepercayaan pengguna.
              </Typography>
            </InfoCard>
          </Grid>
        </Grid>

        <StyledDivider id="layanan" textAlign="center" sx={{ mt: 8 }}>
          <Typography variant="h4" color="primary.main" fontWeight="bold" className="responsive-text-3xl">
            LAYANAN KAMI
          </Typography>
        </StyledDivider>

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="body1" sx={{ maxWidth: "800px", mx: "auto", fontSize: "1.1rem" }}>
            Kami menyediakan layanan digital lengkap yang dirancang untuk memenuhi kebutuhan bisnis Anda secara menyeluruh.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <InfoCard elevation={3}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mx: 'auto',
                  mb: 2
                }}>
                  <Typography variant="h4" color="white">🌐</Typography>
                </Box>
                <Typography variant="h5" gutterBottom color="primary.main" fontWeight="bold">
                  Pengembangan Website
                </Typography>
              </Box>
              <Typography variant="body1" textAlign="center">
                Membangun website modern dan responsif yang sesuai dengan kebutuhan bisnis Anda dengan teknologi terdepan dan desain yang menarik.
              </Typography>
            </InfoCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <InfoCard elevation={3}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mx: 'auto',
                  mb: 2
                }}>
                  <Typography variant="h4" color="white">📱</Typography>
                </Box>
                <Typography variant="h5" gutterBottom color="primary.main" fontWeight="bold">
                  Aplikasi Mobile
                </Typography>
              </Box>
              <Typography variant="body1" textAlign="center">
                Mengembangkan aplikasi mobile yang user-friendly untuk iOS dan Android dengan performa optimal dan pengalaman pengguna yang luar biasa.
              </Typography>
            </InfoCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <InfoCard elevation={3}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mx: 'auto',
                  mb: 2
                }}>
                  <Typography variant="h4" color="white">📊</Typography>
                </Box>
                <Typography variant="h5" gutterBottom color="primary.main" fontWeight="bold">
                  Digital Marketing
                </Typography>
              </Box>
              <Typography variant="body1" textAlign="center">
                Strategi pemasaran digital yang efektif untuk meningkatkan visibilitas online dan konversi bisnis dengan pendekatan yang terukur.
              </Typography>
            </InfoCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <InfoCard elevation={3}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mx: 'auto',
                  mb: 2
                }}>
                  <Typography variant="h4" color="white">🔍</Typography>
                </Box>
                <Typography variant="h5" gutterBottom color="primary.main" fontWeight="bold">
                  SEO & Optimasi
                </Typography>
              </Box>
              <Typography variant="body1" textAlign="center">
                Optimasi mesin pencari dan performa website untuk meningkatkan ranking dan kecepatan loading dengan strategi SEO terkini.
              </Typography>
            </InfoCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <InfoCard elevation={3}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mx: 'auto',
                  mb: 2
                }}>
                  <Typography variant="h4" color="white">🎨</Typography>
                </Box>
                <Typography variant="h5" gutterBottom color="primary.main" fontWeight="bold">
                  UI/UX Design
                </Typography>
              </Box>
              <Typography variant="body1" textAlign="center">
                Desain antarmuka dan pengalaman pengguna yang menarik dan intuitif untuk meningkatkan konversi dan kepuasan pengguna.
              </Typography>
            </InfoCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <InfoCard elevation={3}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mx: 'auto',
                  mb: 2
                }}>
                  <Typography variant="h4" color="white">🔧</Typography>
                </Box>
                <Typography variant="h5" gutterBottom color="primary.main" fontWeight="bold">
                  Website Maintenance
                </Typography>
              </Box>
              <Typography variant="body1" textAlign="center">
                Layanan pemeliharaan website berkelanjutan termasuk update keamanan, backup data, dan monitoring performa 24/7.
              </Typography>
            </InfoCard>
          </Grid>
        </Grid>
      </Container>
      <WhatsAppButton />
    </>
  )
}

export default About