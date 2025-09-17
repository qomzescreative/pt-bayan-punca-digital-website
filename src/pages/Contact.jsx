import { Box, Container, Typography, Grid, TextField, Button, Paper, Alert } from '@mui/material'
import { styled } from '@mui/material/styles'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import { useState, useRef, useEffect } from 'react'

const ContactForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(0,0,0,0.05)',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}))

const ContactInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(3),
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(0.5),
  },
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}))

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    
    try {
      // Create new contact message
      const newContact = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        date: new Date().toLocaleDateString('id-ID'),
        status: 'new'
      }

      // Get existing contacts from localStorage
      const existingContacts = JSON.parse(localStorage.getItem('adminContacts') || '[]')
      
      // Add new contact to the list
      const updatedContacts = [newContact, ...existingContacts]
      
      // Save to localStorage
      localStorage.setItem('adminContacts', JSON.stringify(updatedContacts))
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubmitMessage('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      setSubmitMessage('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Kontak
        </Typography>

        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 6, color: 'text.secondary', maxWidth: '800px', mx: 'auto' }}
        >
          Kami siap membantu Anda mewujudkan solusi digital terbaik untuk bisnis Anda.
          Hubungi kami untuk konsultasi gratis.
        </Typography>

        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid item xs={12} md={6}>
            <ContactForm component="form" onSubmit={handleSubmit}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Kirim Pesan
              </Typography>

              {submitMessage && (
                <Alert 
                  severity={submitMessage.includes('berhasil') ? 'success' : 'error'}
                  sx={{ mb: 3 }}
                >
                  {submitMessage}
                </Alert>
              )}

              <StyledTextField
                fullWidth
                name="name"
                label="Nama Lengkap"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <StyledTextField
                fullWidth
                name="email"
                label="Email"
                variant="outlined"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <StyledTextField
                fullWidth
                name="phone"
                label="Nomor Telepon"
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <StyledTextField
                fullWidth
                name="subject"
                label="Subjek"
                variant="outlined"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <StyledTextField
                fullWidth
                name="message"
                label="Pesan"
                variant="outlined"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={isSubmitting}
                sx={{
                  py: { xs: 1.2, sm: 1.5 },
                  borderRadius: '8px',
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  background: 'linear-gradient(45deg, #FF6B00 30%, #FF8533 90%)',
                  boxShadow: '0 3px 5px 2px rgba(255, 107, 0, .3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #CC5500 30%, #FF6B00 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 10px 2px rgba(33, 203, 243, .4)'
                  }
                }}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </Button>
            </ContactForm>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ pl: { md: 4 } }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
                Informasi Kontak
              </Typography>

              <ContactInfo>
                <LocationOnIcon />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Alamat
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    PT Bayan Punca Digital
                    <br />
                    Komp Perumahan Puri Sava Waringin Kurung Blok B 2 No 2
                    <br />
                    Jalan Raya Kramatwatu Waringin Kurung, Waringinkurung
                    <br />
                    Sambilawang, Kab Serang, Provinsi – Banten 42453
                  </Typography>
                </Box>
              </ContactInfo>

              <ContactInfo>
                <PhoneIcon />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Telepon
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    component="a"
                    href="tel:+6287727073796"
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    +62 877-2707-3796
                  </Typography>
                </Box>
              </ContactInfo>

              <ContactInfo>
                <EmailIcon />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Email
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    component="a"
                    href="mailto:bayanpuncadigital@gmail.com"
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    bayanpuncadigital@gmail.com
                  </Typography>
                </Box>
              </ContactInfo>

              <Box sx={{ mt: 6 }}>
                <Typography variant="h6" gutterBottom>
                  Jam Operasional
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Senin - Jumat: 09:00 - 17:00
                  <br />
                  Sabtu: 09:00 - 15:00
                  <br />
                  Minggu: Tutup
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ 
          mt: 6, 
          width: '100%', 
          height: { xs: '300px', sm: '350px', md: '400px' }, 
          borderRadius: '8px', 
          overflow: 'hidden',
          boxShadow: 3
        }}>
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            Lokasi Kami
          </Typography>
          <GoogleMap />
        </Box>
      </Container>
    </Box>
  )
}

// Komponen Google Maps
function GoogleMap() {
  const mapRef = useRef(null);
  
  useEffect(() => {
    // Fungsi untuk memuat Google Maps API
    const loadGoogleMapsApi = () => {
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik&callback=initMap`;
      googleMapScript.async = true;
      googleMapScript.defer = true;
      window.document.body.appendChild(googleMapScript);
      
      // Callback yang akan dipanggil oleh Google Maps API
      window.initMap = () => {
        // Koordinat lokasi baru (PT Bayan Punca Digital)
        const location = { lat: -6.066944, lng: 106.070389 };
        
        // Membuat peta baru dengan opsi responsif
        const map = new window.google.maps.Map(mapRef.current, {
          center: location,
          zoom: window.innerWidth < 768 ? 14 : 15, // Zoom berbeda untuk mobile
          mapTypeControl: window.innerWidth > 768, // Hide map type control on mobile
          streetViewControl: window.innerWidth > 768, // Hide street view on mobile
          fullscreenControl: true,
          zoomControl: true,
          gestureHandling: 'cooperative', // Better touch handling
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });
        
        // Menambahkan marker
        new window.google.maps.Marker({
          position: location,
          map: map,
          title: 'PT Bayan Punca Digital - ID Lokasi: SRG0620082024T001',
        });
      };
    };
    
    // Panggil fungsi untuk memuat API
    loadGoogleMapsApi();
    
    // Cleanup function
    return () => {
      window.initMap = null;
      const scripts = document.querySelectorAll('script[src*="maps.googleapis.com"]');
      scripts.forEach(script => script.remove());
    };
  }, [mapRef]);
  
  return (
    <Box 
      ref={mapRef} 
      sx={{ 
        width: '100%', 
        height: '100%', 
        border: '1px solid #ddd',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '"Memuat peta..."',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#666',
          fontSize: '14px',
          zIndex: 1
        }
      }}
    />
  );
}

export default Contact