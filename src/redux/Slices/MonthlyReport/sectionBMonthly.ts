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

  // B2
  temporaryDeviations: string
  corrections: string
  permanentChanges: string
  briefOnPurpuseB2: string
  changesToProject: string
  changesToStart: string
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

  // B2
  temporaryDeviations: '',
  corrections: '',
  permanentChanges: '',
  briefOnPurpuseB2: '',
  changesToProject: '',
  changesToStart: '',
}

const sectionBMonthly = createSlice({
  name: 'sectionBMonthly',
  initialState,
  reducers: {
    // B1 Handlers
    setBriefOnPurpuse: (state, action: PayloadAction<any>) => {
      state.briefOnPurpuse = action.payload
    },
    setTechnicalDescription: (state, action: PayloadAction<any>) => {
      state.technicalDescription = action.payload
    },
    setTechnicalDescriptionImage: (state, action: PayloadAction<any>) => {
      state.technicalDescriptionImage = action.payload
    },
    setOperationalDetails: (state, action: PayloadAction<any>) => {
      state.operationalDetails = action.payload
    },
    setMajorShutDownImage: (state, action: PayloadAction<any>) => {
      state.majorShutDownImage = action.payload
    },
    setImplementationMilestoneImage: (state, action: PayloadAction<any>) => {
      state.implementationMilestoneImage = action.payload
    },
    setProjectTimelineImage: (state, action: PayloadAction<any>) => {
      state.projectTimelineImage = action.payload
    },

    // B2 Handlers
    setTemporaryDeviations: (state, action: PayloadAction<any>) => {
      state.temporaryDeviations = action.payload
    },
    setCorrections: (state, action: PayloadAction<any>) => {
      state.corrections = action.payload
    },
    setPermanentChanges: (state, action: PayloadAction<any>) => {
      state.permanentChanges = action.payload
    },
    setBriefOnPurpuseB2: (state, action: PayloadAction<any>) => {
      state.briefOnPurpuseB2 = action.payload
    },
    setChangesToProject: (state, action: PayloadAction<any>) => {
      state.changesToProject = action.payload
    },
    setChangesToStart: (state, action: PayloadAction<any>) => {
      state.changesToStart = action.payload
    },
  },
})

export const {
  setBriefOnPurpuse,
  setTechnicalDescription,
  setTechnicalDescriptionImage,
  setOperationalDetails,
  setMajorShutDownImage,
  setImplementationMilestoneImage,
  setProjectTimelineImage,

  setTemporaryDeviations,
  setCorrections,
  setPermanentChanges,
  setBriefOnPurpuseB2,
  setChangesToProject,
  setChangesToStart,
} = sectionBMonthly.actions

export default sectionBMonthly.reducer
