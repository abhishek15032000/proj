import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface VerifierReducerInterface {
  profileCompletionPercent: number
  profileUpdated: boolean
  verifierStatsReload: boolean
}
const initialState: VerifierReducerInterface = {
  profileCompletionPercent: 0,
  profileUpdated: false,
  verifierStatsReload: true,
}
const verifier = createSlice({
  name: 'verifier',
  initialState,
  reducers: {
    setProfileCompletionPercent: (state, action: PayloadAction<any>) => {
      state.profileCompletionPercent = action.payload
    },
    setProfileUpdated: (state, action: PayloadAction<any>) => {
      state.profileUpdated = action.payload
    },
    setVerifierStatsReload: (state, action: PayloadAction<any>) => {
      state.verifierStatsReload = action.payload
    },
  },
})

export const {
  setProfileCompletionPercent,
  setProfileUpdated,
  setVerifierStatsReload,
} = verifier.actions

export default verifier.reducer
