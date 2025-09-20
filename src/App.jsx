import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import WhatsAppButton from './components/WhatsAppButton';
import AdminFloatingButton from './components/AdminFloatingButton';
import AccessibilitySkipLink from './components/AccessibilitySkipLink';
import CookieBanner from './components/CookieBanner';
import { initializeGA, trackPageView } from './utils/analytics';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Blog = lazy(() => import('./pages/Blog'))
const Contact = lazy(() => import('./pages/Contact'))
const Admin = lazy(() => import('./pages/Admin'))

// Analytics tracking component
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views when route changes
    trackPageView(location.pathname, document.title);
  }, [location]);

  return null;
};

function App() {
  useEffect(() => {
    // Initialize Google Analytics on app load
    initializeGA();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Router>
          <AnalyticsTracker />
          <AccessibilitySkipLink />
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box 
              component="main" 
              id="main-content"
              sx={{ 
                flex: 1,
                pt: { xs: '64px', sm: '70px' },
                position: 'relative'
              }}
              role="main"
              aria-label="Main content"
            >
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </Suspense>
            </Box>
            <Footer />
            <WhatsAppButton />
            <AdminFloatingButton />
            <CookieBanner />
          </Box>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App