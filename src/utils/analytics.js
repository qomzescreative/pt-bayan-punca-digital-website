// Google Analytics 4 with Consent Mode v2
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 Measurement ID

// Initialize Google Analytics with Consent Mode v2
export const initializeGA = () => {
  if (typeof window === 'undefined') return;

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  // Set default consent state (denied by default for GDPR compliance)
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted'
  });

  // Configure GA4
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_flags: 'SameSite=Strict;Secure',
    cookie_expires: 63072000, // 2 years in seconds
    send_page_view: false // We'll send page views manually
  });
};

// Track page views
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: title,
      page_location: window.location.href,
      page_path: path,
      send_to: GA_MEASUREMENT_ID
    });
  }
};

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      send_to: GA_MEASUREMENT_ID
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName, success = true) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
    event_category: 'engagement',
    event_label: formName
  });
};

// Track button clicks
export const trackButtonClick = (buttonName, location) => {
  trackEvent('click', {
    event_category: 'engagement',
    event_label: buttonName,
    button_location: location
  });
};

// Track file downloads
export const trackDownload = (fileName, fileType) => {
  trackEvent('file_download', {
    event_category: 'engagement',
    event_label: fileName,
    file_extension: fileType
  });
};

// Track external link clicks
export const trackExternalLink = (url, linkText) => {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: url,
    link_text: linkText,
    transport_type: 'beacon'
  });
};

// Track scroll depth
export const trackScrollDepth = (percentage) => {
  trackEvent('scroll', {
    event_category: 'engagement',
    event_label: `${percentage}%`,
    scroll_depth: percentage
  });
};

// Track WhatsApp button clicks
export const trackWhatsAppClick = (source) => {
  trackEvent('whatsapp_click', {
    event_category: 'contact',
    event_label: 'whatsapp_button',
    button_source: source
  });
};

// Track contact form interactions
export const trackContactFormInteraction = (action, field = null) => {
  trackEvent('contact_form_interaction', {
    event_category: 'form',
    event_label: action,
    form_field: field
  });
};

// Enhanced ecommerce tracking (for future use)
export const trackPurchase = (transactionId, value, currency = 'IDR', items = []) => {
  trackEvent('purchase', {
    transaction_id: transactionId,
    value: value,
    currency: currency,
    items: items
  });
};

// Track user engagement time
export const trackEngagementTime = (timeOnPage) => {
  trackEvent('user_engagement', {
    event_category: 'engagement',
    engagement_time_msec: timeOnPage,
    event_label: 'time_on_page'
  });
};

// Track search queries (if search functionality is added)
export const trackSearch = (searchTerm, resultsCount = 0) => {
  trackEvent('search', {
    search_term: searchTerm,
    event_category: 'engagement',
    search_results_count: resultsCount
  });
};

// Track video interactions (if video content is added)
export const trackVideoInteraction = (videoTitle, action, progress = 0) => {
  trackEvent('video_' + action, {
    event_category: 'video',
    event_label: videoTitle,
    video_title: videoTitle,
    video_progress: progress
  });
};

// Utility function to check if analytics consent is granted
export const isAnalyticsEnabled = () => {
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) return false;
  
  try {
    const preferences = JSON.parse(consent);
    return preferences.analytics === true;
  } catch (error) {
    console.error('Error parsing cookie consent:', error);
    return false;
  }
};

// Debug function for development
export const debugGA = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('GA4 Debug Info:', {
      measurementId: GA_MEASUREMENT_ID,
      dataLayer: window.dataLayer,
      analyticsEnabled: isAnalyticsEnabled()
    });
  }
};

export default {
  initializeGA,
  trackPageView,
  trackEvent,
  trackFormSubmission,
  trackButtonClick,
  trackDownload,
  trackExternalLink,
  trackScrollDepth,
  trackWhatsAppClick,
  trackContactFormInteraction,
  trackPurchase,
  trackEngagementTime,
  trackSearch,
  trackVideoInteraction,
  isAnalyticsEnabled,
  debugGA
};