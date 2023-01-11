import { Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const ProjectDetailsCardSkeleton = () => {
  return (
    <Box
      sx={{
        width: '280px',
        mb: 2,
        borderRadius: '8px',
        mr: 4,
      }}
    >
      <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        height={120}
      />
      <Skeleton
        variant="text"
        sx={{ mt: 1, fontSize: '2rem', bgcolor: 'grey.900' }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '20%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Skeleton
            sx={{ bgcolor: 'grey.900' }}
            variant="rectangular"
            height={20}
            width={'20px'}
          />
        </Box>
        <Box sx={{ mt: 1, width: '80%' }}>
          <Skeleton
            variant="text"
            sx={{ fontSize: '1rem', bgcolor: 'grey.900' }}
          />
        </Box>
      </Box>
      <Skeleton
        variant="text"
        sx={{ mt: 1, fontSize: '1rem', bgcolor: 'grey.900' }}
      />
      <Skeleton variant="text" sx={{ fontSize: '1rem', bgcolor: 'grey.900' }} />
    </Box>
  )
}

export default ProjectDetailsCardSkeleton
