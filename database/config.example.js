/**
 * =====================================================
 * Database Configuration untuk PT Bayan Punca Digital
 * =====================================================
 * 
 * File konfigurasi database untuk Node.js/Express
 * Rename file ini menjadi config.js dan sesuaikan dengan environment Anda
 */

require('dotenv').config();

module.exports = {
  // Database Configuration
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'bayan_app',
    password: process.env.DB_PASSWORD || 'your_password_here',
    database: process.env.DB_NAME || 'u998642024_Hamzah',
    charset: 'utf8mb4',
    timezone: 'local',
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true,
    // Connection Pool Settings
    connectionLimit: 10,
    queueLimit: 0
  },

  // Environment Configuration
  environment: process.env.NODE_ENV || 'development',
  
  // Server Configuration
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_change_this',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },

  // Email Configuration
  email: {
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USERNAME || 'your_email@gmail.com',
        pass: process.env.SMTP_PASSWORD || 'your_app_password'
      }
    },
    from: {
      email: process.env.FROM_EMAIL || 'noreply@bayanpuncadigital.com',
      name: process.env.FROM_NAME || 'PT Bayan Punca Digital'
    },
    to: process.env.TO_EMAIL || 'info@bayanpuncadigital.com'
  },

  // File Upload Configuration
  upload: {
    path: process.env.UPLOAD_PATH || './uploads/',
    maxSize: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
  },

  // API Keys
  apiKeys: {
    googleMaps: process.env.GOOGLE_MAPS_API_KEY || 'your_google_maps_api_key',
    recaptcha: {
      siteKey: process.env.RECAPTCHA_SITE_KEY || 'your_recaptcha_site_key',
      secretKey: process.env.RECAPTCHA_SECRET_KEY || 'your_recaptcha_secret_key'
    }
  },

  // WhatsApp Configuration
  whatsapp: {
    number: process.env.WHATSAPP_NUMBER || '6281234567890',
    defaultMessage: process.env.WHATSAPP_MESSAGE || 'Halo, saya tertarik dengan layanan PT Bayan Punca Digital'
  },

  // Social Media Links
  socialMedia: {
    facebook: process.env.FACEBOOK_URL || 'https://facebook.com/bayanpuncadigital',
    instagram: process.env.INSTAGRAM_URL || 'https://instagram.com/bayanpuncadigital',
    linkedin: process.env.LINKEDIN_URL || 'https://linkedin.com/company/bayanpuncadigital',
    youtube: process.env.YOUTUBE_URL || 'https://youtube.com/@bayanpuncadigital'
  },

  // Website Settings
  site: {
    name: process.env.SITE_NAME || 'PT Bayan Punca Digital',
    tagline: process.env.SITE_TAGLINE || 'Your Digital Success Partner',
    url: process.env.SITE_URL || 'https://bayanpuncadigital.com',
    adminEmail: process.env.ADMIN_EMAIL || 'admin@bayanpuncadigital.com'
  },

  // Pagination Settings
  pagination: {
    postsPerPage: parseInt(process.env.POSTS_PER_PAGE) || 10,
    portfolioPerPage: parseInt(process.env.PORTFOLIO_PER_PAGE) || 12,
    testimonialsPerPage: parseInt(process.env.TESTIMONIALS_PER_PAGE) || 6
  },

  // Security Settings
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
    sessionSecret: process.env.SESSION_SECRET || 'your_session_secret_change_this',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000'
  },

  // Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || './logs/app.log',
    maxSize: process.env.LOG_MAX_SIZE || '10m',
    maxFiles: process.env.LOG_MAX_FILES || '5d'
  }
};

// Example .env file content:
/*
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=bayan_app
DB_PASSWORD=your_secure_password
DB_NAME=u998642024_Hamzah

# Server
NODE_ENV=development
PORT=3000
HOST=localhost

# JWT
JWT_SECRET=your_very_secure_jwt_secret_key_here
JWT_EXPIRES_IN=24h

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=noreply@bayanpuncadigital.com
FROM_NAME=PT Bayan Punca Digital
TO_EMAIL=info@bayanpuncadigital.com

# API Keys
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# WhatsApp
WHATSAPP_NUMBER=6281234567890
WHATSAPP_MESSAGE=Halo, saya tertarik dengan layanan PT Bayan Punca Digital

# Social Media
FACEBOOK_URL=https://facebook.com/bayanpuncadigital
INSTAGRAM_URL=https://instagram.com/bayanpuncadigital
LINKEDIN_URL=https://linkedin.com/company/bayanpuncadigital
YOUTUBE_URL=https://youtube.com/@bayanpuncadigital

# Website
SITE_NAME=PT Bayan Punca Digital
SITE_TAGLINE=Your Digital Success Partner
SITE_URL=https://bayanpuncadigital.com
ADMIN_EMAIL=admin@bayanpuncadigital.com

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=your_session_secret_key_here
CORS_ORIGIN=http://localhost:3000

# File Upload
UPLOAD_PATH=./uploads/
MAX_FILE_SIZE=5242880

# Pagination
POSTS_PER_PAGE=10
PORTFOLIO_PER_PAGE=12
TESTIMONIALS_PER_PAGE=6

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log
LOG_MAX_SIZE=10m
LOG_MAX_FILES=5d
*/