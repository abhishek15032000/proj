import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IssuanceDataCollectionReducerInterface {
  sectionIndex: number
  subSectionIndex: number
  currentProjectDetails: any
}
const initialState: IssuanceDataCollectionReducerInterface = {
  sectionIndex: 0,
  subSectionIndex: 0,
  currentProjectDetails: null,
}
const issuanceDataCollection = createSlice({
  name: 'issuanceDataCollection',
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

export const { setSectionIndex, setSubSectionIndex, setCurrentProjectDetails } = issuanceDataCollection.actions

export default issuanceDataCollection.reducer
