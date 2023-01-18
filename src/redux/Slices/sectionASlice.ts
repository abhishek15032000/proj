import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { strictEqual } from 'assert'

interface SectionAInterface {
  // A3
  party_and_project_participants: any[]

  // A4
  methodologies: any[]

  A1: any
  A2: any
  A5: any
  A6: any
  A7: any
}

const initialState: SectionAInterface = {
  // A1
  A1: {
    purpose_and_description: '',
    measure_taken_for_gas_emissions: '',
    brief_description_installed_tech: '',
    construction_date: '',
    operation_period: '',
    total_GHG_emission: '',
    project_comissioning_date: '',
    conditions_prior_to_initiation: '',
    project_type_and_sectoral_scope: '',
    additional_information: '',
  },
  // A2
  A2: {
    country: '',
    state: '',
    city: '',
    pincode: '',
    landmark: '',
    file_attach: [],
    geographic_coordinates: '',
    aerial_photo: '',
  },

  // A3
  party_and_project_participants: [
    {
      party_involved: '',
      private_or_public_project_participant: '',
      indicate_party_involved: '',
    },
  ],

  // A4
  methodologies: [
    {
      methodology: '',
      project_type: [],
      category: '',
      version: '',
      tools: '',
      flag: false,
    },
  ],

  // A5
  A5: {
    credit_start_period: '',
    credit_period: { start_date: '', end_date: '' },
    credit_period_description: '',
  },
  //A6
  A6: {
    statutory_requirements: '',
    negative_environmental_and_socio_economic_impacts: '',
    consultation: '',
    environmental_impact_assessment: '',
    risk_assessment: '',
    additional_information: '',
  },
  A7: {
    Level1: '',
    Level2a: '',
    Level2b: '',
    Level3: '',
    Level4a: '',
    Level4b: '',
    Level5: '',
  },
}

const sectionA = createSlice({
  name: 'sectionA',
  initialState,
  reducers: {
    // A1 Handlers
    setA1: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.A1[name] = value
    },

    // A2
    setA2: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.A2[name] = value
    },
    // A3
    setProjectParticipants: (state, action: PayloadAction<any>) => {
      state.party_and_project_participants = action.payload
    },

    // A4
    setMethodologies: (state, action: PayloadAction<any>) => {
      state.methodologies = action.payload
    },
    // A5
    setA5: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      typeof name === 'string'
        ? (state.A5[name] = value)
        : (state.A5[name[0]][name[1]] = value)
    },
    //A6
    setA6: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.A6[name] = value
    },
    //A7
    setA7: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.A7[name] = value
    },
    resetSectionA: () => initialState,
  },
})

export const {
  setA1,
  setA2,
  setProjectParticipants,
  setMethodologies,
  setA5,
  resetSectionA,
  setA6,
  setA7,
} = sectionA.actions

export default sectionA.reducer
