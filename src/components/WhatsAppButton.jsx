import { Box, Typography, keyframes } from '@mui/material'

// Animasi floating
const floatingAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`

// Animasi pulse
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
`

// Animasi bounce
const bounceAnimation = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
`

const WhatsAppButton = () => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      window.open(`https://wa.me/6287727073796`, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Box 
      sx={{ 
        position: 'fixed', 
        bottom: { xs: 20, sm: 30 }, 
        right: { xs: 20, sm: 30 }, 
        zIndex: 1000,
        animation: `${floatingAnimation} 3s ease-in-out infinite`
      }}
    >
      <Box
        component="a"
        href={`https://wa.me/6287727073796`} 
        target="_blank" 
        rel="noopener noreferrer"
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label="Hubungi kami melalui WhatsApp - Nomor: +62 877-2707-3796"
        sx={{ 
          textDecoration: 'none',
          '&:focus': {
            outline: '2px solid #25D366',
            outlineOffset: '2px'
          }
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: '#25D366', 
            color: 'white', 
            p: { xs: 1, sm: 1.5 }, 
            borderRadius: 50, 
            boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
            minWidth: { xs: 'auto', sm: 'auto' },
            animation: `${pulseAnimation} 2s infinite`,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#20BA5C',
              transform: 'scale(1.1)',
              animation: `${bounceAnimation} 1s ease-in-out`,
              boxShadow: '0 6px 25px rgba(37, 211, 102, 0.6)'
            },
            '&:active': {
              transform: 'scale(0.95)'
            }
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="#FFFFFF"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <Typography 
            variant="button" 
            sx={{ 
              ml: 1,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              display: { xs: 'none', sm: 'block' }
            }}
            aria-hidden="true"
          >
            Chat WhatsApp
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default WhatsAppButton