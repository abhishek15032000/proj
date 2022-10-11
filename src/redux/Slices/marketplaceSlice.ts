import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MarketplaceReducerInterface {
  buyQuantity: number
  buyUnitPrice: number
  totalAmountForBuying: number
  sellQuantity: number
  sellUnitPrice: number
}
const initialState: MarketplaceReducerInterface = {
  buyQuantity: 0,
  buyUnitPrice: 0,
  totalAmountForBuying: 0,
  sellQuantity: 0,
  sellUnitPrice: 0,
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
  },
})

export const {
  setBuyQuantity,
  setBuyUnitPrice,
  setTotalAmountForBuying,
  setSellQuantity,
  setSellUnitPrice,
} = marketplace.actions

export default marketplace.reducer
