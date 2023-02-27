import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface cachingReducerInterface {
  cachedIssuerDashboardProjects: any
  cachedIssuerStats: any
}
const initialState: cachingReducerInterface = {
  cachedIssuerStats: null,
  cachedIssuerDashboardProjects: null,
}
const cachingSlice = createSlice({
  name: 'cachingSlice',
  initialState,
  reducers: {
    setCachedIssuerDashboardProject: (state, action: PayloadAction<any>) => {
      state.cachedIssuerDashboardProjects = action.payload
    },
    setCachedIssuerStats: (state, action: PayloadAction<any>) => {
      state.cachedIssuerStats = action.payload
    },
  },
})

export const { setCachedIssuerDashboardProject, setCachedIssuerStats } =
  cachingSlice.actions

export default cachingSlice.reducer
