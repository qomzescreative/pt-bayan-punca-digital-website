-- =====================================================
-- Data Sample untuk PT Bayan Punca Digital
-- File ini berisi data awal untuk testing dan demo
-- =====================================================
-- 
-- CATATAN: Pastikan database sudah dipilih di phpMyAdmin sebelum import
-- File ini siap untuk shared hosting (u998642024_Hamzah)
-- =====================================================

-- =====================================================
-- Data Portfolio/Proyek
-- =====================================================
INSERT INTO portfolio (title, description, client_name, project_type, image_url, project_url, tags, start_date, end_date, status, featured) VALUES
('Corporate Website Development – PT Permata Gunung Putra', 
 'Pengembangan website corporate profesional dengan fitur company profile lengkap, integrasi PDF, dan desain responsif untuk meningkatkan kredibilitas perusahaan di era digital.',
 'PT Permata Gunung Putra', 'website', 
 '/src/assets/portfolio-images/Portfolio PT Permata Gunung Putra/Portfolio Permata Gunung Putra.png',
 'https://permatagunungputra.com',
 '["Corporate Website", "Company Profile", "PDF Integration", "Responsive Design"]',
 '2024-01-15', '2024-02-28', 'completed', TRUE),

('Social Media Management & Website Update – PT Matra Engineering & Construction',
 'Manajemen media sosial komprehensif dan update website untuk meningkatkan digital presence dan engagement dengan target audience.',
 'PT Matra Engineering & Construction', 'digital_marketing',
 '/src/assets/portfolio-images/Portfolio PT Matra Eng & Cons/MEC Website .png',
 'https://matraengineering.com',
 '["Social Media Management", "Website Update", "Digital Presence", "Content Management"]',
 '2024-02-01', '2024-03-15', 'completed', TRUE),

('Corporate Website – PT Karsa Cipta Pancarona',
 'Pembuatan website corporate modern dengan fokus pada user experience dan optimasi SEO untuk meningkatkan visibilitas online.',
 'PT Karsa Cipta Pancarona', 'website',
 '/src/assets/portfolio-images/Portfolio PT Karsa Cipta Pancarona/Karsa Cipta Pancarona.png',
 'https://karsaciptapancarona.com',
 '["Web Development", "Corporate Website", "Company Profile"]',
 '2024-03-01', '2024-04-10', 'completed', FALSE),

('Website Development – PT Mitra Tunas Harapan',
 'Pengembangan website bisnis dengan fitur katalog produk dan sistem informasi perusahaan yang user-friendly.',
 'PT Mitra Tunas Harapan', 'website',
 '/src/assets/portfolio-images/Portfolio PT Mitra Tunas Harapan/Mitra Tunas Harapan.png',
 'https://mitratunasharapan.com',
 '["Web Development", "Corporate Website", "Company Profile"]',
 '2024-04-01', '2024-05-15', 'completed', FALSE),

('Corporate Website – PT Delicia Karya Utama',
 'Pembuatan website corporate dengan desain elegan dan fitur-fitur modern untuk mendukung branding perusahaan.',
 'PT Delicia Karya Utama', 'website',
 '/src/assets/portfolio-images/Portfolio PT Delicia Karya Utama/Delicia Karya Utama.png',
 'https://deliciakaryautama.com',
 '["Web Development", "Corporate Website", "Company Profile"]',
 '2024-05-01', '2024-06-20', 'completed', FALSE),

('Website Development – PT Sagara Bumi Tehnik',
 'Pengembangan website teknik dengan fokus pada showcase proyek dan layanan engineering yang profesional.',
 'PT Sagara Bumi Tehnik', 'website',
 '/src/assets/portfolio-images/Portfolio PT Sagara Bumi Tehnik/Sagara Bumi Tehnik.png',
 'https://sagarabumiteknik.com',
 '["Web Development", "Corporate Website", "Company Profile"]',
 '2024-06-01', '2024-07-25', 'completed', FALSE);

