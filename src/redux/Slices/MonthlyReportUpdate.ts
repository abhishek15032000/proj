import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MonthlyReportUpdateReducerInterface {
  sectionIndex: number
  subSectionIndex: number
  currentProjectDetails: any
  isApiCalled: boolean
}
const initialState: MonthlyReportUpdateReducerInterface = {
  sectionIndex: 0,
  subSectionIndex: 0,
  currentProjectDetails: null,
  isApiCalled: false,
}
const MonthlyReportUpdate = createSlice({
  name: 'MonthlyReportUpdate',
  initialState,
  reducers: {
    setSectionIndex: (state, action: PayloadAction<any>) => {
      state.sectionIndex = action.payload
    },
    setSubSectionIndex: (state, action: PayloadAction<any>) => {
      state.subSectionIndex = action.payload
    },
    setCurrentProjectDetails: (state, action: PayloadAction<any>) => {
      state.currentProjectDetails = action.payload
    },
    setIsApiCalled: (state, action: PayloadAction<any>) => {
      state.isApiCalled = action.payload
    },
  },
})

export const {
  setSectionIndex,
  setSubSectionIndex,
  setCurrentProjectDetails,
  setIsApiCalled,
} = MonthlyReportUpdate.actions

export default MonthlyReportUpdate.reducer
