import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Chip,
  Fade,
  Grow
} from '@mui/material'
import LoadingSkeleton from '../components/LoadingSkeleton'
import AnimatedSection from '../components/AnimatedSection'
import AdminLogin from '../components/AdminLogin'
import FileUpload from '../components/FileUpload'
import { styled } from '@mui/material/styles'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ArticleIcon from '@mui/icons-material/Article'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import WorkIcon from '@mui/icons-material/Work'
import FolderIcon from '@mui/icons-material/Folder'
import CreateIcon from '@mui/icons-material/Create'

const AdminContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}))

const StatsCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  '& .MuiCardContent-root': {
    padding: theme.spacing(3),
  },
}))

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 600,
}))

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [openDialog, setOpenDialog] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    status: 'draft'
  })
  const [formType, setFormType] = useState('post') // 'post', 'portfolio', 'blog'
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' })

  // Portfolio data
  const [portfolios, setPortfolios] = useState([
    { 
      id: 1, 
      title: 'E-Commerce Platform Toko Online', 
      description: 'Platform e-commerce lengkap dengan sistem pembayaran terintegrasi dan dashboard admin yang komprehensif.',
      image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=E-Commerce+Platform',
      category: 'Web Development',
      technologies: 'React, Node.js, MongoDB, Stripe',
      status: 'published',
      date: '20 Jan 2024'
    },
    { 
      id: 2, 
      title: 'Corporate Website PT Maju Bersama', 
      description: 'Website corporate profesional dengan fitur blog, portfolio showcase, dan sistem kontak terintegrasi.',
      image: 'https://via.placeholder.com/400x300/4facfe/ffffff?text=Corporate+Website',
      category: 'Corporate Website',
      technologies: 'React, Material-UI, Firebase',
      status: 'published',
      date: '18 Jan 2024'
    },
    { 
      id: 3, 
      title: 'Mobile App Restaurant Finder', 
      description: 'Aplikasi mobile untuk mencari restoran terdekat dengan fitur review, booking, dan navigasi GPS.',
      image: 'https://via.placeholder.com/400x300/f093fb/ffffff?text=Restaurant+App',
      category: 'Mobile App',
      technologies: 'React Native, Firebase, Google Maps API',
      status: 'published',
      date: '15 Jan 2024'
    },
    { 
      id: 4, 
      title: 'Learning Management System (LMS)', 
      description: 'Platform pembelajaran online dengan fitur video streaming, quiz interaktif, dan tracking progress siswa.',
      image: 'https://via.placeholder.com/400x300/fa709a/ffffff?text=LMS+Platform',
      category: 'Web Development',
      technologies: 'Vue.js, Laravel, MySQL, AWS',
      status: 'published',
      date: '12 Jan 2024'
    },
    { 
      id: 5, 
      title: 'Inventory Management System', 
      description: 'Sistem manajemen inventori dengan fitur real-time tracking, barcode scanner, dan laporan analitik.',
      image: 'https://via.placeholder.com/400x300/a8edea/ffffff?text=Inventory+System',
      category: 'System Development',
      technologies: 'Angular, .NET Core, SQL Server',
      status: 'published',
      date: '08 Jan 2024'
    },
    { 
      id: 6, 
      title: 'Digital Marketing Dashboard', 
      description: 'Dashboard komprehensif untuk monitoring campaign digital marketing dengan integrasi multi-platform.',
      image: 'https://via.placeholder.com/400x300/ffecd2/ffffff?text=Marketing+Dashboard',
      category: 'Dashboard',
      technologies: 'React, D3.js, Node.js, PostgreSQL',
      status: 'published',
      date: '05 Jan 2024'
    }
  ])

  // Blog posts data - connected to actual blog content
  const [blogPosts, setBlogPosts] = useState([
    { 
      id: 1, 
      title: 'Pentingnya Website Profesional untuk Bisnis di Era Digital', 
      content: 'Di era digital saat ini, memiliki website profesional bukan lagi pilihan, melainkan kebutuhan...',
      excerpt: 'Website profesional adalah kunci sukses bisnis di era digital. Pelajari mengapa setiap bisnis membutuhkannya.',
      author: 'Tim Bayan Punca Digital',
      category: 'Digital Marketing', 
      tags: 'website, bisnis, digital, profesional',
      status: 'published', 
      date: '15 Des 2023',
      featured_image: 'https://via.placeholder.com/600x400/667eea/ffffff?text=Website+Profesional'
    },
    { 
      id: 2, 
      title: 'Strategi SEO Terbaru untuk Meningkatkan Peringkat Website', 
      content: 'SEO terus berkembang dengan algoritma search engine yang semakin canggih...',
      excerpt: 'Pelajari strategi SEO terbaru yang efektif untuk meningkatkan peringkat website Anda di search engine.',
      author: 'Tim Bayan Punca Digital',
      category: 'SEO', 
      tags: 'seo, search engine, ranking, optimization',
      status: 'published', 
      date: '12 Des 2023',
      featured_image: 'https://via.placeholder.com/600x400/4facfe/ffffff?text=SEO+Strategy'
    },
    { 
      id: 3, 
      title: 'Tren Desain Website 2024: Apa yang Perlu Anda Ketahui', 
      content: 'Tahun 2024 membawa tren desain website yang lebih fokus pada user experience...',
      excerpt: 'Temukan tren desain website terbaru di 2024 yang akan membuat website Anda tampil lebih menarik.',
      author: 'Tim Bayan Punca Digital',
      category: 'Web Design', 
      tags: 'design, website, trend, 2024, ui/ux',
      status: 'published', 
      date: '10 Des 2023',
      featured_image: 'https://via.placeholder.com/600x400/f093fb/ffffff?text=Design+Trends+2024'
    },
    { 
      id: 4, 
      title: 'Panduan Lengkap Digital Marketing untuk UMKM', 
      content: 'Digital marketing menjadi kunci sukses UMKM di era modern. Pelajari strategi yang tepat...',
      excerpt: 'Panduan komprehensif digital marketing khusus untuk UMKM agar dapat bersaing di pasar digital.',
      author: 'Tim Bayan Punca Digital',
      category: 'Digital Marketing', 
      tags: 'digital marketing, umkm, strategi, online business',
      status: 'published', 
      date: '08 Des 2023',
      featured_image: 'https://via.placeholder.com/600x400/fa709a/ffffff?text=Digital+Marketing+UMKM'
    },
    { 
      id: 5, 
      title: 'Keamanan Website: Tips Melindungi Situs dari Serangan Cyber', 
      content: 'Keamanan website adalah prioritas utama. Pelajari cara melindungi situs Anda dari berbagai ancaman...',
      excerpt: 'Tips dan strategi penting untuk menjaga keamanan website dari serangan cyber dan malware.',
      author: 'Tim Bayan Punca Digital',
      category: 'Web Security', 
      tags: 'security, website, cyber attack, protection',
      status: 'published', 
      date: '05 Des 2023',
      featured_image: 'https://via.placeholder.com/600x400/a8edea/ffffff?text=Website+Security'
    },
    { 
      id: 6, 
      title: 'Optimasi Kecepatan Website untuk Meningkatkan User Experience', 
      content: 'Kecepatan website sangat mempengaruhi user experience dan SEO. Pelajari teknik optimasi terbaik...',
      excerpt: 'Teknik dan tools terbaik untuk mengoptimalkan kecepatan website agar loading lebih cepat.',
      author: 'Tim Bayan Punca Digital',
      category: 'Web Performance', 
      tags: 'performance, speed, optimization, user experience',
      status: 'published', 
      date: '02 Des 2023',
      featured_image: 'https://via.placeholder.com/600x400/ffecd2/ffffff?text=Website+Speed+Optimization'
    }
  ])

  // Legacy posts data for backward compatibility
  const [posts, setPosts] = useState([
    { id: 1, title: 'Pentingnya Website Profesional untuk Bisnis di Era Digital', category: 'Blog', status: 'published', date: '15 Des 2023' },
    { id: 2, title: 'Strategi SEO Terbaru untuk Meningkatkan Peringkat Website', category: 'Blog', status: 'published', date: '12 Des 2023' },
    { id: 3, title: 'Tren Desain Website 2024: Apa yang Perlu Anda Ketahui', category: 'Blog', status: 'published', date: '10 Des 2023' },
    { id: 4, title: 'Memaksimalkan Konversi Website dengan UX Design', category: 'Blog', status: 'published', date: '8 Des 2023' },
    { id: 5, title: 'Keamanan Website: Praktik Terbaik untuk Bisnis Online', category: 'Blog', status: 'published', date: '5 Des 2023' },
    { id: 6, title: 'Transformasi Digital: Langkah-langkah Sukses untuk UKM', category: 'Blog', status: 'published', date: '3 Des 2023' },
  ])

  const [contacts, setContacts] = useState([])

  // Load contacts from localStorage on component mount
  useEffect(() => {
    const loadContacts = () => {
      const savedContacts = JSON.parse(localStorage.getItem('adminContacts') || '[]')
      const mockContacts = [
         { 
           id: 1, 
           name: 'John Doe', 
           email: 'john@example.com', 
           phone: '081234567890',
           subject: 'Konsultasi Website', 
           message: 'Saya tertarik untuk membuat website untuk bisnis saya. Bisa tolong berikan informasi lebih lanjut?',
           date: '15/01/2024', 
           status: 'new' 
         },
         { 
           id: 2, 
           name: 'Jane Smith', 
           email: 'jane@example.com', 
           phone: '087654321098',
           subject: 'Pertanyaan Harga', 
           message: 'Berapa harga untuk pembuatan website e-commerce dengan fitur lengkap?',
           date: '14/01/2024', 
           status: 'replied' 
         },
       ]
      
      // Combine saved contacts with mock data (saved contacts first)
      const allContacts = [...savedContacts, ...mockContacts]
      setContacts(allContacts)
    }

    loadContacts()
    
    // Load portfolios from localStorage
    const savedPortfolios = localStorage.getItem('adminPortfolios')
    if (savedPortfolios) {
      const parsedPortfolios = JSON.parse(savedPortfolios)
      setPortfolios(parsedPortfolios)
    }
    
    // Load blog posts from localStorage
    const savedBlogs = localStorage.getItem('adminBlogs')
    if (savedBlogs) {
      const parsedBlogs = JSON.parse(savedBlogs)
      setBlogPosts(parsedBlogs)
    }
  }, [])

  const stats = {
    totalPosts: posts.length,
    publishedPosts: posts.filter(p => p.status === 'published').length,
    totalContacts: contacts.length,
    newContacts: contacts.filter(c => c.status === 'new').length,
    totalPortfolios: portfolios.length,
    publishedPortfolios: portfolios.filter(p => p.status === 'published').length,
    totalBlogs: blogPosts.length,
    publishedBlogs: blogPosts.filter(b => b.status === 'published').length
  }

  const handleEdit = (item) => {
    setEditItem(item)
    
    // Detect item type based on properties
    if (item.description && item.technologies) {
      // Portfolio item
      setFormType('portfolio')
      setFormData({
        title: item.title || '',
        description: item.description || '',
        image: item.image || '',
        category: item.category || '',
        technologies: item.technologies || '',
        status: item.status || 'draft'
      })
    } else if (item.excerpt && item.author) {
      // Blog item
      setFormType('blog')
      setFormData({
        title: item.title || '',
        content: item.content || '',
        excerpt: item.excerpt || '',
        author: item.author || '',
        category: item.category || '',
        tags: item.tags || '',
        featured_image: item.featured_image || '',
        status: item.status || 'draft'
      })
    } else {
      // Legacy post item
      setFormType('post')
      setFormData({
        title: item.title || '',
        content: item.content || '',
        category: item.category || '',
        status: item.status || 'draft'
      })
    }
    
    setOpenDialog(true)
  }

  const handleDelete = (id, type) => {
    if (type === 'post') {
      setPosts(posts.filter(p => p.id !== id))
    } else if (type === 'contact') {
      const updatedContacts = contacts.filter(c => c.id !== id)
      setContacts(updatedContacts)
      
      // Update localStorage - only save contacts that are not mock data (id > 2)
      const contactsToSave = updatedContacts.filter(c => c.id > 2)
      localStorage.setItem('adminContacts', JSON.stringify(contactsToSave))
    } else if (type === 'portfolio') {
      const updatedPortfolios = portfolios.filter(p => p.id !== id)
      setPortfolios(updatedPortfolios)
      
      // Save to localStorage
      localStorage.setItem('adminPortfolios', JSON.stringify(updatedPortfolios))
    } else if (type === 'blog') {
      const updatedBlogs = blogPosts.filter(b => b.id !== id)
      setBlogPosts(updatedBlogs)
      
      // Save to localStorage
      localStorage.setItem('adminBlogs', JSON.stringify(updatedBlogs))
    }
    showAlert('Item berhasil dihapus', 'success')
  }

  const handleSave = () => {
    if (editItem) {
      // Update existing item
      if (editItem.email) {
        // It's a contact
        const updatedContacts = contacts.map(c => c.id === editItem.id ? { ...c, ...formData } : c)
        setContacts(updatedContacts)
        
        // Update localStorage - only save contacts that are not mock data (id > 2)
        const contactsToSave = updatedContacts.filter(c => c.id > 2)
        localStorage.setItem('adminContacts', JSON.stringify(contactsToSave))
      } else if (formType === 'portfolio') {
        // It's a portfolio
        const updatedPortfolios = portfolios.map(p => p.id === editItem.id ? { ...p, ...formData } : p)
        setPortfolios(updatedPortfolios)
        
        // Save to localStorage
        localStorage.setItem('adminPortfolios', JSON.stringify(updatedPortfolios))
      } else if (formType === 'blog') {
        // It's a blog post
        const updatedBlogs = blogPosts.map(b => b.id === editItem.id ? { ...b, ...formData } : b)
        setBlogPosts(updatedBlogs)
        
        // Save to localStorage
        localStorage.setItem('adminBlogs', JSON.stringify(updatedBlogs))
      } else {
        // It's a legacy post
        setPosts(posts.map(p => p.id === editItem.id ? { ...p, ...formData } : p))
      }
      showAlert('Item berhasil diupdate', 'success')
    } else {
      // Create new item
      const newItem = {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      }
      
      if (formType === 'portfolio') {
        const updatedPortfolios = [...portfolios, newItem]
        setPortfolios(updatedPortfolios)
        localStorage.setItem('adminPortfolios', JSON.stringify(updatedPortfolios))
      } else if (formType === 'blog') {
        const updatedBlogs = [...blogPosts, newItem]
        setBlogPosts(updatedBlogs)
        localStorage.setItem('adminBlogs', JSON.stringify(updatedBlogs))
      } else {
        setPosts([...posts, newItem])
      }
      
      showAlert('Item berhasil ditambahkan', 'success')
    }
    setOpenDialog(false)
    setEditItem(null)
    setFormData({ title: '', content: '', category: '', status: 'draft' })
    setFormType('post')
  }

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type })
    setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000)
  }

  const renderDashboard = () => {
    if (loading) {
      return <LoadingSkeleton />
    }

    return (
      <AnimatedSection animation="fadeInUp">
        <Grid container spacing={2} className="responsive-section responsive-container">
          <Grid item xs={12} sm={6} md={3}>
            <Grow in={true} timeout={300}>
              <StatsCard>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {stats.totalPosts}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Total Posts
                      </Typography>
                    </Box>
                    <ArticleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </StatsCard>
            </Grow>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Grow in={true} timeout={500}>
              <StatsCard sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {stats.publishedPosts}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Published
                      </Typography>
                    </Box>
                    <DashboardIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </StatsCard>
            </Grow>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Grow in={true} timeout={700}>
              <StatsCard sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {stats.totalContacts}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Total Contacts
                      </Typography>
                    </Box>
                    <ContactMailIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </StatsCard>
            </Grow>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Grow in={true} timeout={900}>
              <StatsCard sx={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {stats.newContacts}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        New Messages
                      </Typography>
                    </Box>
                    <ContactMailIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </StatsCard>
            </Grow>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Grow in={true} timeout={1100}>
              <StatsCard sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {stats.totalPortfolios}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Total Portfolio
                      </Typography>
                    </Box>
                    <FolderIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </StatsCard>
            </Grow>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Grow in={true} timeout={1300}>
              <StatsCard sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {stats.publishedPortfolios}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Published Portfolio
                      </Typography>
                    </Box>
                    <WorkIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </StatsCard>
            </Grow>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Grow in={true} timeout={1500}>
              <StatsCard sx={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {stats.totalBlogs}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Total Blog
                      </Typography>
                    </Box>
                    <CreateIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </StatsCard>
            </Grow>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Grow in={true} timeout={1700}>
              <StatsCard sx={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {stats.publishedBlogs}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Published Blog
                      </Typography>
                    </Box>
                    <ArticleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </StatsCard>
            </Grow>
          </Grid>
        </Grid>
      </AnimatedSection>
    )
  }

  const renderPosts = () => {
    if (loading) {
      return <LoadingSkeleton type="table" count={5} />
    }

    return (
      <AnimatedSection animation="fadeInLeft">
        <Paper sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight="600">
              Manage Posts
            </Typography>
            <ActionButton
              variant="contained"
              className="responsive-button"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditItem(null)
                setFormType('post')
                setFormData({ title: '', content: '', category: '', status: 'draft' })
                setOpenDialog(true)
              }}
            >
              Add New Post
            </ActionButton>
          </Box>
          
          <Fade in={true} timeout={800}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts.map((post, index) => (
                    <Fade in={true} timeout={1000 + (index * 100)} key={post.id}>
                      <TableRow hover>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>
                          <Chip 
                            label={post.status} 
                            color={post.status === 'published' ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(post)} size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(post.id, 'post')} size="small">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </Fade>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Fade>
        </Paper>
      </AnimatedSection>
    )
  }

  const renderContacts = () => {
    if (loading) {
      return <LoadingSkeleton type="table" count={5} />
    }

    return (
      <AnimatedSection animation="fadeInRight">
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight="600" mb={3}>
            Contact Messages
          </Typography>
          
          <Fade in={true} timeout={800}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contacts.map((contact, index) => (
                    <Fade in={true} timeout={1000 + (index * 100)} key={contact.id}>
                      <TableRow hover>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone || '-'}</TableCell>
                        <TableCell>{contact.subject}</TableCell>
                        <TableCell>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              maxWidth: 200, 
                              overflow: 'hidden', 
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {contact.message || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>{contact.date}</TableCell>
                        <TableCell>
                          <Chip 
                            label={contact.status} 
                            color={contact.status === 'new' ? 'warning' : 'success'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(contact)} size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(contact.id, 'contact')} size="small">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </Fade>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Fade>
        </Paper>
      </AnimatedSection>
    )
  }

  const renderPortfolio = () => {
    if (loading) {
      return <LoadingSkeleton type="table" count={5} />
    }

    return (
      <AnimatedSection animation="fadeInLeft">
        <Paper sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight="600">
              Manage Portfolio
            </Typography>
            <ActionButton
              variant="contained"
              className="responsive-button"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditItem(null)
                setFormType('portfolio')
                setFormData({ 
                  title: '', 
                  description: '', 
                  image: '', 
                  category: '', 
                  technologies: '', 
                  status: 'draft' 
                })
                setOpenDialog(true)
              }}
            >
              Add New Portfolio
            </ActionButton>
          </Box>
          
          <Fade in={true} timeout={800}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Technologies</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {portfolios.map((portfolio, index) => (
                    <Fade in={true} timeout={1000 + (index * 100)} key={portfolio.id}>
                      <TableRow hover>
                        <TableCell>
                          <Box>
                            <Typography variant="subtitle2" fontWeight="600">
                              {portfolio.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                              {portfolio.description.length > 60 
                                ? portfolio.description.substring(0, 60) + '...' 
                                : portfolio.description}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{portfolio.category}</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ maxWidth: 150 }}>
                            {portfolio.technologies}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={portfolio.status} 
                            color={portfolio.status === 'published' ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{portfolio.date}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(portfolio)} size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(portfolio.id, 'portfolio')} size="small">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </Fade>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Fade>
        </Paper>
      </AnimatedSection>
    )
  }

  const renderBlog = () => {
    if (loading) {
      return <LoadingSkeleton type="table" count={5} />
    }

    return (
      <AnimatedSection animation="fadeInRight">
        <Paper sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight="600">
              Manage Blog Posts
            </Typography>
            <ActionButton
              variant="contained"
              className="responsive-button"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditItem(null)
                setFormType('blog')
                setFormData({ 
                  title: '', 
                  content: '', 
                  excerpt: '', 
                  author: 'Tim Bayan Punca Digital', 
                  category: '', 
                  tags: '', 
                  featured_image: '', 
                  status: 'draft' 
                })
                setOpenDialog(true)
              }}
            >
              Add New Blog Post
            </ActionButton>
          </Box>
          
          <Fade in={true} timeout={800}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Tags</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blogPosts.map((blog, index) => (
                    <Fade in={true} timeout={1000 + (index * 100)} key={blog.id}>
                      <TableRow hover>
                        <TableCell>
                          <Box>
                            <Typography variant="subtitle2" fontWeight="600">
                              {blog.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                              {blog.excerpt}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{blog.author}</TableCell>
                        <TableCell>{blog.category}</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ maxWidth: 120 }}>
                            {blog.tags.length > 30 
                              ? blog.tags.substring(0, 30) + '...' 
                              : blog.tags}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={blog.status} 
                            color={blog.status === 'published' ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{blog.date}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(blog)} size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(blog.id, 'blog')} size="small">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </Fade>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Fade>
        </Paper>
      </AnimatedSection>
    )
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={setIsAuthenticated} />
  }

  return (
    <AdminContainer maxWidth="lg">
      {alert.show && (
        <Alert severity={alert.type} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}
      
      <Typography variant="h3" fontWeight="700" mb={4} color="primary.main" className="responsive-text-4xl">
        Admin Dashboard
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Box display="flex" gap={2}>
          <Button
            variant={activeTab === 'dashboard' ? 'contained' : 'text'}
            onClick={() => setActiveTab('dashboard')}
            startIcon={<DashboardIcon />}
          >
            Dashboard
          </Button>
          <Button
            variant={activeTab === 'posts' ? 'contained' : 'text'}
            onClick={() => setActiveTab('posts')}
            startIcon={<ArticleIcon />}
          >
            Posts
          </Button>
          <Button
            variant={activeTab === 'contacts' ? 'contained' : 'text'}
            onClick={() => setActiveTab('contacts')}
            startIcon={<ContactMailIcon />}
          >
            Contacts
          </Button>
          <Button
            variant={activeTab === 'portfolio' ? 'contained' : 'text'}
            onClick={() => setActiveTab('portfolio')}
            startIcon={<FolderIcon />}
          >
            Portfolio
          </Button>
          <Button
            variant={activeTab === 'blog' ? 'contained' : 'text'}
            onClick={() => setActiveTab('blog')}
            startIcon={<CreateIcon />}
          >
            Blog
          </Button>
        </Box>
      </Box>
      
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'posts' && renderPosts()}
      {activeTab === 'contacts' && renderContacts()}
      {activeTab === 'portfolio' && renderPortfolio()}
      {activeTab === 'blog' && renderBlog()}
      
      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editItem ? `Edit ${formType === 'portfolio' ? 'Portfolio' : formType === 'blog' ? 'Blog Post' : 'Post'}` : `Add New ${formType === 'portfolio' ? 'Portfolio' : formType === 'blog' ? 'Blog Post' : 'Post'}`}
        </DialogTitle>
        <DialogContent className="responsive-card-content">
          <TextField
            fullWidth
            label="Title"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            margin="normal"
            className="responsive-input"
          />
          
          {formType === 'portfolio' && (
            <>
              <TextField
                fullWidth
                label="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                margin="normal"
                multiline
                rows={3}
              />
              <Box sx={{ mt: 2, mb: 1 }}>
                 <Typography variant="subtitle2" gutterBottom>
                   Portfolio Image
                 </Typography>
                 <FileUpload
                    onFileSelect={(storageKey, imageUrl) => setFormData({ ...formData, image: imageUrl, imageStorageKey: storageKey })}
                    currentImage={formData.image}
                    accept="image/*"
                    imageType="portfolio"
                  />
               </Box>
              <TextField
                fullWidth
                label="Image URL (Alternative)"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                margin="normal"
                helperText="You can also paste an image URL directly"
              />
              <TextField
                fullWidth
                label="Technologies"
                value={formData.technologies || ''}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                margin="normal"
                placeholder="e.g. React, Node.js, MongoDB"
              />
            </>
          )}
          
          {formType === 'blog' && (
            <>
              <TextField
                fullWidth
                label="Excerpt"
                value={formData.excerpt || ''}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                margin="normal"
                multiline
                rows={2}
              />
              <TextField
                fullWidth
                label="Author"
                value={formData.author || ''}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Tags"
                value={formData.tags || ''}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                margin="normal"
                placeholder="e.g. web design, seo, digital marketing"
              />
              <Box sx={{ mt: 2, mb: 1 }}>
                 <Typography variant="subtitle2" gutterBottom>
                   Featured Image
                 </Typography>
                 <FileUpload
                    onFileSelect={(storageKey, imageUrl) => setFormData({ ...formData, featured_image: imageUrl, featuredImageStorageKey: storageKey })}
                    currentImage={formData.featured_image}
                    accept="image/*"
                    imageType="blog"
                  />
               </Box>
              <TextField
                fullWidth
                label="Featured Image URL (Alternative)"
                value={formData.featured_image || ''}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                margin="normal"
                helperText="You can also paste an image URL directly"
              />
              <TextField
                fullWidth
                label="Content"
                value={formData.content || ''}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                margin="normal"
                multiline
                rows={6}
              />
            </>
          )}
          
          {formType === 'post' && (
            <TextField
              fullWidth
              label="Content"
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              margin="normal"
              multiline
              rows={4}
            />
          )}
          
          <TextField
            fullWidth
            label="Category"
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            margin="normal"
          />
          
          <TextField
            fullWidth
            select
            label="Status"
            value={formData.status || 'draft'}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button onClick={() => setOpenDialog(false)} className="responsive-button">Cancel</Button>
          <Button onClick={handleSave} variant="contained" className="responsive-button">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </AdminContainer>
  )
}

export default Admin