-- =====================================================
-- Data Layanan/Services
-- =====================================================
INSERT INTO services (name, description, icon, price_start, features, active, sort_order) VALUES
('Website Development', 
 'Pembuatan website profesional dengan teknologi terkini, desain responsif, dan optimasi SEO untuk meningkatkan online presence bisnis Anda.',
 'website-icon.svg', 5000000.00,
 '["Desain Responsif", "SEO Optimized", "Admin Panel", "SSL Certificate", "Hosting 1 Tahun", "Maintenance 3 Bulan"]',
 TRUE, 1),

('Digital Marketing', 
 'Strategi pemasaran digital komprehensif meliputi social media management, content marketing, dan advertising untuk meningkatkan brand awareness.',
 'digital-icon.svg', 3000000.00,
 '["Social Media Management", "Content Creation", "Paid Advertising", "Analytics Report", "Brand Strategy", "Engagement Optimization"]',
 TRUE, 2),

('SEO Optimization', 
 'Optimasi mesin pencari untuk meningkatkan ranking website di Google dan mendatangkan traffic organik yang berkualitas.',
 'seo-icon.svg', 2500000.00,
 '["Keyword Research", "On-Page SEO", "Technical SEO", "Content Optimization", "Backlink Building", "Monthly Report"]',
 TRUE, 3),

('Mobile App Development', 
 'Pengembangan aplikasi mobile native dan hybrid untuk iOS dan Android dengan user experience yang optimal.',
 'app-icon.svg', 15000000.00,
 '["Native Development", "Cross Platform", "UI/UX Design", "API Integration", "App Store Submission", "Maintenance Support"]',
 TRUE, 4),

('Website Maintenance', 
 'Layanan pemeliharaan website meliputi update konten, backup data, security monitoring, dan technical support.',
 'maintenance-icon.svg', 500000.00,
 '["Regular Updates", "Security Monitoring", "Backup Service", "Performance Optimization", "Technical Support", "Monthly Report"]',
 TRUE, 5),

('Graphic Design', 
 'Desain grafis profesional untuk kebutuhan branding, marketing materials, dan visual identity perusahaan.',
 'design-icon.svg', 1000000.00,
 '["Logo Design", "Brand Identity", "Marketing Materials", "Social Media Graphics", "Print Design", "Unlimited Revision"]',
 TRUE, 6);

-- =====================================================
-- Data Blog Posts
-- =====================================================
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, category, tags, status, published_at, meta_title, meta_description) VALUES
('Tips Memilih Jasa Pembuatan Website Terpercaya',
 'tips-memilih-jasa-website-terpercaya',
 'Panduan lengkap untuk memilih jasa pembuatan website yang tepat untuk bisnis Anda. Pelajari kriteria penting yang harus diperhatikan.',
 'Dalam era digital saat ini, memiliki website yang profesional adalah kebutuhan mutlak bagi setiap bisnis. Namun, dengan banyaknya penyedia jasa pembuatan website, bagaimana cara memilih yang terpercaya?\n\n## 1. Portfolio dan Pengalaman\nPeriksa portfolio klien sebelumnya dan pengalaman perusahaan dalam industri web development.\n\n## 2. Teknologi yang Digunakan\nPastikan mereka menggunakan teknologi terkini dan standar industri.\n\n## 3. Layanan Purna Jual\nPilih yang menyediakan maintenance dan support berkelanjutan.\n\n## 4. Harga yang Transparan\nHindari penawaran yang terlalu murah atau tidak jelas rinciannya.',
 '/src/assets/blog/tips-website.jpg',
 'tips', '["Website", "Tips", "Business"]',
 'published', '2024-08-01 10:00:00',
 'Tips Memilih Jasa Website Terpercaya | PT Bayan Punca Digital',
 'Panduan lengkap memilih jasa pembuatan website terpercaya untuk bisnis Anda. Tips dari ahli web development PT Bayan Punca Digital.'),

