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
  IconButton,
  Switch,
  FormControlLabel,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TikTokIcon from '@mui/icons-material/MusicNote'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import TelegramIcon from '@mui/icons-material/Telegram'
import PreviewIcon from '@mui/icons-material/Preview'

const SocialMediaManager = () => {
  const [socialData, setSocialData] = useState({
    // Social Media Links
    socialLinks: [
      {
        id: 1,
        platform: 'facebook',
        name: 'Facebook',
        url: 'https://facebook.com/bayanpuncadigital',
        username: '@bayanpuncadigital',
        enabled: true,
        showInHeader: true,
        showInFooter: true
      },
      {
        id: 2,
        platform: 'instagram',
        name: 'Instagram',
        url: 'https://instagram.com/bayanpuncadigital',
        username: '@bayanpuncadigital',
        enabled: true,
        showInHeader: true,
        showInFooter: true
      },
      {
        id: 3,
        platform: 'linkedin',
        name: 'LinkedIn',
        url: 'https://linkedin.com/company/bayan-punca-digital',
        username: 'Bayan Punca Digital',
        enabled: true,
        showInHeader: false,
        showInFooter: true
      },
      {
        id: 4,
        platform: 'whatsapp',
        name: 'WhatsApp',
        url: 'https://wa.me/6281234567890',
        username: '+62 812-3456-7890',
        enabled: true,
        showInHeader: false,
        showInFooter: true
      }
    ],
    
    // Social Media Feeds/Embeds
    socialFeeds: [
      {
        id: 1,
        platform: 'instagram',
        type: 'feed',
        title: 'Instagram Feed',
        embedCode: '',
        enabled: false,
        showOnPages: ['home', 'about']
      },
      {
        id: 2,
        platform: 'facebook',
        type: 'page',
        title: 'Facebook Page Plugin',
        embedCode: '',
        enabled: false,
        showOnPages: ['home']
      }
    ],
    
    // Social Sharing Settings
    socialSharing: {
      enabled: true,
      platforms: {
        facebook: true,
        twitter: true,
        linkedin: true,
        whatsapp: true,
        telegram: false
      },
      showOnBlog: true,
      showOnPortfolio: true,
      customMessage: 'Lihat proyek terbaru dari PT Bayan Punca Digital'
    },
    
    // Open Graph Settings
    openGraph: {
      enabled: true,
      defaultImage: '/assets/logo-perusahaan/Logo-Bayan-Punca-Digital.png',
      twitterCard: 'summary_large_image',
      facebookAppId: ''
    }
  })
  
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' })
  const [openDialog, setOpenDialog] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [dialogType, setDialogType] = useState('link') // 'link' or 'feed'
  const [formData, setFormData] = useState({
    platform: '',
    name: '',
    url: '',
    username: '',
    enabled: true,
    showInHeader: true,
    showInFooter: true
  })

  const platformIcons = {
    facebook: <FacebookIcon />,
    instagram: <InstagramIcon />,
    twitter: <TwitterIcon />,
    linkedin: <LinkedInIcon />,
    youtube: <YouTubeIcon />,
    tiktok: <TikTokIcon />,
    whatsapp: <WhatsAppIcon />,
    telegram: <TelegramIcon />
  }

  const platformColors = {
    facebook: '#1877F2',
    instagram: '#E4405F',
    twitter: '#1DA1F2',
    linkedin: '#0A66C2',
    youtube: '#FF0000',
    tiktok: '#000000',
    whatsapp: '#25D366',
    telegram: '#0088CC'
  }

  useEffect(() => {
    // Load social media data from localStorage
    const savedSocialData = localStorage.getItem('socialMediaSettings')
    if (savedSocialData) {
      setSocialData({ ...socialData, ...JSON.parse(savedSocialData) })
    }
  }, [])

  const handleSave = () => {
    try {
      localStorage.setItem('socialMediaSettings', JSON.stringify(socialData))
      
      // Update social links in components
      updateSocialComponents()
      
      setAlert({ 
        show: true, 
        message: 'Pengaturan Media Sosial berhasil disimpan!', 
        type: 'success' 
      })
      
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000)
    } catch (error) {
      setAlert({ 
        show: true, 
        message: 'Gagal menyimpan pengaturan Media Sosial', 
        type: 'error' 
      })
    }
  }

  const updateSocialComponents = () => {
    // Dispatch custom event to update social components
    window.dispatchEvent(new CustomEvent('socialMediaUpdated', {
      detail: socialData
    }))
  }

  const handleAddLink = () => {
    setDialogType('link')
    setEditingItem(null)
    setFormData({
      platform: '',
      name: '',
      url: '',
      username: '',
      enabled: true,
      showInHeader: true,
      showInFooter: true
    })
    setOpenDialog(true)
  }

  const handleEditLink = (link) => {
    setDialogType('link')
    setEditingItem(link)
    setFormData({ ...link })
    setOpenDialog(true)
  }

  const handleDeleteLink = (id) => {
    setSocialData({
      ...socialData,
      socialLinks: socialData.socialLinks.filter(link => link.id !== id)
    })
  }

  const handleSaveLink = () => {
    if (editingItem) {
      // Update existing link
      setSocialData({
        ...socialData,
        socialLinks: socialData.socialLinks.map(link => 
          link.id === editingItem.id ? { ...formData, id: editingItem.id } : link
        )
      })
    } else {
      // Add new link
      const newId = Math.max(...socialData.socialLinks.map(l => l.id), 0) + 1
      setSocialData({
        ...socialData,
        socialLinks: [...socialData.socialLinks, { ...formData, id: newId }]
      })
    }
    setOpenDialog(false)
  }

  const handleSharingChange = (platform, enabled) => {
    setSocialData({
      ...socialData,
      socialSharing: {
        ...socialData.socialSharing,
        platforms: {
          ...socialData.socialSharing.platforms,
          [platform]: enabled
        }
      }
    })
  }

  const generateSocialShareCode = () => {
    const enabledPlatforms = Object.keys(socialData.socialSharing.platforms)
      .filter(platform => socialData.socialSharing.platforms[platform])
    
    const shareCode = `
// Social Share Component
const SocialShare = ({ url, title, description }) => {
  const shareUrls = {
    facebook: \`https://www.facebook.com/sharer/sharer.php?u=\${encodeURIComponent(url)}\`,
    twitter: \`https://twitter.com/intent/tweet?url=\${encodeURIComponent(url)}&text=\${encodeURIComponent(title)}\`,
    linkedin: \`https://www.linkedin.com/sharing/share-offsite/?url=\${encodeURIComponent(url)}\`,
    whatsapp: \`https://wa.me/?text=\${encodeURIComponent(title + ' ' + url)}\`,
    telegram: \`https://t.me/share/url?url=\${encodeURIComponent(url)}&text=\${encodeURIComponent(title)}\`
  }
  
  return (
    <Box display="flex" gap={1}>
      ${enabledPlatforms.map(platform => `
      <IconButton
        onClick={() => window.open(shareUrls.${platform}, '_blank')}
        sx={{ color: '${platformColors[platform]}' }}
      >
        ${platform.charAt(0).toUpperCase() + platform.slice(1)}Icon
      </IconButton>`).join('')}
    </Box>
  )
}
    `
    
    const blob = new Blob([shareCode], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'SocialShare.jsx'
    a.click()
    URL.revokeObjectURL(url)
  }

  const previewSocialLinks = () => {
    const enabledLinks = socialData.socialLinks.filter(link => link.enabled)
    return (
      <Box display="flex" gap={1} flexWrap="wrap">
        {enabledLinks.map(link => (
          <Chip
            key={link.id}
            icon={platformIcons[link.platform]}
            label={link.name}
            onClick={() => window.open(link.url, '_blank')}
            sx={{ 
              backgroundColor: platformColors[link.platform],
              color: 'white',
              '&:hover': {
                backgroundColor: platformColors[link.platform],
                opacity: 0.8
              }
            }}
          />
        ))}
      </Box>
    )
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
          Social Media Manager
        </Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Simpan Pengaturan
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Social Media Links */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Link Media Sosial</Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddLink}
                >
                  Tambah Link
                </Button>
              </Box>
              
              <List>
                {socialData.socialLinks.map((link) => (
                  <ListItem key={link.id} divider>
                    <Box display="flex" alignItems="center" gap={2} flex={1}>
                      <Box sx={{ color: platformColors[link.platform] }}>
                        {platformIcons[link.platform]}
                      </Box>
                      <Box flex={1}>
                        <Typography variant="subtitle1" fontWeight="600">
                          {link.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {link.username} • {link.url}
                        </Typography>
                        <Box display="flex" gap={1} mt={1}>
                          <Chip 
                            label={link.enabled ? 'Aktif' : 'Nonaktif'} 
                            color={link.enabled ? 'success' : 'default'} 
                            size="small" 
                          />
                          {link.showInHeader && <Chip label="Header" size="small" variant="outlined" />}
                          {link.showInFooter && <Chip label="Footer" size="small" variant="outlined" />}
                        </Box>
                      </Box>
                    </Box>
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleEditLink(link)} size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteLink(link.id)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Preview */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>Preview</Typography>
              {previewSocialLinks()}
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" mb={1}>Statistik:</Typography>
              <Typography variant="body2" color="text.secondary">
                Total Link: {socialData.socialLinks.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Aktif: {socialData.socialLinks.filter(l => l.enabled).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Di Header: {socialData.socialLinks.filter(l => l.showInHeader && l.enabled).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Di Footer: {socialData.socialLinks.filter(l => l.showInFooter && l.enabled).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Social Sharing Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>Pengaturan Social Sharing</Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={socialData.socialSharing.enabled}
                    onChange={(e) => setSocialData({
                      ...socialData,
                      socialSharing: {
                        ...socialData.socialSharing,
                        enabled: e.target.checked
                      }
                    })}
                  />
                }
                label="Aktifkan Social Sharing"
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle2" mb={1}>Platform Sharing:</Typography>
              <Box display="flex" flexDirection="column" gap={1} mb={2}>
                {Object.keys(socialData.socialSharing.platforms).map(platform => (
                  <FormControlLabel
                    key={platform}
                    control={
                      <Switch
                        checked={socialData.socialSharing.platforms[platform]}
                        onChange={(e) => handleSharingChange(platform, e.target.checked)}
                        disabled={!socialData.socialSharing.enabled}
                        size="small"
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Box sx={{ color: platformColors[platform] }}>
                          {platformIcons[platform]}
                        </Box>
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </Box>
                    }
                  />
                ))}
              </Box>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={socialData.socialSharing.showOnBlog}
                    onChange={(e) => setSocialData({
                      ...socialData,
                      socialSharing: {
                        ...socialData.socialSharing,
                        showOnBlog: e.target.checked
                      }
                    })}
                    disabled={!socialData.socialSharing.enabled}
                  />
                }
                label="Tampilkan di Blog"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={socialData.socialSharing.showOnPortfolio}
                    onChange={(e) => setSocialData({
                      ...socialData,
                      socialSharing: {
                        ...socialData.socialSharing,
                        showOnPortfolio: e.target.checked
                      }
                    })}
                    disabled={!socialData.socialSharing.enabled}
                  />
                }
                label="Tampilkan di Portfolio"
              />
              
              <TextField
                fullWidth
                label="Custom Message"
                value={socialData.socialSharing.customMessage}
                onChange={(e) => setSocialData({
                  ...socialData,
                  socialSharing: {
                    ...socialData.socialSharing,
                    customMessage: e.target.value
                  }
                })}
                margin="normal"
                disabled={!socialData.socialSharing.enabled}
                helperText="Pesan default untuk sharing"
              />
              
              <Button
                variant="outlined"
                size="small"
                onClick={generateSocialShareCode}
                disabled={!socialData.socialSharing.enabled}
                sx={{ mt: 1 }}
              >
                Generate Share Component
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Open Graph Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>Open Graph & Meta Tags</Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={socialData.openGraph.enabled}
                    onChange={(e) => setSocialData({
                      ...socialData,
                      openGraph: {
                        ...socialData.openGraph,
                        enabled: e.target.checked
                      }
                    })}
                  />
                }
                label="Aktifkan Open Graph"
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Default OG Image"
                value={socialData.openGraph.defaultImage}
                onChange={(e) => setSocialData({
                  ...socialData,
                  openGraph: {
                    ...socialData.openGraph,
                    defaultImage: e.target.value
                  }
                })}
                margin="normal"
                disabled={!socialData.openGraph.enabled}
                helperText="URL gambar default untuk sharing"
              />
              
              <TextField
                fullWidth
                select
                label="Twitter Card Type"
                value={socialData.openGraph.twitterCard}
                onChange={(e) => setSocialData({
                  ...socialData,
                  openGraph: {
                    ...socialData.openGraph,
                    twitterCard: e.target.value
                  }
                })}
                margin="normal"
                disabled={!socialData.openGraph.enabled}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="summary">Summary</option>
                <option value="summary_large_image">Summary Large Image</option>
                <option value="app">App</option>
                <option value="player">Player</option>
              </TextField>
              
              <TextField
                fullWidth
                label="Facebook App ID"
                value={socialData.openGraph.facebookAppId}
                onChange={(e) => setSocialData({
                  ...socialData,
                  openGraph: {
                    ...socialData.openGraph,
                    facebookAppId: e.target.value
                  }
                })}
                margin="normal"
                disabled={!socialData.openGraph.enabled}
                placeholder="123456789012345"
                helperText="Optional: Facebook App ID untuk analytics"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add/Edit Link Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingItem ? 'Edit Link Media Sosial' : 'Tambah Link Media Sosial'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            select
            label="Platform"
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Pilih Platform</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
          </TextField>
          
          <TextField
            fullWidth
            label="Nama Tampilan"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="URL"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            margin="normal"
            placeholder="https://..."
          />
          
          <TextField
            fullWidth
            label="Username/Handle"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            margin="normal"
            placeholder="@username"
          />
          
          <Box mt={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.enabled}
                  onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                />
              }
              label="Aktifkan Link"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={formData.showInHeader}
                  onChange={(e) => setFormData({ ...formData, showInHeader: e.target.checked })}
                />
              }
              label="Tampilkan di Header"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={formData.showInFooter}
                  onChange={(e) => setFormData({ ...formData, showInFooter: e.target.checked })}
                />
              }
              label="Tampilkan di Footer"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Batal</Button>
          <Button onClick={handleSaveLink} variant="contained">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SocialMediaManager