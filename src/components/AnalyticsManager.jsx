import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Divider,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import SearchIcon from '@mui/icons-material/Search'
import FacebookIcon from '@mui/icons-material/Facebook'
import InfoIcon from '@mui/icons-material/Info'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'

const AnalyticsManager = () => {
  const [analyticsData, setAnalyticsData] = useState({
    // Google Analytics
    googleAnalytics: {
      enabled: false,
      measurementId: '',
      trackingCode: '',
      events: {
        pageViews: true,
        scrollTracking: true,
        outboundLinks: true,
        fileDownloads: true,
        formSubmissions: true
      }
    },
    
    // Google Search Console
    searchConsole: {
      enabled: false,
      verificationCode: '',
      siteUrl: 'https://bayanpuncadigital.com',
      verified: false
    },
    
    // Meta Pixel (Facebook)
    metaPixel: {
      enabled: false,
      pixelId: '',
      events: {
        pageView: true,
        viewContent: true,
        addToCart: false,
        purchase: false,
        lead: true,
        contact: true
      }
    },
    
    // Additional Tracking
    additionalTracking: {
      hotjar: {
        enabled: false,
        siteId: ''
      },
      gtm: {
        enabled: false,
        containerId: ''
      }
    }
  })
  
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' })
  const [testResults, setTestResults] = useState({})

  useEffect(() => {
    // Load analytics data from localStorage
    const savedAnalyticsData = localStorage.getItem('analyticsSettings')
    if (savedAnalyticsData) {
      setAnalyticsData({ ...analyticsData, ...JSON.parse(savedAnalyticsData) })
    }
  }, [])

  const handleSave = () => {
    try {
      localStorage.setItem('analyticsSettings', JSON.stringify(analyticsData))
      
      // Inject tracking codes if enabled
      injectTrackingCodes()
      
      setAlert({ 
        show: true, 
        message: 'Pengaturan Analytics berhasil disimpan dan diaktifkan!', 
        type: 'success' 
      })
      
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000)
    } catch (error) {
      setAlert({ 
        show: true, 
        message: 'Gagal menyimpan pengaturan Analytics', 
        type: 'error' 
      })
    }
  }

  const injectTrackingCodes = () => {
    // Remove existing tracking codes
    removeExistingCodes()
    
    // Google Analytics
    if (analyticsData.googleAnalytics.enabled && analyticsData.googleAnalytics.measurementId) {
      injectGoogleAnalytics()
    }
    
    // Meta Pixel
    if (analyticsData.metaPixel.enabled && analyticsData.metaPixel.pixelId) {
      injectMetaPixel()
    }
    
    // Google Tag Manager
    if (analyticsData.additionalTracking.gtm.enabled && analyticsData.additionalTracking.gtm.containerId) {
      injectGTM()
    }
    
    // Hotjar
    if (analyticsData.additionalTracking.hotjar.enabled && analyticsData.additionalTracking.hotjar.siteId) {
      injectHotjar()
    }
  }

  const removeExistingCodes = () => {
    // Remove existing Google Analytics
    const existingGA = document.querySelectorAll('script[src*="googletagmanager.com/gtag"]')
    existingGA.forEach(script => script.remove())
    
    // Remove existing Meta Pixel
    const existingFB = document.querySelectorAll('script[data-tracking="meta-pixel"]')
    existingFB.forEach(script => script.remove())
    
    // Remove existing GTM
    const existingGTM = document.querySelectorAll('script[data-tracking="gtm"]')
    existingGTM.forEach(script => script.remove())
    
    // Remove existing Hotjar
    const existingHJ = document.querySelectorAll('script[data-tracking="hotjar"]')
    existingHJ.forEach(script => script.remove())
  }

  const injectGoogleAnalytics = () => {
    const { measurementId } = analyticsData.googleAnalytics
    
    // Google Analytics gtag script
    const gtagScript = document.createElement('script')
    gtagScript.async = true
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    gtagScript.setAttribute('data-tracking', 'google-analytics')
    document.head.appendChild(gtagScript)
    
    // Google Analytics configuration
    const configScript = document.createElement('script')
    configScript.setAttribute('data-tracking', 'google-analytics')
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', {
        page_title: document.title,
        page_location: window.location.href
      });
      
      // Enhanced tracking
      ${analyticsData.googleAnalytics.events.scrollTracking ? `
      // Scroll tracking
      let scrollTracked = false;
      window.addEventListener('scroll', function() {
        if (!scrollTracked && window.scrollY > document.body.scrollHeight * 0.75) {
          gtag('event', 'scroll', {
            event_category: 'engagement',
            event_label: '75% page scroll'
          });
          scrollTracked = true;
        }
      });
      ` : ''}
      
      ${analyticsData.googleAnalytics.events.outboundLinks ? `
      // Outbound link tracking
      document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
          gtag('event', 'click', {
            event_category: 'outbound',
            event_label: e.target.href
          });
        }
      });
      ` : ''}
    `
    document.head.appendChild(configScript)
  }

  const injectMetaPixel = () => {
    const { pixelId } = analyticsData.metaPixel
    
    const fbScript = document.createElement('script')
    fbScript.setAttribute('data-tracking', 'meta-pixel')
    fbScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
      
      // Enhanced events
      ${analyticsData.metaPixel.events.contact ? `
      // Contact form tracking
      document.addEventListener('submit', function(e) {
        if (e.target.closest('form[name="contact"]')) {
          fbq('track', 'Contact');
        }
      });
      ` : ''}
      
      ${analyticsData.metaPixel.events.lead ? `
      // Lead tracking
      document.addEventListener('submit', function(e) {
        if (e.target.closest('form')) {
          fbq('track', 'Lead');
        }
      });
      ` : ''}
    `
    document.head.appendChild(fbScript)
    
    // Noscript fallback
    const noscript = document.createElement('noscript')
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"/>`
    document.body.appendChild(noscript)
  }

  const injectGTM = () => {
    const { containerId } = analyticsData.additionalTracking.gtm
    
    const gtmScript = document.createElement('script')
    gtmScript.setAttribute('data-tracking', 'gtm')
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${containerId}');
    `
    document.head.appendChild(gtmScript)
  }

  const injectHotjar = () => {
    const { siteId } = analyticsData.additionalTracking.hotjar
    
    const hjScript = document.createElement('script')
    hjScript.setAttribute('data-tracking', 'hotjar')
    hjScript.innerHTML = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${siteId},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `
    document.head.appendChild(hjScript)
  }

  const testConnection = async (service) => {
    setTestResults({ ...testResults, [service]: 'testing' })
    
    try {
      // Simulate API test (in real implementation, you'd make actual API calls)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock success for demo
      setTestResults({ ...testResults, [service]: 'success' })
    } catch (error) {
      setTestResults({ ...testResults, [service]: 'error' })
    }
  }

  const handleAnalyticsChange = (section, field, value) => {
    setAnalyticsData({
      ...analyticsData,
      [section]: {
        ...analyticsData[section],
        [field]: value
      }
    })
  }

  const handleEventChange = (section, event, value) => {
    setAnalyticsData({
      ...analyticsData,
      [section]: {
        ...analyticsData[section],
        events: {
          ...analyticsData[section].events,
          [event]: value
        }
      }
    })
  }

  const getStatusIcon = (service) => {
    const status = testResults[service]
    if (status === 'testing') return <InfoIcon color="info" />
    if (status === 'success') return <CheckCircleIcon color="success" />
    if (status === 'error') return <ErrorIcon color="error" />
    return null
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
          Analytics & Tracking Manager
        </Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Simpan & Aktifkan
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Google Analytics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <AnalyticsIcon color="primary" />
                  <Typography variant="h6">Google Analytics</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  {getStatusIcon('ga')}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={analyticsData.googleAnalytics.enabled}
                        onChange={(e) => handleAnalyticsChange('googleAnalytics', 'enabled', e.target.checked)}
                      />
                    }
                    label="Aktif"
                  />
                </Box>
              </Box>
              
              <TextField
                fullWidth
                label="Measurement ID"
                value={analyticsData.googleAnalytics.measurementId}
                onChange={(e) => handleAnalyticsChange('googleAnalytics', 'measurementId', e.target.value)}
                margin="normal"
                placeholder="G-XXXXXXXXXX"
                disabled={!analyticsData.googleAnalytics.enabled}
              />
              
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Event Tracking:</Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {Object.keys(analyticsData.googleAnalytics.events).map(event => (
                  <FormControlLabel
                    key={event}
                    control={
                      <Switch
                        checked={analyticsData.googleAnalytics.events[event]}
                        onChange={(e) => handleEventChange('googleAnalytics', event, e.target.checked)}
                        disabled={!analyticsData.googleAnalytics.enabled}
                        size="small"
                      />
                    }
                    label={event.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  />
                ))}
              </Box>
              
              <Button
                variant="outlined"
                size="small"
                onClick={() => testConnection('ga')}
                disabled={!analyticsData.googleAnalytics.enabled || !analyticsData.googleAnalytics.measurementId}
                sx={{ mt: 2 }}
              >
                Test Koneksi
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Google Search Console */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <SearchIcon color="primary" />
                  <Typography variant="h6">Search Console</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  {getStatusIcon('gsc')}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={analyticsData.searchConsole.enabled}
                        onChange={(e) => handleAnalyticsChange('searchConsole', 'enabled', e.target.checked)}
                      />
                    }
                    label="Aktif"
                  />
                </Box>
              </Box>
              
              <TextField
                fullWidth
                label="Site URL"
                value={analyticsData.searchConsole.siteUrl}
                onChange={(e) => handleAnalyticsChange('searchConsole', 'siteUrl', e.target.value)}
                margin="normal"
                disabled={!analyticsData.searchConsole.enabled}
              />
              
              <TextField
                fullWidth
                label="Verification Code"
                value={analyticsData.searchConsole.verificationCode}
                onChange={(e) => handleAnalyticsChange('searchConsole', 'verificationCode', e.target.value)}
                margin="normal"
                placeholder="google-site-verification=..."
                disabled={!analyticsData.searchConsole.enabled}
                helperText="Kode verifikasi dari Search Console"
              />
              
              <Button
                variant="outlined"
                size="small"
                onClick={() => testConnection('gsc')}
                disabled={!analyticsData.searchConsole.enabled || !analyticsData.searchConsole.verificationCode}
                sx={{ mt: 2 }}
              >
                Verifikasi
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Meta Pixel */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <FacebookIcon color="primary" />
                  <Typography variant="h6">Meta Pixel</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  {getStatusIcon('meta')}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={analyticsData.metaPixel.enabled}
                        onChange={(e) => handleAnalyticsChange('metaPixel', 'enabled', e.target.checked)}
                      />
                    }
                    label="Aktif"
                  />
                </Box>
              </Box>
              
              <TextField
                fullWidth
                label="Pixel ID"
                value={analyticsData.metaPixel.pixelId}
                onChange={(e) => handleAnalyticsChange('metaPixel', 'pixelId', e.target.value)}
                margin="normal"
                placeholder="123456789012345"
                disabled={!analyticsData.metaPixel.enabled}
              />
              
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Event Tracking:</Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {Object.keys(analyticsData.metaPixel.events).map(event => (
                  <FormControlLabel
                    key={event}
                    control={
                      <Switch
                        checked={analyticsData.metaPixel.events[event]}
                        onChange={(e) => handleEventChange('metaPixel', event, e.target.checked)}
                        disabled={!analyticsData.metaPixel.enabled}
                        size="small"
                      />
                    }
                    label={event.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  />
                ))}
              </Box>
              
              <Button
                variant="outlined"
                size="small"
                onClick={() => testConnection('meta')}
                disabled={!analyticsData.metaPixel.enabled || !analyticsData.metaPixel.pixelId}
                sx={{ mt: 2 }}
              >
                Test Pixel
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Additional Tracking */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>Additional Tracking</Typography>
              
              <Box mb={3}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                  <Typography variant="subtitle2">Google Tag Manager</Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={analyticsData.additionalTracking.gtm.enabled}
                        onChange={(e) => setAnalyticsData({
                          ...analyticsData,
                          additionalTracking: {
                            ...analyticsData.additionalTracking,
                            gtm: {
                              ...analyticsData.additionalTracking.gtm,
                              enabled: e.target.checked
                            }
                          }
                        })}
                        size="small"
                      />
                    }
                    label=""
                  />
                </Box>
                <TextField
                  fullWidth
                  label="Container ID"
                  value={analyticsData.additionalTracking.gtm.containerId}
                  onChange={(e) => setAnalyticsData({
                    ...analyticsData,
                    additionalTracking: {
                      ...analyticsData.additionalTracking,
                      gtm: {
                        ...analyticsData.additionalTracking.gtm,
                        containerId: e.target.value
                      }
                    }
                  })}
                  size="small"
                  placeholder="GTM-XXXXXXX"
                  disabled={!analyticsData.additionalTracking.gtm.enabled}
                />
              </Box>
              
              <Box>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                  <Typography variant="subtitle2">Hotjar</Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={analyticsData.additionalTracking.hotjar.enabled}
                        onChange={(e) => setAnalyticsData({
                          ...analyticsData,
                          additionalTracking: {
                            ...analyticsData.additionalTracking,
                            hotjar: {
                              ...analyticsData.additionalTracking.hotjar,
                              enabled: e.target.checked
                            }
                          }
                        })}
                        size="small"
                      />
                    }
                    label=""
                  />
                </Box>
                <TextField
                  fullWidth
                  label="Site ID"
                  value={analyticsData.additionalTracking.hotjar.siteId}
                  onChange={(e) => setAnalyticsData({
                    ...analyticsData,
                    additionalTracking: {
                      ...analyticsData.additionalTracking,
                      hotjar: {
                        ...analyticsData.additionalTracking.hotjar,
                        siteId: e.target.value
                      }
                    }
                  })}
                  size="small"
                  placeholder="1234567"
                  disabled={!analyticsData.additionalTracking.hotjar.enabled}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AnalyticsManager