import { Box, Grid, Skeleton, Typography } from '@mui/material'
import React, { FC } from 'react'
import { shallowEqual } from 'react-redux'
import CCPaper from '../../atoms/CCPaper'
import { useAppSelector } from '../../hooks/reduxHooks'
import { Colors } from '../../theme'

const headings = ['Unit Price', 'Quantity', 'Total']

const OrderBook = () => {
  const sellOrdersList = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.sellOrdersList,
    shallowEqual
  )
  const sellOrdersLoading = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.sellOrdersLoading,
    shallowEqual
  )

  return (
    <CCPaper customSX={{ height: '100%' }}>
      <Typography sx={{ fontSize: 18, color: Colors.darkPrimary1 }}>
        Order Book
      </Typography>
      <Row isHeading rows={headings} />
      {sellOrdersLoading ? (
        <Box>
          {[1, 2, 3, 4, 5].map((item: any, index: number) => (
            <Skeleton
              data-testid={'cc-table-skeleton-row'}
              key={index.toString()}
              variant="rectangular"
              height={40}
              sx={{
                background: index % 2 == 0 ? '#fff' : '#e1eee8',
                borderRadius: '8px',
              }}
            />
          ))}
        </Box>
      ) : sellOrdersList && sellOrdersList.length ? (
        sellOrdersList.map((sellOrder: any, index: number) => (
          <Row key={index} rows={sellOrder} />
        ))
      ) : (
        <Typography sx={{ color: Colors.darkPrimary1, fontSize: 14 }}>
          No Orders yet
        </Typography>
      )}
    </CCPaper>
  )
}

export default OrderBook

interface RowProps {
  isHeading?: boolean
  rows: any
}
const Row: FC<RowProps> = ({ isHeading, rows }) => {
  return (
    <Grid
      container
      sx={{
        py: 1,
        px: 2,
        background: isHeading ? '#CCE8E1' : '',
        borderRadius: '8px',
      }}
    >
      {rows.length > 0 &&
        rows.map((row: string, index: number) => (
          <Grid
            item
            xs={4}
            key={index}
            sx={{
              color: '141D1B',
              fontSize: isHeading ? 12 : 14,
              fontWeight: 500,
            }}
          >
            {row}
          </Grid>
        ))}
    </Grid>
  )
}
