import { eventsCalls } from '../api/eventsCalls.api'
import { marketplaceCalls } from '../api/marketplaceCalls.api'
import { transactionCalls } from '../api/transactionCalls.api'
import {
  setMessageModalText,
  setShowMessageModal,
} from '../redux/Slices/appSlice'
import {
  setBuyOrderPayloadAmountsToTake,
  setBuyOrderPayloadOfferHashes,
  setBuyOrderPayloadUUID,
  setBuyOrders,
  setBuyOrdersLoading,
  setBuyUnitPrice,
  setCarbonTokenAddress,
  setCarbonTokenSymbol,
  setClosedOrders,
  setCreateBuyOrderLoading,
  setCreateSellOrderLoading,
  setINRTokenAddress,
  setOpenOrders,
  setOpenOrdersLoading,
  setProjectsTokenLoading,
  setSellOrdersList,
  setSellOrdersLoading,
  setSellQuantity,
  setSellWantAmount,
  setTokenBalanceLoading,
  setTotalAmountForBuying,
} from '../redux/Slices/newMarketplaceSlice'
import { store } from '../redux/store'

export const getProjectsTokenDetails = async (projectUUID: string) => {
  try {
    store.dispatch(setProjectsTokenLoading(true))
    const res = await eventsCalls.getTokenByProjectUUID(
      `?project_id=${projectUUID}`
    )
    if (res?.success) {
      store.dispatch(setCarbonTokenSymbol(res?.data?.token_symbol))
      store.dispatch(setCarbonTokenAddress(res?.data?.token_address))
      store.dispatch(setINRTokenAddress(res?.data?.INR_token_address))
    }
  } catch (err) {
    console.log('Error in eventsCalls.getTokenByProjectUUID api ~ ', err)
  } finally {
    store.dispatch(setProjectsTokenLoading(false))
  }
}

export const getTokenBalances = async (userID: string, assetID: string) => {
  try {
    store.dispatch(setTokenBalanceLoading(true))
    const payload = {
      user_id: userID,
      asset_id: assetID,
    }
    const res = await transactionCalls.getAccountAndExchangeDetails(payload)
    if (res?.success) {
      return res
    }
  } catch (err) {
    console.log(
      'Error in transactionCalls.getAccountAndExchangeDetails api ~ ',
      err
    )
  } finally {
    store.dispatch(setTokenBalanceLoading(false))
  }
}

