import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IssuanceDataCollectionReducerInterface {
  sectionIndex: number
  subSectionIndex: number
  currentProjectDetails: any
  currentProjectDetailsUUID: string
  showMandatoryFieldModal: boolean
  isApiCallSuccess: boolean
  toMoveSectionIndex: boolean
}

const initialState: IssuanceDataCollectionReducerInterface = {
  sectionIndex: 0,
  subSectionIndex: 0,
  currentProjectDetails: null,
  currentProjectDetailsUUID: '',
  showMandatoryFieldModal: false,
  isApiCallSuccess: false,
  toMoveSectionIndex: false,
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
    setShowMandatoryFieldModal: (state, action: PayloadAction<any>) => {
      state.showMandatoryFieldModal = action.payload
    },
    setIsApiCallSuccess: (state, action: PayloadAction<any>) => {
      state.isApiCallSuccess = action.payload
    },
    setToMoveSectionIndex: (state, action: PayloadAction<any>) => {
      state.toMoveSectionIndex = action.payload
    },
  },
})

export const {
  setSectionIndex,
  setSubSectionIndex,
  setCurrentProjectDetails,
  setCurrentProjectDetailsUUID,
  setShowMandatoryFieldModal,
  setIsApiCallSuccess,
  setToMoveSectionIndex,
} = issuanceDataCollection.actions

export default issuanceDataCollection.reducer
