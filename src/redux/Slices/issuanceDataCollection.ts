import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IssuanceDataCollectionReducerInterface {
  sectionIndex: number
  subSectionIndex: number
  currentProjectDetails: any
  currentProjectDetailsUUID: string
  isApiCalled: boolean
}

const initialState: IssuanceDataCollectionReducerInterface = {
  sectionIndex: 0,
  subSectionIndex: 0,
  currentProjectDetails: null,
  currentProjectDetailsUUID: '',
  isApiCalled: false,
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
    setCurrentProjectDetailsUUID: (state, action: PayloadAction<any>) => {
      state.currentProjectDetailsUUID = action.payload
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
  setCurrentProjectDetailsUUID,
  setIsApiCalled,
} = issuanceDataCollection.actions

export default issuanceDataCollection.reducer
