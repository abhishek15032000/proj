import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SectionAInterface {
  // A1
  purpose_and_description: string
  measure_taken_for_gas_emissions: string
  brief_description_installed_tech: string
  construction_date: string
  operation_period: string
  total_GHG_emission: string
  commissioning_date: string

  // A2
  country: string
  state: string
  city: string
  pincode: string
  landmark: string
  file_attach: any[]

  // A3
  projectParticipants: any[]

  // A4
  methodologies: any[]

  // A5
  startDate: string
  fromDate: string
  toDate: string
  brief_on_crediting_period: string
}

const initialState: SectionAInterface = {
  // A1
  purpose_and_description: '',
  measure_taken_for_gas_emissions: '',
  brief_description_installed_tech: '',
  construction_date: '',
  operation_period: '',
  total_GHG_emission: '',
  commissioning_date: '',

  // A2
  country: '',
  state: '',
  city: '',
  pincode: '',
  landmark: '',
  file_attach: [],

  // A3
  projectParticipants: [
    {
      partyInvolved: '',
      participantType: '',
      isProjectParticipant: 'Select from dropdown',
    },
  ],
  // A4
  methodologies: [
    {
      approvedMethodologies: '',
      projectType: '',
      category: '',
      version: '',
      toolsReferred: '',
      flag: false,
    },
  ],
  // A5
  startDate: '',
  fromDate: '',
  toDate: '',
  brief_on_crediting_period: '',
}

const sectionA = createSlice({
  name: 'sectionA',
  initialState,
  reducers: {
    // A1 Handlers
    setPurposeAndDescription: (state, action: PayloadAction<any>) => {
      state.purpose_and_description = action.payload
    },
    setMeasureTakenForGasEmissions: (state, action: PayloadAction<any>) => {
      state.measure_taken_for_gas_emissions = action.payload
    },
    setBriefDescriptionInstalledTech: (state, action: PayloadAction<any>) => {
      state.brief_description_installed_tech = action.payload
    },
    setConstructionDate: (state, action: PayloadAction<any>) => {
      state.construction_date = action.payload
    },
    setOperationPeriod: (state, action: PayloadAction<any>) => {
      state.operation_period = action.payload
    },
    setTotalGHGEmission: (state, action: PayloadAction<any>) => {
      state.total_GHG_emission = action.payload
    },
    setCommissioningDate: (state, action: PayloadAction<any>) => {
      state.commissioning_date = action.payload
    },

    // A2
    setCountry: (state, action: PayloadAction<any>) => {
      state.country = action.payload
    },
    setState: (state, action: PayloadAction<any>) => {
      state.state = action.payload
    },
    setCity: (state, action: PayloadAction<any>) => {
      state.city = action.payload
    },
    setPincode: (state, action: PayloadAction<any>) => {
      state.pincode = action.payload
    },
    setLandmark: (state, action: PayloadAction<any>) => {
      state.landmark = action.payload
    },
    setFileAttach: (state, action: PayloadAction<any>) => {
      state.file_attach = action.payload
    },

    // A3
    setProjectParticipants: (state, action: PayloadAction<any>) => {
      state.projectParticipants = action.payload
    },

    // A4
    setMethodologies: (state, action: PayloadAction<any>) => {
      state.methodologies = action.payload
    },
    // A5
    setStartDate: (state, action: PayloadAction<any>) => {
      state.startDate = action.payload
    },
    setFromDate: (state, action: PayloadAction<any>) => {
      state.fromDate = action.payload
    },
    setToDate: (state, action: PayloadAction<any>) => {
      state.toDate = action.payload
    },
    setBriefOnCreditingPeriod: (state, action: PayloadAction<any>) => {
      state.brief_on_crediting_period = action.payload
    },
  },
})

export const {
  setPurposeAndDescription,
  setBriefDescriptionInstalledTech,
  setConstructionDate,
  setMeasureTakenForGasEmissions,
  setOperationPeriod,
  setTotalGHGEmission,
  setCommissioningDate,
  setCountry,
  setCity,
  setFileAttach,
  setFromDate,
  setLandmark,
  setMethodologies,
  setPincode,
  setProjectParticipants,
  setStartDate,
  setState,
  setToDate,
  setBriefOnCreditingPeriod,
} = sectionA.actions

export default sectionA.reducer
