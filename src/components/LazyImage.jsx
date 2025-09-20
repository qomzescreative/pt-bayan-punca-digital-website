import { useState, useRef, useEffect } from 'react'
import { Box, Skeleton } from '@mui/material'

const LazyImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  style,
  sizes,
  srcSet,
  webpSrc,
  webpSrcSet,
  placeholder = true,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
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

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  // Generate WebP sources if provided
  const renderSources = () => {
    const sources = []
    
    if (webpSrcSet || webpSrc) {
      sources.push(
        <source
          key="webp"
          type="image/webp"
          srcSet={webpSrcSet || webpSrc}
          sizes={sizes}
        />
      )
    }
    
    if (srcSet || src) {
      sources.push(
        <source
          key="fallback"
          srcSet={srcSet || src}
          sizes={sizes}
        />
      )
    }
    
    return sources
  }

  return (
    <Box
      ref={imgRef}
      sx={{
        position: 'relative',
        width: width || '100%',
        height: height || 'auto',
        overflow: 'hidden',
        ...style
      }}
      className={className}
    >
      {/* Skeleton placeholder */}
      {placeholder && !isLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={height || 200}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
          }}
        />
      )}

      {/* Image with modern format support */}
      {isInView && (
        <>
          {(webpSrcSet || webpSrc || srcSet) ? (
            <picture>
              {renderSources()}
              <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes={sizes}
                onLoad={handleLoad}
                onError={handleError}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: isLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out',
                }}
                loading="lazy"
                decoding="async"
                {...props}
              />
            </picture>
          ) : (
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              onLoad={handleLoad}
              onError={handleError}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
              }}
              loading="lazy"
              decoding="async"
              {...props}
            />
          )}
        </>
      )}

      {/* Error state */}
      {hasError && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.200',
            color: 'grey.600',
            fontSize: '0.875rem'
          }}
        >
          Image failed to load
        </Box>
      )}
    </Box>
  )
}

export default LazyImage