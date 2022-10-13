import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MarketplaceReducerInterface {
  buyQuantity: number
  buyUnitPrice: number
  totalAmountForBuying: number
  sellQuantity: number
  sellUnitPrice: number
  onGoingApproveRedux: any
  dataToMakeBuyCall: any
  dataToMakeDepositCall: any
  dataToMakeCreateSellOrderCall: any
  walletBal: any
  exchangeBal: any
  approvedTokensBal: any
}
const initialState: MarketplaceReducerInterface = {
  buyQuantity: 0,
  buyUnitPrice: 0,
  totalAmountForBuying: 0,
  sellQuantity: 0,
  sellUnitPrice: 0,
  onGoingApproveRedux: null,
  dataToMakeBuyCall: null,
  dataToMakeDepositCall: null,
  dataToMakeCreateSellOrderCall: null,
  walletBal: null,
  exchangeBal: null,
  approvedTokensBal: null,
}
const marketplace = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    setBuyQuantity: (state, action: PayloadAction<any>) => {
      state.buyQuantity = action.payload
    },
    setBuyUnitPrice: (state, action: PayloadAction<any>) => {
      state.buyUnitPrice = action.payload
    },
    setTotalAmountForBuying: (state, action: PayloadAction<any>) => {
      state.totalAmountForBuying = action.payload
    },
    // setBuyQuantity: (state, action: PayloadAction<any>) => {
    //   state.buyQuantity = action.payload
    // },
    setSellQuantity: (state, action: PayloadAction<any>) => {
      state.sellQuantity = action.payload
    },
    setSellUnitPrice: (state, action: PayloadAction<any>) => {
      state.sellUnitPrice = action.payload
    },
    setOnGoingApproveRedux: (state, action: PayloadAction<any>) => {
      state.onGoingApproveRedux = action.payload
    },
    setDataToMakeDepositCall: (state, action: PayloadAction<any>) => {
      state.dataToMakeDepositCall = action.payload
    },
    setDataToMakeCreateSellOrderCall: (state, action: PayloadAction<any>) => {
      state.dataToMakeCreateSellOrderCall = action.payload
    },
    setWalletBal: (state, action: PayloadAction<any>) => {
      state.walletBal = action.payload
    },
    setExchangeBal: (state, action: PayloadAction<any>) => {
      state.exchangeBal = action.payload
    },
    setApprovedTokensBal: (state, action: PayloadAction<any>) => {
      state.approvedTokensBal = action.payload
    },
  },
})

export const {
  setBuyQuantity,
  setBuyUnitPrice,
  setTotalAmountForBuying,
  setSellQuantity,
  setSellUnitPrice,
  setOnGoingApproveRedux,
  setDataToMakeDepositCall,
  setWalletBal,
  setExchangeBal,
  setApprovedTokensBal,
  setDataToMakeCreateSellOrderCall,
} = marketplace.actions

export default marketplace.reducer
