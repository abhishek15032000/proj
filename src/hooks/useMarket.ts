import { eventsCalls } from '../api/eventsCalls.api'
import { marketplaceCalls } from '../api/marketplaceCalls.api'
import { transactionCalls } from '../api/transactionCalls.api'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import {
    setMessageModalText,
    setShowMessageModal,
  } from '../redux/Slices/appSlice'
import  {
    setCarbonTokenAddress,
    setCarbonTokenSymbol,
    setCreateBuyOrderLoading,
    setCreateSellOrderLoading,
    setINRTokenAddress,
    setProjectsTokenLoading,
    setSellOrdersList,
    setSellOrdersLoading,
    setSellQuantity,
    setSellWantAmount,
    setTokenBalanceLoading,
  } from '../redux/Slices/newMarketplaceSlice'

export function useMarket() {
    const dispatch = useAppDispatch()
    const sellQuantity = useAppSelector(({ newMarketplaceReducer }) => newMarketplaceReducer?.sellQuantity)
    const sellWantAmount = useAppSelector(({ newMarketplaceReducer }) => newMarketplaceReducer?.sellWantAmount)

    const carbonTokenAddress = useAppSelector(({ newMarketplaceReducer }) => newMarketplaceReducer?.carbonTokenAddress)
    const inrTokenAddress = useAppSelector(({ newMarketplaceReducer }) => newMarketplaceReducer?.inrTokenAddress)
    const currentProjectUUID = useAppSelector(({ newMarketplaceReducer }) => newMarketplaceReducer?.currentProjectUUID)
    const buyOrderPayloadOfferHashes = useAppSelector(({ newMarketplaceReducer }) => newMarketplaceReducer?.buyOrderPayloadOfferHashes)
    const buyOrderPayloadAmountsToTake = useAppSelector(({ newMarketplaceReducer }) => newMarketplaceReducer?.buyOrderPayloadAmountsToTake)
    const buyOrderPayloadUUID = useAppSelector(({ newMarketplaceReducer }) => newMarketplaceReducer?.buyOrderPayloadUUID)


     const getProjectsTokenDetails = async (projectUUID: string) => {
        try {
         dispatch(setProjectsTokenLoading(true))
          const res = await eventsCalls.getTokenByProjectUUID(
            `?project_id=${projectUUID}`
          )
          if (res?.success) {
           dispatch(setCarbonTokenSymbol(res?.data?.token_symbol))
           dispatch(setCarbonTokenAddress(res?.data?.token_address))
           dispatch(setINRTokenAddress(res?.data?.INR_token_address))
          }
        } catch (err) {
          console.log('Error in eventsCalls.getTokenByProjectUUID api ~ ', err)
        } finally {
         dispatch(setProjectsTokenLoading(false))
        }
      }
      
       const getTokenBalances = async (userID: string, assetID: string) => {
        try {
         dispatch(setTokenBalanceLoading(true))
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
         dispatch(setTokenBalanceLoading(false))
        }
      }
      
       async function getSellOrdersListData() {
        try {
         dispatch(setSellOrdersLoading(true))
          const sellOrderRes = await marketplaceCalls.getSellOrder()
          if (sellOrderRes.success && sellOrderRes.data.length) {
            const ordersList = sellOrderRes?.data?.reverse().map((order: any) => {
              return [
                order?._wantAmount,
                order?._offerAmount,
                order?._wantAmount * order?._offerAmount,
              ]
            })
           dispatch(setSellOrdersList(ordersList))
          }
        } catch (err) {
          console.log('Error in marketplaceCalls.getSellOrder api : ', err)
        } finally {
         dispatch(setSellOrdersLoading(false))
        }
      }
      
       const createSellOrder = async () => {
        // const carbonTokenAddress =
        //  getState()?.newMarketplaceReducer?.carbonTokenAddress
        // const inrTokenAddress =
        //  getState()?.newMarketplaceReducer?.inrTokenAddress
        // const sellQuantity =getState()?.newMarketplaceReducer?.sellQuantity
        // const sellWantAmount =getState()?.newMarketplaceReducer?.sellWantAmount
        // const currentProjectUUID =
        //  getState()?.newMarketplaceReducer?.currentProjectUUID
      
        const pseudoNonce = new Date().getTime()
      
        try {
         dispatch(setCreateSellOrderLoading(true))
          const payload = {
            _offerAsset: carbonTokenAddress,
            _wantAsset: inrTokenAddress,
            _offerAmount: Number(sellQuantity),
            _wantAmount: Number(sellWantAmount),
            _feeAsset: carbonTokenAddress,
            _feeAmount: 0,
            _nonce: pseudoNonce,
          }
      
          const createOrderRes = await marketplaceCalls.createOrder(payload)
          if (createOrderRes?.success) {
            getSellOrdersListData()
            getProjectsTokenDetails(currentProjectUUID)
           dispatch(setSellQuantity(0))
           dispatch(setSellWantAmount(0))
      
           dispatch(setShowMessageModal(true))
           dispatch(
              setMessageModalText(
                'Sell Order created successfully. You can chck the status of blockchain transaction from the orders table!!!'
              )
            )
          }
        } catch (err) {
          console.log('Error in marketplaceCalls.createOrder api ~ ', err)
        } finally {
         dispatch(setCreateSellOrderLoading(false))
        }
      }
      
       const createBuyOrder = async () => {
        // const carbonTokenAddress =
        //  getState()?.newMarketplaceReducer?.carbonTokenAddress
        // const inrTokenAddress =
        //  getState()?.newMarketplaceReducer?.inrTokenAddress
      
        // const buyOrderPayloadOfferHashes =
        //  getState()?.newMarketplaceReducer?.buyOrderPayloadOfferHashes
        // const buyOrderPayloadAmountsToTake =
        //  getState()?.newMarketplaceReducer?.buyOrderPayloadAmountsToTake
        // const buyOrderPayloadUUID =
        //  getState()?.newMarketplaceReducer?.buyOrderPayloadUUID
        // const currentProjectUUID =
        //  getState()?.newMarketplaceReducer?.currentProjectUUID
      
        const pseudoNonce = new Date().getTime()
      
        try {
         dispatch(setCreateBuyOrderLoading(true))
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
            getSellOrdersListData()
            getProjectsTokenDetails(currentProjectUUID)
      
           dispatch(setShowMessageModal(true))
           dispatch(
              setMessageModalText(
                'Buy Order created successfully. You can chck the status of blockchain transaction from the orders table!!!'
              )
            )
          }
        } catch (err) {
          console.log('Error in marketplaceCalls.fillOrder api ~ ', err)
        } finally {
         dispatch(setCreateBuyOrderLoading(false))
        }
      }

    return {
        getProjectsTokenDetails,
        getTokenBalances,
        getSellOrdersListData,
        createSellOrder,
        createBuyOrder
    }
}