import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface cachingReducerInterface {
  cachedIssuerDashboardProjects: any
  cachedIssuerStats: any
  cachedNewTabAllProjects: any
  cachedVerificationTabAllProjects: any
  cachedRegisterTabAllProjects: any
  cachedVerifierDashboardProjects: any
  cachedRegistryNewTabAllProjects: any
  cachedRegistryReviewedTabAllProjects: any
}
const initialState: cachingReducerInterface = {
  cachedIssuerStats: null,
  cachedIssuerDashboardProjects: null,
  cachedNewTabAllProjects: [],
  cachedVerificationTabAllProjects: [],
  cachedRegisterTabAllProjects: [],
  cachedVerifierDashboardProjects: [],
  cachedRegistryNewTabAllProjects: [],
  cachedRegistryReviewedTabAllProjects: [],
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
    setCachedVerifierDashboardProject: (state, action: PayloadAction<any>) => {
      state.cachedVerifierDashboardProjects = action.payload
    },
    setCachedRegistryNewTabAllProjects: (state, action: PayloadAction<any>) => {
      state.cachedRegistryNewTabAllProjects = action.payload
    },
    setCachedRegistryReviewedTabAllProjects: (
      state,
      action: PayloadAction<any>
    ) => {
      state.cachedRegistryReviewedTabAllProjects = action.payload
    },
  },
})

export const {
  setCachedIssuerDashboardProject,
  setCachedIssuerStats,
  setCachedNewTabAllProjects,
  setCachedRegisterTabAllProjects,
  setCachedVerificationTabAllProjects,
  setCachedVerifierDashboardProject,
  setCachedRegistryNewTabAllProjects,
  setCachedRegistryReviewedTabAllProjects,
} = cachingSlice.actions

export default cachingSlice.reducer
