import { Box, Skeleton, Grid, Card, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'

const SkeletonCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
  overflow: 'hidden',
}))

const LoadingSkeleton = ({ type = 'card', count = 3 }) => {
  const renderCardSkeleton = () => (
    <SkeletonCard>
      <CardContent>
        <Skeleton variant="rectangular" height={200} sx={{ mb: 2, borderRadius: 1 }} />
        <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={24} width="80%" sx={{ mb: 2 }} />
        <Box display="flex" gap={1}>
          <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: 1 }} />
        </Box>
      </CardContent>
    </SkeletonCard>
  )

  const renderTableSkeleton = () => (
    <Box>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index} display="flex" alignItems="center" py={2} borderBottom="1px solid #eee">
          <Skeleton variant="text" width="25%" height={24} sx={{ mr: 2 }} />
          <Skeleton variant="text" width="20%" height={24} sx={{ mr: 2 }} />
          <Skeleton variant="rectangular" width={80} height={24} sx={{ mr: 2, borderRadius: 1 }} />
          <Skeleton variant="text" width="15%" height={24} sx={{ mr: 2 }} />
          <Box display="flex" gap={1}>
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="circular" width={32} height={32} />
          </Box>
        </Box>
      ))}
    </Box>
  )

  const renderTextSkeleton = () => (
    <Box>
      <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
      <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
      <Skeleton variant="text" height={24} width="90%" sx={{ mb: 1 }} />
      <Skeleton variant="text" height={24} width="75%" />
    </Box>
  )

  if (type === 'table') {
    return renderTableSkeleton()
  }

  if (type === 'text') {
    return renderTextSkeleton()
  }

  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          {renderCardSkeleton()}
        </Grid>
      ))}
    </Grid>
  )
}

export default LoadingSkeleton