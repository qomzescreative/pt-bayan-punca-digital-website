import { Box } from '@mui/material'

const AccessibilitySkipLink = () => {
  return (
    <Box
      component="a"
      href="#main-content"
      sx={{
        position: 'absolute',
        top: -40,
        left: 6,
        background: '#000',
        color: '#fff',
        padding: '8px 16px',
        textDecoration: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 'bold',
        zIndex: 9999,
        transition: 'top 0.3s',
        '&:focus': {
          top: 6,
        },
      }}
    >
      Skip to main content
    </Box>
  )
}

export default AccessibilitySkipLink