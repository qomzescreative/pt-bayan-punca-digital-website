import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, Box, Container, Typography, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.main,
  textDecoration: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  fontSize: { xs: '0.9rem', sm: '1rem' },
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(255, 107, 0, 0.08)',
    transform: 'translateY(-1px)',
  },
  '&.active': {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(255, 107, 0, 0.08)',
    fontWeight: 600,
  },
  [theme.breakpoints.down('sm')]: {
    padding: '12px 20px',
    fontSize: '1.1rem',
    borderRadius: '8px',
    margin: '4px 0',
  },
}))

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  margin: '0 4px',
  padding: '8px 16px',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.95rem',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(255, 107, 0, 0.08)',
    transform: 'translateY(-1px)',
  },
  '&.active': {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(255, 107, 0, 0.08)',
    fontWeight: 600,
  },
  [theme.breakpoints.down('md')]: {
    padding: '6px 12px',
    fontSize: '0.9rem',
    margin: '0 2px',
  },
}))

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(0,0,0,0.05)',
  [theme.breakpoints.down('sm')]: {
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  },
}))

const navItems = [
  { title: 'Home', path: '/' },
  { title: 'Tentang Kami', path: '/tentang-kami' },
  { title: 'Portfolio', path: '/portfolio' },
  { title: 'Blog', path: '/blog' },
  { title: 'Kontak', path: '/kontak' },
]

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box sx={{ width: 280, height: '100%', backgroundColor: '#f8f9fa' }}>
      {/* Drawer Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        backgroundColor: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.1)'
      }}>
        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
          Menu
        </Typography>
        <IconButton onClick={handleDrawerToggle} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      
      {/* Navigation Links */}
      <List sx={{ pt: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.title} sx={{ px: 2, py: 0.5 }}>
            <NavLink
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
              style={{ 
                width: '100%', 
                textAlign: 'left',
                display: 'block',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: location.pathname === item.path ? 'rgba(255, 107, 0, 0.08)' : 'transparent'
              }}
              onClick={handleDrawerToggle}
            >
              {item.title}
            </NavLink>
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      {/* Company Info in Drawer */}
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          PT Bayan Punca Digital
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block', mt: 1 }}>
          Solusi Digital Terpercaya
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box
                component="img"
                src="/assets/logo-perusahaan/Logo-Bayan-Punca-Digital.png"
                alt="PT Bayan Punca Digital"
                sx={{ 
                  height: { xs: 35, sm: 40 },
                  width: 'auto',
                  maxWidth: { xs: 160, sm: 200 }
                }}
              />
            </Link>

            {/* Mobile Menu Icon */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <NavButton
                  key={item.title}
                  component={Link}
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  {item.title}
                </NavButton>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>

      {/* Mobile Navigation Drawer */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ 
            keepMounted: true,
            sx: {
              '& .MuiBackdrop-root': {
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(4px)',
              }
            }
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: { xs: '85vw', sm: 280 },
              maxWidth: 320,
              borderRadius: '16px 0 0 16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Toolbar spacing */}
      <Toolbar />
    </Box>
  )
}

export default Navbar