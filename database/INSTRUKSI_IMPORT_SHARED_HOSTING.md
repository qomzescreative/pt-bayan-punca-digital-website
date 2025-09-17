# 📋 Instruksi Import Database untuk Shared Hosting

## ✅ Checklist Sebelum Import

### 1. Persiapan Database
- ✅ Database `u998642024_Hamzah` sudah dibuat melalui hPanel
- ✅ User `u998642024_hamzah12` sudah memiliki ALL PRIVILEGES ke database
- ✅ File SQL sudah dibersihkan dari referensi database lama

### 2. File yang Siap Import
- ✅ `database.sql` - Struktur tabel (tanpa CREATE DATABASE/USE)
- ✅ `insert_data.sql` - Data sample (tanpa USE)

## 🚀 Langkah Import di phpMyAdmin

### Step 1: Login ke phpMyAdmin
1. Buka phpMyAdmin dari hPanel
2. Login dengan kredensial MySQL Anda

### Step 2: Pilih Database
1. Klik database `u998642024_Hamzah` di sidebar kiri
2. Pastikan database terpilih (nama akan terlihat di bagian atas)

### Step 3: Import Struktur Database
1. Klik tab **Import**
2. Klik **Choose File** → pilih `database.sql`
3. Pastikan **Format** = SQL
4. Klik **Go**
5. Tunggu hingga muncul pesan sukses

### Step 4: Import Data Sample
1. Masih di tab **Import**
2. Klik **Choose File** → pilih `insert_data.sql`
3. Klik **Go**
4. Tunggu hingga selesai

## 🔍 Verifikasi Import Berhasil

### Test di phpMyAdmin → SQL Tab:
```sql
-- Cek tabel yang berhasil dibuat
SHOW TABLES;

-- Cek jumlah data di setiap tabel
SELECT COUNT(*) AS total_portfolio FROM portfolio;
SELECT COUNT(*) AS total_blog FROM blog_posts;
SELECT COUNT(*) AS total_services FROM services;
SELECT COUNT(*) AS total_testimonials FROM testimonials;
```

### Expected Results:
- `portfolio`: ~8 records
- `blog_posts`: ~10 records  
- `services`: ~6 records
- `testimonials`: ~6 records

## ⚠️ Troubleshooting

### Jika Masih Error #1044:
1. Pastikan database `u998642024_Hamzah` benar-benar terpilih
2. Cek tidak ada baris `USE bayan_punca_digital;` di file SQL
3. Pastikan user memiliki privileges yang cukup

### Jika Import Sebagian:
1. Drop semua tabel yang sudah ada
2. Import ulang `database.sql` terlebih dahulu
3. Baru import `insert_data.sql`

## 🔧 Update Konfigurasi Aplikasi

Setelah database berhasil, update file konfigurasi:

### PHP (config.php):
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'u998642024_Hamzah');
define('DB_USER', 'u998642024_hamzah12');
define('DB_PASS', 'your_actual_password');
```

### Node.js (.env):
```env
DB_HOST=localhost
DB_NAME=u998642024_Hamzah
DB_USER=u998642024_hamzah12
DB_PASSWORD=your_actual_password
```

## 🔒 Keamanan

1. **Ganti Password MySQL** setelah semua berjalan:
   - Masuk ke hPanel → MySQL Databases
   - Change Password untuk user `u998642024_hamzah12`
   - Update password di file konfigurasi

2. **Backup Rutin**:
   - Setup backup otomatis melalui hPanel
   - Atau gunakan script backup manual

---

✅ **File SQL sudah siap untuk shared hosting!**  
🚀 **Tidak ada lagi error #1044 Access Denied**  
📱 **Website siap untuk production deployment**