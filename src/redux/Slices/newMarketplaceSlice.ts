import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NewMarketplaceReducerInterface {
  carbonTokenSymbol: string
  carbonTokenAddress: string
  carbonTokenBalances: any
  inrTokenAddress: string
  inrTokenBalances: any
  sellQuantity: number
  sellUnitPrice: number
  buyQuantity: number
  sellOrdersList: any
  sellOrdersLoading: boolean
}
const initialState: NewMarketplaceReducerInterface = {
  carbonTokenSymbol: '',
  carbonTokenAddress: '',
  carbonTokenBalances: null,
  inrTokenAddress: '',
  inrTokenBalances: null,
  sellQuantity: 0,
  sellUnitPrice: 0,
  buyQuantity: 0,
  sellOrdersList: null,
  sellOrdersLoading: false,
}

const newMarketplaceReducer = createSlice({
  name: 'newMarketplaceReducer',
  initialState,
  reducers: {
    setCarbonTokenSymbol: (state, action: PayloadAction<any>) => {
      state.carbonTokenSymbol = action.payload
    },
    setCarbonTokenAddress: (state, action: PayloadAction<any>) => {
      state.carbonTokenAddress = action.payload
    },
    setCarbonTokenBalances: (state, action: PayloadAction<any>) => {
      state.carbonTokenBalances = action.payload
    },
    setINRTokenAddress: (state, action: PayloadAction<any>) => {
      state.inrTokenAddress = action.payload
    },
    setINRTokenBalances: (state, action: PayloadAction<any>) => {
      state.inrTokenBalances = action.payload
    },
    setSellQuantity: (state, action: PayloadAction<any>) => {
      state.sellQuantity = action.payload
    },
    setSellUnitPrice: (state, action: PayloadAction<any>) => {
      state.sellUnitPrice = action.payload
    },
    setBuyQuantity: (state, action: PayloadAction<any>) => {
      state.buyQuantity = action.payload
    },
    setSellOrdersList: (state, action: PayloadAction<any>) => {
      state.sellOrdersList = action.payload
    },
    setSellOrdersLoading: (state, action: PayloadAction<any>) => {
      state.sellOrdersLoading = action.payload
    },
  },
})

export const {
  setCarbonTokenSymbol,
  setCarbonTokenAddress,
  setCarbonTokenBalances,
  setINRTokenAddress,
  setINRTokenBalances,
  setSellQuantity,
  setSellUnitPrice,
  setBuyQuantity,
  setSellOrdersList,
  setSellOrdersLoading,
} = newMarketplaceReducer.actions

export default newMarketplaceReducer.reducer
