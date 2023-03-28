import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BLOCKCHAIN_STATUS } from '../../config/constants.config'

interface BlockchainStatusModalReducerInterface {
  openBlockchainStatusModal: boolean
  blockchainCallStatus: number
  primaryText: string
  secondaryText: string
}

const initialState: BlockchainStatusModalReducerInterface = {
  openBlockchainStatusModal: false,
  blockchainCallStatus: BLOCKCHAIN_STATUS.NOT_YET_INITAITED,
  primaryText: '',
  secondaryText: '',
}

const blockchainStatusModal = createSlice({
  name: 'blockchainStatusModal',
  initialState,
  reducers: {
    setOpenBlockchainStatusModal: (state, action: PayloadAction<any>) => {
      state.openBlockchainStatusModal = action.payload
    },
    setBlockchainCallStatus: (state, action: PayloadAction<any>) => {
      state.blockchainCallStatus = action.payload
    },
    setPrimaryText: (state, action: PayloadAction<any>) => {
      state.primaryText = action.payload
    },
    setsecondaryText: (state, action: PayloadAction<any>) => {
      state.secondaryText = action.payload
    },
  },
})

export const {
  setOpenBlockchainStatusModal,
  setBlockchainCallStatus,
  setPrimaryText,
  setsecondaryText,
} = blockchainStatusModal.actions

export default blockchainStatusModal.reducer
