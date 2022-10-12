import { Skeleton, Stack } from '@mui/material'
import React from 'react'
import { Colors } from '../../theme'
import { CCTableSkeletonProps } from './CCTableSkeleton.interface'

const CCTableSkeleton = ({ height = 40, items = 10, sx }: CCTableSkeletonProps) => {
  return (
    <Stack data-testid={'cc-table-skeleton'}>
      <Skeleton
        variant="rectangular"
        height={56.5}
        sx={{ background: '#CCE8E1', marginBottom: 1, ...sx }}
        animation="wave"
      />

      {new Array(items).fill(0, 0, items).map((i, index) => (
        <Skeleton
          data-testid={'cc-table-skeleton-row'}
          key={index.toString()}
          variant="rectangular"
          height={height}
          sx={{ background: index % 2 == 0 ? '#fff' : '#e1eee8' }}
        />
      ))}
      {/* <div style={{ padding: '20px 0' }}>
        <Skeleton
          variant="rectangular"
          height={46}
          sx={{ background: Colors.lightPrimary1 }}
        />
      </div> */}
    </Stack>
  )
}

export default CCTableSkeleton