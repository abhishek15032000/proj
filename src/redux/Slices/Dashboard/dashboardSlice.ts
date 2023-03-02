import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface cachingReducerInterface {
  issuerNewProjects: any
  issuerRegisteredProjects: any
  issuerVerificationProjects: any
}
const initialState: cachingReducerInterface = {
  issuerNewProjects: null,
  issuerRegisteredProjects: null,
  issuerVerificationProjects: null,
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
    setIssueVerificationProjects: (state, action: PayloadAction<any>) => {
      state.issuerVerificationProjects = action.payload
    },
  },
})

export const {
  setIssuerNewProjects,
  setIssuerRegisteredProjects,
  setIssueVerificationProjects,
} = dashboardSlice.actions

export default dashboardSlice.reducer
