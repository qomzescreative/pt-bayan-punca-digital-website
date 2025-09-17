import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, CardActionArea, Dialog, DialogContent, DialogTitle, IconButton, TextField, Chip, Pagination, InputAdornment } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState, useMemo, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import WhatsAppButton from '../components/WhatsAppButton'
import { getImageFromStorage } from '../utils/imageUtils'

const BlogCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}))

const BlogCategory = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  padding: '4px 12px',
  borderRadius: '20px',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  fontSize: '0.75rem',
  marginBottom: theme.spacing(1),
}))

const SearchBox = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '25px',
    backgroundColor: '#f8f9fa',
    '&:hover': {
      backgroundColor: '#e9ecef',
    },
    '&.Mui-focused': {
      backgroundColor: '#fff',
    },
  },
}))

const FilterChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  '&.MuiChip-filled': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}))

// Load blog posts from localStorage or use default data
const getBlogPostsFromStorage = () => {
  try {
    const stored = localStorage.getItem('blogPosts')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading blog posts from localStorage:', error)
  }
  
  // Default data if localStorage is empty
  return [
    {
      id: 1,
      title: 'Pentingnya Website Profesional untuk Bisnis di Era Digital',
      category: 'Website Development',
      excerpt: 'Pelajari mengapa website profesional menjadi kunci sukses bisnis di era digital dan bagaimana memaksimalkan potensinya.',
      image: '/assets/blog/website-pro.svg',
      date: '15 Des 2023',
      status: 'published',
    content: `
      <h2>Pentingnya Website Profesional untuk Bisnis di Era Digital</h2>
      
      <p>Di era digital yang serba cepat ini, kehadiran online menjadi kebutuhan mendasar bagi setiap bisnis, terlepas dari ukuran atau industrinya. Website profesional bukan lagi sekadar pilihan, melainkan keharusan strategis yang dapat menentukan keberhasilan atau kegagalan suatu usaha.</p>
      
      <h3>Mengapa Website Profesional Sangat Penting?</h3>
      
      <p>Website profesional adalah wajah digital bisnis Anda. Ini adalah kesan pertama yang dilihat calon pelanggan saat mencari produk atau layanan yang Anda tawarkan. Berikut beberapa alasan mengapa website profesional sangat penting:</p>
      
      <ol>
        <li><strong>Kredibilitas dan Kepercayaan</strong> - Website yang dirancang secara profesional meningkatkan kepercayaan konsumen terhadap bisnis Anda. Penelitian menunjukkan bahwa 75% pengguna internet menilai kredibilitas perusahaan berdasarkan desain websitenya.</li>
        <li><strong>Visibilitas 24/7</strong> - Website memungkinkan bisnis Anda tetap dapat diakses oleh pelanggan potensial kapan saja, bahkan di luar jam operasional.</li>
        <li><strong>Jangkauan Global</strong> - Dengan website, bisnis lokal dapat menjangkau pasar global tanpa batasan geografis.</li>
        <li><strong>Pemasaran yang Efektif</strong> - Website adalah platform sempurna untuk menampilkan produk, layanan, dan keunggulan bisnis Anda.</li>
      </ol>
      
      <h3>Komponen Website Profesional yang Efektif</h3>
      
      <p>Website profesional yang efektif harus memiliki beberapa komponen kunci:</p>
      
      <ul>
        <li><strong>Desain Responsif</strong> - Dapat diakses dengan baik di berbagai perangkat, termasuk smartphone dan tablet.</li>
        <li><strong>Kecepatan Loading</strong> - Waktu muat yang cepat sangat penting untuk pengalaman pengguna dan peringkat SEO.</li>
        <li><strong>Navigasi Intuitif</strong> - Pengunjung harus dapat dengan mudah menemukan informasi yang mereka cari.</li>
        <li><strong>Konten Berkualitas</strong> - Informasi yang relevan dan bermanfaat bagi target audiens Anda.</li>
        <li><strong>Call-to-Action yang Jelas</strong> - Panduan yang jelas tentang tindakan yang diharapkan dari pengunjung.</li>
      </ul>
      
      <h3>Investasi yang Menguntungkan</h3>
      
      <p>Membangun website profesional adalah investasi yang menguntungkan untuk pertumbuhan bisnis jangka panjang. Dengan strategi yang tepat, website dapat menjadi mesin penghasil pendapatan yang efektif melalui peningkatan visibilitas, lead generation, dan konversi pelanggan.</p>
      
      <p>PT Bayan Punca Digital berkomitmen untuk membantu bisnis Anda memaksimalkan potensi digital melalui solusi website profesional yang disesuaikan dengan kebutuhan spesifik Anda. Hubungi kami untuk konsultasi gratis tentang bagaimana kami dapat membantu transformasi digital bisnis Anda.</p>
    `,
  },
  {
    title: 'Strategi SEO Terbaru untuk Meningkatkan Peringkat Website',
    category: 'SEO',
    excerpt: 'Tips dan trik terbaru dalam optimasi mesin pencari untuk meningkatkan visibilitas website Anda di Google.',
    image: '/assets/blog/seo-strategy.svg',
    date: '12 Des 2023',
    content: `
      <h2>Strategi SEO Terbaru untuk Meningkatkan Peringkat Website</h2>
      
      <p>Optimasi mesin pencari (SEO) terus berkembang seiring dengan algoritma Google yang semakin canggih. Untuk tetap kompetitif di era digital ini, bisnis perlu mengadopsi strategi SEO terbaru yang efektif dan berkelanjutan.</p>
      
      <h3>Tren SEO Terkini yang Perlu Diperhatikan</h3>
      
      <p>Berikut adalah beberapa strategi SEO terbaru yang dapat membantu meningkatkan peringkat website Anda:</p>
      
      <ol>
        <li><strong>Pengalaman Pengguna (UX) sebagai Faktor Peringkat</strong> - Google semakin memprioritaskan website yang menawarkan pengalaman pengguna yang baik. Ini termasuk kecepatan loading, responsivitas mobile, dan kemudahan navigasi.</li>
        <li><strong>Konten yang Komprehensif dan Mendalam</strong> - Artikel panjang (1500+ kata) yang membahas topik secara mendalam cenderung mendapatkan peringkat lebih tinggi daripada konten singkat.</li>
        <li><strong>Optimasi untuk Pencarian Suara</strong> - Dengan meningkatnya penggunaan asisten virtual seperti Siri dan Alexa, optimasi untuk pencarian suara menjadi semakin penting.</li>
        <li><strong>Video SEO</strong> - Konten video semakin diprioritaskan oleh mesin pencari, terutama di hasil pencarian Google.</li>
      </ol>
      
      <h3>Praktik Terbaik SEO yang Tetap Relevan</h3>
      
      <p>Meskipun strategi SEO terus berkembang, beberapa praktik dasar tetap sangat penting:</p>
      
      <ul>
        <li><strong>Riset Kata Kunci yang Mendalam</strong> - Identifikasi kata kunci yang relevan dengan bisnis Anda dan memiliki volume pencarian yang baik.</li>
        <li><strong>Optimasi On-Page</strong> - Pastikan setiap halaman dioptimalkan dengan kata kunci yang tepat pada judul, meta deskripsi, heading, dan konten.</li>
        <li><strong>Backlink Berkualitas</strong> - Fokus pada membangun backlink dari situs otoritatif dan relevan dengan industri Anda.</li>
        <li><strong>Konten yang Diperbarui Secara Berkala</strong> - Google menyukai website yang secara teratur memperbarui kontennya.</li>
      </ul>
      
      <h3>Mengukur Keberhasilan Strategi SEO</h3>
      
      <p>Penting untuk melacak dan menganalisis kinerja strategi SEO Anda menggunakan alat seperti Google Analytics dan Google Search Console. Metrik utama yang perlu dipantau meliputi:</p>
      
      <ul>
        <li>Peringkat kata kunci</li>
        <li>Lalu lintas organik</li>
        <li>Tingkat konversi</li>
        <li>Tingkat pentalan (bounce rate)</li>
        <li>Waktu yang dihabiskan di situs</li>
      </ul>
      
      <p>PT Bayan Punca Digital menawarkan layanan SEO komprehensif yang mengikuti praktik terbaik terkini untuk membantu bisnis Anda mencapai visibilitas maksimal di mesin pencari. Hubungi kami untuk strategi SEO yang disesuaikan dengan kebutuhan spesifik bisnis Anda.</p>
    `,
  },
  {
    title: 'Tren Desain Website 2024: Apa yang Perlu Anda Ketahui',
    category: 'Web Design',
    excerpt: 'Eksplorasi tren desain website terbaru yang akan mendominasi tahun 2024 dan bagaimana menerapkannya.',
    image: '/assets/blog/design-trends.png',
    date: '10 Des 2023',
    content: `
      <h2>Tren Desain Website 2024: Apa yang Perlu Anda Ketahui</h2>
      
      <p>Dunia desain website terus berkembang dengan cepat, didorong oleh kemajuan teknologi dan perubahan preferensi pengguna. Untuk tetap relevan dan menarik di tahun 2024, penting bagi bisnis untuk mengadopsi tren desain website terbaru.</p>
      
      <h3>Tren Desain Website yang Akan Mendominasi 2024</h3>
      
      <ol>
        <li><strong>Desain Minimalis dengan Sentuhan Bold</strong> - Kombinasi antara kesederhanaan minimalis dengan elemen desain yang berani seperti tipografi besar dan skema warna kontras.</li>
        <li><strong>Scrollytelling</strong> - Teknik narasi visual yang mengungkapkan konten secara bertahap saat pengguna menggulir halaman, menciptakan pengalaman yang lebih imersif.</li>
        <li><strong>Desain 3D dan Pseudo-3D</strong> - Elemen tiga dimensi yang memberikan kedalaman dan realisme pada website.</li>
        <li><strong>Dark Mode sebagai Opsi Default</strong> - Semakin banyak website yang menawarkan mode gelap sebagai pilihan default untuk mengurangi kelelahan mata dan menghemat baterai.</li>
        <li><strong>Microinteractions</strong> - Animasi kecil yang memberikan umpan balik visual saat pengguna berinteraksi dengan elemen website.</li>
      </ol>
      
      <h3>Teknologi yang Mendukung Tren Desain Terbaru</h3>
      
      <p>Beberapa teknologi kunci yang mendukung tren desain website 2024 antara lain:</p>
      
      <ul>
        <li><strong>WebGL dan Three.js</strong> - Untuk menciptakan elemen 3D yang interaktif dan imersif.</li>
        <li><strong>CSS Grid dan Flexbox</strong> - Untuk layout yang lebih fleksibel dan responsif.</li>
        <li><strong>Motion UI</strong> - Framework untuk menciptakan animasi dan transisi yang mulus.</li>
        <li><strong>Variable Fonts</strong> - Teknologi font yang memungkinkan kontrol lebih besar atas tampilan tipografi.</li>
      </ul>
      
      <h3>Keseimbangan antara Estetika dan Fungsionalitas</h3>
      
      <p>Meskipun mengikuti tren desain terbaru penting, keseimbangan antara estetika dan fungsionalitas tetap menjadi prioritas utama. Website yang indah namun sulit digunakan tidak akan memberikan hasil yang optimal. Beberapa prinsip yang tetap relevan:</p>
      
      <ul>
        <li>Kecepatan loading yang optimal</li>
        <li>Navigasi yang intuitif</li>
        <li>Responsivitas di berbagai perangkat</li>
        <li>Aksesibilitas untuk semua pengguna</li>
      </ul>
      
      <p>PT Bayan Punca Digital selalu mengikuti perkembangan tren desain website terbaru sambil memastikan setiap proyek yang kami kerjakan memenuhi standar fungsionalitas dan pengalaman pengguna yang tinggi. Hubungi kami untuk mendiskusikan bagaimana kami dapat membantu menyegarkan tampilan website Anda dengan desain yang sesuai dengan tren 2024.</p>
    `,
  },
  {
    title: 'Memaksimalkan Konversi Website dengan UX Design',
    category: 'UX/UI Design',
    excerpt: 'Panduan lengkap tentang bagaimana desain pengalaman pengguna dapat meningkatkan konversi website Anda.',
    image: '/assets/blog/ux-design.svg',
    date: '8 Des 2023',
    content: `
      <h2>Memaksimalkan Konversi Website dengan UX Design</h2>
      
      <p>Desain pengalaman pengguna (UX) yang efektif tidak hanya membuat website Anda lebih menarik secara visual, tetapi juga dapat secara signifikan meningkatkan tingkat konversi. Dalam artikel ini, kita akan membahas strategi UX design yang dapat membantu mengubah pengunjung menjadi pelanggan.</p>
      
      <h3>Prinsip UX Design untuk Meningkatkan Konversi</h3>
      
      <ol>
        <li><strong>Kejelasan di Atas Segalanya</strong> - Pastikan pengunjung dapat dengan cepat memahami nilai proposisi Anda dan tindakan yang diharapkan dari mereka.</li>
        <li><strong>Mengurangi Gesekan</strong> - Hilangkan hambatan yang tidak perlu dalam proses konversi, seperti formulir yang terlalu panjang atau langkah-langkah yang membingungkan.</li>
        <li><strong>Konsistensi Visual</strong> - Gunakan elemen desain yang konsisten untuk membangun kepercayaan dan memudahkan navigasi.</li>
        <li><strong>Hierarki Visual yang Jelas</strong> - Arahkan perhatian pengunjung ke elemen paling penting menggunakan ukuran, warna, dan penempatan strategis.</li>
        <li><strong>Responsif terhadap Konteks Pengguna</strong> - Sesuaikan pengalaman berdasarkan perangkat, lokasi, atau perilaku sebelumnya dari pengguna.</li>
      </ol>
      
      <h3>Elemen UX yang Mempengaruhi Konversi</h3>
      
      <p>Beberapa elemen UX spesifik yang memiliki dampak langsung pada tingkat konversi:</p>
      
      <ul>
        <li><strong>Call-to-Action (CTA)</strong> - Tombol CTA yang dirancang dengan baik dengan teks yang jelas dan kontras warna yang tepat dapat meningkatkan klik hingga 30%.</li>
        <li><strong>Formulir</strong> - Formulir yang lebih singkat dan mudah diisi cenderung memiliki tingkat penyelesaian yang lebih tinggi.</li>
        <li><strong>Testimonial dan Social Proof</strong> - Menampilkan ulasan pelanggan dan logo klien dapat meningkatkan kepercayaan dan konversi.</li>
        <li><strong>Kecepatan Loading</strong> - Setiap detik penundaan dalam waktu loading dapat mengurangi konversi hingga 7%.</li>
        <li><strong>Desain Responsif</strong> - Pengalaman yang dioptimalkan untuk mobile sangat penting mengingat lebih dari 50% lalu lintas web berasal dari perangkat mobile.</li>
      </ul>
      
      <h3>Mengukur Efektivitas UX Design</h3>
      
      <p>Untuk memastikan strategi UX design Anda efektif dalam meningkatkan konversi, penting untuk melacak dan menganalisis metrik kunci seperti:</p>
      
      <ul>
        <li>Tingkat konversi keseluruhan</li>
        <li>Tingkat pentalan (bounce rate)</li>
        <li>Waktu yang dihabiskan di halaman</li>
        <li>Peta panas klik (click heatmaps)</li>
        <li>Rekaman sesi pengguna</li>
      </ul>
      
      <p>PT Bayan Punca Digital memiliki tim UX designer berpengalaman yang dapat membantu Anda mengoptimalkan website untuk konversi maksimal. Kami menggabungkan prinsip desain yang solid dengan analisis data untuk menciptakan pengalaman pengguna yang tidak hanya menarik tetapi juga efektif dalam mencapai tujuan bisnis Anda.</p>
    `,
  },
  {
    title: 'Keamanan Website: Praktik Terbaik untuk Bisnis Online',
    category: 'Security',
    excerpt: 'Tips penting untuk mengamankan website bisnis Anda dari ancaman cyber dan menjaga kepercayaan pelanggan.',
    image: '/assets/blog/security.svg',
    date: '5 Des 2023',
    content: `
      <h2>Keamanan Website: Praktik Terbaik untuk Bisnis Online</h2>
      
      <p>Dalam era digital yang semakin terhubung, keamanan website menjadi aspek kritis bagi setiap bisnis online. Serangan cyber yang berhasil dapat mengakibatkan kerugian finansial, kebocoran data pelanggan, dan kerusakan reputasi yang signifikan.</p>
      
      <h3>Ancaman Keamanan Website yang Umum</h3>
      
      <p>Beberapa ancaman keamanan website yang paling umum meliputi:</p>
      
      <ol>
        <li><strong>Serangan Injeksi SQL</strong> - Penyerang mencoba menyisipkan kode berbahaya ke dalam database website Anda.</li>
        <li><strong>Cross-Site Scripting (XSS)</strong> - Serangan yang menyisipkan skrip berbahaya ke halaman web yang dilihat oleh pengguna lain.</li>
        <li><strong>Cross-Site Request Forgery (CSRF)</strong> - Memaksa pengguna yang sudah terautentikasi untuk melakukan tindakan yang tidak diinginkan.</li>
        <li><strong>Distributed Denial of Service (DDoS)</strong> - Membanjiri server dengan lalu lintas palsu untuk membuat website tidak dapat diakses.</li>
        <li><strong>Malware dan Ransomware</strong> - Perangkat lunak berbahaya yang dapat menginfeksi website dan mengenkripsi data penting.</li>
      </ol>
      
      <h3>Praktik Terbaik Keamanan Website</h3>
      
      <p>Untuk melindungi website bisnis Anda dari ancaman cyber, terapkan praktik keamanan berikut:</p>
      
      <ul>
        <li><strong>Gunakan HTTPS</strong> - Mengenkripsi data yang ditransfer antara browser pengguna dan server Anda.</li>
        <li><strong>Perbarui Software Secara Teratur</strong> - Pastikan CMS, plugin, dan semua komponen website selalu diperbarui ke versi terbaru.</li>
        <li><strong>Implementasikan Autentikasi Multi-Faktor</strong> - Tambahkan lapisan keamanan ekstra untuk akses ke area admin.</li>
        <li><strong>Backup Rutin</strong> - Lakukan backup website secara teratur dan simpan di lokasi yang aman.</li>
        <li><strong>Gunakan Password yang Kuat</strong> - Terapkan kebijakan password yang kuat untuk semua akun yang terkait dengan website.</li>
        <li><strong>Web Application Firewall (WAF)</strong> - Pasang WAF untuk memfilter lalu lintas berbahaya sebelum mencapai website Anda.</li>
      </ul>
      
      <h3>Keamanan sebagai Proses Berkelanjutan</h3>
      
      <p>Keamanan website bukanlah tujuan akhir, melainkan proses berkelanjutan yang memerlukan pemantauan dan penyesuaian terus-menerus. Langkah-langkah penting meliputi:</p>
      
      <ul>
        <li>Melakukan audit keamanan secara berkala</li>
        <li>Memantau log keamanan untuk aktivitas mencurigakan</li>
        <li>Menguji kerentanan website secara teratur</li>
        <li>Memperbarui rencana respons insiden</li>
        <li>Melatih staf tentang praktik keamanan cyber</li>
      </ul>
      
      <p>PT Bayan Punca Digital menawarkan layanan keamanan website komprehensif untuk membantu bisnis Anda menerapkan praktik keamanan terbaik dan melindungi aset digital Anda dari ancaman cyber. Hubungi kami untuk konsultasi keamanan website dan solusi yang disesuaikan dengan kebutuhan bisnis Anda.</p>
    `,
  },
  {
    title: 'Transformasi Digital: Langkah-langkah Sukses untuk UKM',
    category: 'Digital Transformation',
    excerpt: 'Panduan praktis bagi UKM dalam melakukan transformasi digital untuk meningkatkan efisiensi dan daya saing.',
    image: '/assets/blog/digital-transform.svg',
    date: '3 Des 2023',
    content: `
      <h2>Transformasi Digital: Langkah-langkah Sukses untuk UKM</h2>
      
      <p>Transformasi digital bukan lagi pilihan mewah, tetapi kebutuhan mendasar bagi Usaha Kecil dan Menengah (UKM) yang ingin tetap kompetitif di pasar yang semakin digital. Namun, banyak UKM yang merasa kewalahan dengan kompleksitas dan biaya yang terkait dengan transformasi digital.</p>
      
      <h3>Mengapa Transformasi Digital Penting bagi UKM?</h3>
      
      <p>Transformasi digital menawarkan berbagai manfaat bagi UKM, termasuk:</p>
      
      <ol>
        <li><strong>Efisiensi Operasional</strong> - Otomatisasi proses manual dapat menghemat waktu dan mengurangi biaya operasional.</li>
        <li><strong>Jangkauan Pasar yang Lebih Luas</strong> - Kehadiran digital memungkinkan UKM menjangkau pelanggan di luar batasan geografis tradisional.</li>
        <li><strong>Pengambilan Keputusan Berbasis Data</strong> - Alat digital menyediakan wawasan berharga tentang perilaku pelanggan dan tren pasar.</li>
        <li><strong>Peningkatan Pengalaman Pelanggan</strong> - Solusi digital dapat membantu UKM memberikan layanan yang lebih personal dan responsif.</li>
        <li><strong>Ketahanan Bisnis</strong> - Bisnis dengan kapabilitas digital yang kuat lebih mampu beradaptasi dengan perubahan pasar dan krisis.</li>
      </ol>
      
      <h3>Langkah-langkah Transformasi Digital untuk UKM</h3>
      
      <p>Berikut adalah pendekatan bertahap untuk transformasi digital yang dapat diikuti oleh UKM:</p>
      
      <ol>
        <li><strong>Evaluasi Kesiapan Digital</strong> - Mulailah dengan menilai infrastruktur teknologi, keterampilan tim, dan proses bisnis saat ini.</li>
        <li><strong>Tetapkan Tujuan yang Jelas</strong> - Identifikasi masalah spesifik yang ingin Anda selesaikan atau peluang yang ingin Anda manfaatkan melalui transformasi digital.</li>
        <li><strong>Prioritaskan Inisiatif</strong> - Fokus pada area yang akan memberikan dampak terbesar dengan investasi minimal.</li>
        <li><strong>Bangun Kehadiran Online Dasar</strong> - Website profesional, profil media sosial, dan listing bisnis online adalah fondasi penting.</li>
        <li><strong>Adopsi Alat Produktivitas Cloud</strong> - Solusi seperti Google Workspace atau Microsoft 365 dapat meningkatkan kolaborasi dan efisiensi.</li>
        <li><strong>Implementasikan Sistem Manajemen Pelanggan</strong> - CRM sederhana dapat membantu mengelola interaksi pelanggan dan meningkatkan penjualan.</li>
        <li><strong>Eksplorasi E-commerce</strong> - Pertimbangkan untuk menjual produk atau layanan Anda secara online.</li>
        <li><strong>Investasikan dalam Pemasaran Digital</strong> - Manfaatkan SEO, iklan online, dan media sosial untuk menjangkau pelanggan baru.</li>
      </ol>
      
      <h3>Mengatasi Tantangan Transformasi Digital</h3>
      
      <p>Beberapa tantangan umum yang dihadapi UKM dalam transformasi digital dan cara mengatasinya:</p>
      
      <ul>
        <li><strong>Keterbatasan Anggaran</strong> - Mulailah dengan solusi terjangkau dan skalakan seiring pertumbuhan bisnis.</li>
        <li><strong>Kurangnya Keahlian Teknis</strong> - Manfaatkan pelatihan online, konsultan, atau bermitra dengan penyedia layanan teknologi.</li>
        <li><strong>Resistensi terhadap Perubahan</strong> - Libatkan tim Anda sejak awal dan komunikasikan manfaat transformasi digital.</li>
        <li><strong>Keamanan Cyber</strong> - Prioritaskan praktik keamanan dasar seperti password yang kuat dan backup rutin.</li>
      </ul>
      
      <p>PT Bayan Punca Digital memahami tantangan unik yang dihadapi UKM dalam perjalanan transformasi digital. Kami menawarkan solusi yang terjangkau dan disesuaikan untuk membantu UKM memanfaatkan kekuatan teknologi digital tanpa mengorbankan anggaran atau kompleksitas yang berlebihan.</p>
    `,
    }
  ]
}

