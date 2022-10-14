import { Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { marketplaceCalls } from '../../../api/marketplaceCalls.api'
import CCTable from '../../../atoms/CCTable'
import CCTableSkeleton from '../../../atoms/CCTableSkeleton'
import EmptyComponent from '../../../atoms/EmptyComponent/EmptyComponent'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { Colors } from '../../../theme'
import { getLocalItem } from '../../../utils/Storage'

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

const BuyOrdersList = () => {
  const [rows, setRows] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )

  useEffect(() => {
    getBuyOrders()
  }, [])

  async function getBuyOrders() {
    const buyer = getLocalItem('userDetails')?.user_id
    try {
      const buyOrderRes = await marketplaceCalls.getBuyOrder(buyer)
      if (buyOrderRes.success && buyOrderRes.data.length) {
        const rowValues = buyOrderRes.data.map((row: any) => {
          const orderId = row?.uuid
          const quantity = row?._offerAmount
          const unitPrice = row?._wantAmount
          const totalAmount = quantity * unitPrice
          return [
            orderId,
            'Date',
            'Time',
            quantity,
            unitPrice,
            totalAmount,
            'Qty Left',
            'Action',
          ]
        })
        setRows(rowValues)
      }
    } catch (err) {
      console.log('Error in marketplaceCalls.getBuyOrder api : ', err)
    }
  }

  return (
    <>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography sx={{ color: Colors.darkPrimary1, fontWeight: 500 }}>
          Buy Orders
        </Typography>
        {loading ? (
          <CCTableSkeleton sx={{ mt: 2 }} />
        ) : rows && rows.length ? (
          <CCTable headings={headings} rows={rows} />
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

export default BuyOrdersList
