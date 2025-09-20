import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SpinnerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
  padding: theme.spacing(4),
  animation: `${fadeIn} 0.3s ease-in-out`,
}));

const LoadingText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

const LoadingSpinner = ({ 
  size = 40, 
  text = 'Memuat...', 
  color = 'primary',
  fullHeight = false 
}) => {
  return (
    <SpinnerContainer
      sx={{
        minHeight: fullHeight ? '100vh' : '200px',
      }}
    >
      <CircularProgress 
        size={size} 
        color={color}
        thickness={4}
      />
      {text && (
        <LoadingText variant="body2">
          {text}
        </LoadingText>
      )}
    </SpinnerContainer>
  );
};

export default LoadingSpinner;