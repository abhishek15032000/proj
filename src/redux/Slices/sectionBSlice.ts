import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SectionBInterface {
  // B1
  briefOnPurpuse: string
  technicalDescription: string
  technicalDescriptionImage: any[]
  operationalDetails: string
  majorShutDownImage: any[]
  implementationMilestoneImage: any[]
  projectTimelineImage: any[]
}

const initialState: SectionBInterface = {

  // B1
  briefOnPurpuse: '',
  technicalDescription: '',
  technicalDescriptionImage: [],
  operationalDetails: '',
  majorShutDownImage: [],
  implementationMilestoneImage: [],
  projectTimelineImage: [],
}

const sectionB = createSlice({
  name: 'sectionB',
  initialState,
  reducers: {
    setBriefOnPurpuse: (state, action: PayloadAction<any>) => {
      state.briefOnPurpuse = action.payload
    },
  },
})

export const {
  setBriefOnPurpuse
} = sectionB.actions

export default sectionB.reducer
