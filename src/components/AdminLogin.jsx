import { useState } from 'react'
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Visibility, VisibilityOff, AdminPanelSettings } from '@mui/icons-material'

const LoginContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
}))

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  width: '100%',
  borderRadius: '16px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
}))

const LoginButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
}))

function AdminLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate loading
    setTimeout(() => {
      if (credentials.username === 'hamzah' && credentials.password === 'Hamzah123') {
        onLogin(true)
      } else {
        setError('Username atau password salah!')
      }
      setLoading(false)
    }, 1000)
  }

  const handleChange = (field) => (e) => {
    setCredentials(prev => ({
      ...prev,
      [field]: e.target.value
    }))
    setError('')
  }

  return (
    <LoginContainer>
      <LoginPaper elevation={3}>
        <Box textAlign="center" mb={3}>
          <AdminPanelSettings 
            sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} 
          />
          <Typography variant="h4" component="h1" gutterBottom>
            Admin CMS
          </Typography>
          <Typography variant="body2" color="text.secondary">
            PT Bayan Punca Digital
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={credentials.username}
            onChange={handleChange('username')}
            margin="normal"
            required
            autoComplete="username"
          />
          
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={credentials.password}
            onChange={handleChange('password')}
            margin="normal"
            required
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoginButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading || !credentials.username || !credentials.password}
          >
            {loading ? 'Masuk...' : 'Masuk'}
          </LoginButton>
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="caption" color="text.secondary">
            Hanya untuk administrator yang berwenang
          </Typography>
        </Box>
      </LoginPaper>
    </LoginContainer>
  )
}

export default AdminLogin