import { Box } from '@mui/system'
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
import { Colors, Images } from '../../theme'
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
  'Quantity',
  'Amount',
  'Executed',
  'Unexecuted',
]
const openOrdersHeadings = [
  'Time',
  'All pairs',
  'All Types',
  'Unit Price (USD)',
  'Quantity',
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
  const cancelOrderLoading = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.cancelOrderLoading,
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
        if (openOrders && openOrders.length) {
          data = openOrders
        }
        break
      }
      case 2: {
        if (closedOrders && closedOrders.length) {
          data = closedOrders
        }
        data = closedOrders
        break
      }
      case 3:
        {
          // if (
          //   openOrders &&
          //   openOrders.length &&
          //   closedOrders &&
          //   closedOrders.length &&
          //   buyOrders &&
          //   buyOrders.length
          // ) {
          data = [...openOrders, ...closedOrders, ...buyOrders]
          data.sort((a: any, b: any) => {
            const aTime: any = new Date(a.time)
            const bTime: any = new Date(b.time)
            return bTime - aTime
          })
        }
        break
      // }
    }

    const tempRows = data?.map((item: any) => {
      const row = [
        moment(item?.time).format('LT, L'),
        item?.pair,
        item?.type,
        item?.unitPrice ? Math.round(item?.unitPrice * 100) / 100 : 0,
        item?.quantity,
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
                _expectedAvailableAmount: item?.unexecuted,
                _feeAsset: carbonTokenAddress,
                _feeAmount: 0,
              }
              cancelOrder(payload)
            }}
            // disabled={isDisabled()}
            variant="contained"
          >
            {/* {ordersTabIndex === 1 ? 'Cancel' : 'Withdraw'} */}
            {ordersTabIndex === 1 ? 'Cancel' : '-'}
          </CCButton>
        )
        row.push(actionBtn)
      }
      return row
    })
    setRows(tempRows)
  }

  console.log('openOrders', openOrders)
  console.log('closedOrders', closedOrders)
  console.log('buyOrders', buyOrders)
  console.log('rows', rows)

  console.log('cancelOrderLoading', cancelOrderLoading)

  return (
    <>
      <CCPaper>
        {(openOrders && openOrders.length) ||
        (closedOrders && closedOrders.length) ||
        (buyOrders && buyOrders.length) ? (
          <TabSelector
            tabArray={['Open Orders', 'Closed Orders', 'Order History']}
            tabIndex={ordersTabIndex}
            setTabIndex={(tabIndex: number) =>
              dispatch(setOrdersTabIndex(tabIndex))
            }
            sx={{ mt: 0 }}
          />
        ) : null}
        {openOrdersLoading || buyOrdersLoading || cancelOrderLoading ? (
          <CCTableSkeleton items={5} sx={{ mt: 2 }} />
        ) : (!openOrders || !openOrders.length) &&
          (!closedOrders || !closedOrders.length) &&
          (!buyOrders || !buyOrders.length) ? (
          <Box sx={{ background: Colors.lightGreenBackground, height: '33vh' }}>
            <Box
              sx={{
                height: '40%',
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ mb: 1 }}>Your Orders details are shown here</Box>
            </Box>
            <Box
              sx={{
                textAlign: 'center',
                // display: 'flex',
                // justifyContent: 'center',
                // backgroundImage: `url(${Images.Orders})`,
                // // height: '100%',
                // backgroundRepeat: 'no-repeat',
                // backgroundPosition: 'center top',
                // overflow: 'hidden',
                // height: '100%',
                // objectFit: 'cover',
                // objectPosition: '25% 25%',
              }}
            >
              <img src={Images.OrderHistory} alt="" />
            </Box>
          </Box>
        ) : rows && rows.length > 0 ? (
          <CCTable
            headings={ordersTabIndex === 3 ? headings : openOrdersHeadings}
            rows={rows}
            pagination={rows?.length > 5 ? true : false}
            rowsPerPageProp={5}
          />
        ) : (
          <Box
            sx={{
              mt: 1,
              bgcolor: Colors.darkPrimary2,
              color: Colors.darkPrimary1,
              fontWeight: 500,
              fontSize: 14,
              p: 2,
              textAlign: 'center',
              borderRadius: '4px',
            }}
          >
            No Orders under this tab
          </Box>
        )}
      </CCPaper>
    </>
  )
}

export default Orders
