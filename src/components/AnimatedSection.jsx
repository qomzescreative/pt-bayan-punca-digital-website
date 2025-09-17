import { Box } from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'
import { useEffect, useRef, useState } from 'react'

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const AnimatedBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isVisible' && prop !== 'animation' && prop !== 'delay'
})(({ theme, isVisible, animation, delay }) => {
  const animations = {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn
  }

  return {
    opacity: isVisible ? 1 : 0,
    animation: isVisible ? `${animations[animation] || fadeInUp} 0.8s ease-out ${delay || 0}s both` : 'none',
    transition: 'opacity 0.3s ease-out'
  }
})

const AnimatedSection = ({ 
  children, 
  animation = 'fadeInUp', 
  delay = 0, 
  threshold = 0.1,
  triggerOnce = true,
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(ref.current)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: '50px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, triggerOnce])

  return (
    <AnimatedBox
      ref={ref}
      isVisible={isVisible}
      animation={animation}
      delay={delay}
      {...props}
    >
      {children}
    </AnimatedBox>
  )
}

export default AnimatedSection