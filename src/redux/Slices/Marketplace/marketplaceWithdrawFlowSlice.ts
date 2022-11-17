import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SellFlowReducerInterface {
  withdrawQuantity: number
  ongoingWithdrawOrderTransaction: any
}
const initialState: SellFlowReducerInterface = {
  withdrawQuantity: 0,
  ongoingWithdrawOrderTransaction: null,
}
const marketplaceWithdrawFlow = createSlice({
  name: 'marketplaceWithdrawFlow',
  initialState,
  reducers: {
    setWithdrawQuantity: (state, action: PayloadAction<any>) => {
      state.withdrawQuantity = action.payload
    },
    setOngoingWithdrawOrderTransaction: (state, action: PayloadAction<any>) => {
      state.ongoingWithdrawOrderTransaction = action.payload
    },
  },
})

export const { setWithdrawQuantity, setOngoingWithdrawOrderTransaction } =
  marketplaceWithdrawFlow.actions

export default marketplaceWithdrawFlow.reducer
