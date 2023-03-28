import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BLOCKCHAIN_STATUS } from '../../config/constants.config'

interface BlockchainStatusModalReducerInterface {
  openBlockchainModal: boolean
  blockchainCallStatus: number
}

const initialState: BlockchainStatusModalReducerInterface = {
  openBlockchainModal: false,
  blockchainCallStatus: BLOCKCHAIN_STATUS.NOT_YET_INITAITED,
}

const blockchainStatusModal = createSlice({
  name: 'blockchainStatusModal',
  initialState,
  reducers: {
    setOpenBlockchainModal: (state, action: PayloadAction<any>) => {
      state.openBlockchainModal = action.payload
    },
    setBlockchainCallStatus: (state, action: PayloadAction<any>) => {
      state.blockchainCallStatus = action.payload
    },
  },
})

export const { setOpenBlockchainModal, setBlockchainCallStatus } =
  blockchainStatusModal.actions

export default blockchainStatusModal.reducer