function Blog() {
  const [blogPosts, setBlogPosts] = useState(getBlogPostsFromStorage())
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Reload data when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setBlogPosts(getBlogPostsFromStorage())
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(() => {
      setBlogPosts(getBlogPostsFromStorage())
    }, 1000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const handleOpenDialog = (post) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Get unique categories
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Paginate posts
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg" className="responsive-section responsive-container">
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          className="responsive-text-4xl"
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Blog
        </Typography>

        <Typography
          variant="h6"
          align="center"
          className="responsive-text-lg"
          sx={{ mb: 6, color: 'text.secondary', maxWidth: '800px', mx: 'auto' }}
        >
          Temukan insight, tips, dan berita terbaru seputar teknologi digital, SEO,
          branding, dan transformasi bisnis di era digital bersama PT Bayan Punca Digital.
        </Typography>

        {/* Search and Filter Section */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <SearchBox
                fullWidth
                placeholder="Cari artikel blog..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {categories.map((category) => (
                  <FilterChip
                    key={category}
                    label={category}
                    variant={selectedCategory === category ? 'filled' : 'outlined'}
                    onClick={() => handleCategoryChange(category)}
                    clickable
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Results Info */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, textAlign: 'center' }}
        >
          Menampilkan {paginatedPosts.length} dari {filteredPosts.length} artikel
        </Typography>

        <Grid container spacing={4}>
          {paginatedPosts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <BlogCard className="responsive-card">
                <CardActionArea onClick={() => handleOpenDialog(post)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={getImageFromStorage(post.image) || post.image}
                    alt={post.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent className="responsive-card-content">
                    <BlogCategory variant="caption">
                      {post.category}
                    </BlogCategory>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h3"
                      className="responsive-text-lg"
                      sx={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        minHeight: '2.8em',
                        lineHeight: 1.4,
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="responsive-text-sm"
                      sx={{ mb: 2 }}
                    >
                      {post.excerpt}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block', mt: 2 }}
                    >
                      {post.date}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </BlogCard>
            </Grid>
          ))}
        </Grid>

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Tidak ada artikel yang ditemukan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Coba ubah kata kunci pencarian atau pilih kategori lain
            </Typography>
          </Box>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Container>

      {/* Blog Post Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        {selectedPost && (
          <>
            <DialogTitle>
              {selectedPost.title}
              <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                {selectedPost.category} • {selectedPost.date}
              </Typography>
              <Box sx={{ mb: 3 }}>
                <img 
                  src={getImageFromStorage(selectedPost.image) || selectedPost.image} 
                  alt={selectedPost.title} 
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
                />
              </Box>
              <Box dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
            </DialogContent>
          </>
        )}
      </Dialog>

      <WhatsAppButton />
    </Box>
  )
}

export default Blog