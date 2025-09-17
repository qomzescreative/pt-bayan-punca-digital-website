<?php
/**
 * =====================================================
 * Database Configuration untuk PT Bayan Punca Digital
 * =====================================================
 * 
 * File konfigurasi database untuk koneksi PHP
 * Rename file ini menjadi config.php dan sesuaikan dengan environment Anda
 */

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'u998642024_Hamzah');
define('DB_USER', 'bayan_app');
define('DB_PASS', 'your_password_here');
define('DB_CHARSET', 'utf8mb4');

// Database Connection Class
class Database {
    private $host = DB_HOST;
    private $db_name = DB_NAME;
    private $username = DB_USER;
    private $password = DB_PASS;
    private $charset = DB_CHARSET;
    public $conn;

    // Get database connection
    public function getConnection() {
        $this->conn = null;
        
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=" . $this->charset;
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        
        return $this->conn;
    }
}

// Example Usage:
/*
$database = new Database();
$db = $database->getConnection();

// Query example
$query = "SELECT * FROM portfolio WHERE featured = 1 ORDER BY created_at DESC LIMIT 6";
$stmt = $db->prepare($query);
$stmt->execute();
$portfolios = $stmt->fetchAll();
*/

// Environment Configuration
define('ENVIRONMENT', 'development'); // development, staging, production

// Error Reporting based on Environment
if (ENVIRONMENT === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Timezone
date_default_timezone_set('Asia/Jakarta');

// Security Settings
define('SECURE_KEY', 'your_secure_key_here_change_this');
define('HASH_ALGO', 'sha256');

// File Upload Settings
define('UPLOAD_PATH', '../uploads/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx']);

// Email Configuration (for contact form)
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'your_email@gmail.com');
define('SMTP_PASSWORD', 'your_app_password');
define('FROM_EMAIL', 'noreply@bayanpuncadigital.com');
define('FROM_NAME', 'PT Bayan Punca Digital');
define('TO_EMAIL', 'info@bayanpuncadigital.com');

// API Keys
define('GOOGLE_MAPS_API_KEY', 'your_google_maps_api_key');
define('RECAPTCHA_SITE_KEY', 'your_recaptcha_site_key');
define('RECAPTCHA_SECRET_KEY', 'your_recaptcha_secret_key');

// WhatsApp Configuration
define('WHATSAPP_NUMBER', '6281234567890'); // Format: country code + number
define('WHATSAPP_MESSAGE', 'Halo, saya tertarik dengan layanan PT Bayan Punca Digital');

// Social Media Links
define('FACEBOOK_URL', 'https://facebook.com/bayanpuncadigital');
define('INSTAGRAM_URL', 'https://instagram.com/bayanpuncadigital');
define('LINKEDIN_URL', 'https://linkedin.com/company/bayanpuncadigital');
define('YOUTUBE_URL', 'https://youtube.com/@bayanpuncadigital');

// Website Settings
define('SITE_NAME', 'PT Bayan Punca Digital');
define('SITE_TAGLINE', 'Your Digital Success Partner');
define('SITE_URL', 'https://bayanpuncadigital.com');
define('ADMIN_EMAIL', 'admin@bayanpuncadigital.com');

// Pagination Settings
define('POSTS_PER_PAGE', 10);
define('PORTFOLIO_PER_PAGE', 12);
define('TESTIMONIALS_PER_PAGE', 6);

?>