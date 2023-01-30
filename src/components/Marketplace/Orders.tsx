import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import CCButton from '../../atoms/CCButton'
import CCPaper from '../../atoms/CCPaper'
import CCTable from '../../atoms/CCTable'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import TabSelector from '../../atoms/TabSelector/TabSelector'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setOrdersTabIndex } from '../../redux/Slices/newMarketplaceSlice'
import { Colors } from '../../theme'
import {
  cancelOrder,
  getBuyOrders,
  getOpenOrders,
} from '../../utils/newMarketplace.utils'

const headings = [
  'Time',
  'All pairs',
  'All Types',
  'Unit Price (USD)',
  'Price',
  'Amount',
  'Executed',
  'Unexecuted',
]
const openOrdersHeadings = [
  'Time',
  'All pairs',
  'All Types',
  'Unit Price (USD)',
  'Price',
  'Amount',
  'Executed',
  'Unexecuted',
  'Action',
]

const Orders = () => {
  const dispatch = useAppDispatch()
  const carbonTokenAddress = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.carbonTokenAddress,
    shallowEqual
  )
  const ordersTabIndex = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.ordersTabIndex,
    shallowEqual
  )
  const openOrders = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.openOrders,
    shallowEqual
  )
  const closedOrders = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.closedOrders,
    shallowEqual
  )
  const buyOrders = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.buyOrders,
    shallowEqual
  )
  const openOrdersLoading = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.openOrdersLoading,
    shallowEqual
  )
  const buyOrdersLoading = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.buyOrdersLoading,
    shallowEqual
  )

  const [rows, setRows] = useState<any>(null)

  useEffect(() => {
    getOpenOrders()
    getBuyOrders()
  }, [])

  useEffect(() => {
    if (
      (openOrders && openOrders.length) ||
      (closedOrders && closedOrders.length) ||
      (buyOrders && buyOrders.length)
    ) {
      makeTableRowData()
    }
  }, [ordersTabIndex, openOrders, closedOrders, buyOrders])

  const makeTableRowData = () => {
    let data: any
    switch (ordersTabIndex) {
      case 1: {
        data = openOrders
        break
      }
      case 2: {
        data = closedOrders
        break
      }
      case 3: {
        data = [...openOrders, ...closedOrders, ...buyOrders]
        data.sort((a: any, b: any) => {
          const aTime: any = new Date(a.time)
          const bTime: any = new Date(b.time)
          return bTime - aTime
        })
        break
      }
    }

    const tempRows = data?.map((item: any) => {
      const row = [
        moment(item?.time).format('LT, L'),
        item?.pair,
        item?.type,
        item?.unitPrice ? Math.round(item?.unitPrice * 100) / 100 : 0,
        item?.price,
        item?.amount,
        item?.executed,
        item?.unexecuted,
      ]
      if (ordersTabIndex === 1 || ordersTabIndex === 2) {
        const actionBtn = (
          <CCButton
            sx={{
              bgcolor: Colors.textColorLightGreen,
              color: Colors.white,
              padding: '6px 18px',
              borderRadius: '30px',
              fontSize: 12,
              minWidth: 0,
            }}
            onClick={() => {
              const payload = {
                uuid: item?.uuid,
                _offerHash: item?.hash,
                _expectedAvailableAmount: item?.amount,
                _feeAsset: carbonTokenAddress,
                _feeAmount: 0,
              }
              cancelOrder(payload)
            }}
            // disabled={isDisabled()}
            variant="contained"
          >
            {ordersTabIndex === 1 ? 'Cancel' : 'Withdraw'}
          </CCButton>
        )
        row.push(actionBtn)
      }
      return row
    })
    setRows(tempRows)
  }

  return (
    <CCPaper>
      <TabSelector
        tabArray={['Open Orders', 'Closed Order', 'Order History']}
        tabIndex={ordersTabIndex}
        setTabIndex={(tabIndex: number) =>
          dispatch(setOrdersTabIndex(tabIndex))
        }
        sx={{ mt: 0 }}
      />
      {openOrdersLoading || buyOrdersLoading ? (
        <CCTableSkeleton sx={{ mt: 2 }} />
      ) : (
        <CCTable
          headings={ordersTabIndex === 3 ? headings : openOrdersHeadings}
          rows={rows}
        />
      )}
    </CCPaper>
  )
}

export default Orders
