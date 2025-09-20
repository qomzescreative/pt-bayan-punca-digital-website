import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Collapse,
  IconButton,
  Divider,
  Link
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Cookie as CookieIcon
} from '@mui/icons-material';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      // Load saved preferences
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      updateGoogleConsent(savedPreferences);
    }
  }, []);

  const updateGoogleConsent = (prefs) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_storage: prefs.marketing ? 'granted' : 'denied',
        ad_user_data: prefs.marketing ? 'granted' : 'denied',
        ad_personalization: prefs.marketing ? 'granted' : 'denied',
        functionality_storage: prefs.functional ? 'granted' : 'denied',
        personalization_storage: prefs.functional ? 'granted' : 'denied',
        security_storage: 'granted'
      });
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    updateGoogleConsent(allAccepted);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    setPreferences(onlyNecessary);
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary));
    updateGoogleConsent(onlyNecessary);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    updateGoogleConsent(preferences);
    setShowBanner(false);
  };

  const handlePreferenceChange = (type) => (event) => {
    if (type === 'necessary') return; // Cannot disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [type]: event.target.checked
    }));
  };

  if (!showBanner) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        p: 2,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)'
      }}
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <Paper
        elevation={8}
        sx={{
          maxWidth: '800px',
          mx: 'auto',
          p: 3,
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          <CookieIcon color="primary" />
          <Box sx={{ flex: 1 }}>
            <Typography
              id="cookie-banner-title"
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Pengaturan Cookie & Privasi
            </Typography>
            <Typography
              id="cookie-banner-description"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Kami menggunakan cookie untuk meningkatkan pengalaman Anda, menganalisis lalu lintas website, 
              dan menyediakan konten yang relevan. Anda dapat memilih jenis cookie yang ingin Anda terima.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              <Button
                variant="contained"
                onClick={handleAcceptAll}
                size="small"
                sx={{ minWidth: 120 }}
              >
                Terima Semua
              </Button>
              <Button
                variant="outlined"
                onClick={handleRejectAll}
                size="small"
                sx={{ minWidth: 120 }}
              >
                Tolak Semua
              </Button>
              <Button
                variant="text"
                onClick={() => setShowDetails(!showDetails)}
                size="small"
                endIcon={showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{ minWidth: 120 }}
              >
                Pengaturan
              </Button>
            </Box>

            <Collapse in={showDetails}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Pengaturan Cookie Detail
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.necessary}
                      disabled
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Cookie Penting
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Diperlukan untuk fungsi dasar website. Tidak dapat dinonaktifkan.
                      </Typography>
                    </Box>
                  }
                />
              </Box>

              <Box sx={{ mt: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.analytics}
                      onChange={handlePreferenceChange('analytics')}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Cookie Analitik
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Membantu kami memahami bagaimana pengunjung berinteraksi dengan website.
                      </Typography>
                    </Box>
                  }
                />
              </Box>

              <Box sx={{ mt: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.functional}
                      onChange={handlePreferenceChange('functional')}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Cookie Fungsional
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Mengingat preferensi Anda untuk pengalaman yang lebih personal.
                      </Typography>
                    </Box>
                  }
                />
              </Box>

              <Box sx={{ mt: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.marketing}
                      onChange={handlePreferenceChange('marketing')}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Cookie Marketing
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Digunakan untuk menampilkan iklan yang relevan dengan minat Anda.
                      </Typography>
                    </Box>
                  }
                />
              </Box>

              <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  onClick={handleSavePreferences}
                  size="small"
                >
                  Simpan Pengaturan
                </Button>
                <Link
                  href="/privacy-policy"
                  variant="body2"
                  sx={{ alignSelf: 'center', ml: 1 }}
                >
                  Kebijakan Privasi
                </Link>
              </Box>
            </Collapse>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CookieBanner;