('Pentingnya SEO untuk Bisnis Online',
 'pentingnya-seo-untuk-bisnis-online',
 'Mengapa SEO sangat penting untuk kesuksesan bisnis online Anda? Pelajari manfaat dan strategi SEO yang efektif.',
 'Search Engine Optimization (SEO) adalah kunci kesuksesan bisnis online di era digital. Tanpa SEO yang baik, website Anda akan sulit ditemukan oleh calon pelanggan.\n\n## Manfaat SEO untuk Bisnis\n\n### 1. Meningkatkan Visibilitas Online\nSEO membantu website Anda muncul di halaman pertama Google untuk kata kunci yang relevan.\n\n### 2. Traffic Organik Berkualitas\nPengunjung dari hasil pencarian organik memiliki tingkat konversi yang lebih tinggi.\n\n### 3. Cost-Effective Marketing\nInvestasi SEO memberikan ROI jangka panjang dibandingkan iklan berbayar.\n\n## Strategi SEO yang Efektif\n- Riset kata kunci yang tepat\n- Optimasi konten berkualitas\n- Technical SEO yang baik\n- Link building yang natural',
 '/src/assets/blog/seo-importance.jpg',
 'seo', '["SEO", "Digital Marketing", "Online Business"]',
 'published', '2024-08-15 14:30:00',
 'Pentingnya SEO untuk Bisnis Online | Panduan Lengkap',
 'Pelajari mengapa SEO sangat penting untuk kesuksesan bisnis online Anda. Strategi dan tips SEO dari expert PT Bayan Punca Digital.'),

('Tren Web Development 2024',
 'tren-web-development-2024',
 'Teknologi dan tren terbaru dalam web development yang akan mendominasi tahun 2024. Stay updated dengan perkembangan industri.',
 'Industri web development terus berkembang pesat. Berikut adalah tren-tren yang akan mendominasi tahun 2024:\n\n## 1. AI Integration\nIntegrasi kecerdasan buatan dalam website untuk chatbot, personalisasi, dan automation.\n\n## 2. Progressive Web Apps (PWA)\nPWA menjadi standar baru untuk pengalaman mobile yang optimal.\n\n## 3. Headless CMS\nFleksibilitas dalam manajemen konten dengan arsitektur headless.\n\n## 4. WebAssembly\nPerforma aplikasi web yang mendekati native apps.\n\n## 5. Sustainable Web Design\nDesain website yang ramah lingkungan dan energy-efficient.',
 '/src/assets/blog/web-trends-2024.jpg',
 'web_development', '["Web Development", "Technology", "Trends"]',
 'published', '2024-09-01 09:00:00',
 'Tren Web Development 2024 | PT Bayan Punca Digital',
 'Discover the latest web development trends for 2024. Stay ahead with cutting-edge technologies and best practices.');

-- =====================================================
-- Data Testimoni
-- =====================================================
INSERT INTO testimonials (client_name, company, position, testimonial, rating, featured, approved) VALUES
('Budi Santoso', 'PT Permata Gunung Putra', 'Managing Director',
 'PT Bayan Punca Digital memberikan layanan yang sangat profesional. Website kami sekarang terlihat modern dan fungsional. Tim mereka sangat responsif dan memahami kebutuhan bisnis kami.',
 5, TRUE, TRUE),

('Sari Dewi', 'PT Matra Engineering', 'Marketing Manager',
 'Hasil kerja yang memuaskan! Social media management dan website update yang dilakukan sangat membantu meningkatkan brand awareness perusahaan kami. Highly recommended!',
 5, TRUE, TRUE),

('Ahmad Rahman', 'PT Karsa Cipta Pancarona', 'CEO',
 'Pelayanan yang excellent dari awal konsultasi hingga launching website. Tim yang berpengalaman dan selalu siap membantu. Terima kasih PT Bayan Punca Digital!',
 5, FALSE, TRUE),

('Linda Wijaya', 'PT Delicia Karya Utama', 'Operations Director',
 'Website yang dibuat sangat sesuai dengan ekspektasi kami. Desainnya elegan dan user-friendly. Proses pengerjaan juga tepat waktu sesuai timeline yang disepakati.',
 4, FALSE, TRUE);

