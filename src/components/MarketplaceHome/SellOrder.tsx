import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { marketplaceCalls } from '../../api/marketplaceCalls.api'
import CCTable from '../../atoms/CCTable'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import { useAppSelector } from '../../hooks/reduxHooks'

declare let window: any

const provider =
  window.ethereum != null
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.getDefaultProvider()

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

const SellOrder = () => {
  const [rows, setRows] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )

  useEffect(() => {
    abc()
    getSellOrders()
  }, [])

  async function abc() {
    const nonce = await provider.getTransactionCount(accountAddress)
  }
  async function getSellOrders() {
    try {
      setLoading(true)
      const sellOrderRes = await marketplaceCalls.getSellOrder()
      if (sellOrderRes.success && sellOrderRes.data.length) {
        const rowValues = sellOrderRes.data.map((row: any) => {
          const orderId = row?.uuid
          const quantity = row?._offerAmount
          const unitPrice = row?._wantAmount
          const totalAmount = quantity * unitPrice
          return [orderId, '-', '-', quantity, unitPrice, totalAmount, '-', '-']
          // return [
          //   orderId,
          //   'Date',
          //   'Time',
          //   quantity,
          //   unitPrice,
          //   totalAmount,
          //   'Qty Left',
          //   'Action',
          // ]
        })
        setRows(rowValues)
      }
    } catch (err) {
      console.log('Error in marketplaceCalls.getSellOrder api : ', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <CCTableSkeleton sx={{ mt: 2 }} />
      ) : (
        rows && rows.length && <CCTable headings={headings} rows={rows} />
      )}
    </>
  )
}

export default SellOrder
