-- =====================================================
-- Database Schema untuk PT Bayan Punca Digital
-- Website Perusahaan Digital Marketing & Web Development
-- =====================================================
-- 
-- CATATAN: File ini siap untuk shared hosting
-- Pastikan database sudah dipilih di phpMyAdmin sebelum import
-- =====================================================

-- =====================================================
-- Tabel Kontak/Pesan dari Website
-- =====================================================
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
    ip_address VARCHAR(45),
    user_agent TEXT
);

-- =====================================================
-- Tabel Portfolio/Proyek
-- =====================================================
CREATE TABLE portfolio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    client_name VARCHAR(100),
    project_type ENUM('website', 'mobile_app', 'digital_marketing', 'seo', 'maintenance') NOT NULL,
    image_url VARCHAR(500),
    project_url VARCHAR(500),
    tags JSON,
    start_date DATE,
    end_date DATE,
    status ENUM('completed', 'ongoing', 'paused') DEFAULT 'completed',
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Blog/Artikel
-- =====================================================
CREATE TABLE blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    featured_image VARCHAR(500),
    author VARCHAR(100) DEFAULT 'PT Bayan Punca Digital',
    category ENUM('digital_marketing', 'web_development', 'seo', 'tips', 'news') NOT NULL,
    tags JSON,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    views INT DEFAULT 0,
    meta_title VARCHAR(200),
    meta_description TEXT
);

-- =====================================================
-- Tabel Layanan/Services
-- =====================================================
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    price_start DECIMAL(10,2),
    features JSON,
    active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Testimoni Klien
-- =====================================================
CREATE TABLE testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    company VARCHAR(100),
    position VARCHAR(100),
    testimonial TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    avatar VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Pengaturan Website
-- =====================================================
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Newsletter Subscribers
-- =====================================================
CREATE TABLE newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100),
    status ENUM('active', 'unsubscribed') DEFAULT 'active',
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL,
    ip_address VARCHAR(45)
);

-- =====================================================
-- Tabel Analytics/Statistik
-- =====================================================
CREATE TABLE analytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_url VARCHAR(500) NOT NULL,
    visitor_ip VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    visit_date DATE NOT NULL,
    visit_time TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_date (visit_date),
    INDEX idx_page (page_url)
);

-- =====================================================
-- Indexes untuk Optimasi Performance
-- =====================================================
CREATE INDEX idx_contacts_created ON contacts(created_at);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_portfolio_type ON portfolio(project_type);
CREATE INDEX idx_portfolio_featured ON portfolio(featured);
CREATE INDEX idx_portfolio_created ON portfolio(created_at);
CREATE INDEX idx_blog_status ON blog_posts(status);
CREATE INDEX idx_blog_category ON blog_posts(category);
CREATE INDEX idx_blog_published ON blog_posts(published_at);
CREATE INDEX idx_blog_search ON blog_posts(title, excerpt);
CREATE INDEX idx_testimonials_approved ON testimonials(approved);
CREATE INDEX idx_testimonials_featured ON testimonials(featured);
CREATE INDEX idx_testimonials_rating ON testimonials(rating);
CREATE INDEX idx_newsletter_status ON newsletter_subscribers(status);
CREATE INDEX idx_analytics_page ON analytics(page_url);

-- =====================================================
-- Views untuk Query yang Sering Digunakan
-- =====================================================

-- View untuk Portfolio yang Aktif
CREATE VIEW active_portfolio AS
SELECT * FROM portfolio 
WHERE status = 'completed' 
ORDER BY featured DESC, created_at DESC;

-- View untuk Blog Posts yang Published
CREATE VIEW published_posts AS
SELECT * FROM blog_posts 
WHERE status = 'published' AND published_at <= NOW()
ORDER BY published_at DESC;

-- View untuk Testimoni yang Approved
CREATE VIEW approved_testimonials AS
SELECT * FROM testimonials 
WHERE approved = TRUE 
ORDER BY featured DESC, created_at DESC;

-- =====================================================
-- Triggers untuk Auto-Update
-- =====================================================

-- Trigger untuk auto-generate slug blog
DELIMITER //
CREATE TRIGGER blog_slug_generator 
BEFORE INSERT ON blog_posts
FOR EACH ROW
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        SET NEW.slug = LOWER(REPLACE(REPLACE(NEW.title, ' ', '-'), '--', '-'));
    END IF;
END;//
DELIMITER ;

-- =====================================================
-- Stored Procedures
-- =====================================================

-- Procedure untuk mendapatkan statistik dashboard
DELIMITER //
CREATE PROCEDURE GetDashboardStats()
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM contacts WHERE created_at >= CURDATE()) as new_contacts_today,
        (SELECT COUNT(*) FROM contacts WHERE status = 'new') as unread_contacts,
        (SELECT COUNT(*) FROM portfolio WHERE status = 'completed') as completed_projects,
        (SELECT COUNT(*) FROM blog_posts WHERE status = 'published') as published_posts,
        (SELECT COUNT(*) FROM newsletter_subscribers WHERE status = 'active') as active_subscribers;
