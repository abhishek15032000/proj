import { eventsCalls } from '../api/eventsCalls.api'
import { marketplaceCalls } from '../api/marketplaceCalls.api'
import { transactionCalls } from '../api/transactionCalls.api'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import {
    setCarbonTokenAddress,
    setCarbonTokenSymbol,
    setINRTokenAddress,
    setSellOrdersList,
    setSellOrdersLoading,
} from '../redux/Slices/newMarketplaceSlice'

export function useMarket() {
    const dispatch = useAppDispatch()
    const sellQuantity = useAppSelector(({ newMarketplaceReducer }) => newMarketplaceReducer?.sellQuantity)
    const sellUnitPrice = useAppSelector(({ newMarketplaceReducer }) => newMarketplaceReducer?.sellUnitPrice)

    const carbonTokenAddress = useAppSelector(({ newMarketplaceReducer }) => newMarketplaceReducer?.carbonTokenAddress)
    const inrTokenAddress = useAppSelector(({ newMarketplaceReducer }) => newMarketplaceReducer?.inrTokenAddress)



    const getProjectsTokenDetails = async (projectUUID: string) => {
        try {
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
        }
    }
    const getTokenBalances = async (userID: string, assetID: string) => {
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
        // const sellUnitPrice =getState()?.newMarketplaceReducer?.sellUnitPrice

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

    return {
        getProjectsTokenDetails,
        getTokenBalances,
        getSellOrdersListData,
        createSellOrder
    }
}