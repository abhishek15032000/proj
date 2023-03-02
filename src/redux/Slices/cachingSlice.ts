import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface cachingReducerInterface {
  cachedIssuerDashboardProjects: any
  cachedIssuerStats: any
  cachedNewTabAllProjects: any
  cachedVerificationTabAllProjects: any
  cachedRegisterTabAllProjects: any
}
const initialState: cachingReducerInterface = {
  cachedIssuerStats: null,
  cachedIssuerDashboardProjects: null,
  cachedNewTabAllProjects: [],
  cachedVerificationTabAllProjects: [],
  cachedRegisterTabAllProjects: [],
}
const cachingSlice = createSlice({
  name: 'cachingSlice',
  initialState,
  reducers: {
    setCachedIssuerDashboardProject: (state, action: PayloadAction<any>) => {
      state.cachedIssuerDashboardProjects = action.payload
    },
    setCachedNewTabAllProjects: (state, action: PayloadAction<any>) => {
      state.cachedNewTabAllProjects = action.payload
    },
    setCachedVerificationTabAllProjects: (
      state,
      action: PayloadAction<any>
    ) => {
      state.cachedVerificationTabAllProjects = action.payload
    },
    setCachedRegisterTabAllProjects: (state, action: PayloadAction<any>) => {
      state.cachedRegisterTabAllProjects = action.payload
    },
    setCachedIssuerStats: (state, action: PayloadAction<any>) => {
      state.cachedIssuerStats = action.payload
    },
  },
})

export const {
  setCachedIssuerDashboardProject,
  setCachedIssuerStats,
  setCachedNewTabAllProjects,
  setCachedRegisterTabAllProjects,
  setCachedVerificationTabAllProjects,
} = cachingSlice.actions

export default cachingSlice.reducer