export async function getSellOrdersListData() {
  try {
    store.dispatch(setSellOrdersLoading(true))
    const sellOrderRes = await marketplaceCalls.getSellOrder()
    if (sellOrderRes.success && sellOrderRes.data.length) {
      const ordersList = sellOrderRes?.data?.reverse().map((order: any) => {
        return [
          Math.round((order?._wantAmount / order?._offerAmount) * 100) / 100,
          order?._offerAmount,
          order?._wantAmount,
        ]
      })
      store.dispatch(setSellOrdersList(ordersList))
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.getSellOrder api : ', err)
  } finally {
    store.dispatch(setSellOrdersLoading(false))
  }
}

export const createSellOrder = async () => {
  const carbonTokenAddress =
    store.getState()?.newMarketplaceReducer?.carbonTokenAddress
  const carbonTokenSymbol =
    store.getState()?.newMarketplaceReducer?.carbonTokenSymbol
  const inrTokenAddress =
    store.getState()?.newMarketplaceReducer?.inrTokenAddress
  const sellQuantity = store.getState()?.newMarketplaceReducer?.sellQuantity
  const sellWantAmount = store.getState()?.newMarketplaceReducer?.sellWantAmount
  const currentProjectUUID =
    store.getState()?.newMarketplaceReducer?.currentProjectUUID

  const pseudoNonce = new Date().getTime()

  try {
    store.dispatch(setCreateSellOrderLoading(true))
    const payload = {
      _offerAsset: carbonTokenAddress,
      _wantAsset: inrTokenAddress,
      _offerAmount: Number(sellQuantity),
      _wantAmount: Number(sellWantAmount),
      _feeAsset: carbonTokenAddress,
      _feeAmount: 0,
      _nonce: pseudoNonce,
      _offerAssetName: carbonTokenSymbol,
      _wantAssetName: 'USD',
    }

    const createOrderRes = await marketplaceCalls.createOrder(payload)
    if (createOrderRes?.success) {
      getSellOrdersListData()
      getOpenOrders()
      getProjectsTokenDetails(currentProjectUUID)
      store.dispatch(setSellQuantity(0))
      store.dispatch(setSellWantAmount(0))

      //resetting token addresses
      store.dispatch(setCarbonTokenSymbol(''))
      store.dispatch(setCarbonTokenAddress(''))
      store.dispatch(setINRTokenAddress(''))

      store.dispatch(setShowMessageModal(true))
      store.dispatch(
        setMessageModalText(
          'Sell Order created successfully. You can check the status of blockchain transaction from the orders table!!!'
        )
      )
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.createOrder api ~ ', err)
  } finally {
    store.dispatch(setCreateSellOrderLoading(false))
  }
}

export const createBuyOrder = async () => {
  // const carbonTokenAddress =
  //   store.getState()?.newMarketplaceReducer?.carbonTokenAddress
  const inrTokenAddress =
    store.getState()?.newMarketplaceReducer?.inrTokenAddress

  const buyOrderPayloadOfferHashes =
    store.getState()?.newMarketplaceReducer?.buyOrderPayloadOfferHashes
  const buyOrderPayloadAmountsToTake =
    store.getState()?.newMarketplaceReducer?.buyOrderPayloadAmountsToTake
  const buyOrderPayloadUUID =
    store.getState()?.newMarketplaceReducer?.buyOrderPayloadUUID
  const currentProjectUUID =
    store.getState()?.newMarketplaceReducer?.currentProjectUUID

  const pseudoNonce = new Date().getTime()

  try {
    store.dispatch(setCreateBuyOrderLoading(true))
    const payload = {
      uuid: buyOrderPayloadUUID,
      _offerHashes: buyOrderPayloadOfferHashes,
      _amountsToTake: buyOrderPayloadAmountsToTake,
      _feeAsset: inrTokenAddress,
      _feeAmount: 0,
      _nonce: pseudoNonce,
    }

    const createOrderRes = await marketplaceCalls.fillOrder(payload)
    if (createOrderRes?.success) {
      store.dispatch(setBuyUnitPrice(0))
      store.dispatch(setTotalAmountForBuying(0))
      store.dispatch(setBuyOrderPayloadUUID(null))
      store.dispatch(setBuyOrderPayloadOfferHashes(null))
      store.dispatch(setBuyOrderPayloadAmountsToTake(null))

      getSellOrdersListData()
      getBuyOrders()
      getProjectsTokenDetails(currentProjectUUID)

      //resetting token addresses
      store.dispatch(setCarbonTokenSymbol(''))
      store.dispatch(setCarbonTokenAddress(''))
      store.dispatch(setINRTokenAddress(''))

      store.dispatch(setShowMessageModal(true))
      store.dispatch(
        setMessageModalText(
          'Buy Order created successfully. You can check the status of blockchain transaction from the orders table!!!'
        )
      )
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.fillOrder api ~ ', err)
  } finally {
    store.dispatch(setCreateBuyOrderLoading(false))
  }
}

export const getOpenOrders = async () => {
  try {
    store.dispatch(setOpenOrdersLoading(true))
    const res = await marketplaceCalls.getOpenOrder()
    if (res?.success) {
      store.dispatch(setOpenOrders(res?.data?.openOrder))
      store.dispatch(setClosedOrders(res?.data?.closeOrder))
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.getOpenOrder api ~ ', err)
  } finally {
    store.dispatch(setOpenOrdersLoading(false))
  }
}

export async function getBuyOrders() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  try {
    store.dispatch(setBuyOrdersLoading(true))
    const buyOrderRes = await marketplaceCalls.getBuyOrder(accountAddress)
    if (buyOrderRes.success && buyOrderRes?.data?.buyOrder?.length) {
      store.dispatch(setBuyOrders(buyOrderRes?.data?.buyOrder))
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.getBuyOrder api : ', err)
  } finally {
    store.dispatch(setBuyOrdersLoading(false))
  }
}

export const cancelOrder = async (payload: any) => {
  try {
    const cancelOrderRes = await marketplaceCalls.cancelOrder(payload)
    if (cancelOrderRes.success) {
      store.dispatch(
        setMessageModalText(
          'Sell order Cancelled. Cancelled Token Amount will reflect in your Wallet.'
        )
      )
      store.dispatch(setShowMessageModal(true))
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.cancelOrder api ~ ', err)
  }
  // finally{

  // }
}
