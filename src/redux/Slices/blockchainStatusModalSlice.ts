import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BlockchainStatusModalReducerInterface {
  openBlockchainModal: boolean
}
const initialState: BlockchainStatusModalReducerInterface = {
  openBlockchainModal: false,
}
const blockchainStatusModal = createSlice({
  name: 'blockchainStatusModal',
  initialState,
  reducers: {
    setOpenBlockchainModal: (state, action: PayloadAction<any>) => {
      state.openBlockchainModal = action.payload
    },
  },
})

export const { setOpenBlockchainModal } = blockchainStatusModal.actions

export default blockchainStatusModal.reducer
