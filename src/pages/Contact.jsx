import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Snackbar
} from '@mui/material'
import { styled } from '@mui/material/styles'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import { sendContactEmail } from '../utils/emailService'

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
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitStatus, setSubmitStatus] = useState('') // 'success', 'error', or ''
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const formRef = useRef(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nama minimal 2 karakter'
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'Nama hanya boleh berisi huruf dan spasi'
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid'
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi'
    } else if (!/^(\+62|62|0)[0-9]{9,13}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Format nomor telepon tidak valid (contoh: 08123456789)'
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subjek wajib diisi'
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subjek minimal 5 karakter'
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Pesan wajib diisi'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Pesan minimal 10 karakter'
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Pesan maksimal 1000 karakter'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (!validateForm()) {
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0]
      if (firstErrorField && formRef.current) {
        const errorElement = formRef.current.querySelector(`[name="${firstErrorField}"]`)
        if (errorElement) {
          errorElement.focus()
        }
      }
      return
    }
    
    setIsSubmitting(true)
    setSubmitMessage('')
    setSubmitStatus('')
    
    try {
      // Send email notification using EmailJS
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      })

      // Create new contact message for local storage
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
      
      setSubmitMessage('Pesan berhasil dikirim! Kami akan segera menghubungi Anda melalui email atau telepon.')
      setSubmitStatus('success')
      setSnackbarOpen(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setErrors({})
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitMessage('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi atau hubungi kami langsung.')
      setSubmitStatus('error')
      setSnackbarOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg" className="responsive-container" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          className="responsive-text-4xl responsive-text-center"
          align="center"
          gutterBottom
          sx={{ 
            mb: 6, 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #FF6B00 0%, #FF8F00 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Hubungi Kami
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
            <ContactForm 
              component="form" 
              onSubmit={handleSubmit}
              ref={formRef}
              role="form"
              aria-labelledby="contact-form-title"
              aria-describedby="contact-form-description"
            >
              <Typography 
                id="contact-form-title"
                variant="h5" 
                gutterBottom 
                sx={{ mb: 3 }}
              >
                Kirim Pesan
              </Typography>

              <Typography 
                id="contact-form-description"
                variant="body2"
                sx={{ mb: 3, color: 'text.secondary' }}
              >
                Isi formulir di bawah ini untuk menghubungi kami. Semua field wajib diisi.
              </Typography>

              {submitMessage && (
                <Alert 
                  severity={submitMessage.includes('berhasil') ? 'success' : 'error'}
                  sx={{ mb: 3 }}
                  role="alert"
                  aria-live="polite"
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
                error={!!errors.name}
                helperText={errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                inputProps={{
                  'aria-label': 'Nama lengkap Anda',
                  'aria-required': 'true'
                }}
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
                error={!!errors.email}
                helperText={errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                inputProps={{
                  'aria-label': 'Alamat email Anda',
                  'aria-required': 'true'
                }}
              />

              <StyledTextField
                fullWidth
                name="phone"
                label="Nomor Telepon"
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
                required
                error={!!errors.phone}
                helperText={errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                inputProps={{
                  'aria-label': 'Nomor telepon Anda',
                  'aria-required': 'true'
                }}
              />

              <StyledTextField
                fullWidth
                name="subject"
                label="Subjek"
                variant="outlined"
                value={formData.subject}
                onChange={handleChange}
                required
                error={!!errors.subject}
                helperText={errors.subject}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                inputProps={{
                  'aria-label': 'Subjek pesan Anda',
                  'aria-required': 'true'
                }}
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
                error={!!errors.message}
                helperText={errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                inputProps={{
                  'aria-label': 'Isi pesan Anda',
                  'aria-required': 'true'
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                aria-describedby="submit-button-description"
                sx={{
                  py: { xs: 1.5, sm: 2 },
                  borderRadius: '12px',
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #FF6B00 0%, #FF8533 50%, #FFA366 100%)',
                  boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    transition: 'left 0.5s',
                  },
                  '&:hover': {
                    background: 'linear-gradient(135deg, #E55A00 0%, #FF6B00 50%, #FF8533 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(255, 107, 0, 0.4)',
                    '&::before': {
                      left: '100%',
                    },
                  },
                  '&:active': {
                    transform: 'translateY(0px)',
                    boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
                  },
                  '&:focus': {
                    outline: '3px solid rgba(255, 107, 0, 0.3)',
                    outlineOffset: '2px'
                  },
                  '&:disabled': {
                    background: 'linear-gradient(135deg, #cccccc 0%, #999999 100%)',
                    transform: 'none',
                    boxShadow: 'none',
                  }
                }}
              >
                {isSubmitting ? 'Mengirim Pesan...' : 'Kirim Pesan'}
              </Button>
              
              <Typography 
                id="submit-button-description"
                variant="caption"
                sx={{ mt: 1, color: 'text.secondary', display: 'block' }}
              >
                Dengan mengirim pesan ini, Anda menyetujui bahwa kami akan menghubungi Anda terkait pertanyaan Anda.
              </Typography>
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
                <WhatsAppIcon sx={{ color: '#25D366' }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    WhatsApp
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    component="a"
                    href="https://wa.me/6287727073796"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit',
                      '&:hover': { color: '#25D366' },
                    }}
                  >
                    +62 877-2707-3796
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

              {/* Social Media Section */}
              <Box sx={{ mt: 6 }}>
                <Typography variant="h6" gutterBottom>
                  Ikuti Kami
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Box
                    component="a"
                    href="https://facebook.com/bayanpuncadigital"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: '#1877F2',
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(24, 119, 242, 0.3)',
                      },
                    }}
                  >
                    <FacebookIcon />
                  </Box>
                  <Box
                    component="a"
                    href="https://instagram.com/bayanpuncadigital"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #F56040, #E1306C, #C13584, #833AB4)',
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(225, 48, 108, 0.3)',
                      },
                    }}
                  >
                    <InstagramIcon />
                  </Box>
                  <Box
                    component="a"
                    href="https://linkedin.com/company/bayanpuncadigital"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: '#0A66C2',
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(10, 102, 194, 0.3)',
                      },
                    }}
                  >
                    <LinkedInIcon />
                  </Box>
                  <Box
                    component="a"
                    href="https://twitter.com/bayanpuncadigital"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: '#1DA1F2',
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(29, 161, 242, 0.3)',
                      },
                    }}
                  >
                    <TwitterIcon />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        {/* Success/Error Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={submitStatus}
            variant="filled"
            icon={submitStatus === 'success' ? <CheckCircleIcon /> : <ErrorIcon />}
            sx={{
              width: '100%',
              fontSize: '1rem',
              fontWeight: 500,
            }}
          >
            {submitMessage}
          </Alert>
        </Snackbar>
        
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