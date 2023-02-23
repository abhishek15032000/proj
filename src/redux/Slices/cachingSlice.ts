import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface cachingReducerInterface {
  issuerDashboardProjects: any
  issuerStats: any
}
const initialState: cachingReducerInterface = {
  issuerStats: null,
  issuerDashboardProjects: null,
}
const cachingSlice = createSlice({
  name: 'cachingSlice',
  initialState,
  reducers: {
    setIssuerDashboardProject: (state, action: PayloadAction<any>) => {
      state.issuerDashboardProjects = action.payload
    },
    setIssuerStats: (state, action: PayloadAction<any>) => {
      state.issuerStats = action.payload
    },
  },
})

export const { setIssuerDashboardProject, setIssuerStats } =
  cachingSlice.actions

export default cachingSlice.reducer
