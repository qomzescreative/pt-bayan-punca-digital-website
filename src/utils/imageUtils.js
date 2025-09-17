// Utility functions for handling image uploads and storage

/**
 * Convert file to base64 string for storage
 * @param {File} file - The file to convert
 * @returns {Promise<string>} - Base64 string representation
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Generate unique filename with timestamp
 * @param {string} originalName - Original filename
 * @returns {string} - Unique filename
 */
export const generateUniqueFilename = (originalName) => {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split('.').pop()
  return `${timestamp}_${randomString}.${extension}`
}

/**
 * Save image to localStorage with unique key
 * @param {File} file - The image file
 * @param {string} type - Type of image (blog, portfolio)
 * @returns {Promise<string>} - Storage key for the image
 */
export const saveImageToStorage = async (file, type = 'general') => {
  try {
    const base64 = await fileToBase64(file)
    const filename = generateUniqueFilename(file.name)
    const storageKey = `image_${type}_${filename}`    
    // Store image data
    localStorage.setItem(storageKey, base64)
    
    // Keep track of stored images
    const storedImages = JSON.parse(localStorage.getItem('stored_images') || '[]')
    storedImages.push({
      key: storageKey,
      filename,
      type,
      uploadDate: new Date().toISOString(),
      size: file.size
    })
    localStorage.setItem('stored_images', JSON.stringify(storedImages))
    
    return storageKey
  } catch (error) {
    console.error('Error saving image to storage:', error)
    throw error
  }
}

/**
 * Get image from localStorage
 * @param {string} storageKey - The storage key
 * @returns {string|null} - Base64 image data or null
 */
export const getImageFromStorage = (storageKey) => {
  try {
    return localStorage.getItem(storageKey)
  } catch (error) {
    console.error('Error getting image from storage:', error)
    return null
  }
}

/**
 * Delete image from localStorage
 * @param {string} storageKey - The storage key
 */
export const deleteImageFromStorage = (storageKey) => {
  try {
    localStorage.removeItem(storageKey)
    
    // Update stored images list
    const storedImages = JSON.parse(localStorage.getItem('stored_images') || '[]')
    const updatedImages = storedImages.filter(img => img.key !== storageKey)
    localStorage.setItem('stored_images', JSON.stringify(updatedImages))
  } catch (error) {
    console.error('Error deleting image from storage:', error)
  }
}

/**
 * Get all stored images
 * @returns {Array} - List of stored images
 */
export const getAllStoredImages = () => {
  try {
    return JSON.parse(localStorage.getItem('stored_images') || '[]')
  } catch (error) {
    console.error('Error getting stored images:', error)
    return []
  }
}

/**
 * Clean up old images (optional - for storage management)
 * @param {number} maxAge - Maximum age in days
 */
export const cleanupOldImages = (maxAge = 30) => {
  try {
    const storedImages = getAllStoredImages()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - maxAge)
    
    const imagesToDelete = storedImages.filter(img => {
      const uploadDate = new Date(img.uploadDate)
      return uploadDate < cutoffDate
    })
    
    imagesToDelete.forEach(img => {
      deleteImageFromStorage(img.key)
    })
    
    return imagesToDelete.length
  } catch (error) {
    console.error('Error cleaning up old images:', error)
    return 0
  }
}

/**
 * Validate image file
 * @param {File} file - The file to validate
 * @param {Object} options - Validation options
 * @returns {Object} - Validation result
 */
export const validateImageFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    minWidth = 100,
    minHeight = 100
  } = options
  
  const errors = []
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`)
  }
  
  // Check file size
  if (file.size > maxSize) {
    errors.push(`File size too large. Maximum size: ${Math.round(maxSize / (1024 * 1024))}MB`)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}