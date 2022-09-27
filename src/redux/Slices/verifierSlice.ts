import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface VerifierReducerInterface {
  profileCompletionPercent: number
  profileUpdated: boolean
  projectStatsReload: boolean
}
const initialState: VerifierReducerInterface = {
  profileCompletionPercent: 0,
  profileUpdated: false,
  projectStatsReload: true,
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
    setProfileStatsReload: (state, action: PayloadAction<any>) => {
      state.projectStatsReload = action.payload
    },
  },
})

export const {
  setProfileCompletionPercent,
  setProfileUpdated,
  setProfileStatsReload,
} = verifier.actions

export default verifier.reducer
