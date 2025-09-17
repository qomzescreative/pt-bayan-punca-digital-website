import { useState, useEffect } from 'react'
import { Fab, Tooltip, Zoom } from '@mui/material'
import { AdminPanelSettings } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'

const FloatingButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(10),
  right: theme.spacing(2),
  zIndex: 1000,
  backgroundColor: '#1976d2',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1565c0',
    transform: 'scale(1.1)',
  },
  transition: 'all 0.3s ease',
  [theme.breakpoints.down('sm')]: {
    bottom: theme.spacing(8),
    right: theme.spacing(1),
    width: 48,
    height: 48,
  },
}))

function AdminFloatingButton() {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  // Show button after 3 seconds or on specific key combination
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    const handleKeyPress = (e) => {
      // Show admin button on Ctrl+Shift+A
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsVisible(true)
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const handleClick = () => {
    navigate('/admin')
  }

  return (
    <Zoom in={isVisible}>
      <Tooltip title="Admin Panel (CMS)" placement="left">
        <FloatingButton
          onClick={handleClick}
          aria-label="admin panel"
        >
          <AdminPanelSettings />
        </FloatingButton>
      </Tooltip>
    </Zoom>
  )
}

export default AdminFloatingButton