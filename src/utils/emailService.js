// Email service utility using EmailJS for contact form notifications
import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_bpd_contact', // Will be configured in EmailJS dashboard
  templateId: 'template_bpd_contact', // Will be configured in EmailJS dashboard
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY', // Replace with actual public key
  recipientEmail: 'bayanpuncadigital@gmail.com'
};

/**
 * Initialize EmailJS with public key
 */
export const initializeEmailJS = () => {
  try {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log('EmailJS initialized successfully');
  } catch (error) {
    console.error('Failed to initialize EmailJS:', error);
  }
};

/**
 * Send contact form email notification
 * @param {Object} formData - Contact form data
 * @param {string} formData.name - Sender name
 * @param {string} formData.email - Sender email
 * @param {string} formData.phone - Sender phone (optional)
 * @param {string} formData.company - Sender company (optional)
 * @param {string} formData.service - Selected service
 * @param {string} formData.message - Message content
 * @returns {Promise} EmailJS send promise
 */
export const sendContactEmail = async (formData) => {
  try {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      throw new Error('Nama, email, dan pesan wajib diisi');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Format email tidak valid');
    }

    // Prepare template parameters
    const templateParams = {
      to_email: EMAILJS_CONFIG.recipientEmail,
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Tidak disediakan',
      company: formData.company || 'Tidak disediakan',
      service: formData.service || 'Tidak dipilih',
      message: formData.message,
      timestamp: new Date().toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      reply_to: formData.email
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    console.log('Email sent successfully:', response);
    
    // Track email send event for analytics
    if (window.gtag) {
      window.gtag('event', 'contact_form_submit', {
        event_category: 'engagement',
        event_label: formData.service || 'general_inquiry',
        value: 1
      });
    }

    return {
      success: true,
      message: 'Pesan berhasil dikirim! Tim kami akan segera menghubungi Anda.',
      response
    };

  } catch (error) {
    console.error('Failed to send email:', error);
    
    // Track email send error for analytics
    if (window.gtag) {
      window.gtag('event', 'contact_form_error', {
        event_category: 'error',
        event_label: error.message,
        value: 1
      });
    }

    return {
      success: false,
      message: error.message || 'Gagal mengirim pesan. Silakan coba lagi atau hubungi kami langsung.',
      error
    };
  }
};

/**
 * Send auto-reply email to the sender
 * @param {Object} formData - Contact form data
 * @returns {Promise} EmailJS send promise
 */
export const sendAutoReply = async (formData) => {
  try {
    const autoReplyParams = {
      to_email: formData.email,
      to_name: formData.name,
      company_name: 'PT Bayan Punca Digital',
      company_email: EMAILJS_CONFIG.recipientEmail,
      company_phone: '+62 812-3456-7890', // Replace with actual phone
      company_address: 'Jl. Contoh No. 123, Jakarta Selatan', // Replace with actual address
      service_requested: formData.service || 'Konsultasi Umum',
      timestamp: new Date().toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'template_bpd_autoreply', // Auto-reply template
      autoReplyParams
    );

    console.log('Auto-reply sent successfully:', response);
    return response;

  } catch (error) {
    console.error('Failed to send auto-reply:', error);
    // Don't throw error for auto-reply failure
    return null;
  }
};

/**
 * Validate phone number format (Indonesian)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid phone number
 */
export const validatePhoneNumber = (phone) => {
  if (!phone) return true; // Phone is optional
  
  // Indonesian phone number patterns
  const phoneRegex = /^(\+62|62|0)[0-9]{8,13}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
};

/**
 * Format phone number for display
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format Indonesian phone number
  if (cleaned.startsWith('62')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+62${cleaned.substring(1)}`;
  } else {
    return `+62${cleaned}`;
  }
};

export default {
  initializeEmailJS,
  sendContactEmail,
  sendAutoReply,
  validatePhoneNumber,
  formatPhoneNumber
};