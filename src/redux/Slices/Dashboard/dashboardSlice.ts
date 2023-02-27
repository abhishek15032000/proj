import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface cachingReducerInterface {
  issuerNewProjects: any
  issuerRegisteredProjects: any
}
const initialState: cachingReducerInterface = {
  issuerNewProjects: null,
  issuerRegisteredProjects: null,
}
const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {
    setIssuerNewProjects: (state, action: PayloadAction<any>) => {
      state.issuerNewProjects = action.payload
    },
    setIssuerRegisteredProjects: (state, action: PayloadAction<any>) => {
      state.issuerRegisteredProjects = action.payload
    },
  },
})

export const { setIssuerNewProjects, setIssuerRegisteredProjects } =
  dashboardSlice.actions

export default dashboardSlice.reducer
