import { Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import CCTable from '../../../atoms/CCTable'
import CCTableSkeleton from '../../../atoms/CCTableSkeleton'
import EmptyComponent from '../../../atoms/EmptyComponent/EmptyComponent'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { Colors } from '../../../theme'
import { getSellOrdersListData } from '../../../utils/Marketplace/marketplaceSellFlow.util'

const headings = [
  'Order ID',
  'Date',
  'Time',
  'Quantity',
  'Unit Price',
  'Total Amount',
  'Quantity Left',
  'Action',
]

const SellOrdersList = () => {
  const sellOrdersList = useAppSelector(
    ({ marketplaceSellFlow }) => marketplaceSellFlow.sellOrdersList,
    shallowEqual
  )
  const sellOrdersLoading = useAppSelector(
    ({ marketplaceSellFlow }) => marketplaceSellFlow.sellOrdersLoading,
    shallowEqual
  )

  useEffect(() => {
    getSellOrdersListData()
  }, [])

  return (
    <>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography sx={{ color: Colors.darkPrimary1, fontWeight: 500 }}>
          Sell Orders
        </Typography>
        {sellOrdersLoading ? (
          <CCTableSkeleton sx={{ mt: 2 }} />
        ) : sellOrdersList && sellOrdersList.length ? (
          <CCTable headings={headings} rows={sellOrdersList} />
        ) : (
          <EmptyComponent
            photoType={2}
            title="No orders made yet"
            exploreMarketplace
            elevation={0}
          />
        )}
      </Paper>
    </>
  )
}

export default SellOrdersList
