import { useState, useRef, useEffect } from 'react'
import { Box, Skeleton } from '@mui/material'

function LazyImage({ src, alt, sx, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  return (
    <Box ref={imgRef} sx={sx}>
      {!isInView ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={sx?.height || 200}
          sx={{ borderRadius: 1 }}
        />
      ) : (
        <>
          {!isLoaded && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={sx?.height || 200}
              sx={{ borderRadius: 1 }}
            />
          )}
          <Box
            component="img"
            src={src}
            alt={alt}
            onLoad={handleLoad}
            sx={{
              ...sx,
              display: isLoaded ? 'block' : 'none',
              transition: 'opacity 0.3s ease-in-out',
              opacity: isLoaded ? 1 : 0
            }}
            {...props}
          />
        </>
      )}
    </Box>
  )
}

export default LazyImage