import { useState, useRef } from 'react'
import { Box, Button, Typography, IconButton, Alert } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import ImageIcon from '@mui/icons-material/Image'
import { saveImageToStorage, validateImageFile } from '../utils/imageUtils'

const UploadBox = styled(Box)(({ theme, isDragOver }) => ({
  border: `2px dashed ${isDragOver ? theme.palette.primary.main : theme.palette.grey[300]}`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: isDragOver ? theme.palette.primary.light + '10' : theme.palette.grey[50],
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light + '10',
  },
}))

const PreviewImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  maxHeight: '200px',
  borderRadius: theme.spacing(1),
  objectFit: 'cover',
  border: `1px solid ${theme.palette.grey[300]}`,
}))

const HiddenInput = styled('input')({
  display: 'none',
})

function FileUpload({ onFileSelect, currentImage, accept = 'image/*', maxSize = 5 * 1024 * 1024, imageType = 'general' }) {
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(currentImage || '')
  const fileInputRef = useRef(null)

  const validateFile = (file) => {
    const validation = validateImageFile(file, { maxSize })
    return validation.isValid ? null : validation.errors.join(', ')
  }

  const handleFileSelect = async (file) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    
    try {
      // Save image to storage and get storage key
      const storageKey = await saveImageToStorage(file, imageType)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target.result
        setPreview(imageUrl)
        
        // Call parent callback with storage key and preview URL
        onFileSelect(storageKey, imageUrl)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      setError('Gagal menyimpan gambar. Silakan coba lagi.')
      console.error('Error saving image:', error)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleRemoveImage = () => {
    setPreview('')
    setError('')
    onFileSelect(null, '')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {preview ? (
        <Box>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <PreviewImage src={preview} alt="Preview" />
            <IconButton
              onClick={handleRemoveImage}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.9)',
                },
              }}
              size="small"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
          <Button
            variant="outlined"
            onClick={handleClick}
            startIcon={<CloudUploadIcon />}
            sx={{ mt: 2, display: 'block' }}
          >
            Ganti Gambar
          </Button>
        </Box>
      ) : (
        <UploadBox
          className="responsive-section"
          isDragOver={dragOver}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <ImageIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" className="responsive-text-base" gutterBottom>
            Upload Gambar
          </Typography>
          <Typography variant="body2" color="text.secondary" className="responsive-text-sm" gutterBottom>
            Drag & drop gambar di sini atau klik untuk memilih file
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Format: JPG, PNG, GIF • Maksimal {Math.round(maxSize / (1024 * 1024))}MB
          </Typography>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            className="responsive-button"
            sx={{ mt: 2 }}
            onClick={(e) => e.stopPropagation()}
          >
            Pilih File
          </Button>
        </UploadBox>
      )}
      
      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
      />
    </Box>
  )
}

export default FileUpload