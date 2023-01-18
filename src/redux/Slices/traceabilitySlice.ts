import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TraceabilityReducerInterface {
  projectDeveloper: string
  verifier: string
  choosenVerifiers: any
  txIDForTab: string
}
const initialState: TraceabilityReducerInterface = {
  projectDeveloper: '',
  verifier: '',
  choosenVerifiers: null,
  txIDForTab: '',
}
const traceability = createSlice({
  name: 'traceability',
  initialState,
  reducers: {
    setProjectDeveloper: (state, action: PayloadAction<any>) => {
      state.projectDeveloper = action.payload
    },
    setVerifier: (state, action: PayloadAction<any>) => {
      state.verifier = action.payload
    },
    setChoosenVerifiers: (state, action: PayloadAction<any>) => {
      state.choosenVerifiers = action.payload
    },
    setTxIDForTab: (state, action: PayloadAction<any>) => {
      state.txIDForTab = action.payload
    },
  },
})

export const {
  setProjectDeveloper,
  setVerifier,
  setChoosenVerifiers,
  setTxIDForTab,
} = traceability.actions

export default traceability.reducer