-- =====================================================
-- Data Pengaturan Website
-- =====================================================
INSERT INTO settings (setting_key, setting_value, description) VALUES
('company_name', 'PT Bayan Punca Digital', 'Nama perusahaan'),
('company_tagline', 'Your Digital Success Partner', 'Tagline perusahaan'),
('company_address', 'Jl. Digital No. 123, Jakarta Selatan 12345', 'Alamat perusahaan'),
('company_phone', '+62 21 1234 5678', 'Nomor telepon perusahaan'),
('company_email', 'info@bayanpuncadigital.com', 'Email perusahaan'),
('company_whatsapp', '+62 812 3456 7890', 'Nomor WhatsApp'),
('office_hours', 'Senin - Jumat: 09:00 - 17:00 WIB', 'Jam operasional'),
('google_maps_lat', '-6.2088', 'Latitude Google Maps'),
('google_maps_lng', '106.8456', 'Longitude Google Maps'),
('facebook_url', 'https://facebook.com/bayanpuncadigital', 'URL Facebook'),
('instagram_url', 'https://instagram.com/bayanpuncadigital', 'URL Instagram'),
('linkedin_url', 'https://linkedin.com/company/bayanpuncadigital', 'URL LinkedIn'),
('youtube_url', 'https://youtube.com/@bayanpuncadigital', 'URL YouTube'),
('meta_description', 'PT Bayan Punca Digital - Jasa pembuatan website, digital marketing, SEO, dan aplikasi mobile terpercaya. Solusi digital terbaik untuk bisnis Anda.', 'Meta description website'),
('google_analytics_id', 'G-XXXXXXXXXX', 'Google Analytics ID'),
('google_maps_api_key', 'YOUR_GOOGLE_MAPS_API_KEY', 'Google Maps API Key');

-- =====================================================
-- Data Sample Newsletter Subscribers
-- =====================================================
INSERT INTO newsletter_subscribers (email, name, status) VALUES
('john.doe@example.com', 'John Doe', 'active'),
('jane.smith@example.com', 'Jane Smith', 'active'),
('marketing@company.com', 'Marketing Team', 'active'),
('info@business.com', 'Business Owner', 'active');

-- =====================================================
-- Data Sample Kontak (untuk testing)
-- =====================================================
INSERT INTO contacts (name, email, phone, subject, message, status, ip_address) VALUES
('Andi Pratama', 'andi@example.com', '081234567890', 'Konsultasi Website', 
 'Saya tertarik untuk membuat website untuk bisnis saya. Bisa tolong berikan informasi lebih lanjut mengenai paket dan harga?', 
 'new', '192.168.1.100'),

('Maria Sari', 'maria@company.com', '087654321098', 'Digital Marketing Package',
 'Perusahaan kami membutuhkan layanan digital marketing. Mohon informasi mengenai paket yang tersedia dan strategi yang akan diterapkan.',
 'read', '192.168.1.101'),

('Budi Setiawan', 'budi@business.id', '085678901234', 'SEO Consultation',
 'Website kami sudah ada tapi traffic masih rendah. Apakah bisa dibantu untuk optimasi SEO? Berapa estimasi waktu untuk melihat hasil?',
 'replied', '192.168.1.102');

-- =====================================================
-- Komentar dan Catatan
-- =====================================================
/*
Data sample ini mencakup:

1. Portfolio - 6 proyek nyata dari klien PT Bayan Punca Digital
2. Services - 6 layanan utama dengan detail fitur dan harga
3. Blog Posts - 3 artikel sample untuk content marketing
4. Testimonials - 4 testimoni dari klien
5. Settings - Konfigurasi website dan informasi perusahaan
6. Newsletter - Sample subscribers
7. Contacts - Sample pesan dari form kontak

Semua data ini dapat digunakan untuk:
- Testing aplikasi
- Demo kepada klien
- Development dan debugging
- Training tim

Pastikan untuk mengupdate data sesuai dengan informasi real sebelum go-live.
*/