import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SectionCInterface {
  C1: any
}

const initialState: SectionCInterface = {
  C1: {
    description: '',
    monitoring_plan: '',
    attach_org_structure_and_responsibilities_chart: [],
    specific_data_monitored: '',
    training_and_maintenance: '',
    management_of_data_quality: '',
  },
}

const sectionC = createSlice({
  name: 'sectionC',
  initialState,
  reducers: {
    // C1 Handlers
    setC1: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.C1[name] = value
    },
    resetSectionC: () => initialState,
  },
})

export const { setC1, resetSectionC } = sectionC.actions

export default sectionC.reducer