END;//

-- Procedure untuk mendapatkan portfolio berdasarkan kategori
CREATE PROCEDURE GetPortfolioByCategory(IN category_input VARCHAR(100))
BEGIN
    SELECT * FROM portfolio 
    WHERE project_type = category_input AND status = 'completed'
    ORDER BY created_at DESC;
END;//

-- Procedure untuk mendapatkan blog posts dengan pagination
CREATE PROCEDURE GetBlogPosts(IN limit_input INT, IN offset_input INT)
BEGIN
    SELECT * FROM blog_posts 
    WHERE status = 'published'
    ORDER BY published_at DESC
    LIMIT limit_input OFFSET offset_input;
END;//

-- Procedure untuk pencarian blog posts
CREATE PROCEDURE SearchBlogPosts(IN search_term VARCHAR(255), IN category_filter VARCHAR(100), IN limit_input INT, IN offset_input INT)
BEGIN
    SELECT * FROM blog_posts 
    WHERE status = 'published'
    AND (title LIKE CONCAT('%', search_term, '%') OR excerpt LIKE CONCAT('%', search_term, '%'))
    AND (category_filter = 'all' OR category = category_filter)
    ORDER BY published_at DESC
    LIMIT limit_input OFFSET offset_input;
END;//

-- Procedure untuk menambah kontak
CREATE PROCEDURE AddContact(IN name_input VARCHAR(100), IN email_input VARCHAR(100), IN phone_input VARCHAR(20), IN subject_input VARCHAR(200), IN message_input TEXT, IN ip_input VARCHAR(45), IN user_agent_input TEXT)
BEGIN
    INSERT INTO contacts (name, email, phone, subject, message, ip_address, user_agent)
    VALUES (name_input, email_input, phone_input, subject_input, message_input, ip_input, user_agent_input);
END;//

-- Procedure untuk analytics bulanan
CREATE PROCEDURE GetMonthlyAnalytics(IN year_input INT, IN month_input INT)
BEGIN
    SELECT 
        visit_date as date,
        COUNT(*) as total_visits,
        COUNT(DISTINCT visitor_ip) as unique_visitors
    FROM analytics 
    WHERE YEAR(visit_date) = year_input AND MONTH(visit_date) = month_input
    GROUP BY visit_date
    ORDER BY visit_date;
END;//

-- Procedure untuk top pages analytics
CREATE PROCEDURE GetTopPages(IN limit_input INT, IN date_from DATE, IN date_to DATE)
BEGIN
    SELECT 
        page_url,
        COUNT(*) as total_visits,
        COUNT(DISTINCT visitor_ip) as unique_visitors
    FROM analytics 
    WHERE visit_date BETWEEN date_from AND date_to
    GROUP BY page_url
    ORDER BY total_visits DESC
    LIMIT limit_input;
END;//

-- Procedure untuk performance monitoring
CREATE PROCEDURE GetPerformanceStats(IN date_from DATE, IN date_to DATE)
BEGIN
    SELECT 
        DATE(created_at) as date,
        'contacts' as metric_type,
        COUNT(*) as count
    FROM contacts 
    WHERE DATE(created_at) BETWEEN date_from AND date_to
    GROUP BY DATE(created_at)
    
    UNION ALL
    
    SELECT 
        visit_date as date,
        'page_views' as metric_type,
        COUNT(*) as count
    FROM analytics 
    WHERE visit_date BETWEEN date_from AND date_to
    GROUP BY visit_date
    
    UNION ALL
    
    SELECT 
        DATE(subscribed_at) as date,
        'newsletter_signups' as metric_type,
        COUNT(*) as count
    FROM newsletter_subscribers 
    WHERE DATE(subscribed_at) BETWEEN date_from AND date_to
    GROUP BY DATE(subscribed_at)
    
    ORDER BY date, metric_type;
END;//

DELIMITER ;

-- =====================================================
-- Komentar dan Dokumentasi
-- =====================================================
/*
Database ini dirancang untuk mendukung website PT Bayan Punca Digital dengan fitur:

1. Manajemen Kontak - Menyimpan pesan dari form kontak
2. Portfolio Management - Showcase proyek-proyek yang telah dikerjakan
3. Blog System - Sistem blog untuk content marketing
4. Service Management - Manajemen layanan yang ditawarkan
5. Testimonials - Testimoni dari klien
6. Newsletter - Sistem berlangganan newsletter
7. Analytics - Tracking kunjungan website
8. Settings - Pengaturan website

Semua tabel dilengkapi dengan:
- Primary key auto increment
- Timestamp untuk tracking
- Index untuk optimasi query
- Constraint untuk data integrity
*/