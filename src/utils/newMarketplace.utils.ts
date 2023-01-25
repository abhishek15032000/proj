import { eventsCalls } from '../api/eventsCalls.api'
import { marketplaceCalls } from '../api/marketplaceCalls.api'
import { transactionCalls } from '../api/transactionCalls.api'
import {
  setCarbonTokenAddress,
  setCarbonTokenSymbol,
  setINRTokenAddress,
  setSellOrdersList,
  setSellOrdersLoading,
} from '../redux/Slices/newMarketplaceSlice'
import { store } from '../redux/store'

export const getProjectsTokenDetails = async (projectUUID: string) => {
  try {
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
  }
}

export const getTokenBalances = async (userID: string, assetID: string) => {
  try {
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
  }
}

export async function getSellOrdersListData() {
  try {
    store.dispatch(setSellOrdersLoading(true))
    const sellOrderRes = await marketplaceCalls.getSellOrder()
    if (sellOrderRes.success && sellOrderRes.data.length) {
      const ordersList = sellOrderRes?.data?.reverse().map((order: any) => {
        return [
          order?._wantAmount,
          order?._offerAmount,
          order?._wantAmount * order?._offerAmount,
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
  const inrTokenAddress =
    store.getState()?.newMarketplaceReducer?.inrTokenAddress
  const sellQuantity = store.getState()?.newMarketplaceReducer?.sellQuantity
  const sellUnitPrice = store.getState()?.newMarketplaceReducer?.sellUnitPrice

  const pseudoNonce = new Date().getTime()

  try {
    const payload = {
      _offerAsset: carbonTokenAddress,
      _wantAsset: inrTokenAddress,
      _offerAmount: Number(sellQuantity),
      _wantAmount: Number(sellUnitPrice),
      _feeAsset: carbonTokenAddress,
      _feeAmount: 1,
      _nonce: pseudoNonce,
    }

    const createOrderRes = await marketplaceCalls.createOrder(payload)
    if (createOrderRes?.success) {
      console.log('createOrderRes?.data', createOrderRes?.data)
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.createOrder api ~ ', err)
  }
}
