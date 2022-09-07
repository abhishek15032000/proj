import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MonthlyReportUpdateReducerInterface {
  sectionIndex: number
  subSectionIndex: number
  currentProjectDetails: any
}
const initialState: MonthlyReportUpdateReducerInterface = {
  sectionIndex: 1,
  subSectionIndex: 0,
  currentProjectDetails: null,
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
  },
})

export const { setSectionIndex, setSubSectionIndex, setCurrentProjectDetails } =
  MonthlyReportUpdate.actions

export default MonthlyReportUpdate.reducer
