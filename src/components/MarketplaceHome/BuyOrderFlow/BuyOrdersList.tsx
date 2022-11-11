import { Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { marketplaceCalls } from '../../../api/marketplaceCalls.api'
import CCTable from '../../../atoms/CCTable'
import CCTableSkeleton from '../../../atoms/CCTableSkeleton'
import EmptyComponent from '../../../atoms/EmptyComponent/EmptyComponent'
import ShortenedIDComp from '../../../atoms/ShortenedIDComp.tsx/ShortenedIDComp'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { Colors } from '../../../theme'
import { limitTitleFromMiddle } from '../../../utils/commonFunctions'
import { getLocalItem } from '../../../utils/Storage'

const headings = [
  'Order ID',
  // 'Date',
  // 'Time',
  'Quantity',
  'Unit Price',
  'Total Amount',
  // 'Quantity Left',
  // 'Action',
]

const BuyOrdersList = () => {
  const [rows, setRows] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )

  useEffect(() => {
    if (accountAddress) {
      getBuyOrders()
    }
  }, [accountAddress])

  async function getBuyOrders() {
    try {
      const buyOrderRes = await marketplaceCalls.getBuyOrder(accountAddress)
      const temp: any[] = []
      if (buyOrderRes.success && buyOrderRes.data.length) {
        buyOrderRes.data.forEach((row: any) => {
          if (row?.fillOrder.length) {
            row?.fillOrder.forEach((order: any, index: number) => {
              const transactionElement = row?.transactions?.fill[index]
              const orderId = transactionElement?.transactionHash
              const quantity = order?._amountsToTake.reduce(
                (acc: any, cur: any) => {
                  return acc + cur
                },
                0
              )
              const unitPrice = (order?._feeAmount / quantity).toFixed(3)
              const totalAmount = order?._feeAmount
              temp.push([
                <ShortenedIDComp
                  key={index}
                  referenceId={orderId}
                  width={'565'}
                />,
                quantity,
                unitPrice,
                totalAmount,
              ])
            })
          }
        })
        setRows(temp.reverse())
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
