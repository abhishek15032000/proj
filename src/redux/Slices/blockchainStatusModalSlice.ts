import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BLOCKCHAIN_STATUS } from '../../config/constants.config'

interface BlockchainStatusModalReducerInterface {
  openBlockchainStatusModal: boolean
  blockchainCallStatus: number
  primaryText: string
  secondaryText: string
  retryCount: number
  retryFunction: any
}

const initialState: BlockchainStatusModalReducerInterface = {
  openBlockchainStatusModal: false,
  blockchainCallStatus: BLOCKCHAIN_STATUS.NOT_YET_INITAITED,
  primaryText: '',
  secondaryText: '',
  retryCount: 0,
  retryFunction: null,
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
    setSecondaryText: (state, action: PayloadAction<any>) => {
      state.secondaryText = action.payload
    },
    setRetryCount: (state, action: PayloadAction<any>) => {
      state.retryCount = action.payload
    },
    setRetryFunction: (state, action: PayloadAction<any>) => {
      state.retryFunction = action.payload
    },
    setResetRetry: (state) => {
      state.retryFunction = null
      state.retryCount = 0
    },
  },
})

export const {
  setOpenBlockchainStatusModal,
  setBlockchainCallStatus,
  setPrimaryText,
  setSecondaryText,
  setRetryCount,
  setRetryFunction,
  setResetRetry,
} = blockchainStatusModal.actions

export default blockchainStatusModal.reducer
